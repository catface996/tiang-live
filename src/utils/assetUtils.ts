/**
 * 静态资源路径工具函数
 * 处理开发环境和生产环境的资源路径差异
 */

/**
 * 获取静态资源的完整路径
 * @param assetPath 资源相对路径，如 '/sz-logo.png'
 * @returns 完整的资源路径
 */
export const getAssetPath = (assetPath: string): string => {
  // 确保路径以 / 开头
  const normalizedPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  
  // 在生产环境中添加基础路径
  if (import.meta.env.PROD) {
    return `/tiang-live${normalizedPath}`;
  }
  
  // 开发环境直接返回原路径
  return normalizedPath;
};

/**
 * 获取基础路径
 * @returns 基础路径字符串
 */
export const getBasePath = (): string => {
  return import.meta.env.PROD ? '/tiang-live' : '';
};

/**
 * 常用静态资源路径
 */
export const ASSETS = {
  LOGO: getAssetPath('/sz-logo.png'),
  FAVICON: getAssetPath('/vite.svg')
} as const;

/**
 * 获取图片资源路径
 * @param imageName 图片文件名
 * @returns 完整的图片路径
 */
export const getImagePath = (imageName: string): string => {
  return getAssetPath(`/${imageName}`);
};

export default {
  getAssetPath,
  getBasePath,
  getImagePath,
  ASSETS
};
