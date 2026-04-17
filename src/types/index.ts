export interface Quote {
  id?: string;
  text: string;
  author: string;
  explanation: string;
  theme: string;
  createdAt: any;
  imageUrl?: string;
  isBookmarked?: boolean;
}

export interface UserSettings {
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