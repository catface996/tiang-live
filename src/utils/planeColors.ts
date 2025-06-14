// 平面颜色配置 - 确保所有组件中平面颜色的一致性

export interface PlaneColorConfig {
  gradient: string;
  primary: string;
  secondary: string;
  light: string;
  name: string;
}

// 统一的平面颜色配置
export const PLANE_COLORS: Record<number, PlaneColorConfig> = {
  1: {
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    primary: '#4facfe',
    secondary: '#00f2fe',
    light: '#e6f7ff',
    name: '基础设施'
  },
  2: {
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    primary: '#f093fb',
    secondary: '#f5576c',
    light: '#fff0f6',
    name: '中间件'
  },
  3: {
    gradient: 'linear-gradient(135deg, #45b7d1 0%, #96c93d 100%)',
    primary: '#45b7d1',
    secondary: '#96c93d',
    light: '#f0f9ff',
    name: '业务系统'
  },
  4: {
    gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
    primary: '#4ecdc4',
    secondary: '#44a08d',
    light: '#e6fffb',
    name: '业务链路'
  },
  5: {
    gradient: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)',
    primary: '#ffd700',
    secondary: '#ffb347',
    light: '#fffbe6',
    name: '业务场景'
  }
};

// 根据平面ID获取颜色配置
export const getPlaneColorById = (planeId: string): PlaneColorConfig => {
  const levelMap: Record<string, number> = {
    'infrastructure': 1,
    'middleware': 2,
    'business-system': 3,
    'business-chain': 4,
    'business-scenario': 5
  };
  
  const level = levelMap[planeId] || 1;
  return PLANE_COLORS[level];
};

// 根据层级获取颜色配置
export const getPlaneColorByLevel = (level: number): PlaneColorConfig => {
  return PLANE_COLORS[level] || PLANE_COLORS[1];
};

// 根据层级获取渐变色（向后兼容）
export const getGradientByLevel = (level: number): string => {
  return getPlaneColorByLevel(level).gradient;
};

// 根据平面ID获取渐变色
export const getGradientById = (planeId: string): string => {
  return getPlaneColorById(planeId).gradient;
};

// 根据平面ID获取主色调
export const getPrimaryColorById = (planeId: string): string => {
  return getPlaneColorById(planeId).primary;
};

// 根据平面ID获取浅色背景
export const getLightColorById = (planeId: string): string => {
  return getPlaneColorById(planeId).light;
};
