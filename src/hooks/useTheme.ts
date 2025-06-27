/**
 * 主题相关的自定义Hook
 */

import { useAppSelector } from '../store';
import { getThemeStyles, getThemeClass, THEME_CLASSES, type ThemeType } from '../utils/themeUtils';

/**
 * 使用主题的Hook
 * 返回当前主题信息和相关工具方法
 */
export const useTheme = () => {
  const { currentTheme } = useAppSelector((state) => state.theme);
  
  return {
    // 当前主题
    theme: currentTheme,
    
    // 主题判断
    isDark: currentTheme === 'dark',
    isLight: currentTheme === 'light',
    
    // 获取主题样式
    getStyles: () => getThemeStyles(currentTheme),
    
    // 获取主题类名
    getClass: (baseClass: string) => getThemeClass(baseClass, currentTheme),
    
    // 主题类名常量
    classes: THEME_CLASSES,
    
    // 主题根类名
    rootClass: `theme-${currentTheme}`,
  };
};

/**
 * 使用主题样式的Hook
 * 返回当前主题的样式对象
 */
export const useThemeStyles = () => {
  const { currentTheme } = useAppSelector((state) => state.theme);
  return getThemeStyles(currentTheme);
};

/**
 * 使用主题类名的Hook
 * 返回生成主题类名的方法
 */
export const useThemeClass = () => {
  const { currentTheme } = useAppSelector((state) => state.theme);
  
  return {
    getClass: (baseClass: string) => getThemeClass(baseClass, currentTheme),
    rootClass: `theme-${currentTheme}`,
    classes: THEME_CLASSES,
  };
};
