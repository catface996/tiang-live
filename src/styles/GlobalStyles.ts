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
    color: #262626;
    background-color: #fafafa;
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
    background: #fafafa;
  }

  ::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #bfbfbf;
  }

  /* 清除默认样式 */
  ul, ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
  }

  p {
    margin: 0;
  }

  a {
    color: #1890ff;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
      opacity: 0.8;
    }
  }

  /* 工具类 */
  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .flex {
    display: flex;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .full-height {
    height: 100%;
  }

  .full-width {
    width: 100%;
  }
`;

export default GlobalStyles;
