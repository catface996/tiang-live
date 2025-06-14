// 平面相关类型定义

export interface PlaneDefinition {
  id: string;
  name: string;
  displayName: string;
  description: string;
  level: number;
  parentPlaneId?: string;
  dependencies: string[];
  config: PlaneConfig;
  status: PlaneStatus;
  entityHealth: EntityHealthStats;
  createdAt: string;
  updatedAt: string;
}

export interface EntityHealthStats {
  healthy: number;
  warning: number;
  error: number;
  total: number;
}

export interface PlaneInstance {
  id: string;
  name: string;
  planeDefinitionId: string;
  metadata: Record<string, any>;
  properties: Record<string, any>;
  status: PlaneInstanceStatus;
  healthScore: number;
  entityCount: number;
  relationshipCount: number;
  entityHealth: EntityHealthStats;
  createdAt: string;
  updatedAt: string;
}

export interface PlaneConfig {
  icon?: string;
  color?: string;
  theme?: string;
  maxInstances?: number;
  autoScaling?: boolean;
  monitoring?: {
    enabled: boolean;
    alertThreshold?: number;
  };
  security?: {
    accessControl: boolean;
    encryption: boolean;
  };
  healthThresholds?: {
    warningThreshold: number; // 告警阈值（异常实体百分比）
    errorThreshold: number;   // 异常阈值（异常实体百分比）
  };
}

export type PlaneStatus = 'ACTIVE' | 'WARNING' | 'ERROR' | 'MAINTENANCE';

export type PlaneInstanceStatus = 'RUNNING' | 'STOPPED' | 'STARTING' | 'STOPPING' | 'ERROR';

export interface PlaneTopology {
  planes: PlaneDefinition[];
  relationships: PlaneRelationship[];
}

export interface PlaneRelationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'DEPENDS_ON' | 'CONTAINS' | 'REFERENCES';
  properties?: Record<string, any>;
}

export interface PlaneMetrics {
  planeId: string;
  instanceCount: number;
  entityCount: number;
  relationshipCount: number;
  healthScore: number;
  entityHealth: EntityHealthStats;
  performanceMetrics: {
    cpu: number;
    memory: number;
    network: number;
    storage: number;
  };
  timestamp: string;
}

// 平面操作相关类型
export interface PlaneOperation {
  type: 'CREATE' | 'UPDATE' | 'DELETE' | 'START' | 'STOP' | 'RESTART';
  planeId: string;
  instanceId?: string;
  parameters?: Record<string, any>;
  userId: string;
  timestamp: string;
}

export interface PlaneOperationResult {
  success: boolean;
  operationId: string;
  message?: string;
  data?: any;
  errors?: string[];
}
