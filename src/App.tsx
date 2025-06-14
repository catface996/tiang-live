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

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN} theme={theme.antd}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Router>
            <AppRoutes />
          </Router>
        </ThemeProvider>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
