import type { 
  PlaneDefinition, 
  PlaneInstance, 
  PlaneTopology, 
  PlaneMetrics,
  PlaneRelationship,
  PaginatedResponse,
  EntityHealthStats
} from '../types';
import { PLANE_COLORS } from '../utils/planeColors';

// 计算平面状态的工具函数
const calculatePlaneStatus = (entityHealth: EntityHealthStats): 'ACTIVE' | 'WARNING' | 'ERROR' => {
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

// 生成随机实体健康状态数据
const generateEntityHealth = (totalEntities: number): EntityHealthStats => {
  // 模拟不同的健康状态分布
  const errorRate = Math.random() * 0.15; // 0-15% 异常
  const warningRate = Math.random() * 0.25; // 0-25% 告警
  
  const error = Math.floor(totalEntities * errorRate);
  const warning = Math.floor(totalEntities * warningRate);
  const healthy = totalEntities - error - warning;
  
  return {
    healthy: Math.max(0, healthy),
    warning,
    error,
    total: totalEntities
  };
};

// 模拟平面定义数据
const mockPlaneDefinitions: PlaneDefinition[] = [
  {
    id: 'infrastructure',
    name: 'infrastructure',
    displayName: '基础设施平面',
    description: '管理底层基础设施资源，包括服务器、网络、存储、容器等物理和虚拟资源',
    level: 1,
    dependencies: [],
    entityHealth: {
      healthy: 312,
      warning: 0,
      error: 0,
      total: 312
    },
    config: {
      icon: '🏗️',
      color: PLANE_COLORS[1].primary,
      theme: 'infrastructure',
      maxInstances: 300,
      autoScaling: false,
      monitoring: {
        enabled: true,
        alertThreshold: 90,
      },
      security: {
        accessControl: true,
        encryption: true,
      },
      healthThresholds: {
        warningThreshold: 0.2,
        errorThreshold: 0.1,
      },
    },
    status: 'ACTIVE',
    createdAt: '2024-01-19T08:00:00Z',
    updatedAt: '2024-06-14T07:10:00Z',
  },
  {
    id: 'middleware',
    name: 'middleware',
    displayName: '中间件平面',
    description: '管理各种中间件服务，如消息队列、缓存、数据库、API网关等基础服务组件',
    level: 2,
    parentPlaneId: 'infrastructure',
    dependencies: ['infrastructure'],
    entityHealth: {
      healthy: 171,
      warning: 18,
      error: 0,
      total: 189
    },
    config: {
      icon: '⚙️',
      color: PLANE_COLORS[2].primary,
      theme: 'middleware',
      maxInstances: 150,
      autoScaling: true,
      monitoring: {
        enabled: true,
        alertThreshold: 85,
      },
      security: {
        accessControl: true,
        encryption: false,
      },
      healthThresholds: {
        warningThreshold: 0.2,
        errorThreshold: 0.1,
      },
    },
    status: 'WARNING',
    createdAt: '2024-01-18T08:00:00Z',
    updatedAt: '2024-06-14T08:20:00Z',
  },
  {
    id: 'business-system',
    name: 'business-system',
    displayName: '业务系统平面',
    description: '包含各个业务系统和应用服务，如用户管理系统、订单系统、支付系统等。同时依赖中间件服务和基础设施资源',
    level: 3,
    dependencies: ['middleware', 'infrastructure'], // 业务系统同时依赖中间件和基础设施
    entityHealth: {
      healthy: 206,
      warning: 20,
      error: 8,
      total: 234
    },
    config: {
      icon: '💼',
      color: PLANE_COLORS[3].primary,
      theme: 'business-system',
      maxInstances: 200,
      autoScaling: true,
      monitoring: {
        enabled: true,
        alertThreshold: 70,
      },
      security: {
        accessControl: true,
        encryption: true,
      },
      healthThresholds: {
        warningThreshold: 0.2,
        errorThreshold: 0.1,
      },
    },
    status: 'WARNING',
    createdAt: '2024-01-17T08:00:00Z',
    updatedAt: '2024-06-14T11:45:00Z',
  },
  {
    id: 'business-chain',
    name: 'business-chain',
    displayName: '业务链路平面',
    description: '管理业务流程中的各个环节和步骤，定义业务流程的执行路径和依赖关系。依赖业务系统和中间件平面',
    level: 4,
    dependencies: ['business-system', 'middleware'], // 业务链路依赖业务系统和中间件
    entityHealth: {
      healthy: 144,
      warning: 12,
      error: 0,
      total: 156
    },
    config: {
      icon: '🔗',
      color: PLANE_COLORS[4].primary,
      theme: 'business-chain',
      maxInstances: 100,
      autoScaling: true,
      monitoring: {
        enabled: true,
        alertThreshold: 75,
      },
      security: {
        accessControl: true,
        encryption: true,
      },
      healthThresholds: {
        warningThreshold: 0.2,
        errorThreshold: 0.1,
      },
    },
    status: 'ACTIVE',
    createdAt: '2024-01-16T08:00:00Z',
    updatedAt: '2024-06-14T09:15:00Z',
  },
  {
    id: 'business-scenario',
    name: 'business-scenario',
    displayName: '业务场景平面',
    description: '定义和管理各种业务场景，如用户注册、订单处理、支付流程等核心业务流程。依赖业务链路、业务系统和基础设施',
    level: 5,
    dependencies: ['business-chain', 'business-system', 'infrastructure'], // 业务场景依赖多个平面
    entityHealth: {
      healthy: 45,
      warning: 0,
      error: 0,
      total: 45
    },
    config: {
      icon: '🎯',
      color: PLANE_COLORS[5].primary,
      theme: 'business-scenario',
      maxInstances: 50,
      autoScaling: true,
      monitoring: {
        enabled: true,
        alertThreshold: 80,
      },
      security: {
        accessControl: true,
        encryption: true,
      },
      healthThresholds: {
        warningThreshold: 0.2,
        errorThreshold: 0.1,
      },
    },
    status: 'WARNING',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-06-14T10:30:00Z',
  },
];

// 根据实体健康状态自动计算平面状态
mockPlaneDefinitions.forEach(plane => {
  plane.status = calculatePlaneStatus(plane.entityHealth);
});

// 模拟平面关系数据 - 支持复杂的多对多依赖关系
const mockPlaneRelationships: PlaneRelationship[] = [
  // 基础依赖关系
  {
    id: 'rel-1',
    sourceId: 'infrastructure',
    targetId: 'middleware',
    type: 'CONTAINS',
    properties: { strength: 'critical', description: '基础设施支撑中间件服务' },
  },
  
  // 业务系统的多重依赖
  {
    id: 'rel-2',
    sourceId: 'middleware',
    targetId: 'business-system',
    type: 'CONTAINS',
    properties: { strength: 'strong', description: '中间件支撑业务系统' },
  },
  {
    id: 'rel-3',
    sourceId: 'infrastructure',
    targetId: 'business-system',
    type: 'CONTAINS',
    properties: { strength: 'medium', description: '基础设施直接支撑业务系统' },
  },
  
  // 业务链路的多重依赖
  {
    id: 'rel-4',
    sourceId: 'business-system',
    targetId: 'business-chain',
    type: 'CONTAINS',
    properties: { strength: 'strong', description: '业务系统支撑业务链路' },
  },
  {
    id: 'rel-5',
    sourceId: 'middleware',
    targetId: 'business-chain',
    type: 'CONTAINS',
    properties: { strength: 'medium', description: '中间件直接支撑业务链路' },
  },
  
  // 业务场景的复杂依赖
  {
    id: 'rel-6',
    sourceId: 'business-chain',
    targetId: 'business-scenario',
    type: 'CONTAINS',
    properties: { strength: 'strong', description: '业务链路支撑业务场景' },
  },
  {
    id: 'rel-7',
    sourceId: 'business-system',
    targetId: 'business-scenario',
    type: 'CONTAINS',
    properties: { strength: 'medium', description: '业务系统直接支撑业务场景' },
  },
  {
    id: 'rel-8',
    sourceId: 'infrastructure',
    targetId: 'business-scenario',
    type: 'CONTAINS',
    properties: { strength: 'weak', description: '基础设施间接支撑业务场景' },
  },
];

// 模拟平面指标数据
const mockPlaneMetrics: PlaneMetrics[] = [
  {
    planeId: 'infrastructure',
    instanceCount: 89,
    entityCount: 312,
    relationshipCount: 245,
    healthScore: 100,
    entityHealth: {
      healthy: 312,
      warning: 0,
      error: 0,
      total: 312
    },
    performanceMetrics: {
      cpu: 20,
      memory: 30,
      network: 25,
      storage: 35,
    },
    timestamp: new Date().toISOString(),
  },
  {
    planeId: 'middleware',
    instanceCount: 67,
    entityCount: 189,
    relationshipCount: 134,
    healthScore: 90,
    entityHealth: {
      healthy: 171,
      warning: 18,
      error: 0,
      total: 189
    },
    performanceMetrics: {
      cpu: 35,
      memory: 50,
      network: 40,
      storage: 45,
    },
    timestamp: new Date().toISOString(),
  },
  {
    planeId: 'business-system',
    instanceCount: 45,
    entityCount: 234,
    relationshipCount: 167,
    healthScore: 75,
    entityHealth: {
      healthy: 206,
      warning: 20,
      error: 8,
      total: 234
    },
    performanceMetrics: {
      cpu: 70,
      memory: 75,
      network: 55,
      storage: 65,
    },
    timestamp: new Date().toISOString(),
  },
  {
    planeId: 'business-chain',
    instanceCount: 28,
    entityCount: 156,
    relationshipCount: 89,
    healthScore: 92,
    entityHealth: {
      healthy: 144,
      warning: 12,
      error: 0,
      total: 156
    },
    performanceMetrics: {
      cpu: 45,
      memory: 60,
      network: 35,
      storage: 50,
    },
    timestamp: new Date().toISOString(),
  },
  {
    planeId: 'business-scenario',
    instanceCount: 12,
    entityCount: 45,
    relationshipCount: 23,
    healthScore: 100,
    entityHealth: {
      healthy: 45,
      warning: 0,
      error: 0,
      total: 45
    },
    performanceMetrics: {
      cpu: 25,
      memory: 40,
      network: 15,
      storage: 30,
    },
    timestamp: new Date().toISOString(),
  },
];

// 模拟服务类
export class MockPlaneService {
  // 模拟网络延迟
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getPlaneDefinitions(): Promise<PaginatedResponse<PlaneDefinition>> {
    await this.delay();
    return {
      data: mockPlaneDefinitions,
      total: mockPlaneDefinitions.length,
      page: 1,
      pageSize: 10,
      hasNext: false,
      hasPrev: false,
    };
  }

  async getPlaneTopology(): Promise<PlaneTopology> {
    await this.delay();
    return {
      planes: mockPlaneDefinitions,
      relationships: mockPlaneRelationships,
    };
  }

  async getAllPlanesMetrics(): Promise<PlaneMetrics[]> {
    await this.delay();
    return mockPlaneMetrics;
  }

  async getPlaneDefinition(id: string): Promise<PlaneDefinition> {
    await this.delay();
    const plane = mockPlaneDefinitions.find(p => p.id === id);
    if (!plane) {
      throw new Error(`Plane with id ${id} not found`);
    }
    return plane;
  }
}

export const mockPlaneService = new MockPlaneService();
