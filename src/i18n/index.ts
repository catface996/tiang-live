import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入语言资源
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';

// 语言资源配置
const resources = {
  'zh-CN': {
    translation: zhCN
  },
  'en-US': {
    translation: enUS
  }
};

// 初始化i18n
i18n
  .use(LanguageDetector) // 自动检测用户语言
  .use(initReactI18next) // 绑定react-i18next
  .init({
    resources,
    
    // 默认语言
    fallbackLng: 'zh-CN',
    
    // 支持的语言列表
    supportedLngs: ['zh-CN', 'en-US'],
    
    // 语言检测配置
    detection: {
      // 检测顺序：localStorage -> fallback (移除navigator自动检测)
      order: ['localStorage'],
      // 缓存用户选择的语言
      caches: ['localStorage'],
      // localStorage中的key名
      lookupLocalStorage: 'i18nextLng',
    },
    
    // 强制设置默认语言为中文
    lng: 'zh-CN',
    
    // 调试模式（开发环境开启）
    debug: import.meta.env.DEV,
    
    // 插值配置
    interpolation: {
      escapeValue: false, // React已经处理了XSS
    },
    
    // 命名空间配置
    defaultNS: 'translation',
    ns: ['translation'],
    
    // 键值分隔符
    keySeparator: '.',
    nsSeparator: ':',
    
    // 复数规则
    pluralSeparator: '_',
    contextSeparator: '_',
    
    // 缺失键处理
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: (lng, ns, key) => {
      if (import.meta.env.DEV) {
        console.warn(`Missing translation key: ${key} for language: ${lng}`);
      }
    },
  });

export default i18n;

// 导出语言相关的工具函数
export const getCurrentLanguage = () => i18n.language;
export const changeLanguage = (lng: string) => i18n.changeLanguage(lng);
export const getSupportedLanguages = () => ['zh-CN', 'en-US'];

// 语言信息配置
export const languageConfig = {
  'zh-CN': {
    name: '简体中文',
    nativeName: '简体中文',
    flag: '🇨🇳',
    code: 'zh-CN'
  },
  'en-US': {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸', 
    code: 'en-US'
  }
} as const;

export type SupportedLanguage = keyof typeof languageConfig;
