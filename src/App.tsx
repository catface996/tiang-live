import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { store } from './store';
import { theme } from './styles/theme';
import AppRoutes from './routes';
import GlobalStyles from './styles/GlobalStyles';
import ErrorBoundary from './components/ErrorBoundary';
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

  // 根据环境设置basename
  const basename = import.meta.env.PROD ? '/tiang-live' : '';

  console.log('App 启动信息:', {
    mode: import.meta.env.MODE,
    prod: import.meta.env.PROD,
    basename,
    language: currentLanguage,
    url: window.location.href
  });

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ConfigProvider 
          locale={antdLocale}
          theme={{
            token: {
              colorPrimary: '#1890ff',
            },
          }}
        >
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Router basename={basename}>
              <AppRoutes />
            </Router>
          </ThemeProvider>
        </ConfigProvider>
      </Provider>
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
