/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from 'motion/react';
import {
  auth,
  db,
  localConfig,
  signInWithGoogle,
  logout,
  requestNotificationPermission,
  onForegroundMessage,
  handleFirestoreError,
  OperationType,
  trackEvent
} from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp, Timestamp, getDocFromServer } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import './i18n/config';
import { Capacitor } from '@capacitor/core';

import { Quote, UserSettings } from './types';
import { THEMES, THEME_SEED_POOLS, BLOCKED_KEYWORDS } from './constants';
import { ErrorBoundary } from './components/ErrorBoundary';
import { QuoteCard } from './components/QuoteCard';
import { HistoryItem } from './components/HistoryItem';
import { Header } from './components/Header';

// Import icons
import { Bell, History as HistoryIcon, Home, Settings as SettingsIcon, Sparkles, RefreshCw, ExternalLink, Download, Image as ImageIcon, ChevronRight, Globe, Palette } from 'lucide-react';

export default function App() {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'settings'>('home');
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [history, setHistory] = useState<Quote[]>([]);
  const [settings, setSettings] = useState<UserSettings>({
    uid: '',
    email: '',
    notificationTime: '08:00',
    preferredThemes: ['motivation'],
    customKeyword: '',
    preferredCardStyle: 'classic',
    isSubscribed: false,
    language: 'ko',
    darkMode: 'system',
    role: 'client'
  });
  const [showOnboarding, setShowOnboarding] = useState(() => localStorage.getItem('hasSeenOnboarding') !== 'true');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempHour, setTempHour] = useState(8);
  const [tempMinute, setTempMinute] = useState(0);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inAppNotification, setInAppNotification] = useState<{ title: string; body: string } | null>(null);
  const pendingNotifQuoteId = useRef<string | null>(null);

  // Notification tap listener (early mount, before auth)
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    const setup = async () => {
      const { FirebaseMessaging } = await import('@capacitor-firebase/messaging');
      FirebaseMessaging.addListener('notificationActionPerformed', (event) => {
        const quoteId = (event.notification.data as Record<string, string> | undefined)?.quoteId;
        if (quoteId) pendingNotifQuoteId.current = quoteId;
      });
    };
    setup();
  }, []);

  // Load pending notification quote when user becomes available
  useEffect(() => {
    if (!user || !pendingNotifQuoteId.current) return;
    const quoteId = pendingNotifQuoteId.current;
    pendingNotifQuoteId.current = null;
    getDoc(doc(db, 'users', user.uid, 'history', quoteId)).then((snap) => {
      if (snap.exists()) {
        setCurrentQuote({ id: snap.id, ...snap.data() } as Quote);
        setActiveTab('home');
      }
    }).catch(err => console.error('[Notification] Failed to load quote:', err));
  }, [user]);

  // Device & Orientation Listener
  useEffect(() => {
    const checkDeviceAndOrientation = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsMobileOrTablet(isTouch);
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    checkDeviceAndOrientation();
    window.addEventListener('resize', checkDeviceAndOrientation);
    return () => window.removeEventListener('resize', checkDeviceAndOrientation);
  }, []);

  const useSidebar = isMobileOrTablet && isLandscape;

  // Auth & Data Listener
  useEffect(() => {
    let unsubscribeSettings: (() => void) | null = null;
    let unsubscribeHistory: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) trackEvent('login', { method: 'google' });

      if (firebaseUser) {
        // 1. Settings Listener
        const settingsRef = doc(db, 'users', firebaseUser.uid);
        unsubscribeSettings = onSnapshot(settingsRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data() as UserSettings;
            const mergedSettings: UserSettings = {
              uid: data.uid || firebaseUser.uid,
              email: data.email || firebaseUser.email || '',
              notificationTime: data.notificationTime || '08:00',
              preferredThemes: data.preferredThemes || ['motivation'],
              customKeyword: data.customKeyword || '',
              preferredCardStyle: data.preferredCardStyle || 'classic',
              language: data.language || i18n.language || 'ko',
              darkMode: data.darkMode || 'system',
              isSubscribed: data.isSubscribed || false,
              role: data.role || 'client',
              updatedAt: data.updatedAt,
              fcmToken: data.fcmToken
            };
            setSettings(mergedSettings);
            if (mergedSettings.language && mergedSettings.language !== i18n.language) {
              i18n.changeLanguage(mergedSettings.language);
            }
          } else {
            const initialSettings = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              notificationTime: '08:00',
              preferredThemes: ['motivation'],
              customKeyword: '',
              preferredCardStyle: 'classic',
              language: i18n.language || 'ko',
              darkMode: 'system',
              isSubscribed: false,
              updatedAt: serverTimestamp(),
              role: 'client'
            };
            setDoc(settingsRef, initialSettings).catch(err => 
              handleFirestoreError(err, OperationType.CREATE, `users/${firebaseUser.uid}`, firebaseUser)
            );
          }
        }, (err) => {
          handleFirestoreError(err, OperationType.GET, `users/${firebaseUser.uid}`, firebaseUser);
        });

        // 2. History Listener
        const historyRef = collection(db, 'users', firebaseUser.uid, 'history');
        const q = query(historyRef, orderBy('createdAt', 'desc'), limit(20));
        unsubscribeHistory = onSnapshot(q, (snapshot) => {
          const quotes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Quote[];
          setHistory(quotes);
          if (quotes.length > 0 && !currentQuote) {
            setCurrentQuote(quotes[0]);
          }
        }, (err) => {
          handleFirestoreError(err, OperationType.LIST, `users/${firebaseUser.uid}/history`, firebaseUser);
        });

        // 3. Connection Test
        getDocFromServer(doc(db, 'test', 'connection')).catch(error => {
          if (error instanceof Error && error.message.includes('the client is offline')) {
            console.error("Please check your Firebase configuration.");
          }
        });
      } else {
        setHistory([]);
        setCurrentQuote(null);
        setSettings(prev => ({ ...prev, uid: '', email: '' }));
        if (unsubscribeSettings) unsubscribeSettings();
        if (unsubscribeHistory) unsubscribeHistory();
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSettings) unsubscribeSettings();
      if (unsubscribeHistory) unsubscribeHistory();
    };
  }, []);

  // Sync Dark Mode class
  useEffect(() => {
    const applyTheme = () => {
      const html = document.documentElement;
      let isDark = false;
      let isMaterial = false;

      if (settings.darkMode === 'dark') {
        isDark = true;
      } else if (settings.darkMode === 'system') {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else if (settings.darkMode === 'material') {
        isMaterial = true;
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      if (isDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }

      if (isMaterial) {
        html.classList.add('theme-material');
      } else {
        html.classList.remove('theme-material');
      }
    };

    applyTheme();

    if (settings.darkMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settings.darkMode]);

  // Quote Generation
  const generateQuote = async (manualRetry = false) => {
    if (!user) return;
    if (manualRetry) setError(null);
    setIsGenerating(true);

    const apiKey = (localConfig.geminiApiKey || import.meta.env.VITE_GEMINI_API_KEY) as string;
    if (!apiKey || apiKey === 'undefined') {
      setError(t('common.error_api_key_missing'));
      setIsGenerating(false);
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: `당신은 세계 최고의 동기부여 전문가이자 작가입니다. 사용자가 선택한 테마에 맞춰 깊은 통찰력을 담은 명언과 그에 대한 따뜻한 해설을 제공하세요. 모든 응답은 반드시 '${i18n.language}' 언어로 작성해야 합니다.`,
      });
      
      // Keyword blocking
      if (settings.customKeyword) {
        const kw = settings.customKeyword.toLowerCase();
        if (BLOCKED_KEYWORDS.some(b => kw.includes(b))) {
          alert(t('settings.keyword_blocked'));
          setIsGenerating(false);
          return;
        }
      }

      // Theme resolution
      const selectedThemes = (settings.preferredThemes || ['motivation']).filter(id => id !== 'random');
      const pool = (settings.preferredThemes || []).includes('random') || selectedThemes.length === 0
        ? THEMES.filter(th => th.id !== 'random').map(th => th.id)
        : selectedThemes;
      const resolvedTheme = pool[Math.floor(Math.random() * pool.length)];

      // Prompt
      let promptThemePart: string;
      if (settings.customKeyword?.trim()) {
        promptThemePart = `키워드: "${settings.customKeyword.trim()}"`;
      } else {
        const themeLabel = THEMES.find(th => th.id === resolvedTheme)?.labelKey || 'themes.motivation';
        promptThemePart = `테마: ${t(themeLabel)}`;
      }
      const prompt = `${promptThemePart}. 다음 JSON 형식으로 응답하세요: { "text": "명언 내용", "author": "저자 이름", "explanation": "해설 내용" }`;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      });

      const response = await result.response;
      const data = JSON.parse(response.text());

      const newQuoteData: Omit<Quote, 'id'> = {
        ...data,
        theme: resolvedTheme,
        createdAt: serverTimestamp(),
        uid: user.uid
      };

      setCurrentQuote({ ...newQuoteData, id: 'temp-' + Date.now() } as Quote);
      setIsGenerating(false);
      trackEvent('generate_quote', { theme: resolvedTheme, has_custom_keyword: !!settings.customKeyword });

      // Save to Firestore
      try {
        const docRef = await addDoc(collection(db, 'users', user.uid, 'history'), newQuoteData);
        setCurrentQuote({ ...newQuoteData, id: docRef.id } as Quote);
      } catch (err) {
        console.error('[Firestore Error] Could not save to database:', err);
      }
    } catch (err) {
      console.error('Error in generation process:', err);
      setError(t('common.error_generating_quote'));
      setIsGenerating(false);
    }
  };

  // Sync notification permission
  useEffect(() => {
    const syncPermission = async () => {
      if (user && 'Notification' in window && Notification.permission === 'granted' && !settings.isSubscribed) {
        const token = await requestNotificationPermission();
        if (token) {
          const fcmToken = token === 'granted_but_no_token' ? '' : token;
          setSettings(prev => ({ ...prev, isSubscribed: true, fcmToken }));
          await setDoc(doc(db, 'users', user.uid), { isSubscribed: true, fcmToken, updatedAt: serverTimestamp() }, { merge: true });
        }
      }
    };
    syncPermission();
  }, [user, settings.isSubscribed]);

  // Foreground messages
  useEffect(() => {
    if (!user) return;
    const unsubscribe = onForegroundMessage((payload) => {
      const title = payload.notification?.title ?? t('settings.section_notification');
      const body = payload.notification?.body ?? '';
      setInAppNotification({ title, body });
      setTimeout(() => setInAppNotification(null), 5000);
    });
    return unsubscribe;
  }, [user]);

  const handleSubscribe = async () => {
    if (!user) return;
    const token = await requestNotificationPermission();
    if (token) {
      const fcmToken = token === 'granted_but_no_token' ? '' : token;
      setSettings(prev => ({ ...prev, isSubscribed: true, fcmToken }));
      trackEvent('notification_subscribe');
      await setDoc(doc(db, 'users', user.uid), { isSubscribed: true, fcmToken, updatedAt: serverTimestamp() }, { merge: true });
    } else if (Notification.permission === 'denied') {
      setError(t('settings.status_desc'));
    }
  };

  const saveSettings = async (updates: Partial<UserSettings>) => {
    if (!user) return;

    if (updates.notificationTime) {
      const [h, m] = updates.notificationTime.split(':').map(Number);
      const local = new Date();
      local.setHours(h, m, 0, 0);
      updates.notificationTimeUTC = `${String(local.getUTCHours()).padStart(2,'0')}:${String(local.getUTCMinutes()).padStart(2,'0')}`;
    }

    setSettings(prev => ({ ...prev, ...updates }));

    if (updates.language) {
      i18n.changeLanguage(updates.language);
      trackEvent('language_change', { language: updates.language });
    }

    try {
      await setDoc(doc(db, 'users', user.uid), { ...updates, updatedAt: serverTimestamp() }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`, user);
    }
  };

  const handleShare = async (quote: Quote) => {
    try {
      const shareData: ShareData = {
        title: t('home.title'),
        text: `"${quote.text}" — ${quote.author}`,
        url: window.location.href,
      };

      if (quote.imageUrl && navigator.canShare) {
        const response = await fetch(quote.imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'quote.jpg', { type: 'image/jpeg' });
        if (navigator.canShare({ files: [file] })) {
          shareData.files = [file];
        }
      }

      await navigator.share(shareData);
      trackEvent('share_quote', { has_image: !!quote.imageUrl });
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(t('share.error'));
      }
    }
  };

  const generateQuoteCard = async (quote: Quote) => {
    if (!user) return;
    setIsGeneratingCard(true);
    setError(null);

    const apiKey = localConfig.geminiApiKey || (import.meta.env.VITE_GEMINI_API_KEY as string);
    if (!apiKey) {
      setError(t('common.error_api_key_missing'));
      setIsGeneratingCard(false);
      return;
    }

    try {
      const seedPool = THEME_SEED_POOLS[quote.theme] ?? THEME_SEED_POOLS.life;
      const seed = seedPool[Math.floor(Math.random() * seedPool.length)];

      let base64Image = "";
      try {
        const imgResponse = await fetch(`https://picsum.photos/seed/${seed}/1024/1024`);
        if (imgResponse.ok) {
          const blob = await imgResponse.blob();
          base64Image = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve((reader.result as string).replace(/^data:[^;]+;base64,/, ''));
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        }
      } catch (imgErr) {
        console.warn('[Card] Picsum fetch failed, using gradient fallback');
      }

      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      if (base64Image) {
        const bgImg = new Image();
        bgImg.src = `data:image/png;base64,${base64Image}`;
        await new Promise((resolve, reject) => { bgImg.onload = resolve; bgImg.onerror = reject; });
        ctx.drawImage(bgImg, 0, 0, 1024, 1024);
      } else {
        const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
        gradient.addColorStop(0, '#312e81');
        gradient.addColorStop(1, '#1e1b4b');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1024, 1024);
      }

      const style = settings.preferredCardStyle || 'classic';
      if (style === 'modern') {
        const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
        gradient.addColorStop(0, 'rgba(0,0,0,0.2)');
        gradient.addColorStop(1, 'rgba(0,0,0,0.7)');
        ctx.fillStyle = gradient;
      } else if (style === 'classic') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      }
      ctx.fillRect(0, 0, 1024, 1024);

      ctx.fillStyle = 'white';
      ctx.textAlign = style === 'modern' ? 'left' : 'center';
      ctx.textBaseline = 'middle';
      const fontSize = style === 'bold' ? 64 : 48;
      const fontName = style === 'classic' ? 'Georgia, serif' : '"Inter", sans-serif';
      ctx.font = `${style === 'classic' ? 'italic' : 'normal'} ${style === 'bold' ? '800' : '600'} ${fontSize}px ${fontName}`;

      const maxWidth = style === 'modern' ? 700 : 800;
      const startX = style === 'modern' ? 100 : 512;
      const words = quote.text.split(' ');
      let line = '';
      const lines = [];
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      const totalHeight = lines.length * (fontSize + 20);
      let startY = (1024 - totalHeight) / 2;
      lines.forEach(l => {
        ctx.fillText(l.trim(), startX, startY);
        startY += fontSize + 20;
      });

      ctx.font = `${style === 'bold' ? '700' : '600'} 32px ${fontName}`;
      ctx.fillText(`— ${quote.author}`, startX, startY + 40);

      const finalImageUrl = canvas.toDataURL('image/jpeg', 0.8);

      if (quote.id && !quote.id.startsWith('temp-')) {
        setDoc(doc(db, 'users', user.uid, 'history', quote.id), { imageUrl: finalImageUrl }, { merge: true })
          .then(() => setCurrentQuote(prev => prev?.id === quote.id ? { ...prev, imageUrl: finalImageUrl } : prev))
          .catch(err => console.error('[Firestore] Image save failed:', err));
      }

      setIsGeneratingCard(false);
      trackEvent('generate_card', { card_style: settings.preferredCardStyle });

      if (Capacitor.isNativePlatform()) {
        const { Filesystem, Directory } = await import('@capacitor/filesystem');
        const { Share } = await import('@capacitor/share');
        const base64Data = finalImageUrl.replace(/^data:image\/jpeg;base64,/, '');
        const fileName = `quote-${quote.id || 'new'}.jpg`;
        await Filesystem.writeFile({ path: fileName, data: base64Data, directory: Directory.Cache });
        const { uri } = await Filesystem.getUri({ path: fileName, directory: Directory.Cache });
        try { await Share.share({ title: t('home.title'), url: uri, dialogTitle: t('home.title') }); } catch {}
      } else {
        const link = document.createElement('a');
        link.download = `quote-${quote.id || 'new'}.jpg`;
        link.href = finalImageUrl;
        link.click();
      }
    } catch (err) {
      console.error('Error generating quote card:', err);
      setError(t('common.error'));
      setIsGeneratingCard(false);
    }
  };

  // Tab Navigation
  const TabIcon = activeTab === 'home' ? Home : activeTab === 'history' ? HistoryIcon : SettingsIcon;
  const tabs = [
    { id: 'home', icon: Home, label: t('nav.home') },
    { id: 'history', icon: HistoryIcon, label: t('nav.history') },
    { id: 'settings', icon: SettingsIcon, label: t('nav.settings') },
  ] as const;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <RefreshCw className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
      </div>
    );
  }

  if (!user) {
    const ONBOARDING_THEME_PREVIEWS = ['motivation', 'philosophy', 'comfort', 'success', 'humor', 'wisdom'];
    const ONBOARDING_STEPS = [
      { emoji: '✨', titleKey: 'onboarding.step1_title', descKey: 'onboarding.step1_desc' },
      { emoji: '🎨', titleKey: 'onboarding.step2_title', descKey: 'onboarding.step2_desc' },
      { emoji: '🚀', titleKey: 'onboarding.step3_title', descKey: 'onboarding.step3_desc' },
    ];

    const completeOnboarding = () => {
      localStorage.setItem('hasSeenOnboarding', 'true');
      setShowOnboarding(false);
      trackEvent('onboarding_complete', { steps_seen: onboardingStep + 1 });
    };

    if (showOnboarding) {
      const step = ONBOARDING_STEPS[onboardingStep];
      const isLast = onboardingStep === ONBOARDING_STEPS.length - 1;
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
          <div className="w-full flex justify-end mb-6">
            <button onClick={() => { trackEvent('onboarding_skip', { step: onboardingStep }); completeOnboarding(); }} className="text-sm text-neutral-400 hover:text-neutral-600">
              {t('onboarding.skip')}
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={onboardingStep}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="w-full flex flex-col items-center text-center"
            >
              <div className="text-7xl mb-8">{step.emoji}</div>
              <h2 className="text-2xl font-extrabold text-neutral-900 mb-4">{t(step.titleKey)}</h2>
              <p className="text-neutral-500 mb-8">{t(step.descKey)}</p>
              {onboardingStep === 1 && (
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {ONBOARDING_THEME_PREVIEWS.map(id => (
                    <span key={id} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm">{t(`themes.${id}`)}</span>
                  ))}
                </div>
              )}
              {isLast && (
                <button onClick={() => { completeOnboarding(); signInWithGoogle(); }} className="w-full py-4 px-6 bg-indigo-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-3">
                  <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5 bg-white rounded-full" alt="Google" />
                  {t('auth.google_login')}
                </button>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2 mt-6">
            {ONBOARDING_STEPS.map((_, i) => (
              <div key={i} className={`h-2 rounded-full ${i === onboardingStep ? 'w-6 bg-indigo-600' : 'w-2 bg-neutral-200'}`} />
            ))}
          </div>
          {!isLast && (
            <button onClick={() => setOnboardingStep(s => s + 1)} className="mt-8 w-full py-4 px-6 bg-indigo-600 text-white rounded-2xl font-semibold">
              {t('onboarding.next')}
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 p-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">{t('auth.welcome')}</h1>
          <p className="text-neutral-500 mb-10">{t('auth.desc')}</p>
          <button onClick={signInWithGoogle} className="w-full py-4 px-6 bg-indigo-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-3">
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5 bg-white rounded-full" alt="Google" />
            {t('auth.google_login')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <ErrorBoundary t={t}>
      <div className={`min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors ${useSidebar ? 'flex flex-row-reverse' : 'flex flex-col'}`}>
        <Header isLoggedIn onLogout={logout} />
        
        <main className={`flex-1 p-6 ${useSidebar ? 'mr-20' : 'pb-24'}`}>
          <div className={useSidebar ? 'max-w-6xl mx-auto' : 'max-w-md mx-auto'}>
            <AnimatePresence mode="wait">
              {activeTab === 'home' && (
                <motion.div key="home" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className={`space-y-6 ${useSidebar ? 'grid grid-cols-2 gap-8' : ''}`}>
                  <QuoteCard
                    quote={currentQuote}
                    isGenerating={isGenerating}
                    isGeneratingCard={isGeneratingCard}
                    onGenerateCard={() => currentQuote && generateQuoteCard(currentQuote)}
                    onRefresh={() => generateQuote(true)}
                    onShare={() => currentQuote && handleShare(currentQuote)}
                    t={t}
                  />
                  <div className="space-y-6">
                    {!settings.isSubscribed && (
                      <div className="bg-indigo-600 rounded-2xl p-6 text-white flex items-center justify-between">
                        <div>
                          <h4 className="font-bold">{t('home.subscribe_title')}</h4>
                          <p className="text-xs text-indigo-100">{t('home.subscribe_desc')}</p>
                        </div>
                        <button onClick={handleSubscribe} className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold">{t('home.activate')}</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'history' && (
                <motion.div key="history" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                  <h2 className="text-2xl font-bold">{t('history.title')}</h2>
                  {history.length === 0 ? (
                    <p className="text-neutral-400">{t('history.no_history')}</p>
                  ) : (
                    history.map((quote) => (
                      <HistoryItem
                        key={quote.id}
                        quote={quote}
                        onSelect={() => { setCurrentQuote(quote); setActiveTab('home'); }}
                        onDownload={() => {}}
                        onShare={() => handleShare(quote)}
                        onRegenerate={() => generateQuoteCard(quote)}
                        t={t}
                      />
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div key="settings" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold">{t('settings.title')}</h2>
                  
                  {/* Notification */}
                  <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-indigo-600" />
                        <span>{t('settings.notification')}</span>
                      </div>
                      <button onClick={() => setShowTimePicker(true)} className="text-sm text-neutral-500">{settings.notificationTime}</button>
                    </div>
                  </div>

                  {/* Theme */}
                  <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      <span className="font-bold">{t('settings.section_content')}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {THEMES.filter(t => t.id !== 'random').map(theme => (
                        <button
                          key={theme.id}
                          onClick={() => saveSettings({ preferredThemes: [theme.id] })}
                          className={`px-3 py-1.5 rounded-full text-sm ${settings.preferredThemes.includes(theme.id) ? 'bg-indigo-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800'}`}
                        >
                          {t(theme.labelKey)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Style */}
                  <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Palette className="w-5 h-5 text-indigo-600" />
                      <span className="font-bold">{t('settings.card_style')}</span>
                    </div>
                    <div className="flex gap-2">
                      {['classic', 'modern', 'minimal', 'bold'].map(style => (
                        <button
                          key={style}
                          onClick={() => saveSettings({ preferredCardStyle: style })}
                          className={`px-3 py-1.5 rounded-full text-sm ${settings.preferredCardStyle === style ? 'bg-indigo-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800'}`}
                        >
                          {t(`cardStyles.${style}`)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Language */}
                  <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="w-5 h-5 text-indigo-600" />
                      <span className="font-bold">{t('settings.section_app')}</span>
                    </div>
                    <div className="flex gap-2">
                      {settings.language && (
                        <button
                          onClick={() => {
                            const langs = ['ko', 'en', 'ja', 'zh'];
                            const currentIdx = langs.indexOf(settings.language);
                            const nextLang = langs[(currentIdx + 1) % langs.length];
                            saveSettings({ language: nextLang });
                          }}
                          className="px-3 py-1.5 rounded-full text-sm bg-neutral-100 dark:bg-neutral-800"
                        >
                          {settings.language.toUpperCase()}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 px-6 py-3 flex justify-around ${useSidebar ? 'hidden' : ''}`}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex flex-col items-center gap-1 ${activeTab === tab.id ? 'text-indigo-600' : 'text-neutral-400'}`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* In-App Notification Toast */}
        {inAppNotification && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-neutral-900 text-white px-4 py-2 rounded-xl shadow-lg z-50">
            <p className="font-bold">{inAppNotification.title}</p>
            <p className="text-sm">{inAppNotification.body}</p>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}