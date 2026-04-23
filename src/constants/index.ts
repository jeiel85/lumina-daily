export const THEMES = [
  { id: 'random', labelKey: 'themes.random', icon: '🎲' },
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

export const CARD_STYLES = [
  { id: 'classic', labelKey: 'cardStyles.classic' },
  { id: 'modern', labelKey: 'cardStyles.modern' },
  { id: 'minimal', labelKey: 'cardStyles.minimal' },
  { id: 'bold', labelKey: 'cardStyles.bold' },
];

export const LANGUAGES = [
  { id: 'ko', label: '한국어' },
  { id: 'en', label: 'English' },
  { id: 'ja', label: '日本語' },
  { id: 'zh', label: '中文' },
];

export const THEME_SEED_POOLS: Record<string, string[]> = {
  motivation:  ['mountain-peak', 'summit-climb', 'sunrise-trail', 'marathon-run', 'endurance-sport'],
  comfort:     ['calm-forest', 'cozy-morning', 'green-meadow', 'soft-rain', 'warm-cottage'],
  humor:       ['colorful-confetti', 'playful-balloons', 'bright-carnival', 'fun-festival', 'happy-dog'],
  success:     ['city-lights', 'trophy-gold', 'office-highrise', 'graduation-day', 'podium-winner'],
  business:    ['modern-office', 'boardroom-glass', 'city-skyline', 'laptop-desk', 'corporate-tower'],
  love:        ['golden-sunset', 'red-roses', 'romantic-evening', 'pink-blossom', 'heart-bokeh'],
  philosophy:  ['ancient-library', 'stone-archway', 'misty-lake', 'greek-temple', 'lone-lighthouse'],
  wisdom:      ['autumn-leaves', 'old-bookshelf', 'meditation-zen', 'owl-forest', 'wise-elder'],
  life:        ['nature-sky', 'spring-flowers', 'ocean-horizon', 'forest-path', 'starry-night'],
};

export const BLOCKED_KEYWORDS = ['섹스', '야동', '포르노', 'sex', 'porn', 'nude', 'naked', '씨발', '개새끼', '좆', '보지', '자지', 'fuck', 'shit', 'ass', 'bitch', 'nigger', 'faggot'];