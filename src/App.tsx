import React, { useEffect } from 'react';
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
import './styles/themes.css'; // 导入主题CSS
import './styles/theme-unified.css'; // 导入统一主题CSS
import './styles/modal-theme.css'; // 导入模态框主题CSS
import './styles/dashboard.css'; // 导入Dashboard页面专用样式
import './styles/plane-management.css'; // 导入平面管理页面专用样式
import './styles/entity-management.css'; // 导入实体管理页面专用样式
import './styles/sequence-management.css'; // 导入时序管理页面专用样式
import './styles/model-management.css'; // 导入模型管理页面专用样式
import './styles/industry-solution-management.css'; // 导入行业方案管理页面专用样式
import './styles/task-collection-management.css'; // 导入任务集合管理页面专用样式
import './styles/inspection-tasks.css'; // 导入巡检任务页面专用样式
import './styles/hook-tasks.css'; // 导入钩子任务页面专用样式
import './styles/report-management.css'; // 导入报告管理页面专用样式
import './styles/ai-agent-management.css'; // 导入AI智能体管理页面专用样式
import './styles/prompt-templates.css'; // 导入提示词模板页面专用样式
import './styles/task-execution-history.css'; // 导入任务执行历史页面主题CSS
import './styles/task-collection-run-detail.css'; // 导入任务集合执行详情页面主题CSS
import './styles/diagnostic-reports.css'; // 导入诊断报告组件主题CSS
import './styles/layered-task-topology.css'; // 导入分层任务拓扑组件主题CSS

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

  // 应用主题类到body
  useEffect(() => {
    document.body.className = `theme-${currentTheme}`;
  }, [currentTheme]);

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
