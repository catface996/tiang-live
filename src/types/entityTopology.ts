/**
 * 实体拓扑相关的统一类型定义
 * 所有实体拓扑相关组件都应该从这里导入类型定义
 */

// ==================== 基础实体类型 ====================

/**
 * 实体接口 - 用于业务逻辑和API交互
 */
export interface Entity {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'warning' | 'error';
  description?: string;
  properties?: Record<string, unknown>;
  connections: number;
}

/**
 * 依赖关系接口 - 用于业务逻辑和API交互
 */
export interface Dependency {
  id: string;
  source: string;
  target: string;
  type: 'depends_on' | 'provides_to' | 'connects_to';
  strength: number;
  description?: string;
}

// ==================== D3图形组件类型 ====================

/**
 * D3图形节点接口 - 适配D3RelationshipGraph组件
 */
export interface Node {
  id: string;
  name: string;
  type: string;
  level: number;
  plane: string;
  description: string;
  status: string;
  [key: string]: any;
}

/**
 * D3图形链接接口 - 适配D3RelationshipGraph组件
 */
export interface Link {
  source: string;
  target: string;
  type: string;
  strength: number;
}

/**
 * 平面接口 - 用于分层显示
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
}

/**
 * D3图形数据接口 - 传递给D3RelationshipGraph组件的完整数据结构
 */
export interface GraphData {
  planes: Plane[];
  nodes: Node[];
  links: Link[];
  metadata: {
    levels: Array<{
      level: number;
      name: string;
      color: string;
    }>;
    relationTypes: Array<{
      type: string;
      description: string;
      color: string;
      strokeWidth: number;
    }>;
  };
}

// ==================== 拓扑数据类型 ====================

/**
 * 拓扑数据接口 - 主要的数据容器
 */
export interface TopologyData {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'active' | 'inactive' | 'warning' | 'error';
  plane: string;
  tags: string[];
  stats: {
    nodeCount: number;
    linkCount: number;
    healthScore: number;
    lastUpdated: string;
  };
  entities: Entity[];
  dependencies: Dependency[];
  // 适配D3RelationshipGraph的数据
  graphData?: GraphData;
}

// ==================== Agent相关类型 ====================

/**
 * Agent接口
 */
export interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'warning' | 'error';
  description: string;
  capabilities: string[];
  version: string;
  lastActive: string;
}

/**
 * 实体-Agent绑定关系
 */
export interface EntityAgentBinding {
  id: string;
  entityId: string;
  agentId: string;
  bindingType: 'monitoring' | 'management' | 'analysis' | 'automation';
  createdAt: string;
}

// ==================== 分页和响应类型 ====================

/**
 * 分页信息接口
 */
export interface PaginationInfo {
  current: number;
  pageSize: number;
  total: number;
  totalPages?: number;
}

/**
 * API响应基础接口
 */
export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

/**
 * 分页响应接口
 */
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// ==================== 数据转换工具类型 ====================

/**
 * 实体到节点的转换配置
 */
export interface EntityToNodeConfig {
  defaultLevel?: number;
  defaultPlane?: string;
  statusMapping?: Record<string, string>;
}

/**
 * 依赖关系到链接的转换配置
 */
export interface DependencyToLinkConfig {
  strengthMapping?: Record<string, number>;
  typeMapping?: Record<string, string>;
}

// ==================== 组件Props类型 ====================

/**
 * 删除实体Modal的Props
 */
