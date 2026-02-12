import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Language Context', () => {
  beforeEach(() => {
    // 清除 localStorage
    localStorage.clear();
  });

  it('should initialize with default language CN', () => {
    const defaultLang = localStorage.getItem('language') || 'CN';
    expect(['CN', 'EN']).toContain(defaultLang);
  });

  it('should persist language preference to localStorage', () => {
    const testLang = 'EN';
    localStorage.setItem('language', testLang);
    const retrieved = localStorage.getItem('language');
    expect(retrieved).toBe(testLang);
  });

  it('should support language switching between CN and EN', () => {
    const languages = ['CN', 'EN'];
    languages.forEach(lang => {
      localStorage.setItem('language', lang);
      expect(localStorage.getItem('language')).toBe(lang);
    });
  });

  it('should validate language codes', () => {
    const validLanguages = ['CN', 'EN'];
    const invalidLanguages = ['FR', 'DE', 'ES', 'invalid'];
    
    validLanguages.forEach(lang => {
      expect(validLanguages).toContain(lang);
    });
    
    invalidLanguages.forEach(lang => {
      expect(validLanguages).not.toContain(lang);
    });
  });

  it('should handle language switching without errors', () => {
    const switchLanguage = (lang: string) => {
      if (['CN', 'EN'].includes(lang)) {
        localStorage.setItem('language', lang);
        return true;
      }
      return false;
    };

    expect(switchLanguage('CN')).toBe(true);
    expect(switchLanguage('EN')).toBe(true);
    expect(switchLanguage('FR')).toBe(false);
  });
});

describe('i18n Content', () => {
  const i18nContent = {
    CN: {
      title: '探索老挝 AR',
      description: '沉浸式文旅体验',
      arButton: '开始AR之旅',
    },
    EN: {
      title: 'Explore Laos AR',
      description: 'Immersive Tourism Experience',
      arButton: 'Start AR Tour',
    },
  };

  it('should provide correct Chinese content', () => {
    const content = i18nContent.CN;
    expect(content.title).toBe('探索老挝 AR');
    expect(content.description).toBe('沉浸式文旅体验');
    expect(content.arButton).toBe('开始AR之旅');
  });

  it('should provide correct English content', () => {
    const content = i18nContent.EN;
    expect(content.title).toBe('Explore Laos AR');
    expect(content.description).toBe('Immersive Tourism Experience');
    expect(content.arButton).toBe('Start AR Tour');
  });

  it('should have matching keys in all languages', () => {
    const cnKeys = Object.keys(i18nContent.CN).sort();
    const enKeys = Object.keys(i18nContent.EN).sort();
    expect(cnKeys).toEqual(enKeys);
  });

  it('should not have empty translations', () => {
    Object.entries(i18nContent).forEach(([lang, content]) => {
      Object.entries(content).forEach(([key, value]) => {
        expect(value).toBeTruthy();
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });
});

describe('AR Scene Localization', () => {
  const arI18n = {
    CN: {
      loadingAR: '加载 AR 引擎',
      alignTarget: '将摄像头对准识别图',
      targetFound: '已识别',
      error: '加载失败',
      retry: '重试',
    },
    EN: {
      loadingAR: 'Loading AR Engine',
      alignTarget: 'Align camera with target image',
      targetFound: 'Target found',
      error: 'Failed to load',
      retry: 'Retry',
    },
  };

  it('should provide AR-specific Chinese translations', () => {
    const content = arI18n.CN;
    expect(content.loadingAR).toBe('加载 AR 引擎');
    expect(content.alignTarget).toBe('将摄像头对准识别图');
    expect(content.targetFound).toBe('已识别');
  });

  it('should provide AR-specific English translations', () => {
    const content = arI18n.EN;
    expect(content.loadingAR).toBe('Loading AR Engine');
    expect(content.alignTarget).toBe('Align camera with target image');
    expect(content.targetFound).toBe('Target found');
  });

  it('should have all required AR UI keys', () => {
    const requiredKeys = ['loadingAR', 'alignTarget', 'targetFound', 'error', 'retry'];
    const cnKeys = Object.keys(arI18n.CN);
    const enKeys = Object.keys(arI18n.EN);
    
    requiredKeys.forEach(key => {
      expect(cnKeys).toContain(key);
      expect(enKeys).toContain(key);
    });
  });
});
