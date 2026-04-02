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
  StatusBar as RNStatusBar,
  Modal
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
  Clock,
  LogIn,
  LogOut,
  Palette
} from 'lucide-react-native';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import DateTimePicker from '@react-native-community/datetimepicker';

// Import our custom AI and Firebase logic
import { generateNativeQuote, generateNativeImage, Quote } from './src/lib/ai';
import { auth, db } from './src/config/firebase';
import { signInAnonymously, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithCredential } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
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

const APP_THEMES: any = {
  deepsea: { colors: ['#0f172a', '#1e293b', '#334155'], text: 'white', light: false },
  sunset: { colors: ['#450a0a', '#7c2d12', '#9a3412'], text: 'white', light: false },
  forest: { colors: ['#064e3b', '#065f46', '#047857'], text: 'white', light: false },
  midnight: { colors: ['#000000', '#111827', '#1f2937'], text: 'white', light: false },
  standard: { colors: ['#6366f1', '#a855f7', '#ec4899'], text: 'white', light: false },
  lavender: { colors: ['#4c1d95', '#5b21b6', '#6d28d9'], text: 'white', light: false },
  ivory: { colors: ['#ffffff', '#f8fafc', '#f1f5f9'], text: '#1e293b', light: true },
  ocean: { colors: ['#0369a1', '#0284c7', '#0ea5e9'], text: 'white', light: false },
};

const TRANSLATIONS: any = {
  ko: {
    home: '홈', history: '기록', settings: '설정',
    refresh: '새 지혜', share: '카드 저장 및 공유',
    subscribe: '지혜 배달 신청', subscribed: '신청됨',
    explanation: '지혜의 깊이', authorSuffix: 'Lumina',
    wisdomDesc: '매일 당신을 채우는 지혜 한 조각',
    noHistory: '아직 저장된 지혜가 없습니다.',
    settingsTitle: '설정', category: '카테고리', language: '언어', appTheme: '앱 테마',
    cat_motivation: '동기부여', cat_comfort: '위로', cat_humor: '유머', cat_success: '성공',
    cat_love: '사랑', cat_calm: '평온', cat_growth: '성장', cat_leadership: '리더십',
    loginAnonymously: '익명으로 시작하기', loginGoogle: '구글로 계속하기', logout: '로그아웃',
    errorTitle: '오류', errorMsg: '네트워크 환경이나 API 설정을 확인해 주세요.',
    loading: '지혜를 불러오는 중...',
    notificationTime: '배달 시간 설정', notificationDesc: '선택하신 시간에 지혜가 배달됩니다.'
  },
  en: {
    home: 'Home', history: 'History', settings: 'Settings',
    refresh: 'Refresh', share: 'Save & Share',
    subscribe: 'Daily Wisdom', subscribed: 'Subscribed',
    explanation: 'Depth of Wisdom', authorSuffix: 'Lumina',
    wisdomDesc: 'A piece of wisdom for your day',
    noHistory: 'No history yet.',
    settingsTitle: 'Settings', category: 'Category', language: 'Language', appTheme: 'App Theme',
    cat_motivation: 'Motivation', cat_comfort: 'Comfort', cat_humor: 'Humor', cat_success: 'Success',
    cat_love: 'Love', cat_calm: 'Calm', cat_growth: 'Growth', cat_leadership: 'Leadership',
    loginAnonymously: 'Start Anonymously', loginGoogle: 'Sign in with Google', logout: 'Log Out',
    errorTitle: 'Error', errorMsg: 'Check network or API settings.',
    loading: 'Fetching wisdom...',
    notificationTime: 'Notification Time', notificationDesc: 'Wisdom delivered at your time.'
  }
};

