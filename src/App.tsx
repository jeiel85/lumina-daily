/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Bell, 
  History as HistoryIcon, 
  Home, 
  Settings as SettingsIcon, 
  LogOut, 
  Sparkles, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Quote as QuoteIcon,
  RefreshCw,
  Globe,
  ExternalLink,
  Download,
  Image as ImageIcon,
  Monitor,
  Sun,
  Moon,
  Palette,
  X
} from 'lucide-react';
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
  OperationType
} from './firebase';
import { 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  Timestamp,
  getDocFromServer
} from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import './i18n/config';
import React, { Component, ReactNode } from 'react';
import { Capacitor } from '@capacitor/core';

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
  t: any;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-neutral-100">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">{this.props.t('common.error_boundary_title')}</h1>
            <p className="text-neutral-500 mb-8">{this.props.t('common.error_boundary_desc')}</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 px-6 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              {this.props.t('common.error_boundary_retry')}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Types
interface Quote {
  id?: string;
  text: string;
  author: string;
  explanation: string;
  theme: string;
  createdAt: any;
  imageUrl?: string;
}

interface UserSettings {
  uid: string;
  email: string;
  notificationTime: string;
  notificationTimeUTC?: string;
  preferredThemes: string[];
  customKeyword: string;
  preferredCardStyle: string;
  isSubscribed: boolean;
  language: string;
  darkMode: 'light' | 'dark' | 'system' | 'material';
  fcmToken?: string;
  role: string;
  updatedAt?: any;
}

const THEMES = [
  { id: 'random', labelKey: 'themes.random', icon: '🎲' },
  { id: 'motivation', labelKey: 'themes.motivation', icon: '🔥' },
  { id: 'comfort', labelKey: 'themes.comfort', icon: '🌿' },
  { id: 'humor', labelKey: 'themes.humor', icon: '😄' },
  { id: 'success', labelKey: 'themes.success', icon: '🏆' },
  { id: 'business', labelKey: 'themes.business', icon: '💼' },
  { id: 'love', labelKey: 'themes.love', icon: '❤️' },
  { id: 'philosophy', labelKey: 'themes.philosophy', icon: '🏛️' },
  { id: 'wisdom', labelKey: 'themes.wisdom', icon: '🦉' },
  { id: 'life', labelKey: 'themes.life', icon: '🌱' },
];

const CARD_STYLES = [
  { id: 'classic', labelKey: 'cardStyles.classic' },
  { id: 'modern', labelKey: 'cardStyles.modern' },
  { id: 'minimal', labelKey: 'cardStyles.minimal' },
  { id: 'bold', labelKey: 'cardStyles.bold' },
];

