import type { 
  PlaneDefinition, 
  PlaneInstance, 
  PlaneTopology, 
  PlaneMetrics,
  PlaneRelationship,
  PaginatedResponse,
  EntityHealthStats
} from '../types';

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
      color: '#4facfe',
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
      color: '#f093fb',
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
    description: '包含各个业务系统和应用服务，如用户管理系统、订单系统、支付系统等',
    level: 3,
    parentPlaneId: 'middleware',
    dependencies: ['middleware'],
    entityHealth: {
      healthy: 206,
      warning: 20,
      error: 8,
      total: 234
    },
    config: {
      icon: '💼',
      color: '#45b7d1',
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
    description: '管理业务流程中的各个环节和步骤，定义业务流程的执行路径和依赖关系',
    level: 4,
    parentPlaneId: 'business-system',
    dependencies: ['business-system'],
    entityHealth: {
      healthy: 144,
      warning: 12,
      error: 0,
      total: 156
    },
    config: {
      icon: '🔗',
      color: '#4ecdc4',
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
    description: '定义和管理各种业务场景，如用户注册、订单处理、支付流程等核心业务流程',
    level: 5,
    parentPlaneId: 'business-chain',
    dependencies: ['business-chain'],
    entityHealth: {
      healthy: 45,
      warning: 0,
      error: 0,
      total: 45
    },
    config: {
      icon: '🎯',
      color: '#ffd700',
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

// 模拟平面关系数据
const mockPlaneRelationships: PlaneRelationship[] = [
  {
    id: 'rel-1',
    sourceId: 'infrastructure',
    targetId: 'middleware',
    type: 'CONTAINS',
    properties: { strength: 'critical' },
  },
  {
    id: 'rel-2',
    sourceId: 'middleware',
    targetId: 'business-system',
    type: 'CONTAINS',
    properties: { strength: 'strong' },
  },
  {
    id: 'rel-3',
    sourceId: 'business-system',
    targetId: 'business-chain',
    type: 'CONTAINS',
    properties: { strength: 'strong' },
  },
  {
    id: 'rel-4',
    sourceId: 'business-chain',
    targetId: 'business-scenario',
    type: 'CONTAINS',
    properties: { strength: 'medium' },
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
