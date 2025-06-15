// 主题类型定义
export type ThemeType = 'light' | 'dark';

// 浅色主题
export const lightTheme = {
  colors: {
    primary: '#1890ff',
    secondary: '#722ed1',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#13c2c2',
    text: {
      primary: '#000000',
      secondary: '#595959',
      disabled: '#bfbfbf',
    },
    background: {
      primary: '#ffffff',
      secondary: '#fafafa',
      disabled: '#f5f5f5',
      layout: '#f0f2f5',
    },
    border: {
      light: '#f0f0f0',
      base: '#d9d9d9',
      dark: '#bfbfbf',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '2px',
    base: '6px',
    lg: '8px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
    base: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
    lg: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
};

// 深色主题
export const darkTheme = {
  colors: {
    primary: '#177ddc',
    secondary: '#9254de',
    success: '#49aa19',
    warning: '#d89614',
    error: '#d32029',
    info: '#13a8a8',
    text: {
      primary: '#ffffff',
      secondary: '#a6a6a6',
      disabled: '#595959',
    },
    background: {
      primary: '#000000',
      secondary: '#1f1f1f',
      disabled: '#262626',
      layout: '#000000',
    },
    border: {
      light: '#303030',
      base: '#434343',
      dark: '#595959',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '2px',
    base: '6px',
    lg: '8px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    base: '0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    lg: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  },
};

// Antd浅色主题配置
export const antdLightTheme = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#13c2c2',
    borderRadius: 6,
    wireframe: false,
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      siderBg: '#ffffff',
      bodyBg: '#f0f2f5',
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: '#e6f7ff',
      itemHoverBg: '#f5f5f5',
      itemColor: 'rgba(0, 0, 0, 0.85)',
      itemSelectedColor: '#1890ff',
    },
    Button: {
      borderRadius: 6,
    },
    Card: {
      borderRadius: 8,
    },
  },
};

// Antd深色主题配置
export const antdDarkTheme = {
  token: {
    colorPrimary: '#ffffff', // 主色调改为白色
    colorSuccess: '#49aa19',
    colorWarning: '#d89614',
    colorError: '#d32029',
    colorInfo: '#13a8a8',
    borderRadius: 6,
    wireframe: false,
    colorText: '#ffffff', // 文本颜色为白色
    colorTextHeading: '#ffffff', // 标题文本颜色为白色
  },
  components: {
    Layout: {
      headerBg: '#000000',
      siderBg: '#000000',
      bodyBg: '#000000',
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: '#1f1f1f',
      itemHoverBg: '#1f1f1f',
      itemColor: '#ffffff', // 菜单项文字颜色为白色
      itemSelectedColor: '#ffffff', // 选中菜单项文字颜色为白色
      itemHoverColor: '#ffffff', // 悬停菜单项文字颜色为白色
      iconSize: 16,
    },
    Button: {
      borderRadius: 6,
      colorText: '#ffffff', // 按钮文字颜色为白色
      colorPrimary: '#ffffff', // 主要按钮颜色为白色
      colorPrimaryHover: '#f0f0f0', // 主要按钮悬停颜色
      colorPrimaryActive: '#d9d9d9', // 主要按钮激活颜色
    },
    Card: {
      borderRadius: 8,
      colorText: '#ffffff', // 卡片文字颜色为白色
      colorTextHeading: '#ffffff', // 卡片标题颜色为白色
    },
    Typography: {
      colorText: '#ffffff', // Typography文字颜色为白色
      colorTextHeading: '#ffffff', // Typography标题颜色为白色
    },
    Breadcrumb: {
      colorText: '#ffffff', // 面包屑文字颜色为白色
    },
  },
};

// 导出默认主题（浅色）
export const styledTheme = lightTheme;
export const antdTheme = antdLightTheme;

// 导出完整主题
export const theme = {
  ...styledTheme,
  antd: antdTheme,
};

// 导出主题映射
export const themes = {
  light: {
    styled: lightTheme,
    antd: antdLightTheme,
  },
  dark: {
    styled: darkTheme,
    antd: antdDarkTheme,
  },
};
