// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
// NOTE: For security, this file is generated at build time via Vite.
// Do NOT manually edit this file - see vite.config.ts for configuration.
// Build-time injected values (fallback to environment variables or .env files)
const firebaseConfig = {
  apiKey: "__VITE_FIREBASE_API_KEY__" || "demo-api-key",
  authDomain: "__VITE_FIREBASE_AUTH_DOMAIN__" || "demo.firebaseapp.com",
  projectId: "__VITE_FIREBASE_PROJECT_ID__" || "demo",
  storageBucket: "__VITE_FIREBASE_STORAGE_BUCKET__" || "demo.firebasestorage.app",
  messagingSenderId: "__VITE_FIREBASE_MESSAGING_SENDER_ID__" || "000000000000",
  appId: "__VITE_FIREBASE_APP_ID__" || "1:000000000000:web:0000000000000"
};

// Only initialize if valid config (not placeholder values)
if (firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("demo")) {
  firebase.initializeApp(firebaseConfig);
}

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
