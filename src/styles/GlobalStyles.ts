import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 14px;
    line-height: 1.5715;
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.layout};
  }

  #root {
    height: 100%;
  }

  /* 滚动条样式 */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.base};
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.border.dark};
  }

  /* 清除默认样式 */
  ul, ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* 精确移除主题切换相关的过渡效果 - 保留交互功能 */
  
  /* 移除背景色和颜色的过渡效果 */
  * {
    transition-property: none !important;
  }
  
  *[style*="background"],
  *[style*="color"],
  *[class*="theme"] {
    transition: none !important;
  }

  /* 移除Antd组件主题相关的过渡效果，保留交互动画 */
  .ant-input,
  .ant-input-affix-wrapper,
  .ant-input-search,
  .ant-select-selector,
  .ant-btn,
  .ant-card,
  .ant-layout,
  .ant-layout-sider,
  .ant-layout-header,
  .ant-layout-content,
  .ant-menu,
  .ant-menu-item {
    transition-property: none !important;
  }

  /* 保留下拉框的交互动画，只移除颜色过渡 */
  .ant-select-dropdown,
  .ant-select-item,
  .ant-select-item-option {
    transition-property: none !important;
  }
  
  /* 移除统计卡片的过渡效果 */
  [class*="stats-card"] {
    transition: none !important;
  }
  
  [class*="stats-card"] * {
    transition: none !important;
  }
`;

export default GlobalStyles;