const THEMES_LIST = [
  { id: 'motivation', icon: '🔥' }, { id: 'comfort', icon: '🌿' },
  { id: 'humor', icon: '😄' }, { id: 'success', icon: '🏆' },
  { id: 'love', icon: '❤️' }, { id: 'calm', icon: '🧘' },
  { id: 'growth', icon: '🌱' }, { id: 'leadership', icon: '👑' }
];

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'settings'>('home');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  const [history, setHistory] = useState<Quote[]>([]);
  const [theme, setTheme] = useState('motivation'); // Content theme
  const [appTheme, setAppTheme] = useState('standard'); // App overall theme
  const [language, setLanguage] = useState('ko');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [notifTime, setNotifTime] = useState(new Date());

  const viewRef = useRef(null);
  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;

  // Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "YOUR_ANDROID_CLIENT_ID", // 실제 ID로 대체 필요
    iosClientId: "YOUR_IOS_CLIENT_ID",
    webClientId: "YOUR_WEB_CLIENT_ID",
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (firebaseUser) loadHistoryFromFirestore(firebaseUser.uid);
    });
    loadSettings();
    return unsubscribe;
  }, []);

  const loadSettings = async () => {
    const savedTheme = await AsyncStorage.getItem('@lumina_theme');
    const savedAppTheme = await AsyncStorage.getItem('@lumina_app_theme');
    const savedLang = await AsyncStorage.getItem('@lumina_lang');
    const savedNotif = await AsyncStorage.getItem('@lumina_notified');
    if (savedTheme) setTheme(savedTheme);
    if (savedAppTheme) setAppTheme(savedAppTheme);
    if (savedLang) setLanguage(savedLang);
    setIsNotified(savedNotif === 'true');
  };

  const saveSetting = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  };

  const loadHistoryFromFirestore = (uid: string) => {
    const historyRef = collection(db, 'users', uid, 'history');
    const q = query(historyRef, orderBy('createdAt', 'desc'), limit(30));
    return onSnapshot(q, (snapshot) => {
      setHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any);
    });
  };

  const handleTimeChange = async (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setNotifTime(selectedDate);
      await scheduleDailyQuoteNotification(selectedDate.getHours(), selectedDate.getMinutes(), quote?.text || t('wisdomDesc'));
      setIsNotified(true);
      await AsyncStorage.setItem('@lumina_notified', 'true');
      Alert.alert(t('subscribed'), `${selectedDate.getHours()}:${selectedDate.getMinutes().toString().padStart(2, '0')}에 배달됨니다.`);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const newQuoteData = await generateNativeQuote(theme, language);
      const base64Image = await generateNativeImage(theme);
      const finalQuote = { ...newQuoteData, imageUrl: base64Image ? `data:image/png;base64,${base64Image}` : undefined };
      setQuote(finalQuote);
      if (user) {
        await addDoc(collection(db, 'users', user.uid, 'history'), { ...finalQuote, createdAt: serverTimestamp(), theme });
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
    setTimeout(async () => {
      try {
        const uri = await captureRef(viewRef, { format: 'jpg', quality: 0.9 });
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
          const asset = await MediaLibrary.createAssetAsync(uri);
          await MediaLibrary.createAlbumAsync('Lumina', asset, false);
          if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(uri);
        }
      } catch (error) {
        Alert.alert(t('errorTitle'), 'Capture failed.');
      } finally {
        setIsCapturing(false);
      }
    }, 100);
  };

  const renderBackground = () => {
    if (quote?.imageUrl) return <Image source={{ uri: quote.imageUrl }} style={StyleSheet.absoluteFill} />;
    return (
      <LinearGradient
        colors={APP_THEMES[appTheme].colors}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    );
  };

  if (loading) return <View style={styles.loadingFull}><ActivityIndicator size="large" color="#6366f1" /></View>;

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', backgroundColor: '#F8FAFC' }]}>
        <View style={styles.loginCard}>
          <View style={styles.loginIconContainer}><Sparkles color="white" size={40} /></View>
          <Text style={styles.loginTitle}>Lumina</Text>
          <Text style={styles.loginSubtitle}>{t('wisdomDesc')}</Text>
          <TouchableOpacity style={styles.loginButton} onPress={() => signInAnonymously(auth)}>
            <LogIn color="white" size={20} /><Text style={styles.loginButtonText}>{t('loginAnonymously')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.loginButton, { backgroundColor: '#ea4335', marginTop: 12 }]} onPress={() => promptAsync()}>
            <LogIn color="white" size={20} /><Text style={styles.loginButtonText}>{t('loginGoogle')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style={APP_THEMES[appTheme].light ? 'dark' : 'light'} />
      <SafeAreaView style={[styles.header, { backgroundColor: APP_THEMES[appTheme].light ? 'white' : '#1e293b' }]}>
        <View style={styles.headerBrand}>
          <View style={[styles.headerIconContainer, { backgroundColor: APP_THEMES[appTheme].colors[0] }]}><Sparkles color="white" size={14} /></View>
          <View>
            <Text style={[styles.headerTitle, { color: APP_THEMES[appTheme].colors[0] }]}>Lumina</Text>
            <Text style={styles.headerSubtitleText}>Wisdom for you</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => auth.signOut()}>
            <LogOut color="#94a3b8" size={18} />
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
                  <RefreshCw color={APP_THEMES[appTheme].colors[0]} size={24} style={isGenerating && { opacity: 0.5 }} />
                  <Text style={styles.gridActionLabel}>{t('refresh')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridActionItem} onPress={() => setShowTimePicker(true)}>
                  <Clock color="#a855f7" size={24} />
                  <Text style={styles.gridActionLabel}>{t('notificationTime')}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={[styles.promoBanner, isNotified && styles.promoBannerActive, { backgroundColor: APP_THEMES[appTheme].colors[0] }]} onPress={() => setShowTimePicker(true)}>
                <View>
                  <Text style={[styles.promoTitle, isNotified && { color: '#10b981' }]}>{t('subscribe')}</Text>
                  <Text style={[styles.promoSubtitle, isNotified && { color: '#64748b' }]}>{t('notificationDesc')}</Text>
                </View>
                <View style={[styles.promoButton, isNotified && styles.promoButtonActive]}>
                  {isNotified ? <Check color="#10b981" size={16} /> : <Text style={styles.promoButtonText}>SET</Text>}
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.mainActionButton, { backgroundColor: APP_THEMES[appTheme].colors[0] }]} onPress={handleSaveAndShare}>
                <Share2 color="white" size={20} />
                <Text style={styles.mainActionButtonText}>{t('share')}</Text>
              </TouchableOpacity>
            </View>

            {showTimePicker && (
              <DateTimePicker value={notifTime} mode="time" is24Hour={true} onChange={handleTimeChange} />
            )}
          </ScrollView>
        )}

        {activeTab === 'history' && (
          <ScrollView contentContainerStyle={styles.historyContent}>
            <Text style={styles.tabTitle}>{t('history')}</Text>
            {history.map((h, i) => (
              <TouchableOpacity key={i} style={styles.historyCard} onPress={() => { setQuote(h); setActiveTab('home'); }}>
                <Text style={[styles.historyThemeTag, { backgroundColor: APP_THEMES[appTheme].colors[0] + '20', color: APP_THEMES[appTheme].colors[0] }]}>{t('cat_' + h.theme)}</Text>
                <Text style={styles.historyText} numberOfLines={2}>"{h.text}"</Text>
                <Text style={styles.historyAuthor}>— {h.author}</Text>
              </TouchableOpacity>
            ))}
            {history.length === 0 && <View style={styles.emptyContainer}><HistoryIcon color="#cbd5e1" size={48} /><Text style={styles.emptyText}>{t('noHistory')}</Text></View>}
          </ScrollView>
        )}

        {activeTab === 'settings' && (
          <ScrollView contentContainerStyle={styles.settingsContent}>
            <Text style={styles.tabTitle}>{t('settingsTitle')}</Text>
            
            <View style={styles.settingSection}>
              <Text style={styles.settingSectionTitle}>{t('category')}</Text>
              <View style={styles.themeGrid}>
                {THEMES_LIST.map(item => (
                  <TouchableOpacity key={item.id} style={[styles.themeItem, theme === item.id && { backgroundColor: APP_THEMES[appTheme].colors[0] }]} onPress={() => { setTheme(item.id); saveSetting('@lumina_theme', item.id); }}>
                    <Text style={styles.themeIcon}>{item.icon}</Text>
                    <Text style={[styles.themeLabel, theme === item.id && { color: 'white' }]}>{t('cat_' + item.id)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.settingSection}>
              <Text style={styles.settingSectionTitle}>{t('appTheme')}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                {Object.keys(APP_THEMES).map(id => (
                  <TouchableOpacity 
                    key={id} 
                    style={[styles.appThemeItem, appTheme === id && styles.appThemeItemActive]}
                    onPress={() => { setAppTheme(id); saveSetting('@lumina_app_theme', id); }}
                  >
                    <LinearGradient colors={APP_THEMES[id].colors} style={styles.appThemePreview} />
                    <Text style={styles.appThemeLabel}>{id.toUpperCase()}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.settingSection}>
              <Text style={styles.settingSectionTitle}>{t('language')}</Text>
              <View style={styles.langList}>
                {['ko', 'en'].map(l => (
                  <TouchableOpacity key={l} style={[styles.langItem, language === l && { backgroundColor: APP_THEMES[appTheme].colors[0] }]} onPress={() => { setLanguage(l); saveSetting('@lumina_lang', l); }}>
                    <Text style={[styles.langText, language === l && { color: 'white' }]}>{l === 'ko' ? '한국어' : 'English'}</Text>
                    {language === l && <Check color="white" size={16} />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </View>

      <View style={styles.bottomNav}>
        {[ { id: 'home', icon: Home, label: 'home' }, { id: 'history', icon: HistoryIcon, label: 'history' }, { id: 'settings', icon: SettingsIcon, label: 'settings' } ].map(nav => (
          <TouchableOpacity key={nav.id} style={styles.navItem} onPress={() => setActiveTab(nav.id as any)}>
            <nav.icon color={activeTab === nav.id ? APP_THEMES[appTheme].colors[0] : '#94a3b8'} size={24} />
            <Text style={[styles.navText, activeTab === nav.id && { color: APP_THEMES[appTheme].colors[0] }]}>{t(nav.label)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  loadingFull: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mainContent: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? 40 : 12, paddingBottom: 20 },
  headerBrand: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerIconContainer: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  headerSubtitleText: { fontSize: 9, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, marginTop: -2 },
  logoutButton: { padding: 8, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.05)' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 },
  cardContainerWrapper: { width: '100%', aspectRatio: 0.82, borderRadius: 32, overflow: 'hidden', backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 12 },
  cardContainerCapture: { width: '100%', aspectRatio: 0.82, backgroundColor: 'white' },
  card: { flex: 1, padding: 32, justifyContent: 'center', borderRadius: 32, overflow: 'hidden' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.3)' },
  cardContent: { width: '100%' },
  quoteText: { fontSize: 24, fontWeight: '700', color: 'white', lineHeight: 36, marginTop: 20 },
  authorText: { fontSize: 16, color: 'rgba(255, 255, 255, 0.8)', marginTop: 16, textAlign: 'right', fontStyle: 'italic' },
  explanationContainer: { marginTop: 32, paddingTop: 24, borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.2)' },
  explanationTitle: { fontSize: 12, fontWeight: '800', color: 'white', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, opacity: 0.7 },
  explanationText: { fontSize: 14, color: 'rgba(255, 255, 255, 0.9)', lineHeight: 22 },
  actions: { marginTop: 24, gap: 16 },
  gridActions: { flexDirection: 'row', gap: 12 },
  gridActionItem: { flex: 1, backgroundColor: 'white', borderRadius: 20, padding: 18, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#F1F5F9' },
  gridActionLabel: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  promoBanner: { borderRadius: 24, padding: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  promoBannerActive: { backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#10b981' },
  promoTitle: { color: 'white', fontSize: 15, fontWeight: '700' },
  promoSubtitle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 12, marginTop: 4 },
  promoButton: { backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  promoButtonActive: { backgroundColor: 'white', borderWidth: 1, borderColor: '#10b981' },
  promoButtonText: { color: '#6366f1', fontWeight: '800', fontSize: 13 },
  mainActionButton: { height: 64, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12 },
  mainActionButtonText: { color: 'white', fontSize: 16, fontWeight: '700' },
  bottomNav: { flexDirection: 'row', height: 80, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingBottom: 20 },
  navItem: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 4 },
  navText: { fontSize: 10, fontWeight: '700', color: '#94a3b8' },
  tabTitle: { fontSize: 28, fontWeight: '800', color: '#1e293b', marginBottom: 24, paddingHorizontal: 24 },
  historyContent: { paddingTop: 24, paddingBottom: 100 },
  historyCard: { backgroundColor: 'white', marginHorizontal: 24, marginBottom: 16, padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#F1F5F9' },
  historyThemeTag: { fontSize: 10, fontWeight: '800', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', textTransform: 'uppercase', marginBottom: 12 },
  historyText: { fontSize: 16, fontWeight: '600', color: '#334155', lineHeight: 24 },
  historyAuthor: { fontSize: 13, color: '#94a3b8', marginTop: 12 },
  emptyContainer: { alignItems: 'center', marginTop: 100, gap: 16 },
  emptyText: { color: '#94a3b8', fontSize: 16, fontWeight: '600' },
  settingsContent: { paddingTop: 24, paddingBottom: 100 },
  settingSection: { marginBottom: 32, paddingHorizontal: 24 },
  settingSectionTitle: { fontSize: 12, fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16 },
  themeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  themeItem: { width: (width - 60) / 2, backgroundColor: 'white', padding: 20, borderRadius: 24, alignItems: 'center', gap: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  themeIcon: { fontSize: 24 },
  themeLabel: { fontSize: 14, fontWeight: '700', color: '#475569' },
  horizontalScroll: { flexDirection: 'row', paddingRight: 40 },
  appThemeItem: { marginRight: 16, alignItems: 'center' },
  appThemePreview: { width: 60, height: 60, borderRadius: 30, marginBottom: 8, borderWidth: 2, borderColor: '#F1F5F9' },
  appThemeItemActive: { opacity: 1 },
  appThemeLabel: { fontSize: 10, fontWeight: '800', color: '#94a3b8' },
  langList: { backgroundColor: 'white', borderRadius: 24, padding: 8, borderWidth: 1, borderColor: '#F1F5F9' },
  langItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 16 },
  langText: { fontSize: 15, fontWeight: '600', color: '#475569' },
  loginCard: { padding: 32, alignItems: 'center' },
  loginIconContainer: { width: 80, height: 80, borderRadius: 24, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center', marginBottom: 24, shadowColor: '#6366f1', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
  loginTitle: { fontSize: 32, fontWeight: '900', color: '#1e293b' },
  loginSubtitle: { fontSize: 16, color: '#94a3b8', marginTop: 8, textAlign: 'center' },
  loginButton: { backgroundColor: '#6366f1', width: '100%', height: 56, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 32, flexDirection: 'row', gap: 10 },
  loginButtonText: { color: 'white', fontSize: 16, fontWeight: '700' }
});
