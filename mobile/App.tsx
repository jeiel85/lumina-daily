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
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  RefreshCw, 
  Share2, 
  Download, 
  Heart, 
  Sparkles,
  Quote as QuoteIcon,
  Settings as SettingsIcon,
  ChevronRight,
  History as HistoryIcon
} from 'lucide-react-native';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

// Import our custom AI and Firebase logic
import { generateNativeQuote, generateNativeImage, Quote } from './src/lib/ai';
import { auth, db } from './src/config/firebase';
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

export default function App() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  const [history, setHistory] = useState<Quote[]>([]);
  const viewRef = useRef(null);

  // Initial generation and Notification Sync
  useEffect(() => {
    handleGenerate();
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = async () => {
    const saved = await AsyncStorage.getItem('@lumina_notified');
    setIsNotified(saved === 'true');
  };

  const toggleNotification = async () => {
    if (!isNotified) {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        await scheduleDailyQuoteNotification(8, 0, quote?.text || "오늘도 당신만의 지혜를 발견해 보세요.");
        setIsNotified(true);
        await AsyncStorage.setItem('@lumina_notified', 'true');
        Alert.alert('알림 활성화', '매일 아침 8시에 오늘의 명언을 보내드림니다.');
      }
    } else {
      await cancelAllNotifications();
      setIsNotified(false);
      await AsyncStorage.setItem('@lumina_notified', 'false');
      Alert.alert('알림 해제', '더 이상 데일리 알림을 보내드리지 않습니다.');
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // 1. Generate text first
      const newQuoteData = await generateNativeQuote('motivation');
      
      // 2. Try to generate AI image in parallel or after
      const base64Image = await generateNativeImage(newQuoteData.theme);
      
      const finalQuote = {
        ...newQuoteData,
        imageUrl: base64Image ? `data:image/png;base64,${base64Image}` : undefined
      };
      
      setQuote(finalQuote);
      
      // Optional: Save to history (if we want background saving)
      // For now, focus on generation and sharing
      
    } catch (error) {
      console.error('[Mobile App] Error:', error);
      Alert.alert('오류', '명언을 생성하는 데 실패했습니다. 네트워크를 확인해 주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveAndShare = async () => {
    if (!viewRef.current) return;
    
    setIsCapturing(true);
    try {
      const uri = await captureRef(viewRef, {
        format: 'jpg',
        quality: 0.9,
      });

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('LuminaDaily', asset, false);
        
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          Alert.alert('저장 완료', '명언 카드가 갤러리에 저장되었습니다.');
        }
      }
    } catch (error) {
      console.error('[Capture Error]', error);
      Alert.alert('오류', '이미지를 저장하거나 공유하지 못했습니다.');
    } finally {
      setIsCapturing(false);
    }
  };

  const renderBackground = () => {
    if (quote?.imageUrl) {
      return <Image source={{ uri: quote.imageUrl }} style={StyleSheet.absoluteFill} />;
    }
    return (
      <LinearGradient
        colors={['#6366f1', '#a855f7', '#ec4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Lumina</Text>
          <Text style={styles.headerSubtitle}>Daily Wisdom</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <SettingsIcon color="white" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Quote Card */}
        <ViewShot ref={viewRef} style={styles.cardContainer} options={{ format: 'jpg', quality: 0.9 }}>
          <View style={styles.card}>
            {renderBackground()}
            <View style={styles.overlay} />
            
            <View style={styles.cardContent}>
              <QuoteIcon color="white" size={40} opacity={0.6} />
              <Text style={styles.quoteText}>{quote?.text || '새로운 지혜를 불러오는 중...'}</Text>
              <Text style={styles.authorText}>— {quote?.author || 'Lumina AI'}</Text>
              
              <View style={styles.explanationContainer}>
                <Text style={styles.explanationText}>
                  {quote?.explanation || '당신을 위한 특별한 명언을 준비하고 있습니다.'}
                </Text>
              </View>
            </View>
          </View>
        </ViewShot>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.generateButton]} 
            onPress={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <RefreshCw color="white" size={20} />
                <Text style={styles.actionButtonText}>새 명언 생성</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.shareButton]} 
            onPress={handleSaveAndShare}
            disabled={isGenerating || isCapturing}
          >
            <Share2 color="#6366f1" size={20} />
            <Text style={[styles.actionButtonText, { color: '#6366f1' }]}>카드 저장 및 공유</Text>
          </TouchableOpacity>

          {/* New Notification Toggle Button */}
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              styles.notifyButton,
              isNotified && styles.notifyActiveButton
            ]} 
            onPress={toggleNotification}
          >
            <Sparkles color={isNotified ? "#fff" : "#6366f1"} size={20} />
            <Text style={[
              styles.actionButtonText, 
              { color: isNotified ? "white" : "#6366f1" }
            ]}>
              {isNotified ? '데일리 알림 ON (08:00)' : '매일 아침 명언 받기'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* History Section Hint */}
        <TouchableOpacity style={styles.historySection}>
          <View style={styles.historyHeader}>
            <HistoryIcon color="#475569" size={20} />
            <Text style={styles.historyTitle}>명언 기록 보기</Text>
            <ChevronRight color="#CBD5E1" size={20} style={{ marginLeft: 'auto' }} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
    letterSpacing: -1,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: -2,
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,
  },
  card: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  cardContent: {
    alignItems: 'center',
    width: '100%',
  },
  quoteText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 32,
  },
  authorText: {
    fontSize: 14,
    color: '#cbd5e1',
    marginTop: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  explanationContainer: {
    marginTop: 32,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  explanationText: {
    fontSize: 13,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  actions: {
    marginTop: 32,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  generateButton: {
    backgroundColor: '#6366f1',
  },
  shareButton: {
    backgroundColor: 'white',
  },
  notifyButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  notifyActiveButton: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  historySection: {
    marginTop: 32,
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f1f5f9',
  }
});
