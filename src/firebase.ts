import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';

// Import local config as fallback
let localConfig: any = {};
try {
  // @ts-ignore
  const config = await import('../firebase-applet-config.json');
  localConfig = config.default || config;
} catch (e) {
  // Ignore if file doesn't exist
}

// Use environment variables with fallback to local config
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || (localConfig as any).apiKey,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || (localConfig as any).authDomain,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || (localConfig as any).projectId,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || (localConfig as any).storageBucket,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || (localConfig as any).messagingSenderId,
  appId: process.env.VITE_FIREBASE_APP_ID || (localConfig as any).appId,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || (localConfig as any).measurementId,
};

const databaseId = process.env.VITE_FIREBASE_DATABASE_ID || (localConfig as any).firestoreDatabaseId;

// Check if we have the minimum required config
const isConfigValid = firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId;

if (!isConfigValid) {
  console.warn('Firebase configuration is missing or incomplete. Check your environment variables or firebase-applet-config.json.');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, databaseId || undefined);
export const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
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
