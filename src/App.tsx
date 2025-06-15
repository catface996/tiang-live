import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { store } from './store';
import { themes } from './styles/theme';
import AppRoutes from './routes';
import GlobalStyles from './styles/GlobalStyles';
import ErrorBoundary from './components/ErrorBoundary';
import { useAppSelector } from './store';
import './i18n'; // 初始化i18n

// Antd语言配置映射
const antdLocaleMap = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

const AppContent: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as keyof typeof antdLocaleMap;
  const antdLocale = antdLocaleMap[currentLanguage] || zhCN;
  
  // 获取当前主题
  const { currentTheme } = useAppSelector((state) => state.theme);
  const themeConfig = themes[currentTheme];

  // 根据环境设置basename
  const basename = import.meta.env.PROD ? '/tiang-live' : '';

  console.log('App 启动信息:', {
    mode: import.meta.env.MODE,
    prod: import.meta.env.PROD,
    basename,
    language: currentLanguage,
    theme: currentTheme,
    url: window.location.href
  });

  return (
    <ErrorBoundary>
      <ConfigProvider 
        locale={antdLocale}
        theme={themeConfig.antd}
      >
        <ThemeProvider theme={themeConfig.styled}>
          <GlobalStyles />
          <Router basename={basename}>
            <AppRoutes />
          </Router>
        </ThemeProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
