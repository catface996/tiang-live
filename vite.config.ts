import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据构建命令设置基础路径
  // 开发环境使用根路径，构建时使用GitHub Pages路径
  const base = command === 'build' ? '/tiang-live/' : '/';

  console.log(`Vite配置 - 命令: ${command}, 模式: ${mode}, 基础路径: ${base}`);

  return {
    plugins: [react()],
    base,
    // 开发服务器配置
    server: {
      port: 5173,
      proxy: {
        // 代理所有 /api 请求到后端服务
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('🔴 Proxy error:', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('🚀 Proxying request:', req.method, req.url, '→', proxyReq.getHeader('host') + proxyReq.path);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('✅ Proxy response:', req.method, req.url, '→', proxyRes.statusCode);
            });
          }
        }
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            antd: ['antd', '@ant-design/icons'],
            charts: ['echarts', 'echarts-for-react']
          }
        }
      }
    }
  };
});
