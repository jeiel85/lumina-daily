import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';

// localConfig is now handled via environment variables in .env
export const localConfig = {} as any;

if (typeof window !== 'undefined') {
  console.log('Current origin:', window.location.origin);
  console.log('Local config loaded via import:', {
    ...localConfig,
    apiKey: localConfig.apiKey ? '***' + localConfig.apiKey.slice(-4) : 'missing'
  });
}

// Use environment variables with fallback to local config
// Ensure we handle empty strings from env vars correctly
const getCfg = (envVal: string | undefined, localVal: string | undefined) => {
  if (envVal && envVal !== 'undefined' && envVal !== '""' && envVal !== "''" && envVal !== "") return envVal;
  return localVal;
};

const firebaseConfig = {
  apiKey: getCfg(import.meta.env.VITE_FIREBASE_API_KEY, localConfig.apiKey),
  authDomain: getCfg(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, localConfig.authDomain),
  projectId: getCfg(import.meta.env.VITE_FIREBASE_PROJECT_ID, localConfig.projectId),
  storageBucket: getCfg(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, localConfig.storageBucket),
  messagingSenderId: getCfg(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, localConfig.messagingSenderId),
  appId: getCfg(import.meta.env.VITE_FIREBASE_APP_ID, localConfig.appId),
  measurementId: getCfg(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, localConfig.measurementId),
};

const databaseId = getCfg(import.meta.env.VITE_FIREBASE_DATABASE_ID, localConfig.firestoreDatabaseId);

// Check if we have the minimum required config
const isConfigValid = !!(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId && firebaseConfig.apiKey !== 'missing' && firebaseConfig.authDomain);

if (typeof window !== 'undefined') {
  console.log('Final Firebase Config:', {
    ...firebaseConfig,
    apiKey: firebaseConfig.apiKey ? '***' + firebaseConfig.apiKey.slice(-4) : 'missing',
    isConfigValid
  });
}

if (!isConfigValid) {
  console.error('Firebase configuration is missing or incomplete. Fields check:', {
    apiKey: !!firebaseConfig.apiKey,
    projectId: !!firebaseConfig.projectId,
    appId: !!firebaseConfig.appId,
    authDomain: !!firebaseConfig.authDomain
  });
}

// Initialize Firebase only if config is valid to avoid immediate crash
// If invalid, we provide a dummy app to prevent export errors, but it will fail on usage
const app = isConfigValid 
  ? initializeApp(firebaseConfig) 
  : initializeApp({ 
      apiKey: "missing", 
      projectId: "missing", 
      appId: "missing",
      messagingSenderId: "missing" // Added to prevent Messaging crash
    });

export const auth = getAuth(app);
// Using the custom database ID 'lumina-daily' as requested
export const db = getFirestore(app, 'lumina-daily');
export const messaging = (typeof window !== 'undefined' && isConfigValid) ? getMessaging(app) : null;
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  if (!isConfigValid) {
    const error = '환경 변수가 설정되지 않았습니다. .env 파일을 작성하거나 Firebase 콘솔에서 설정을 확인해 주세요.';
    console.error(error);
    alert(error);
    return Promise.reject(new Error(error));
  }
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    if (error.code === 'auth/unauthorized-domain') {
      const currentDomain = window.location.hostname;
      const message = `도메인 (${currentDomain})이 Firebase 콘솔에서 승인되지 않았습니다. Firebase Console > Authentication > Settings > Authorized domains 에 추가해 주세요.`;
      console.error(message);
      alert(message);
    } else if (error.code === 'auth/popup-closed-by-user') {
      console.warn('사용자가 로그인 팝업을 닫았습니다.');
    } else {
      alert(`로그인 중 오류가 발생했습니다: ${error.message}`);
    }
    throw error;
  }
};
export const logout = () => signOut(auth);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null, user?: FirebaseUser | null) {
  const currentUser = user || auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo: currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        model: "gemini-pro",
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const requestNotificationPermission = async () => {
  if (!messaging || !('Notification' in window)) {
    console.warn('Notifications not supported in this browser.');
    return null;
  }
  
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Note: getToken will fail if VAPID key is not configured in Firebase Console
      // For now, we attempt to get it, but catch the error gracefully
      try {
        const token = await getToken(messaging, {
          // vapidKey: 'YOUR_VAPID_KEY_HERE' // Replace with your actual VAPID key from Firebase Console
        });
        return token;
      } catch (tokenError) {
        console.error('FCM Token error (Check VAPID key):', tokenError);
        return 'granted_but_no_token'; // Special state to indicate permission is OK but token failed
      }
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
  return null;
};
