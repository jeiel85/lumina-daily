import { vi } from 'vitest';

// Mock Firebase
vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
  signInWithPopup: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  collection: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  onSnapshot: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn(),
  Timestamp: {},
  getDocFromServer: vi.fn(),
}));

vi.mock('firebase/messaging', () => ({
  getToken: vi.fn(),
  onMessage: vi.fn(),
}));

// Mock @capacitor/core
vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: () => false,
    getPlatform: () => 'web',
  },
}));

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'ko',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Sparkles: () => null,
  RefreshCw: () => null,
  Home: () => null,
  History: () => null,
  Settings: () => null,
  Bell: () => null,
  LogOut: () => null,
  Globe: () => null,
  Palette: () => null,
  Quote: () => null,
  Image: () => null,
  ExternalLink: () => null,
  Download: () => null,
  ChevronRight: () => null,
  CheckCircle2: () => null,
  AlertCircle: () => null,
  Sun: () => null,
  Moon: () => null,
  X: () => null,
  Clock: () => null,
  Monitor: () => null,
}));

// Mock @google/generative-ai
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: () => ({
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: () => JSON.stringify({
            text: 'Test quote',
            author: 'Test',
            explanation: 'Test explanation',
          }),
        },
      }),
    }),
  })),
}));