export interface DeleteEntityModalProps {
  visible: boolean;
  entity: Entity | null;
  dependencies: Dependency[];
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

/**
 * 选择实体Modal的Props
 */
export interface SelectEntityModalProps {
  visible: boolean;
  entities: Entity[];
  selectedEntityIds: string[];
  loading: boolean;
  pagination: PaginationInfo;
  onConfirm: () => void;
  onCancel: () => void;
  onSelectionChange: (selectedIds: string[]) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onPaginationChange: (page: number, pageSize?: number) => void;
  getEntityTypeLabel?: (typeValue: string) => string;
}

/**
 * 添加依赖关系Modal的Props
 */
export interface AddDependencyModalProps {
  visible: boolean;
  entities: Entity[];
  dependencies: Dependency[];
  sourceEntityId: string;
  targetEntityId: string;
  relationshipType: string;
  onConfirm: () => void;
  onCancel: () => void;
  onSourceChange: (value: string) => void;
  onTargetChange: (value: string) => void;
  onRelationshipTypeChange: (value: string) => void;
  onSwapEntities: () => void;
}

/**
 * 拓扑头部组件的Props
 */
export interface TopologyHeaderProps {
  topologyData: TopologyData;
  onRefresh: () => void;
}

/**
 * 数据标签页组件的Props
 */
export interface DataTabsProps {
  entities: Entity[];
  dependencies: Dependency[];
  onDeleteEntity: (entity: Entity) => void;
  onDeleteDependency: (dependency: Dependency) => void;
  onAddEntity: () => void;
  onAddDependency: () => void;
  onAgentsClick: (entity: Entity) => void;
}

/**
 * D3关系图组件的Props
 */
export interface EntityD3RelationshipGraphProps {
  entities: Entity[];
  dependencies: Dependency[];
  graphData?: GraphData;
  onNodeClick?: (node: Node) => void;
  onLinkClick?: (link: Link) => void;
  config?: {
    width?: number;
    height?: number;
    entityToNodeConfig?: EntityToNodeConfig;
    dependencyToLinkConfig?: DependencyToLinkConfig;
  };
}

// ==================== 常量定义 ====================

/**
 * 实体状态常量
 */
export const ENTITY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  WARNING: 'warning',
  ERROR: 'error'
} as const;

/**
 * 依赖关系类型常量
 */
export const DEPENDENCY_TYPE = {
  DEPENDS_ON: 'depends_on',
  PROVIDES_TO: 'provides_to',
  CONNECTS_TO: 'connects_to'
} as const;

/**
 * Agent绑定类型常量
 */
export const BINDING_TYPE = {
  MONITORING: 'monitoring',
  MANAGEMENT: 'management',
  ANALYSIS: 'analysis',
  AUTOMATION: 'automation'
} as const;

/**
 * 默认的关系类型配置
 */
export const DEFAULT_RELATION_TYPES = [
  {
    type: 'depends_on',
    description: '依赖于',
    color: '#1890ff',
    strokeWidth: 2
  },
  {
    type: 'provides_to',
    description: '提供给',
    color: '#52c41a',
    strokeWidth: 2
  },
  {
    type: 'connects_to',
    description: '连接到',
    color: '#faad14',
    strokeWidth: 2
  }
];

/**
 * 默认的层级配置
 */
export const DEFAULT_LEVELS = [
  {
    level: 1,
    name: '应用层',
    color: '#e6f7ff'
  },
  {
    level: 2,
    name: '服务层',
    color: '#f6ffed'
  },
  {
    level: 3,
    name: '数据层',
    color: '#fff7e6'
  }
];

// ==================== 类型守卫函数 ====================

/**
 * 检查是否为有效的实体
 */
export function isValidEntity(obj: any): obj is Entity {
  return obj && 
         typeof obj.id === 'string' && 
         typeof obj.name === 'string' && 
         typeof obj.type === 'string' &&
         typeof obj.connections === 'number';
}

/**
 * 检查是否为有效的依赖关系
 */
export function isValidDependency(obj: any): obj is Dependency {
  return obj && 
         typeof obj.id === 'string' && 
         typeof obj.source === 'string' && 
         typeof obj.target === 'string' &&
         typeof obj.strength === 'number';
}

/**
 * 检查是否为有效的拓扑数据
 */
export function isValidTopologyData(obj: any): obj is TopologyData {
  return obj && 
         typeof obj.id === 'string' && 
         typeof obj.name === 'string' && 
         Array.isArray(obj.entities) &&
         Array.isArray(obj.dependencies);
}
