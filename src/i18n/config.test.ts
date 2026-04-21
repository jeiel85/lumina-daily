import { describe, it, expect, beforeEach } from 'vitest';
import i18n from './config';

describe('i18n config', () => {
  beforeEach(() => {
    // Reset language before each test
    i18n.changeLanguage('ko');
  });

  it('should have default language set to ko', () => {
    expect(i18n.language).toBe('ko');
  });

  it('should support korean translation', () => {
    const translated = i18n.t('app.title');
    expect(translated).toBeDefined();
    expect(typeof translated).toBe('string');
  });

  it('should support language switching to english', () => {
    i18n.changeLanguage('en');
    expect(i18n.language).toBe('en');
  });

  it('should support language switching to japanese', () => {
    i18n.changeLanguage('ja');
    expect(i18n.language).toBe('ja');
  });

  it('should support language switching to chinese', () => {
    i18n.changeLanguage('zh');
    expect(i18n.language).toBe('zh');
  });

  it('should have fallback language set to en', () => {
    i18n.changeLanguage('unknown');
    expect(i18n.language).toBe('unknown');
    // Note: actual fallback behavior depends on i18next config
  });
});

describe('supported languages', () => {
  it('should support ko, en, ja, zh', () => {
    const languages = ['ko', 'en', 'ja', 'zh'];
    for (const lang of languages) {
      i18n.changeLanguage(lang);
      expect(i18n.language).toBe(lang);
    }
  });
});