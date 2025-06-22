import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据构建命令设置基础路径
  // 开发环境使用根路径，构建时使用GitHub Pages路径
  const base = command === 'build' ? '/tiang-live/' : '/';
  
  console.log(`Vite配置 - 命令: ${command}, 模式: ${mode}, 基础路径: ${base}`);
  
  return {
    plugins: [react()],
    base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      chunkSizeWarningLimit: 1500, // 进一步提高警告阈值到1500KB
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // React 核心库 - 进一步细分
            if (id.includes('react-dom')) {
              return 'react-dom';
            }
            if (id.includes('react') && !id.includes('react-dom')) {
              return 'react';
            }
            
            // Antd 相关 - 细分
            if (id.includes('@ant-design/icons')) {
              return 'antd-icons';
            }
            if (id.includes('antd')) {
              return 'antd-core';
            }
            
            // 图表库 - 细分
            if (id.includes('echarts-for-react')) {
              return 'echarts-react';
            }
            if (id.includes('echarts')) {
              return 'echarts-core';
            }
            
            // Mermaid 图表库 - 单独分块
            if (id.includes('mermaid')) {
              return 'mermaid';
            }
            
            // D3 相关库 - 细分
            if (id.includes('cytoscape')) {
              return 'cytoscape';
            }
            if (id.includes('d3')) {
              return 'd3';
            }
            
            // 大型工具库单独分块
            if (id.includes('lodash')) {
              return 'lodash';
            }
            if (id.includes('moment')) {
              return 'moment';
            }
            if (id.includes('dayjs')) {
              return 'dayjs';
            }
            
            // 国际化相关
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n';
            }
            
            // 路由相关
            if (id.includes('react-router')) {
              return 'router';
            }
            
            // 状态管理
            if (id.includes('redux') || id.includes('@reduxjs')) {
              return 'redux';
            }
            
            // 样式相关
            if (id.includes('styled-components')) {
              return 'styled-components';
            }
            if (id.includes('emotion')) {
              return 'emotion';
            }
            
            // 数学和算法库
            if (id.includes('katex') || id.includes('mathjax')) {
              return 'math';
            }
            
            // 其他可视化库
            if (id.includes('vis-') || id.includes('sigma') || id.includes('three')) {
              return 'visualization-extra';
            }
            
            // 其他第三方库按大小分组
            if (id.includes('node_modules')) {
              // 大型库单独分块
              if (id.includes('monaco-editor') || id.includes('codemirror')) {
                return 'editor';
              }
              if (id.includes('pdf') || id.includes('canvas')) {
                return 'media';
              }
              return 'vendor';
            }
          }
        }
      }
    }
  }
})
