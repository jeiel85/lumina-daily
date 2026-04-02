import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  ActivityIndicator,
  Dimensions,
  Platform,
  Alert,
  StatusBar as RNStatusBar
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  RefreshCw, 
  Share2, 
  Sparkles,
  Quote as QuoteIcon,
  Settings as SettingsIcon,
  Check,
  Home,
  History as HistoryIcon,
  Clock
} from 'lucide-react-native';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

// Import our custom AI and Firebase logic
import { generateNativeQuote, generateNativeImage, Quote } from './src/lib/ai';
import { auth, db } from './src/config/firebase';
import { signInAnonymously } from 'firebase/auth';
import { 
  registerForPushNotificationsAsync, 
  scheduleDailyQuoteNotification,
  cancelAllNotifications 
} from './src/lib/notifications';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  limit, 
  onSnapshot 
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const TRANSLATIONS: any = {
  ko: {
    home: '홈', history: '기록', settings: '설정',
    refresh: '새 지혜', share: '카드 저장 및 공유',
    subscribe: '지혜 배달 신청', subscribed: '신청됨',
    explanation: '지혜의 깊이', authorSuffix: 'Lumina',
    wisdomDesc: '매일 당신을 채우는 지혜 한 조각',
    noHistory: '아직 저장된 지혜가 없습니다.',
    settingsTitle: '설정', theme: '테마', language: '언어',
    cat_motivation: '동기부여', cat_comfort: '위로', cat_humor: '유머', cat_success: '성공',
    cat_love: '사랑', cat_calm: '평온', cat_growth: '성장', cat_leadership: '리더십',
    loginAnonymously: '익명으로 시작하기',
    errorTitle: '오류', errorMsg: '지혜를 불러오지 못했습니다. 네트워크를 확인해 주세요.',
    loading: '지혜를 불러오는 중...',
    notificationTime: '매일 전하는 지혜', notificationDesc: '선택하신 시간에 지혜가 배달됩니다.'
  },
  en: {
    home: 'Home', history: 'History', settings: 'Settings',
    refresh: 'Refresh', share: 'Save & Share Card',
    subscribe: 'Get Daily Wisdom', subscribed: 'Subscribed',
    explanation: 'Depth of Wisdom', authorSuffix: 'Lumina',
    wisdomDesc: 'A piece of wisdom to fill your day',
    noHistory: 'No wisdom saved yet.',
    settingsTitle: 'Settings', theme: 'Theme', language: 'Language',
    cat_motivation: 'Motivation', cat_comfort: 'Comfort', cat_humor: 'Humor', cat_success: 'Success',
    cat_love: 'Love', cat_calm: 'Calm', cat_growth: 'Growth', cat_leadership: 'Leadership',
    loginAnonymously: 'Start Anonymously',
    errorTitle: 'Error', errorMsg: 'Failed to fetch wisdom. Please check network.',
    loading: 'Fetching wisdom...',
    notificationTime: 'Daily Wisdom', notificationDesc: 'Wisdom will be delivered at your time.'
  },
  ja: {
    home: 'ホーム', history: '履歴', settings: '設定',
    refresh: 'リフレッシュ', share: 'カード保存・共有',
    subscribe: '毎日智慧をお届け', subscribed: '購読中',
    explanation: '智慧の深み', authorSuffix: 'Lumina',
    wisdomDesc: 'あなたの毎日를彩る智慧のひとかけら',
    noHistory: '保存された智慧はありません。',
    settingsTitle: '設定', theme: 'テーマ', language: '言語',
    cat_motivation: 'モチベーション', cat_comfort: '癒やし', cat_humor: 'ユーモア', cat_success: '成功',
    cat_love: '愛', cat_calm: '静寂', cat_growth: '成長', cat_leadership: 'リーダーシップ',
    loginAnonymously: '匿名で開始する',
    errorTitle: 'エラー', errorMsg: '智慧の読み込みに失敗しました。',
    loading: '智慧を読み込み中...',
    notificationTime: '毎日の智慧', notificationDesc: '選択した時間に智慧をお届けします。'
  },
  zh: {
    home: '主页', history: '记录', settings: '设置',
    refresh: '更新智慧', share: '保存并分享',
    subscribe: '订阅每日智慧', subscribed: '已订阅',
    explanation: '智慧的深度', authorSuffix: 'Lumina',
    wisdomDesc: '填满你每一天的智慧碎片',
    noHistory: '尚无保存的智慧。',
    settingsTitle: '设置', theme: '主题', language: '语言',
    cat_motivation: '动力', cat_comfort: '安慰', cat_humor: '幽默', cat_success: '成功',
    cat_love: '爱', cat_calm: '平静', cat_growth: '成长', cat_leadership: '领导力',
    loginAnonymously: '匿名开始',
    errorTitle: '错误', errorMsg: '无法获取智慧。请检查网络。',
    loading: '获取智慧中...',
    notificationTime: '每日智慧', notificationDesc: '系统将在指定时间推送智慧。'
  }
};

