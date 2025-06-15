/**
 * 设置页面标题
 * @param title 页面标题
 * @param suffix 标题后缀，默认为应用名称
 */
export const setPageTitle = (title: string, suffix?: string) => {
  const appTitle = import.meta.env.VITE_APP_TITLE || '通用平面化AI运维系统';
  const finalSuffix = suffix || appTitle;
  
  if (title) {
    document.title = `${title} - ${finalSuffix}`;
  } else {
    document.title = finalSuffix;
  }
};

/**
 * 格式化日期
 * @param date 日期
 * @param format 格式，默认为 'YYYY-MM-DD HH:mm:ss'
 */
export const formatDate = (date: Date | string, format = 'YYYY-MM-DD HH:mm:ss'): string => {
  const d = new Date(date);
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间（毫秒）
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * 节流函数
 * @param func 要节流的函数
 * @param wait 等待时间（毫秒）
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  };
};

// 导出平面相关工具函数
export * from './planeUtils';
export * from './planeColors';
