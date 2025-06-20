/**
 * 本地存储工具函数
 * 统一管理localStorage的读写操作
 */

// 存储键名常量
export const STORAGE_KEYS = {
  THEME: 'preferred-theme',
  LANGUAGE: 'preferred-language',
} as const;

// 主题类型
export type ThemeType = 'light' | 'dark';

// 语言类型
export type LanguageType = 'zh-CN' | 'en-US';

/**
 * 安全地从localStorage读取数据
 */
const safeGetItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Failed to read ${key} from localStorage:`, error);
    return null;
  }
};

/**
 * 安全地向localStorage写入数据
 */
const safeSetItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Failed to save ${key} to localStorage:`, error);
  }
};

/**
 * 主题相关的存储操作
 */
export const themeStorage = {
  get: (): ThemeType => {
    const stored = safeGetItem(STORAGE_KEYS.THEME);
    return (stored === 'dark' || stored === 'light') ? stored : 'light';
  },
  set: (theme: ThemeType): void => {
    safeSetItem(STORAGE_KEYS.THEME, theme);
  },
};

/**
 * 语言相关的存储操作
 */
export const languageStorage = {
  get: (): LanguageType => {
    const stored = safeGetItem(STORAGE_KEYS.LANGUAGE);
    return (stored === 'zh-CN' || stored === 'en-US') ? stored : 'zh-CN';
  },
  set: (language: LanguageType): void => {
    safeSetItem(STORAGE_KEYS.LANGUAGE, language);
  },
};

/**
 * 清除所有用户偏好设置
 */
export const clearUserPreferences = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.THEME);
    localStorage.removeItem(STORAGE_KEYS.LANGUAGE);
  } catch (error) {
    console.warn('Failed to clear user preferences:', error);
  }
};

/**
 * 获取所有用户偏好设置
 */
export const getUserPreferences = () => {
  return {
    theme: themeStorage.get(),
    language: languageStorage.get(),
  };
};