const THEMES_LIST = [
  { id: 'motivation', icon: '🔥' },
  { id: 'comfort', icon: '🌿' },
  { id: 'humor', icon: '😄' },
  { id: 'success', icon: '🏆' },
  { id: 'love', icon: '❤️' },
  { id: 'calm', icon: '🧘' },
  { id: 'growth', icon: '🌱' },
  { id: 'leadership', icon: '👑' }
];

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'settings'>('home');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  const [history, setHistory] = useState<Quote[]>([]);
  const [theme, setTheme] = useState('motivation');
  const [language, setLanguage] = useState('ko');
  const viewRef = useRef(null);

  const t = (key: string) => TRANSLATIONS[language]?.[key] || key;

  // Auth Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (firebaseUser) {
        loadHistoryFromFirestore(firebaseUser.uid);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      loadSettings();
      checkNotificationStatus();
    }
  }, [user]);

  const loadSettings = async () => {
    const savedTheme = await AsyncStorage.getItem('@lumina_theme');
    const savedLang = await AsyncStorage.getItem('@lumina_lang');
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
  };

  const saveSetting = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  };

  const loadHistoryFromFirestore = async (uid: string) => {
    const historyRef = collection(db, 'users', uid, 'history');
    const q = query(historyRef, orderBy('createdAt', 'desc'), limit(20));
    return onSnapshot(q, (snapshot) => {
      const quotes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as unknown as Quote[];
      setHistory(quotes);
      if (quotes.length > 0 && !quote) setQuote(quotes[0]);
    });
  };

  const handleAnonymousLogin = async () => {
    setIsLoggingIn(true);
    try {
      await signInAnonymously(auth);
    } catch (error: any) {
      Alert.alert('로그인 실패', `익명 로그인에 실패했습니다. (코드: ${error.code})`);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => auth.signOut();

  const checkNotificationStatus = async () => {
    const saved = await AsyncStorage.getItem('@lumina_notified');
    setIsNotified(saved === 'true');
  };

  const toggleNotification = async () => {
    if (!isNotified) {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        await scheduleDailyQuoteNotification(8, 0, t('wisdomDesc'));
        setIsNotified(true);
        await AsyncStorage.setItem('@lumina_notified', 'true');
        Alert.alert(t('subscribed'), t('notificationDesc'));
      }
    } else {
      await cancelAllNotifications();
      setIsNotified(false);
      await AsyncStorage.setItem('@lumina_notified', 'false');
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const newQuoteData = await generateNativeQuote(theme, language);
      const base64Image = await generateNativeImage(theme);
      const finalQuote = {
        ...newQuoteData,
        imageUrl: base64Image ? `data:image/png;base64,${base64Image}` : undefined
      };
      setQuote(finalQuote);
      if (user) {
        await addDoc(collection(db, 'users', user.uid, 'history'), {
          ...finalQuote,
          createdAt: serverTimestamp(),
          theme
        });
      }
    } catch (error) {
      console.error(error);
      Alert.alert(t('errorTitle'), t('errorMsg'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveAndShare = async () => {
    if (!viewRef.current) return;
    setIsCapturing(true);
    try {
      const uri = await captureRef(viewRef, { format: 'jpg', quality: 0.9 });
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('Lumina', asset, false);
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          Alert.alert('Success', 'Saved to gallery.');
        }
      }
    } catch (error) {
      Alert.alert(t('errorTitle'), 'Failed to share card.');
    } finally {
      setIsCapturing(false);
    }
  };

  const renderBackground = () => {
    if (quote?.imageUrl) return <Image source={{ uri: quote.imageUrl }} style={StyleSheet.absoluteFill} />;
    return (
      <LinearGradient
        colors={['#6366f1', '#a855f7', '#ec4899']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center' }]}>
        <View style={styles.loginCard}>
          <View style={styles.loginIconContainer}>
            <Sparkles color="white" size={40} />
          </View>
          <Text style={styles.loginTitle}>Lumina</Text>
          <Text style={styles.loginSubtitle}>{t('wisdomDesc')}</Text>
          <TouchableOpacity 
            style={[styles.loginButton, isLoggingIn && { opacity: 0.7 }]} 
            onPress={handleAnonymousLogin}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? <ActivityIndicator color="white" /> : <Text style={styles.loginButtonText}>{t('loginAnonymously')}</Text>}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style={activeTab === 'home' ? 'light' : 'dark'} />
      <SafeAreaView style={[styles.header, activeTab !== 'home' && styles.headerBorder]}>
        <View style={styles.headerBrand}>
          <View style={styles.headerIconContainer}><Sparkles color="white" size={14} /></View>
          <View>
            <Text style={styles.headerTitle}>Lumina</Text>
            <Text style={styles.headerSubtitleText}>Wisdom for you</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <RefreshCw color="#94a3b8" size={18} />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.mainContent}>
        {activeTab === 'home' && (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <ViewShot ref={viewRef} style={isCapturing ? styles.cardContainerCapture : styles.cardContainerWrapper} options={{ format: 'jpg', quality: 0.9 }}>
              <View style={[styles.card, isCapturing && { borderRadius: 0 }]}>
                {renderBackground()}
                <View style={styles.overlay} />
                <View style={styles.cardContent}>
                  <QuoteIcon color="white" size={40} opacity={0.6} />
                  <Text style={styles.quoteText}>{quote?.text || t('loading')}</Text>
                  <Text style={styles.authorText}>— {quote?.author || t('authorSuffix')}</Text>
                  <View style={styles.explanationContainer}>
                    <Text style={styles.explanationTitle}>{t('explanation')}</Text>
                    <Text style={styles.explanationText}>{quote?.explanation || t('wisdomDesc')}</Text>
                  </View>
                </View>
              </View>
            </ViewShot>

            <View style={styles.actions}>
              <View style={styles.gridActions}>
                <TouchableOpacity style={styles.gridActionItem} onPress={handleGenerate} disabled={isGenerating}>
                  <RefreshCw color="#6366f1" size={24} style={isGenerating && { opacity: 0.5 }} />
                  <Text style={styles.gridActionLabel}>{t('refresh')}</Text>
                </TouchableOpacity>
                <View style={styles.gridActionItem}>
                  <Clock color="#a855f7" size={24} />
                  <Text style={styles.gridActionLabel}>{t('notificationTime')}</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.promoBanner, isNotified && styles.promoBannerActive]} onPress={toggleNotification}>
                <View>
                  <Text style={[styles.promoTitle, isNotified && { color: '#10b981' }]}>{t('subscribe')}</Text>
                  <Text style={[styles.promoSubtitle, isNotified && { color: '#64748b' }]}>{t('notificationDesc')}</Text>
                </View>
                <View style={[styles.promoButton, isNotified && styles.promoButtonActive]}>
                  {isNotified ? <Check color="#10b981" size={16} /> : <Text style={styles.promoButtonText}>OK</Text>}
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mainActionButton} onPress={handleSaveAndShare}>
                <Share2 color="white" size={20} />
                <Text style={styles.mainActionButtonText}>{t('share')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {activeTab === 'history' && (
          <ScrollView contentContainerStyle={styles.historyContent}>
            <Text style={styles.tabTitle}>{t('history')}</Text>
            {history.map((h, i) => (
              <TouchableOpacity key={i} style={styles.historyCard} onPress={() => { setQuote(h); setActiveTab('home'); }}>
                <Text style={styles.historyThemeTag}>{t('cat_' + h.theme)}</Text>
                <Text style={styles.historyText} numberOfLines={2}>"{h.text}"</Text>
                <Text style={styles.historyAuthor}>— {h.author}</Text>
              </TouchableOpacity>
            ))}
            {history.length === 0 && (
              <View style={styles.emptyContainer}>
                <HistoryIcon color="#cbd5e1" size={48} />
                <Text style={styles.emptyText}>{t('noHistory')}</Text>
              </View>
            )}
          </ScrollView>
        )}

        {activeTab === 'settings' && (
          <ScrollView contentContainerStyle={styles.settingsContent}>
            <Text style={styles.tabTitle}>{t('settingsTitle')}</Text>
            <View style={styles.settingSection}>
              <Text style={styles.settingSectionTitle}>{t('theme')}</Text>
              <View style={styles.themeGrid}>
                {THEMES_LIST.map(item => (
                  <TouchableOpacity key={item.id} style={[styles.themeItem, theme === item.id && styles.themeItemActive]} onPress={() => { setTheme(item.id); saveSetting('@lumina_theme', item.id); }}>
                    <Text style={styles.themeIcon}>{item.icon}</Text>
                    <Text style={[styles.themeLabel, theme === item.id && { color: 'white' }]}>{t('cat_' + item.id)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.settingSection}>
              <Text style={styles.settingSectionTitle}>{t('language')}</Text>
              <View style={styles.langList}>
                {['ko', 'en', 'ja', 'zh'].map(l => (
                  <TouchableOpacity key={l} style={[styles.langItem, language === l && styles.langItemActive]} onPress={() => { setLanguage(l); saveSetting('@lumina_lang', l); }}>
                    <Text style={[styles.langText, language === l && { color: 'white' }]}>{l === 'ko' ? '한국어' : l === 'en' ? 'English' : l === 'ja' ? '日本語' : '中文'}</Text>
                    {language === l && <Check color="white" size={16} />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
          <Home color={activeTab === 'home' ? '#6366f1' : '#94a3b8'} size={24} />
          <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>{t('home')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('history')}>
          <HistoryIcon color={activeTab === 'history' ? '#6366f1' : '#94a3b8'} size={24} />
          <Text style={[styles.navText, activeTab === 'history' && styles.navTextActive]}>{t('history')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('settings')}>
          <SettingsIcon color={activeTab === 'settings' ? '#6366f1' : '#94a3b8'} size={24} />
          <Text style={[styles.navText, activeTab === 'settings' && styles.navTextActive]}>{t('settings')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  mainContent: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 12,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  headerBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerBrand: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerIconContainer: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#6366f1', letterSpacing: -0.5 },
  headerSubtitleText: { fontSize: 9, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, marginTop: -2 },
  logoutButton: { padding: 8, borderRadius: 10, backgroundColor: '#F8FAFC' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 },
  cardContainerWrapper: {
    width: '100%',
    aspectRatio: 0.85,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20,
    elevation: 10,
  },
  cardContainerCapture: {
    width: '100%',
    aspectRatio: 0.85,
    backgroundColor: 'white',
  },
  card: { flex: 1, padding: 32, justifyContent: 'center', borderRadius: 32, overflow: 'hidden' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  cardContent: { width: '100%' },
  quoteText: { fontSize: 24, fontWeight: '700', color: 'white', lineHeight: 36, marginTop: 20 },
  authorText: { fontSize: 16, color: 'rgba(255, 255, 255, 0.8)', marginTop: 16, textAlign: 'right', fontStyle: 'italic' },
  explanationContainer: { marginTop: 32, paddingTop: 24, borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.2)' },
  explanationTitle: { fontSize: 12, fontWeight: '800', color: 'white', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, opacity: 0.7 },
  explanationText: { fontSize: 14, color: 'rgba(255, 255, 255, 0.9)', lineHeight: 22 },
  actions: { marginTop: 24, gap: 16 },
  gridActions: { flexDirection: 'row', gap: 12 },
  gridActionItem: { flex: 1, backgroundColor: 'white', borderRadius: 20, padding: 16, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#F1F5F9' },
  gridActionLabel: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  promoBanner: { backgroundColor: '#6366f1', borderRadius: 24, padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  promoBannerActive: { backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#10b981' },
  promoTitle: { color: 'white', fontSize: 15, fontWeight: '700' },
  promoSubtitle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 12, marginTop: 4 },
  promoButton: { backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  promoButtonActive: { backgroundColor: 'white', borderWidth: 1, borderColor: '#10b981' },
  promoButtonText: { color: '#6366f1', fontWeight: '800', fontSize: 13 },
  mainActionButton: { backgroundColor: '#6366f1', height: 64, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, shadowColor: '#6366f1', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12 },
  mainActionButtonText: { color: 'white', fontSize: 16, fontWeight: '700' },
  bottomNav: { flexDirection: 'row', height: 80, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingBottom: 20 },
  navItem: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 4 },
  navText: { fontSize: 10, fontWeight: '700', color: '#94a3b8' },
  navTextActive: { color: '#6366f1' },
  tabTitle: { fontSize: 28, fontWeight: '800', color: '#1e293b', marginBottom: 24, paddingHorizontal: 24 },
  historyContent: { paddingTop: 24, paddingBottom: 100 },
  historyCard: { backgroundColor: 'white', marginHorizontal: 24, marginBottom: 16, padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#F1F5F9' },
  historyThemeTag: { fontSize: 10, fontWeight: '800', color: '#6366f1', backgroundColor: '#EEF2FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', textTransform: 'uppercase', marginBottom: 12 },
  historyText: { fontSize: 16, fontWeight: '600', color: '#334155', lineHeight: 24 },
  historyAuthor: { fontSize: 13, color: '#94a3b8', marginTop: 12 },
  emptyContainer: { alignItems: 'center', marginTop: 100, gap: 16 },
  emptyText: { color: '#94a3b8', fontSize: 16, fontWeight: '600' },
  settingsContent: { paddingTop: 24, paddingBottom: 100 },
  settingSection: { marginBottom: 32, paddingHorizontal: 24 },
  settingSectionTitle: { fontSize: 12, fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16 },
  themeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  themeItem: { width: (width - 60) / 2, backgroundColor: 'white', padding: 20, borderRadius: 24, alignItems: 'center', gap: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  themeItemActive: { backgroundColor: '#6366f1', borderColor: '#6366f1' },
  themeIcon: { fontSize: 24 },
  themeLabel: { fontSize: 14, fontWeight: '700', color: '#475569' },
  langList: { backgroundColor: 'white', borderRadius: 24, padding: 8, borderWidth: 1, borderColor: '#F1F5F9' },
  langItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 16 },
  langItemActive: { backgroundColor: '#6366f1' },
  langText: { fontSize: 15, fontWeight: '600', color: '#475569' },
  loginCard: { padding: 32, alignItems: 'center' },
  loginIconContainer: { width: 80, height: 80, borderRadius: 24, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center', marginBottom: 24, shadowColor: '#6366f1', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
  loginTitle: { fontSize: 32, fontWeight: '900', color: '#1e293b' },
  loginSubtitle: { fontSize: 16, color: '#94a3b8', marginTop: 8, textAlign: 'center' },
  loginButton: { backgroundColor: '#6366f1', width: '100%', height: 56, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  loginButtonText: { color: 'white', fontSize: 16, fontWeight: '700' },
  logoutButton: { padding: 8, borderRadius: 10, backgroundColor: '#F8FAFC' }
});
