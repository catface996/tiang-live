import { useEffect } from 'react';
import { useAppSelector } from '../store';
import { themes } from '../styles/theme';
import type { ThemeType } from '../store/slices/themeSlice';

/**
 * 主题钩子，用于获取当前主题配置
 */
export const useTheme = () => {
  const { currentTheme } = useAppSelector((state) => state.theme);
  
  // 当主题变化时，更新HTML的data-theme属性
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // 更新系统状态栏颜色（仅移动设备）
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        currentTheme === 'light' ? '#ffffff' : '#141414'
      );
    }
  }, [currentTheme]);

  // 返回当前主题的配置
  return {
    currentTheme,
    theme: themes[currentTheme as ThemeType],
  };
};

export default useTheme;
