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
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          format: 'es',
          // 为每个chunk添加必要的全局变量初始化
          banner: (chunk) => {
            if (chunk.name === 'mermaid' || chunk.fileName.includes('cytoscape')) {
              return `
var global = globalThis;
if (typeof exports === 'undefined') {
  var exports = {};
}
if (typeof module === 'undefined') {
  var module = { exports: exports };
}
`;
            }
            return '';
          },
          // 确保变量名不会被过度压缩导致冲突
          generatedCode: {
            constBindings: true
          },
          manualChunks: (id) => {
            // React 核心库
            if (id.includes('react-dom')) {
              return 'react-dom';
            }
            if (id.includes('react') && !id.includes('react-dom')) {
              return 'react';
            }
            
            // Antd 相关
            if (id.includes('@ant-design/icons')) {
              return 'antd-icons';
            }
            if (id.includes('antd')) {
              return 'antd-core';
            }
            
            // 图表库
            if (id.includes('echarts-for-react')) {
              return 'echarts-react';
            }
            if (id.includes('echarts')) {
              return 'echarts-core';
            }
            
            // Mermaid 和 Cytoscape - 放在一起
            if (id.includes('mermaid') || id.includes('cytoscape')) {
              return 'mermaid';
            }
            
            // D3
            if (id.includes('d3')) {
              return 'd3';
            }
            
            // 工具库
            if (id.includes('lodash')) {
              return 'lodash';
            }
            if (id.includes('dayjs')) {
              return 'dayjs';
            }
            
            // 国际化
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n';
            }
            
            // 路由
            if (id.includes('react-router')) {
              return 'router';
            }
            
            // 状态管理
            if (id.includes('redux') || id.includes('@reduxjs')) {
              return 'redux';
            }
            
            // 样式
            if (id.includes('styled-components')) {
              return 'styled-components';
            }
            if (id.includes('emotion')) {
              return 'emotion';
            }
            
            // 数学库
            if (id.includes('katex') || id.includes('mathjax')) {
              return 'math';
            }
            
            // 媒体处理 - 分离出来避免冲突
            if (id.includes('pdf-lib') || id.includes('pdfjs') || id.includes('canvas')) {
              return 'pdf-utils';
            }
            
            // 其他媒体相关
            if (id.includes('image') || id.includes('media') || id.includes('file-saver')) {
              return 'media-utils';
            }
            
            // 其他第三方库
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },
    define: {
      // 确保全局变量正确定义
      global: 'globalThis',
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'antd',
        '@ant-design/icons',
        'react-router-dom',
        'react-i18next',
        'i18next',
        '@reduxjs/toolkit',
        'react-redux'
      ],
      exclude: [
        'mermaid'
      ]
    }
  }
})
