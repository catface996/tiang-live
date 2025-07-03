/**
 * API通信统一类型定义
 * 用于前后端数据交互的标准化接口
 */

// ==================== 基础类型 ====================

/**
 * 通用状态枚举
 */
export type Status = 'active' | 'inactive' | 'warning' | 'error' | 'pending' | 'maintenance';

/**
 * 通用响应结构
 */
export interface ApiResponse<T = any> {
  success: boolean;
  code: number;
  message: string;
  data: T;
  timestamp: string;
  requestId: string;
}

/**
 * 分页请求参数
 */
export interface PaginationRequest {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * 分页响应结构
 */
export interface PaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==================== 实体相关类型 ====================

/**
 * 实体基础信息
 */
export interface Entity {
  id: string;
  name: string;
  type: string;
  status: Status;
  description?: string;
  tags?: string[];
  properties: Record<string, any>;
  metadata: {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    version: number;
  };
}

/**
 * 实体创建请求
 */
export interface CreateEntityRequest {
  name: string;
  type: string;
  description?: string;
  tags?: string[];
  properties?: Record<string, any>;
}

/**
 * 实体更新请求
 */
export interface UpdateEntityRequest {
  name?: string;
  description?: string;
  tags?: string[];
  properties?: Record<string, any>;
  status?: Status;
}

/**
 * 实体查询请求
 */
export interface EntityQueryRequest extends PaginationRequest {
  name?: string;
  type?: string;
  status?: Status;
  tags?: string[];
  createdAfter?: string;
  createdBefore?: string;
}

// ==================== Agent相关类型 ====================

/**
 * Agent基础信息
 */
export interface Agent {
  id: string;
  name: string;
  type: string;
  status: Status;
  description?: string;
  agentType: 'monitoring' | 'security' | 'performance' | 'automation' | 'analysis' | 'custom';
  capabilities: string[];
  version: string;
  configuration: Record<string, any>;
  resources: {
    cpu: number;
    memory: number;
    storage: number;
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    lastActive: string;
    deployedAt: string;
    createdBy: string;
  };
}

/**
 * Agent创建请求
 */
export interface CreateAgentRequest {
  name: string;
  type: string;
  description?: string;
  agentType: Agent['agentType'];
  capabilities: string[];
  configuration?: Record<string, any>;
  resources?: Partial<Agent['resources']>;
}

/**
 * Agent更新请求
 */
export interface UpdateAgentRequest {
  name?: string;
  description?: string;
  status?: Status;
  capabilities?: string[];
  configuration?: Record<string, any>;
  resources?: Partial<Agent['resources']>;
}

/**
 * Agent查询请求
 */
export interface AgentQueryRequest extends PaginationRequest {
  name?: string;
  type?: string;
  agentType?: Agent['agentType'];
  status?: Status;
  capabilities?: string[];
}

// ==================== 关系相关类型 ====================

/**
 * 实体依赖关系
 */
export interface EntityDependency {
  id: string;
  source: string;
  target: string;
  type:
    | 'depends_on'
    | 'provides_to'
    | 'connects_to'
    | 'uses'
    | 'routes_to'
    | 'stores_in'
    | 'reads_from'
    | 'writes_to'
    | 'monitors'
    | 'backs_up';
  strength: number;
  description?: string;
  properties?: Record<string, any>;
  metadata: {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
  };
}

/**
 * 实体与Agent关系
 */
export interface EntityAgentRelation {
  id: string;
  entityId: string;
  agentId: string;
  relationType: 'manages' | 'monitors' | 'controls' | 'analyzes' | 'protects' | 'optimizes';
  strength: number;
  description?: string;
  configuration?: Record<string, any>;
  metadata: {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    lastActive: string;
  };
}

/**
 * 关系创建请求
 */
export interface CreateDependencyRequest {
  source: string;
  target: string;
  type: EntityDependency['type'];
  strength?: number;
  description?: string;
  properties?: Record<string, any>;
}

/**
 * Agent关系创建请求
 */
export interface CreateAgentRelationRequest {
  entityId: string;
  agentId: string;
  relationType: EntityAgentRelation['relationType'];
  strength?: number;
  description?: string;
  configuration?: Record<string, any>;
}

// ==================== 拓扑相关类型 ====================

/**
 * 拓扑图数据
 */
export interface TopologyData {
  id: string;
  name: string;
  description?: string;
  type: string;
  status: Status;
  entities: Entity[];
  agents: Agent[];
  entityDependencies: EntityDependency[];
  entityAgentRelations: EntityAgentRelation[];
  metadata: {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    version: number;
  };
}

/**
 * 拓扑分析请求
 */
export interface TopologyAnalysisRequest {
  topologyId: string;
  entities: Entity[];
  agents: Agent[];
  entityDependencies: EntityDependency[];
  entityAgentRelations: EntityAgentRelation[];
  analysisOptions: {
    checkHealthStatus: boolean;
    detectAnomalies: boolean;
    performanceAnalysis: boolean;
    securityCheck: boolean;
    dependencyAnalysis: boolean;
    agentEfficiencyAnalysis: boolean;
  };
}

/**
 * 拓扑分析响应
 */
export interface TopologyAnalysisResponse {
  analysisId: string;
  topologyId: string;
  timestamp: string;
  summary: {
    totalEntities: number;
    totalAgents: number;
    totalEntityDependencies: number;
    totalEntityAgentRelations: number;
    overallHealth: 'good' | 'warning' | 'critical';
    healthScore: number;
  };
  entityAnalysis: {
    activeEntities: number;
    warningEntities: number;
    errorEntities: number;
    orphanedEntities: number;
    criticalEntities: Array<{
      id: string;
      name: string;
      connectionCount: number;
      riskLevel: 'low' | 'medium' | 'high';
    }>;
  };
  agentAnalysis: {
    activeAgents: number;
    agentCoverage: string;
    agentEfficiency: Array<{
      id: string;
      name: string;
      managedEntities: number;
      status: Status;
      capabilities: string[];
      utilizationRate: number;
    }>;
    unmanagedEntities: Array<{
      id: string;
      name: string;
      type: string;
      riskLevel: 'low' | 'medium' | 'high';
    }>;
  };
  dependencyAnalysis: {
    totalDependencies: number;
    dependencyTypes: string[];
    circularDependencies: string[];
    strongDependencies: number;
    weakDependencies: number;
    bottlenecks: Array<{
      entityId: string;
      entityName: string;
      severity: 'low' | 'medium' | 'high';
      reason: string;
      suggestion: string;
    }>;
  };
  relationAnalysis: {
    totalRelations: number;
    relationTypes: string[];
    agentUtilization: Array<{
      agentId: string;
      agentName: string;
      relationCount: number;
      utilizationRate: 'idle' | 'normal' | 'active' | 'overloaded';
    }>;
  };
  issues: Array<{
    type: 'error' | 'warning' | 'info';
    severity: 'low' | 'medium' | 'high';
    category: string;
    message: string;
    affectedItems: string[];
    recommendation: string;
  }>;
  recommendations: string[];
  performance: {
    avgResponseTime: string;
    throughput: string;
    errorRate: string;
    availability: string;
  };
  security: {
    vulnerabilities: number;
    securityScore: number;
    recommendations: string[];
  };
}

// ==================== 平面相关类型 ====================

/**
 * 平面定义
 */
export interface Plane {
  id: string;
  name: string;
  level: number;
  color: string;
  borderColor: string;
  description: string;
  bounds: {
    minLevel: number;
    maxLevel: number;
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
  };
}

// ==================== 监控相关类型 ====================

/**
 * 监控指标
 */
export interface MetricData {
  entityId: string;
  agentId?: string;
  metricName: string;
  value: number;
  unit: string;
  timestamp: string;
  tags?: Record<string, string>;
}

/**
 * 告警信息
 */
export interface Alert {
  id: string;
  entityId: string;
  agentId?: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
  resolvedAt?: string;
  metadata?: Record<string, any>;
}

// ==================== 批量操作类型 ====================

/**
 * 批量操作请求
 */
export interface BatchOperationRequest<T> {
  operation: 'create' | 'update' | 'delete';
  items: T[];
  options?: {
    continueOnError: boolean;
    validateOnly: boolean;
  };
}

/**
 * 批量操作响应
 */
export interface BatchOperationResponse<T> {
  success: boolean;
  total: number;
  succeeded: number;
  failed: number;
  results: Array<{
    item: T;
    success: boolean;
    error?: string;
  }>;
}

// ==================== 导出所有类型 ====================

export type {
  // 基础类型
  Status,
  ApiResponse,
  PaginationRequest,
  PaginationResponse,

  // 实体类型
  Entity,
  CreateEntityRequest,
  UpdateEntityRequest,
  EntityQueryRequest,

  // Agent类型
  Agent,
  CreateAgentRequest,
  UpdateAgentRequest,
  AgentQueryRequest,

  // 关系类型
  EntityDependency,
  EntityAgentRelation,
  CreateDependencyRequest,
  CreateAgentRelationRequest,

  // 拓扑类型
  TopologyData,
  TopologyAnalysisRequest,
  TopologyAnalysisResponse,

  // 其他类型
  Plane,
  MetricData,
  Alert,
  BatchOperationRequest,
  BatchOperationResponse
};
