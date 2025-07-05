import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  // 临时禁用严格模式来测试是否是重复调用的原因
  // <StrictMode>
  <App />
  // </StrictMode>
);
