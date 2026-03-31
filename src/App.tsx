/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
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
  Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  auth, 
  db, 
  signInWithGoogle, 
  logout, 
  requestNotificationPermission,
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
  theme: string;
  preferredThemes: string[];
  preferredCardStyle: string;
  isSubscribed: boolean;
  language: string;
  darkMode: 'light' | 'dark' | 'system' | 'material';
  fcmToken?: string;
  role: string;
  updatedAt?: any;
}

const THEMES = [
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
    theme: 'motivation',
    preferredThemes: ['motivation'],
    preferredCardStyle: 'classic',
    isSubscribed: false,
    language: 'ko',
    darkMode: 'system',
    role: 'client'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
              theme: data.theme || 'motivation',
              preferredThemes: data.preferredThemes || ['motivation'],
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
              theme: 'motivation',
              preferredThemes: ['motivation'],
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
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      setError(t('common.error_api_key_missing'));
      setIsGenerating(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const themeLabel = THEMES.find(t => t.id === settings.theme)?.labelKey || 'theme_motivation';
      const prompt = `테마: ${t(themeLabel)}. 다음 JSON 형식으로 응답하세요: { "text": "명언 내용", "author": "저자 이름", "explanation": "해설 내용" }`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          systemInstruction: `당신은 세계 최고의 동기부여 전문가이자 작가입니다. 사용자가 선택한 테마에 맞춰 깊은 통찰력을 담은 명언과 그에 대한 따뜻한 해설을 제공하세요. 모든 응답은 반드시 '${i18n.language}' 언어로 작성해야 합니다.`,
          responseMimeType: "application/json",
        },
      });

      if (!response.text) {
        throw new Error('Empty response from AI');
      }

      const data = JSON.parse(response.text);
      
      const newQuote: Omit<Quote, 'id'> = {
        ...data,
        theme: settings.theme,
        createdAt: serverTimestamp(),
        uid: user.uid
      };

      // Save to Firestore
      const path = `users/${user.uid}/history`;
      try {
        const docRef = await addDoc(collection(db, 'users', user.uid, 'history'), newQuote);
        setCurrentQuote({ ...newQuote, id: docRef.id } as Quote);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, path, user);
      }
    } catch (err) {
      console.error('Error generating quote:', err);
      setError(t('common.error_generating_quote'));
    } finally {
      setIsGenerating(false);
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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      setError(t('common.error_api_key_missing'));
      setIsGeneratingCard(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      // 1. Generate Background Image with Gemini
      const imagePrompt = `A high-quality, artistic, and atmospheric background image reflecting the theme: "${quote.theme}". The image should be suitable as a background for a quote card. Style: Minimalist, elegant, and inspiring. No text in the image.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: imagePrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          }
        }
      });

      let base64Image = "";
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          base64Image = part.inlineData.data;
          break;
        }
      }

      if (!base64Image) {
        throw new Error('Failed to generate background image');
      }

      // 2. Create Canvas and Overlay Text
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      const bgImg = new Image();
      bgImg.src = `data:image/png;base64,${base64Image}`;
      
      await new Promise((resolve, reject) => {
        bgImg.onload = resolve;
        bgImg.onerror = reject;
      });

      // Draw background
      ctx.drawImage(bgImg, 0, 0, 1024, 1024);

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

      // 3. Save Final Image to Firestore
      const finalImageUrl = canvas.toDataURL('image/jpeg', 0.8);
      
      if (quote.id) {
        const path = `users/${user.uid}/history/${quote.id}`;
        try {
          await setDoc(doc(db, 'users', user.uid, 'history', quote.id), { imageUrl: finalImageUrl }, { merge: true });
          setCurrentQuote(prev => prev?.id === quote.id ? { ...prev, imageUrl: finalImageUrl } : prev);
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, path, user);
        }
      }

      // 4. Download Image
      const link = document.createElement('a');
      link.download = `quote-${quote.id || 'new'}.jpg`;
      link.href = finalImageUrl;
      link.click();

    } catch (err) {
      console.error('Error generating quote card:', err);
      setError(t('common.error'));
    } finally {
      setIsGeneratingCard(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <RefreshCw className="w-8 h-8 animate-spin text-indigo-600" />
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

                    <div className="pt-4 flex gap-2">
                      <button 
                        onClick={() => generateQuoteCard(currentQuote)}
                        disabled={isGeneratingCard}
                        className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 transition-all"
                      >
                        {isGeneratingCard ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                        {t('home.generate_card')}
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
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={generateQuote}
                    disabled={isGenerating}
                    className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 flex flex-col items-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <RefreshCw className={`w-6 h-6 text-indigo-600 dark:text-indigo-400 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">{t('home.refresh')}</span>
                  </button>
                  <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 flex flex-col items-center gap-2">
                    <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">{t('home.notification_at', { time: settings.notificationTime })}</span>
                  </div>
                </div>

                {/* Ad Placeholder */}
                <div className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-4 border border-dashed border-neutral-300 dark:border-neutral-700 flex flex-col items-center justify-center min-h-[100px] text-neutral-400 dark:text-neutral-600">
                  <p className="text-[10px] uppercase font-bold tracking-widest mb-1">Advertisement</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Sponsor Area</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>

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
                      <div className="relative aspect-square rounded-xl overflow-hidden shadow-inner bg-neutral-100 dark:bg-neutral-800">
                        <img src={quote.imageUrl} alt="Quote Card" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const link = document.createElement('a');
                              link.download = `quote-${quote.id}.jpg`;
                              link.href = quote.imageUrl!;
                              link.click();
                            }}
                            className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-neutral-900 hover:scale-110 transition-transform"
                            title={t('history.download')}
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(quote);
                            }}
                            className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-neutral-900 hover:scale-110 transition-transform"
                            title={t('share.button')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              generateQuoteCard(quote);
                            }}
                            className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-neutral-900 hover:scale-110 transition-transform"
                            title={t('history.regenerate')}
                          >
                            <RefreshCw className="w-4 h-4" />
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
              
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{t('settings.notification_time')}</h3>
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-800 dark:text-neutral-200">{settings.notificationTime}</p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500">{t('settings.notification_desc')}</p>
                    </div>
                  </div>
                  <input 
                    type="time" 
                    value={settings.notificationTime}
                    onChange={(e) => saveSettings({ notificationTime: e.target.value })}
                    className="w-12 h-12 opacity-0 absolute right-12 cursor-pointer"
                  />
                  <ChevronRight className="w-5 h-5 text-neutral-300 dark:text-neutral-600" />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{t('settings.visual_theme')}</h3>
                <div className="bg-white dark:bg-neutral-900 p-2 rounded-3xl border border-neutral-100 dark:border-neutral-800 grid grid-cols-4 gap-1">
                  <button 
                    onClick={() => saveSettings({ darkMode: 'light' })}
                    className={`flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${settings.darkMode === 'light' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
                  >
                    <Sun className="w-5 h-5" />
                    <span className="text-[10px] font-bold">{t('settings.light_mode')}</span>
                  </button>
                  <button 
                    onClick={() => saveSettings({ darkMode: 'dark' })}
                    className={`flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${settings.darkMode === 'dark' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
                  >
                    <Moon className="w-5 h-5" />
                    <span className="text-[10px] font-bold">{t('settings.dark_mode')}</span>
                  </button>
                  <button 
                    onClick={() => saveSettings({ darkMode: 'system' })}
                    className={`flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${settings.darkMode === 'system' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
                  >
                    <Monitor className="w-5 h-5" />
                    <span className="text-[10px] font-bold">{t('settings.system_mode')}</span>
                  </button>
                  <button 
                    onClick={() => saveSettings({ darkMode: 'material' })}
                    className={`flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${settings.darkMode === 'material' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
                  >
                    <Palette className="w-5 h-5" />
                    <span className="text-[10px] font-bold">{t('settings.material_mode')}</span>
                  </button>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{t('settings.language')}</h3>
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-800 dark:text-neutral-200">{LANGUAGES.find(l => l.id === settings.language)?.label}</p>
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

              <section className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{t('cardStyles.title')}</h3>
                <div className="bg-white dark:bg-neutral-900 p-2 rounded-3xl border border-neutral-100 dark:border-neutral-800 grid grid-cols-2 gap-1">
                  {CARD_STYLES.map((style) => (
                    <button 
                      key={style.id}
                      onClick={() => saveSettings({ preferredCardStyle: style.id })}
                      className={`py-3 rounded-2xl transition-all text-xs font-bold ${settings.preferredCardStyle === style.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
                    >
                      {t(style.labelKey)}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{t('preferredThemes.title')}</h3>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">{t('preferredThemes.description')}</p>
                <div className="grid grid-cols-3 gap-2">
                  {THEMES.map((theme) => {
                    const isSelected = (settings.preferredThemes || []).includes(theme.id);
                    return (
                      <button
                        key={theme.id}
                        onClick={() => {
                          const currentThemes = settings.preferredThemes || ['motivation'];
                          const isCurrentlySelected = currentThemes.includes(theme.id);
                          const newThemes = isCurrentlySelected 
                            ? currentThemes.filter(id => id !== theme.id)
                            : [...currentThemes, theme.id];
                          
                          if (newThemes.length > 0) {
                            saveSettings({ preferredThemes: newThemes });
                          }
                        }}
                        className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1 ${
                          isSelected 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                          : 'bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-indigo-200'
                        }`}
                      >
                        <span className="text-lg">{theme.icon}</span>
                        <span className="font-bold text-[10px]">{t(theme.labelKey)}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{t('settings.theme')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => saveSettings({ theme: theme.id })}
                      className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 ${
                        settings.theme === theme.id 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' 
                        : 'bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-indigo-200'
                      }`}
                    >
                      <span className="text-2xl">{theme.icon}</span>
                      <span className="font-bold text-sm">{t(theme.labelKey)}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{t('settings.status')}</h3>
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${settings.isSubscribed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                      <Bell className={`w-6 h-6 ${settings.isSubscribed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-800 dark:text-neutral-200">{settings.isSubscribed ? t('settings.enabled') : t('settings.disabled')}</p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500">{t('settings.status_desc')}</p>
                    </div>
                  </div>
                  {!settings.isSubscribed && (
                    <button 
                      onClick={handleSubscribe}
                      className="text-indigo-600 dark:text-indigo-400 font-bold text-sm"
                    >
                      {t('settings.turn_on')}
                    </button>
                  )}
                </div>
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
