import type { EntityHealthStats, PlaneStatus } from '../types';

/**
 * 根据实体健康状态计算平面状态
 * @param entityHealth 实体健康状态统计
 * @param thresholds 阈值配置（已废弃，保留兼容性）
 * @returns 平面状态
 */
export const calculatePlaneStatus = (
  entityHealth: EntityHealthStats,
  thresholds?: {
    warningThreshold: number; // 告警阈值（已废弃）
    errorThreshold: number;   // 异常阈值（已废弃）
  }
): PlaneStatus => {
  const { healthy, warning, error, total } = entityHealth;
  
  if (total === 0) return 'ACTIVE';
  
  // 新的判断逻辑：
  // 1. 如果有异常实体，平面状态为异常
  if (error > 0) {
    return 'ERROR';
  }
  
  // 2. 如果有告警实体，平面状态为告警
  if (warning > 0) {
    return 'WARNING';
  }
  
  // 3. 否则平面状态为健康
  return 'ACTIVE';
};

/**
 * 计算实体健康状态百分比
 * @param entityHealth 实体健康状态统计
 * @returns 百分比对象
 */
export const calculateHealthPercentages = (entityHealth: EntityHealthStats) => {
  const { healthy, warning, error, total } = entityHealth;
  
  if (total === 0) {
    return { healthyPercent: 0, warningPercent: 0, errorPercent: 0 };
  }
  
  return {
    healthyPercent: (healthy / total) * 100,
    warningPercent: (warning / total) * 100,
    errorPercent: (error / total) * 100,
  };
};

/**
 * 获取平面状态的显示信息
 * @param status 平面状态
 * @returns 状态显示信息
 */
export const getPlaneStatusInfo = (status: PlaneStatus) => {
  const statusMap = {
    ACTIVE: {
      text: '健康',
      color: '#52c41a',
      bgColor: '#f6ffed',
      borderColor: '#b7eb8f',
    },
    WARNING: {
      text: '告警',
      color: '#faad14',
      bgColor: '#fffbe6',
      borderColor: '#ffe58f',
    },
    ERROR: {
      text: '异常',
      color: '#ff4d4f',
      bgColor: '#fff2f0',
      borderColor: '#ffccc7',
    },
    MAINTENANCE: {
      text: '维护中',
      color: '#1890ff',
      bgColor: '#f0f5ff',
      borderColor: '#adc6ff',
    },
  };
  
  return statusMap[status] || statusMap.ACTIVE;
};

/**
 * 生成随机实体健康状态数据（用于测试）
 * @param totalEntities 总实体数
 * @param healthyRate 健康实体比例
 * @returns 实体健康状态统计
 */
export const generateRandomEntityHealth = (
  totalEntities: number,
  healthyRate: number = 0.8
): EntityHealthStats => {
  const healthy = Math.floor(totalEntities * healthyRate);
  const remaining = totalEntities - healthy;
  const error = Math.floor(remaining * Math.random() * 0.3); // 最多30%的剩余实体为异常
  const warning = remaining - error;
  
  return {
    healthy: Math.max(0, healthy),
    warning: Math.max(0, warning),
    error: Math.max(0, error),
    total: totalEntities,
  };
};
