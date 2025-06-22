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
  }
})
