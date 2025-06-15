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
    name: 'L1层级'
  },
  2: {
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    primary: '#f093fb',
    secondary: '#f5576c',
    light: '#fff0f6',
    name: 'L2层级'
  },
  3: {
    gradient: 'linear-gradient(135deg, #45b7d1 0%, #96c93d 100%)',
    primary: '#45b7d1',
    secondary: '#96c93d',
    light: '#f0f9ff',
    name: 'L3层级'
  },
  4: {
    gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
    primary: '#4ecdc4',
    secondary: '#44a08d',
    light: '#e6fffb',
    name: 'L4层级'
  },
  5: {
    gradient: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)',
    primary: '#ffd700',
    secondary: '#ffb347',
    light: '#fffbe6',
    name: 'L5层级'
  },
  6: {
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    primary: '#667eea',
    secondary: '#764ba2',
    light: '#f0f2ff',
    name: 'L6层级'
  },
  7: {
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    primary: '#f093fb',
    secondary: '#f5576c',
    light: '#fff0f6',
    name: 'L7层级'
  },
  8: {
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    primary: '#43e97b',
    secondary: '#38f9d7',
    light: '#f0fff4',
    name: 'L8层级'
  },
  9: {
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    primary: '#fa709a',
    secondary: '#fee140',
    light: '#fff5f5',
    name: 'L9层级'
  },
  10: {
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    primary: '#a8edea',
    secondary: '#fed6e3',
    light: '#f0ffff',
    name: 'L10层级'
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
