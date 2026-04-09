import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jeiel85.luminadaily',
  appName: 'Lumina',
  webDir: 'docs',
  server: {
    // Firebase Auth가 허용 도메인으로 인식하도록 Firebase 프로젝트 도메인 사용
    hostname: 'lumina-762f8.firebaseapp.com',
    androidScheme: 'https'
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"]
    }
  }
};

export default config;