const LANGUAGES = [
  { id: 'ko', label: '한국어' },
  { id: 'en', label: 'English' },
  { id: 'ja', label: '日本語' },
  { id: 'zh', label: '中文' },
];

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
        const quoteId = event.notification.data?.quoteId as string | undefined;
        if (quoteId) pendingNotifQuoteId.current = quoteId;
      });
    };
    setup();
  }, []);

  // When user is available, load pending notification quote
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
      // Check if it's a mobile/tablet (touch device with coarse pointer)
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsMobileOrTablet(isTouch);
      
      // Check orientation
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
      
      if (firebaseUser) {
        // 1. Settings Listener
        const settingsRef = doc(db, 'users', firebaseUser.uid);
        unsubscribeSettings = onSnapshot(settingsRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data() as UserSettings;
            console.log('Settings snapshot received:', data);
            const mergedSettings: UserSettings = {
              uid: data.uid || firebaseUser.uid,
              email: data.email || firebaseUser.email || '',
              notificationTime: data.notificationTime || '08:00',
              preferredThemes: data.preferredThemes || (data.preferredTheme ? [data.preferredTheme] : null) || [(data as any).theme] || ['motivation'],
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
            // Initialize user settings
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
        // Reset state on logout
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

  // Debug settings changes
  useEffect(() => {
    console.log('[Debug] Settings changed:', settings);
  }, [settings]);

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
        // Material theme can also follow system dark mode if we want, 
        // but for now let's make it a distinct light-ish theme with M3 colors.
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      console.log(`[Theme] Mode: ${settings.darkMode}, isDark: ${isDark}, isMaterial: ${isMaterial}`);
      
      if (isDark) {
        html.classList.add('dark');
        console.log('[Theme] Added .dark class to html');
      } else {
        html.classList.remove('dark');
        console.log('[Theme] Removed .dark class from html');
      }

      if (isMaterial) {
        html.classList.add('theme-material');
        console.log('[Theme] Added .theme-material class to html');
      } else {
        html.classList.remove('theme-material');
        console.log('[Theme] Removed .theme-material class from html');
      }
      console.log('[Theme] Current html classes:', html.className);
    };

    applyTheme();

    // Listen for system theme changes if in system mode
    if (settings.darkMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settings.darkMode]);

  const generateQuote = async () => {
    if (!user) return;
    setIsGenerating(true);
    setError(null);
    
    const apiKey = (localConfig.geminiApiKey || import.meta.env.VITE_GEMINI_API_KEY) as string;
    
    // Debug logging for API Key (Masked for safety)
    const maskedKey = apiKey ? `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}` : 'MISSING';
    console.log(`[AI Debug] Using API Key: ${maskedKey}`);

    if (!apiKey || apiKey === 'undefined') {
      console.error('[AI Debug] GEMINI_API_KEY is missing or undefined!');
      setError(t('common.error_api_key_missing'));
      setIsGenerating(false);
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      console.log('[AI Debug] Initializing verified model: gemini-2.5-flash');
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: `당신은 세계 최고의 동기부여 전문가이자 작가입니다. 사용자가 선택한 테마에 맞춰 깊은 통찰력을 담은 명언과 그에 대한 따뜻한 해설을 제공하세요. 모든 응답은 반드시 '${i18n.language}' 언어로 작성해야 합니다.`,
      });
      
      // 커스텀 키워드 필터링
      const BLOCKED_KEYWORDS = ['섹스', '야동', '포르노', 'sex', 'porn', 'nude', 'naked', '씨발', '개새끼', '좆', '보지', '자지', 'fuck', 'shit', 'ass', 'bitch', 'nigger', 'faggot'];
      if (settings.customKeyword) {
        const kw = settings.customKeyword.toLowerCase();
        if (BLOCKED_KEYWORDS.some(b => kw.includes(b))) {
          alert(t('settings.keyword_blocked'));
          setIsGenerating(false);
          return;
        }
      }

      // 테마 결정 (다중 선택 중 랜덤 1개)
      const selectedThemes = (settings.preferredThemes || ['motivation']).filter(id => id !== 'random');
      const pool = (settings.preferredThemes || []).includes('random') || selectedThemes.length === 0
        ? THEMES.filter(th => th.id !== 'random').map(th => th.id)
        : selectedThemes;
      const resolvedTheme = pool[Math.floor(Math.random() * pool.length)];

      // 프롬프트 생성
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
        generationConfig: {
          responseMimeType: "application/json",
        }
      });

      const response = await result.response;
      const data = JSON.parse(response.text());

      const newQuoteData: Omit<Quote, 'id'> = {
        ...data,
        theme: resolvedTheme,
        createdAt: serverTimestamp(),
        uid: user.uid
      };

      // 1. UPDATE UI FIRST (Stop spinning immediately!)
      setCurrentQuote({ ...newQuoteData, id: 'temp-' + Date.now() } as Quote);
      setIsGenerating(false);
      console.log('[AI Success] Quote UI updated. Saving to DB in background...');

      // 2. BACKGROUND SAVE (Non-blocking)
      const path = `users/${user.uid}/history`;
      try {
        const docRef = await addDoc(collection(db, 'users', user.uid, 'history'), newQuoteData);
        console.log('[Firestore] Successfully saved quote in background with ID:', docRef.id);
        setCurrentQuote({ ...newQuoteData, id: docRef.id } as Quote);
      } catch (err) {
        console.error('[Firestore Error] Could not save to database. Is Firestore created?', err);
        // We don't call setError here to avoid disrupting the user since they already have the quote
      }
    } catch (err) {
      console.error('Error in generation process:', err);
      setError(t('common.error_generating_quote'));
      setIsGenerating(false); // Ensure spinner stops on AI error too
    }
  };

  // Sync browser notification permission with app state
  useEffect(() => {
    const syncPermission = async () => {
      if (user && 'Notification' in window && Notification.permission === 'granted' && !settings.isSubscribed) {
        // Silently try to subscribe if permission is already granted
        const token = await requestNotificationPermission();
        if (token) {
          const fcmToken = token === 'granted_but_no_token' ? '' : token;
          const firestoreUpdate = { 
            isSubscribed: true, 
            fcmToken,
            updatedAt: serverTimestamp()
          };
          // Optimistic update
          setSettings(prev => ({ ...prev, isSubscribed: true, fcmToken }));
          await setDoc(doc(db, 'users', user.uid), firestoreUpdate, { merge: true });
        }
      }
    };
    syncPermission();
  }, [user, settings.isSubscribed]);

  // 포그라운드 메시지 수신 (앱이 열려있을 때)
  useEffect(() => {
    if (!user) return;
    const unsubscribe = onForegroundMessage((payload) => {
      const title = payload.notification?.title ?? t('settings.section_notification');
      const body  = payload.notification?.body  ?? '';
      setInAppNotification({ title, body });
      // 5초 후 자동 닫기
      setTimeout(() => setInAppNotification(null), 5000);
    });
    return unsubscribe;
  }, [user]);

  const handleSubscribe = async () => {
    if (!user) return;
    const path = `users/${user.uid}`;
    const token = await requestNotificationPermission();
    if (token) {
      const fcmToken = token === 'granted_but_no_token' ? '' : token;
      const firestoreUpdate = { 
        isSubscribed: true, 
        fcmToken,
        updatedAt: serverTimestamp()
      };
      // Optimistic update
      setSettings(prev => ({ ...prev, isSubscribed: true, fcmToken }));
      try {
        await setDoc(doc(db, 'users', user.uid), firestoreUpdate, { merge: true });
        setError(null); // Clear any previous error
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, path, user);
      }
    } else {
      // Only show error if permission was actually denied or failed
      if (Notification.permission === 'denied') {
        setError(t('settings.status_desc'));
      } else {
        // If it's just a token issue but permission is granted, we don't necessarily want a red error toast
        // but we can inform the user if needed. For now, let's just clear the error if it's not a denial.
        setError(null);
      }
    }
  };

  const saveSettings = async (updates: Partial<UserSettings>) => {
    if (!user) return;
    const path = `users/${user.uid}`;

    console.log('Attempting to save settings:', updates);

    // 알림 시간이 바뀌면 UTC 변환값도 함께 저장 (서버 cron이 이 값으로 발송 대상 조회)
    if (updates.notificationTime) {
      const [h, m] = updates.notificationTime.split(':').map(Number);
      const local = new Date();
      local.setHours(h, m, 0, 0);
      updates.notificationTimeUTC = `${String(local.getUTCHours()).padStart(2,'0')}:${String(local.getUTCMinutes()).padStart(2,'0')}`;
    }

    // Optimistic update
    setSettings(prev => {
      const next = { ...prev, ...updates };
      console.log('Optimistic settings update:', next);
      return next;
    });

    if (updates.language) {
      i18n.changeLanguage(updates.language);
    }

    try {
      const firestoreUpdate = {
        ...updates,
        updatedAt: serverTimestamp()
      };
      await setDoc(doc(db, 'users', user.uid), firestoreUpdate, { merge: true });
      console.log('Settings successfully saved to Firestore');
    } catch (err) {
      console.error('Error saving settings to Firestore:', err);
      handleFirestoreError(err, OperationType.UPDATE, path, user);
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
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Error sharing:', err);
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
      // 1. Picsum Photos로 테마별 배경 이미지 가져오기 (무료, API 키 불필요)
      // 테마당 여러 seed를 정의해 매번 다른 배경이 나오도록 랜덤 선택
      const THEME_SEED_POOLS: Record<string, string[]> = {
        motivation:  ['mountain-peak', 'summit-climb', 'sunrise-trail', 'marathon-run', 'endurance-sport'],
        comfort:     ['calm-forest', 'cozy-morning', 'green-meadow', 'soft-rain', 'warm-cottage'],
        humor:       ['colorful-confetti', 'playful-balloons', 'bright-carnival', 'fun-festival', 'happy-dog'],
        success:     ['city-lights', 'trophy-gold', 'office-highrise', 'graduation-day', 'podium-winner'],
        business:    ['modern-office', 'boardroom-glass', 'city-skyline', 'laptop-desk', 'corporate-tower'],
        love:        ['golden-sunset', 'red-roses', 'romantic-evening', 'pink-blossom', 'heart-bokeh'],
        philosophy:  ['ancient-library', 'stone-archway', 'misty-lake', 'greek-temple', 'lone-lighthouse'],
        wisdom:      ['autumn-leaves', 'old-bookshelf', 'meditation-zen', 'owl-forest', 'wise-elder'],
        life:        ['nature-sky', 'spring-flowers', 'ocean-horizon', 'forest-path', 'starry-night'],
      };
      const seedPool = THEME_SEED_POOLS[quote.theme] ?? THEME_SEED_POOLS.life;
      const seed = seedPool[Math.floor(Math.random() * seedPool.length)];

      let base64Image = "";
      try {
        const imgResponse = await fetch(`https://picsum.photos/seed/${seed}/1024/1024`);
        if (imgResponse.ok) {
          const blob = await imgResponse.blob();
          base64Image = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const result = (reader.result as string).replace(/^data:[^;]+;base64,/, '');
              resolve(result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        }
      } catch (imgErr) {
        console.warn('[Card] Picsum fetch failed, using gradient fallback');
      }

      // 2. Create Canvas and Overlay Text
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      // Draw background
      if (base64Image) {
        const bgImg = new Image();
        bgImg.src = `data:image/png;base64,${base64Image}`;
        
        try {
          await new Promise((resolve, reject) => {
            bgImg.onload = resolve;
            bgImg.onerror = reject;
          });
          ctx.drawImage(bgImg, 0, 0, 1024, 1024);
        } catch (imgErr) {
          console.warn('[Card Debug] Fallback to gradient due to image load error:', imgErr);
          drawGradientBackground(ctx);
        }
      } else {
        console.log('[Card Debug] Using primary gradient background');
        drawGradientBackground(ctx);
      }

      function drawGradientBackground(context: CanvasRenderingContext2D) {
        const gradient = context.createLinearGradient(0, 0, 1024, 1024);
        // Beautiful vibrant gradient based on theme
        const colors: Record<string, string[]> = {
          'motivation': ['#6366f1', '#a855f7', '#ec4899'],
          'peace': ['#10b981', '#3b82f6', '#6366f1'],
          'love': ['#f43f5e', '#fb7185', '#fda4af'],
          'success': ['#f59e0b', '#ef4444', '#7c3aed']
        };
        const palette = colors[quote.theme] || ['#312e81', '#1e1b4b', '#000000'];
        gradient.addColorStop(0, palette[0]);
        if (palette[1]) gradient.addColorStop(0.5, palette[1]);
        gradient.addColorStop(1, palette[palette.length - 1]);
        context.fillStyle = gradient;
        context.fillRect(0, 0, 1024, 1024);
      }

      // Apply Style Settings
      const style = settings.preferredCardStyle || 'classic';
      
      // Overlay
      if (style === 'classic') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      } else if (style === 'modern') {
        const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
        ctx.fillStyle = gradient;
      } else if (style === 'minimal') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      } else if (style === 'bold') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      }
      ctx.fillRect(0, 0, 1024, 1024);

      // Text Settings
      ctx.fillStyle = style === 'minimal' ? 'white' : 'white';
      ctx.textAlign = style === 'modern' ? 'left' : 'center';
      ctx.textBaseline = 'middle';
      
      const fontSize = style === 'bold' ? 64 : 48;
      const fontName = style === 'classic' ? 'Georgia, serif' : '"Inter", sans-serif';
      const fontWeight = style === 'bold' ? '800' : '600';
      const fontStyle = style === 'classic' ? 'italic' : 'normal';
      
      ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontName}`;
      
      // Wrap text
      const maxWidth = style === 'modern' ? 700 : 800;
      const startX = style === 'modern' ? 100 : 512;
      const words = quote.text.split(' ');
      let line = '';
      const lines = [];
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      // Draw lines
      const totalHeight = lines.length * (fontSize + 20);
      let startY = (1024 - totalHeight) / 2;
      
      lines.forEach(l => {
        ctx.fillText(l.trim(), startX, startY);
        startY += fontSize + 20;
      });

      // Draw Author
      ctx.font = `${style === 'bold' ? '700' : '600'} 32px ${fontName}`;
      ctx.fillText(`— ${quote.author}`, startX, startY + 40);

      // 3. Save Final Image (Non-blocking background task)
      const finalImageUrl = canvas.toDataURL('image/jpeg', 0.8);
      
      if (quote.id && !quote.id.startsWith('temp-')) {
        const path = `users/${user.uid}/history/${quote.id}`;
        console.log('[Card Debug] Attempting background save for image...');
        setDoc(doc(db, 'users', user.uid, 'history', quote.id), { imageUrl: finalImageUrl }, { merge: true })
          .then(() => {
            console.log('[Firestore Success] Image URL updated.');
            setCurrentQuote(prev => prev?.id === quote.id ? { ...prev, imageUrl: finalImageUrl } : prev);
          })
          .catch(err => console.error('[Firestore Error] Image URL save failed:', err));
      }

      // 4. DOWNLOAD / SHARE IMMEDIATELY
      setIsGeneratingCard(false);
      if (Capacitor.isNativePlatform()) {
        const { Filesystem, Directory } = await import('@capacitor/filesystem');
        const { Share } = await import('@capacitor/share');
        const base64Data = finalImageUrl.replace(/^data:image\/jpeg;base64,/, '');
        const fileName = `quote-${quote.id || 'new'}.jpg`;
        await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Cache,
        });
        const { uri } = await Filesystem.getUri({ path: fileName, directory: Directory.Cache });
        try {
          await Share.share({ title: t('home.title'), url: uri, dialogTitle: t('home.title') });
        } catch {
          // 공유 시트 닫기/취소는 에러 아님 — 무시
        }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <RefreshCw className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-neutral-100"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-200">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{t('auth.welcome')}</h1>
          <p className="text-neutral-500 mb-10 leading-relaxed max-w-[280px] mx-auto">
            {t('auth.desc')}
          </p>
          <button 
            onClick={signInWithGoogle}
            className="w-full py-4 px-6 bg-indigo-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5 bg-white rounded-full p-0.5" alt="Google" />
            {t('auth.google_login')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <ErrorBoundary t={t}>
      <div className={`min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300 flex ${useSidebar ? 'flex-row-reverse' : 'flex-col'}`}>
      {/* Header */}
      <header className={`bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg sticky top-0 z-40 border-b border-neutral-100 dark:border-neutral-800 px-6 py-5 flex items-center justify-between ${useSidebar ? 'hidden' : 'w-full'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight leading-none bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Lumina
            </span>
            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-1">
              Daily Wisdom
            </span>
          </div>
        </div>
        <button onClick={logout} className="p-2.5 bg-neutral-50 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <main className={`flex-1 p-6 ${useSidebar ? 'mr-20' : 'pb-24'}`}>
        <div className={`${useSidebar ? 'max-w-6xl mx-auto' : 'max-w-md mx-auto'}`}>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`space-y-6 ${useSidebar ? 'grid grid-cols-2 gap-8 space-y-0' : ''}`}
            >
              {/* Quote Card */}
              <div className="relative bg-white dark:bg-neutral-900 rounded-[2rem] p-8 shadow-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden min-h-[400px] flex flex-col justify-center transition-colors">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                
                {currentQuote ? (
                  <div className="space-y-6">
                    <QuoteIcon className="w-10 h-10 text-indigo-100 dark:text-indigo-900/30 absolute top-8 left-8 -z-0" />
                    <div className="relative z-10">
                      <p className="text-2xl font-serif leading-snug text-neutral-800 dark:text-neutral-100 mb-4">
                        "{currentQuote.text}"
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-400 font-medium text-right">— {currentQuote.author}</p>
                    </div>
                    
                    <div className="pt-6 border-t border-neutral-50 dark:border-neutral-800">
                      <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">{t('home.ai_explanation')}</h4>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                        {currentQuote.explanation}
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col gap-2">
                      <button
                        onClick={() => generateQuoteCard(currentQuote)}
                        disabled={isGeneratingCard}
                        className="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 transition-all"
                      >
                        {isGeneratingCard ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                        {t('home.generate_card')}
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={generateQuote}
                          disabled={isGenerating}
                          className="flex-1 py-3 px-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-100 dark:border-neutral-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-50 transition-all"
                        >
                          <RefreshCw className={`w-4 h-4 text-indigo-600 dark:text-indigo-400 ${isGenerating ? 'animate-spin' : ''}`} />
                          {t('home.refresh')}
                        </button>
                        <button
                          onClick={() => handleShare(currentQuote)}
                          className="flex-1 py-3 px-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-100 dark:border-neutral-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t('share.button')}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto">
                      <Sparkles className="w-8 h-8 text-neutral-200 dark:text-neutral-700" />
                    </div>
                    <p className="text-neutral-400 dark:text-neutral-500">{t('home.no_quote')}</p>
                    <button 
                      onClick={generateQuote}
                      disabled={isGenerating}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {isGenerating ? t('common.loading') : t('home.generate_first')}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Notification Banner */}
                {!settings.isSubscribed && (
                  <div className="bg-indigo-600 rounded-2xl p-6 text-white flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-bold">{t('home.subscribe_title')}</h4>
                      <p className="text-xs text-indigo-100">{t('home.subscribe_desc')}</p>
                    </div>
                    <button 
                      onClick={handleSubscribe}
                      className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold shadow-sm"
                    >
                      {t('home.activate')}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`space-y-4 ${useSidebar ? 'grid grid-cols-2 gap-6 space-y-0' : ''}`}
            >
              <h2 className={`text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 ${useSidebar ? 'col-span-2' : ''}`}>{t('history.title')}</h2>
              {history.length === 0 ? (
                <div className={`text-center py-20 ${useSidebar ? 'col-span-2' : ''}`}>
                  <p className="text-neutral-400 dark:text-neutral-500">{t('history.no_history')}</p>
                </div>
              ) : (
                history.map((quote) => (
                  <div 
                    key={quote.id} 
                    className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">
                        {t(THEMES.find(t => t.id === quote.theme)?.labelKey || '')}
                      </span>
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                        {quote.createdAt instanceof Timestamp ? quote.createdAt.toDate().toLocaleDateString() : t('history.just_now')}
                      </span>
                    </div>
                    
                    {quote.imageUrl && (
                      <div className="space-y-2">
                        <div className="aspect-square rounded-xl overflow-hidden shadow-inner bg-neutral-100 dark:bg-neutral-800">
                          <img src={quote.imageUrl} alt="Quote Card" className="w-full h-full object-cover" />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (Capacitor.isNativePlatform()) {
                                import('@capacitor/filesystem').then(async ({ Filesystem, Directory }) => {
                                  const { Share } = await import('@capacitor/share');
                                  const res = await fetch(quote.imageUrl!);
                                  const blob = await res.blob();
                                  const reader = new FileReader();
                                  reader.onloadend = async () => {
                                    const base64Data = (reader.result as string).replace(/^data:image\/jpeg;base64,/, '');
                                    const fileName = `quote-${quote.id}.jpg`;
                                    await Filesystem.writeFile({ path: fileName, data: base64Data, directory: Directory.Cache });
                                    const { uri } = await Filesystem.getUri({ path: fileName, directory: Directory.Cache });
                                    try {
                                      await Share.share({ url: uri });
                                    } catch {
                                      // 공유 취소는 에러 아님
                                    }
                                  };
                                  reader.readAsDataURL(blob);
                                });
                              } else {
                                const link = document.createElement('a');
                                link.download = `quote-${quote.id}.jpg`;
                                link.href = quote.imageUrl!;
                                link.click();
                              }
                            }}
                            className="py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            <span className="text-[10px] font-semibold">{t('history.download')}</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(quote);
                            }}
                            className="py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-[10px] font-semibold">{t('share.button')}</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              generateQuoteCard(quote);
                            }}
                            className="py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span className="text-[10px] font-semibold">{t('history.regenerate')}</span>
                          </button>
                        </div>
                      </div>
                    )}

                    <div onClick={() => { setCurrentQuote(quote); setActiveTab('home'); }} className="cursor-pointer">
                      <p className="text-neutral-800 dark:text-neutral-200 font-medium line-clamp-2">"{quote.text}"</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">— {quote.author}</p>
                    </div>

                    {!quote.imageUrl && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          generateQuoteCard(quote);
                        }}
                        className="w-full py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors"
                      >
                        {t('home.generate_card')}
                      </button>
                    )}
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{t('settings.title')}</h2>

              {/* ─── 그룹 1: 알림 ─── */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{t('settings.section_notification')}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* 구독 상태 카드 */}
                  <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 p-4 flex flex-col gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${settings.isSubscribed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                      <Bell className={`w-5 h-5 ${settings.isSubscribed ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-neutral-800 dark:text-neutral-200 text-sm leading-tight">{settings.isSubscribed ? t('settings.enabled') : t('settings.disabled')}</p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 leading-snug">{settings.isSubscribed ? t('settings.enabled_desc') : t('settings.disabled_desc')}</p>
                    </div>
                    {!settings.isSubscribed && (
                      <button
                        onClick={handleSubscribe}
                        className="w-full py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-bold"
                      >
                        {t('settings.turn_on')}
                      </button>
                    )}
                  </div>
                  {/* 알림 시간 카드 */}
                  <button
                    onClick={() => {
                      const [h, m] = settings.notificationTime.split(':').map(Number);
                      setTempHour(h);
                      setTempMinute(m);
                      setShowTimePicker(true);
                    }}
                    className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 p-4 flex flex-col gap-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-neutral-800 dark:text-neutral-200 text-sm leading-tight">{t('settings.notification_time')}</p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 leading-snug">{t('settings.notification_desc')}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">{settings.notificationTime}</span>
                      <ChevronRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600" />
                    </div>
                  </button>
                </div>
              </section>

              {/* Time Picker Modal */}
              {showTimePicker && (
                <div className="fixed inset-0 z-50 flex items-end" onClick={() => setShowTimePicker(false)}>
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                  <div
                    className="relative w-full bg-white dark:bg-neutral-900 rounded-t-3xl px-6 pt-6 pb-10 space-y-6"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="w-10 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full mx-auto" />
                    <div className="flex items-center justify-between">
                      <button onClick={() => setShowTimePicker(false)} className="text-sm text-neutral-400 dark:text-neutral-500 font-semibold px-2 py-1">{t('common.cancel')}</button>
                      <h3 className="text-base font-extrabold text-neutral-900 dark:text-neutral-100">{t('settings.notification_time')}</h3>
                      <button
                        onClick={() => {
                          const time = `${String(tempHour).padStart(2,'0')}:${String(tempMinute).padStart(2,'0')}`;
                          saveSettings({ notificationTime: time });
                          setShowTimePicker(false);
                        }}
                        className="text-sm text-indigo-600 dark:text-indigo-400 font-bold px-2 py-1"
                      >{t('common.done')}</button>
                    </div>
                    <div className="flex items-center justify-center gap-3 py-2">
                      <div className="flex flex-col items-center gap-3">
                        <button onClick={() => setTempHour(h => (h + 1) % 24)} className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">▲</button>
                        <span className="text-6xl font-black text-neutral-900 dark:text-neutral-100 w-28 text-center tabular-nums">{String(tempHour).padStart(2,'0')}</span>
                        <button onClick={() => setTempHour(h => (h - 1 + 24) % 24)} className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">▼</button>
                        <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">시</p>
                      </div>
                      <span className="text-5xl font-black text-neutral-300 dark:text-neutral-600 mb-6">:</span>
                      <div className="flex flex-col items-center gap-3">
                        <button onClick={() => setTempMinute(m => (m + 5) % 60)} className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">▲</button>
                        <span className="text-6xl font-black text-neutral-900 dark:text-neutral-100 w-28 text-center tabular-nums">{String(tempMinute).padStart(2,'0')}</span>
                        <button onClick={() => setTempMinute(m => (m - 5 + 60) % 60)} className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">▼</button>
                        <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">분</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {['07:00','08:00','09:00','12:00','18:00','20:00','21:00','22:00'].map(t2 => (
                        <button
                          key={t2}
                          onClick={() => { const [h, m] = t2.split(':').map(Number); setTempHour(h); setTempMinute(m); }}
                          className={`py-2 rounded-xl text-sm font-bold transition-colors ${tempHour === parseInt(t2) && tempMinute === 0 ? 'bg-indigo-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}`}
                        >{t2}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── 그룹 2: 테마 ─── */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{t('settings.section_theme')}</h3>

                {/* 통합 테마 선택 (다중 선택) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">{t('preferredThemes.title')}</p>
                    <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">{t('preferredThemes.multi_hint')}</span>
                  </div>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 px-1">{t('preferredThemes.description')}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {THEMES.map((theme) => {
                      const isSelected = (settings.preferredThemes || []).includes(theme.id);
                      return (
                        <button
                          key={theme.id}
                          onClick={() => {
                            const current = settings.preferredThemes || ['motivation'];
                            const next = isSelected
                              ? current.filter(id => id !== theme.id)
                              : [...current, theme.id];
                            if (next.length > 0) saveSettings({ preferredThemes: next });
                          }}
                          className={`py-3 px-2 rounded-2xl border transition-all flex flex-col items-center gap-1.5 ${
                            isSelected
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                            : 'bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-indigo-200'
                          }`}
                        >
                          <span className="text-xl">{theme.icon}</span>
                          <span className="font-bold text-[10px]">{t(theme.labelKey)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 커스텀 키워드 */}
                <div className="space-y-2 pt-1">
                  <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 px-1">{t('settings.custom_keyword')}</p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 px-1">{t('settings.custom_keyword_desc')}</p>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={30}
                      value={settings.customKeyword || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        const BLOCKED = ['섹스','야동','포르노','sex','porn','nude','naked','씨발','개새끼','좆','보지','자지','fuck','shit'];
                        const isBlocked = BLOCKED.some(b => val.toLowerCase().includes(b));
                        if (!isBlocked) saveSettings({ customKeyword: val });
                      }}
                      placeholder={t('settings.custom_keyword_placeholder')}
                      className="w-full bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-indigo-400"
                    />
                    {settings.customKeyword && (
                      <button
                        onClick={() => saveSettings({ customKeyword: '' })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                      >✕</button>
                    )}
                  </div>
                </div>
              </section>

              {/* ─── 그룹 3: 외관 ─── */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{t('settings.section_appearance')}</h3>
                {/* 비주얼 테마 */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 px-1">{t('settings.visual_theme')}</p>
                  <div className="bg-white dark:bg-neutral-900 p-2 rounded-3xl border border-neutral-100 dark:border-neutral-800 grid grid-cols-4 gap-1">
                    <button onClick={() => saveSettings({ darkMode: 'light' })} className={`flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${settings.darkMode === 'light' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}>
                      <Sun className="w-5 h-5" />
                      <span className="text-[10px] font-bold leading-tight text-center px-1">{t('settings.light_mode')}</span>
                    </button>
                    <button onClick={() => saveSettings({ darkMode: 'dark' })} className={`flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${settings.darkMode === 'dark' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}>
                      <Moon className="w-5 h-5" />
                      <span className="text-[10px] font-bold leading-tight text-center px-1">{t('settings.dark_mode')}</span>
                    </button>
                    <button onClick={() => saveSettings({ darkMode: 'system' })} className={`flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${settings.darkMode === 'system' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}>
                      <Monitor className="w-5 h-5" />
                      <span className="text-[10px] font-bold leading-tight text-center px-1">{t('settings.system_mode')}</span>
                    </button>
                    <button onClick={() => saveSettings({ darkMode: 'material' })} className={`flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${settings.darkMode === 'material' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}>
                      <Palette className="w-5 h-5" />
                      <span className="text-[10px] font-bold leading-tight text-center px-1">{t('settings.material_mode')}</span>
                    </button>
                  </div>
                </div>
                {/* 카드 스타일 */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 px-1">{t('cardStyles.title')}</p>
                  <div className="bg-white dark:bg-neutral-900 p-2 rounded-3xl border border-neutral-100 dark:border-neutral-800 grid grid-cols-4 gap-1">
                    {CARD_STYLES.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => saveSettings({ preferredCardStyle: style.id })}
                        className={`py-3 px-1 rounded-2xl transition-all text-[10px] font-bold leading-tight text-center ${settings.preferredCardStyle === style.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
                      >
                        {t(style.labelKey)}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* ─── 그룹 4: 앱 설정 ─── */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{t('settings.section_app')}</h3>
                <div className="bg-white dark:bg-neutral-900 p-5 rounded-3xl border border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center">
                      <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500">{t('settings.language')}</p>
                      <p className="font-bold text-neutral-800 dark:text-neutral-200 text-sm">{LANGUAGES.find(l => l.id === settings.language)?.label}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => saveSettings({ language: lang.id })}
                        className={`py-2 px-4 rounded-xl text-sm font-medium border transition-colors ${
                          settings.language === lang.id
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-white dark:bg-neutral-800 border-neutral-100 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-indigo-200'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* ─── 그룹 5: 지원 ─── */}
              <section className="space-y-3 pb-4">
                <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{t('settings.section_support')}</h3>
                <button
                  onClick={async () => {
                    const url = 'https://ko-fi.com/jeiel85';
                    try {
                      const { Browser } = await import('@capacitor/browser');
                      await Browser.open({ url });
                    } catch {
                      window.open(url, '_blank');
                    }
                  }}
                  className="w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white p-5 rounded-3xl flex items-center justify-center gap-3 font-bold text-base shadow-lg shadow-orange-200 dark:shadow-none hover:from-amber-500 hover:to-orange-500 transition-all active:scale-95"
                >
                  <span className="text-2xl">☕</span>
                  {t('settings.buy_coffee')}
                </button>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-neutral-100 dark:border-neutral-800 z-50 transition-all ${
        useSidebar 
        ? 'right-0 top-0 h-full w-20 border-l flex-col py-10 px-0' 
        : 'bottom-0 left-0 w-full border-t px-6 py-4 flex-row'
      } flex items-center justify-around`}>
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400 dark:text-neutral-500'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">{t('common.home')}</span>
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'history' ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400 dark:text-neutral-500'}`}
        >
          <HistoryIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold">{t('common.history')}</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'settings' ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400 dark:text-neutral-500'}`}
        >
          <SettingsIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold">{t('common.settings')}</span>
        </button>
      </nav>

      {/* In-App Notification Toast (포그라운드 FCM 수신 시) */}
      <AnimatePresence>
        {inAppNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-4 right-4 bg-indigo-600 text-white p-4 rounded-2xl shadow-xl flex items-start gap-3 z-[60]"
          >
            <Bell className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-tight">{inAppNotification.title}</p>
              {inAppNotification.body && (
                <p className="text-xs text-white/80 mt-0.5 leading-snug line-clamp-3">{inAppNotification.body}</p>
              )}
            </div>
            <button onClick={() => setInAppNotification(null)} className="text-white/60 hover:text-white shrink-0">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Toast */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-6 right-6 bg-red-600 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 z-[60]"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto text-white/60 hover:text-white">
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </ErrorBoundary>
  );
}
