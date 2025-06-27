/**
 * 主题工具函数
 * 提供主题相关的工具方法和CSS类名生成
 */

export type ThemeType = 'light' | 'dark';

/**
 * 获取主题相关的CSS类名
 */
export const getThemeClass = (baseClass: string, theme?: ThemeType): string => {
  if (!theme) return baseClass;
  return `${baseClass} theme-${theme}`;
};

/**
 * 生成主题相关的样式对象
 */
export const getThemeStyles = (theme: ThemeType) => {
  const isLight = theme === 'light';
  
  return {
    // 页面容器样式
    pageContainer: {
      backgroundColor: isLight ? '#f0f2f5' : '#000000',
      color: isLight ? 'rgba(0, 0, 0, 0.88)' : 'rgba(255, 255, 255, 0.88)',
      minHeight: 'calc(100vh - 64px)',
    },
    
    // 卡片样式
    card: {
      backgroundColor: isLight ? '#ffffff' : '#141414',
      borderColor: isLight ? '#f0f0f0' : '#303030',
      boxShadow: isLight 
        ? '0 2px 8px rgba(0, 0, 0, 0.06)' 
        : '0 2px 8px rgba(0, 0, 0, 0.4)',
    },
    
    // 卡片悬停样式
    cardHover: {
      boxShadow: isLight 
        ? '0 4px 16px rgba(0, 0, 0, 0.12)' 
        : '0 4px 16px rgba(0, 0, 0, 0.6)',
      transform: 'translateY(-2px)',
      borderColor: '#40a9ff',
    },
    
    // 文本样式
    text: {
      primary: isLight ? 'rgba(0, 0, 0, 0.88)' : 'rgba(255, 255, 255, 0.88)',
      secondary: isLight ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.65)',
      disabled: isLight ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)',
    },
    
    // 输入框样式
    input: {
      backgroundColor: isLight ? '#ffffff' : '#141414',
      borderColor: isLight ? '#d9d9d9' : '#434343',
      color: isLight ? 'rgba(0, 0, 0, 0.88)' : 'rgba(255, 255, 255, 0.88)',
    },
    
    // 按钮样式
    button: {
      default: {
        backgroundColor: isLight ? '#ffffff' : '#141414',
        borderColor: isLight ? '#d9d9d9' : '#434343',
        color: isLight ? 'rgba(0, 0, 0, 0.88)' : 'rgba(255, 255, 255, 0.88)',
      },
      primary: {
        backgroundColor: '#1890ff',
        borderColor: '#1890ff',
        color: '#ffffff',
      },
    },
  };
};

/**
 * 获取主题相关的CSS变量值
 */
export const getThemeVariable = (variableName: string): string => {
  return `var(--${variableName})`;
};

/**
 * 主题相关的CSS类名常量
 */
export const THEME_CLASSES = {
  // 页面类
  PAGE: 'theme-page',
  CONTAINER: 'theme-container',
  
  // 卡片类
  CARD: 'theme-card',
  CARD_HOVER: 'theme-card-hover',
  
  // 文本类
  TEXT_PRIMARY: 'theme-text-primary',
  TEXT_SECONDARY: 'theme-text-secondary',
  TEXT_SUCCESS: 'theme-text-success',
  TEXT_WARNING: 'theme-text-warning',
  TEXT_ERROR: 'theme-text-error',
  
  // 背景类
  BG_CONTAINER: 'theme-bg-container',
  BG_ELEVATED: 'theme-bg-elevated',
  BG_HOVER: 'theme-bg-hover',
  
  // 边框类
  BORDER_BASE: 'theme-border-base',
  BORDER_LIGHT: 'theme-border-light',
  BORDER_HOVER: 'theme-border-hover',
} as const;

/**
 * 生成响应式的主题样式
 */
export const getResponsiveThemeStyles = (theme: ThemeType) => {
  const baseStyles = getThemeStyles(theme);
  
  return {
    ...baseStyles,
    // 移动端适配
    mobile: {
      pageContainer: {
        ...baseStyles.pageContainer,
        padding: '16px',
      },
      card: {
        ...baseStyles.card,
        margin: '8px 0',
      },
    },
  };
};

/**
 * 检查当前是否为深色主题
 */
export const isDarkTheme = (theme: ThemeType): boolean => {
  return theme === 'dark';
};

/**
 * 检查当前是否为浅色主题
 */
export const isLightTheme = (theme: ThemeType): boolean => {
  return theme === 'light';
};
