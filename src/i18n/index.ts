import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { languageStorage } from '../utils/storage';

// 导入中文语言资源
import zhCommon from './locales/zh/common.json';
import zhLayout from './locales/zh/layout.json';
import zhMenu from './locales/zh/menu.json';
import zhDashboard from './locales/zh/dashboard.json';
import zhPlanes from './locales/zh/planes.json';
import zhAgents from './locales/zh/agents.json';
import zhModels from './locales/zh/models.json';
import zhEntities from './locales/zh/entities.json';
import zhSequences from './locales/zh/sequences.json';
import zhTasks from './locales/zh/tasks.json';
import zhMessages from './locales/zh/messages.json';
import zhReports from './locales/zh/reports.json';
import zhRelationships from './locales/zh/relationships.json';
import zhAiAssistant from './locales/zh/aiAssistant.json';
import zhSolutions from './locales/zh/solutions.json';
import zhTags from './locales/zh/tags.json';
import zhPrompts from './locales/zh/prompts.json';
import zhEntityScan from './locales/zh/entityScan.json';
import zhTheme from './locales/zh/theme.json';
// 页面级语言包
import zhTaskCollectionRunDetail from './locales/zh/taskCollectionRunDetail.json';
import zhTaskExecutionHistory from './locales/zh/taskExecutionHistory.json';
import zhHookTasks from './locales/zh/hookTasks.json';

// 导入英文语言资源
import enCommon from './locales/en/common.json';
import enLayout from './locales/en/layout.json';
import enMenu from './locales/en/menu.json';
import enDashboard from './locales/en/dashboard.json';
import enPlanes from './locales/en/planes.json';
import enAgents from './locales/en/agents.json';
import enModels from './locales/en/models.json';
import enEntities from './locales/en/entities.json';
import enSequences from './locales/en/sequences.json';
import enTasks from './locales/en/tasks.json';
import enMessages from './locales/en/messages.json';
import enReports from './locales/en/reports.json';
import enRelationships from './locales/en/relationships.json';
import enAiAssistant from './locales/en/aiAssistant.json';
import enSolutions from './locales/en/solutions.json';
import enTags from './locales/en/tags.json';
import enPrompts from './locales/en/prompts.json';
import enEntityScan from './locales/en/entityScan.json';
import enTheme from './locales/en/theme.json';
// 页面级语言包
import enTaskCollectionRunDetail from './locales/en/taskCollectionRunDetail.json';
import enTaskExecutionHistory from './locales/en/taskExecutionHistory.json';
import enHookTasks from './locales/en/hookTasks.json';

// 语言资源配置
const resources = {
  'zh-CN': {
    common: zhCommon,
    layout: zhLayout,
    menu: zhMenu,
    dashboard: zhDashboard,
    planes: zhPlanes,
    agents: zhAgents,
    models: zhModels,
    entities: zhEntities,
    sequences: zhSequences,
    tasks: zhTasks,
    messages: zhMessages,
    reports: zhReports,
    relationships: zhRelationships,
    aiAssistant: zhAiAssistant,
    solutions: zhSolutions,
    tags: zhTags,
    prompts: zhPrompts,
    entityScan: zhEntityScan,
    theme: zhTheme,
    // 页面级语言包
    taskCollectionRunDetail: zhTaskCollectionRunDetail,
    taskExecutionHistory: zhTaskExecutionHistory,
    hookTasks: zhHookTasks
  },
  'en-US': {
    common: enCommon,
    layout: enLayout,
    menu: enMenu,
    dashboard: enDashboard,
    planes: enPlanes,
    agents: enAgents,
    models: enModels,
    entities: enEntities,
    sequences: enSequences,
    tasks: enTasks,
    messages: enMessages,
    reports: enReports,
    relationships: enRelationships,
    aiAssistant: enAiAssistant,
    solutions: enSolutions,
    tags: enTags,
    prompts: enPrompts,
    entityScan: enEntityScan,
    theme: enTheme,
    // 页面级语言包
    taskCollectionRunDetail: enTaskCollectionRunDetail,
    taskExecutionHistory: enTaskExecutionHistory,
    hookTasks: enHookTasks
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
      // 检测顺序：localStorage -> fallback
      order: ['localStorage'],
      // 缓存用户选择的语言
      caches: ['localStorage'],
      // localStorage中的key名
      lookupLocalStorage: 'preferred-language'
    },
    
    // 设置初始语言为用户之前选择的语言
    lng: languageStorage.get(),
    
    // 调试模式（开发环境开启）
    debug: import.meta.env.DEV,
    
    // 插值配置
    interpolation: {
      escapeValue: false // React已经处理了XSS
    },
    
    // 命名空间配置
    defaultNS: 'common',
    ns: [
      'common', 'layout', 'menu', 'dashboard', 'planes', 'agents', 'models', 
      'entities', 'sequences', 'tasks', 'messages', 'reports', 'relationships', 
      'aiAssistant', 'solutions', 'tags', 'prompts', 'entityScan', 'theme',
      // 页面级命名空间
      'taskCollectionRunDetail', 'taskExecutionHistory'
    ],
    
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
    }
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
