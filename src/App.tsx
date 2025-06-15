import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { ThemeProvider } from 'styled-components';
import { store } from './store';
import { theme } from './styles/theme';
import AppRoutes from './routes';
import GlobalStyles from './styles/GlobalStyles';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  // 根据环境设置basename
  const basename = import.meta.env.PROD ? '/tiang-live' : '';

  console.log('App 启动信息:', {
    mode: import.meta.env.MODE,
    prod: import.meta.env.PROD,
    basename,
    url: window.location.href
  });

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ConfigProvider locale={zhCN} theme={theme.antd}>
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

export default App;
