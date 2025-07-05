/**
 * 实体拓扑数据转换工具函数
 * 用于在不同数据格式之间进行转换
 */

import type {
  Entity,
  Dependency,
  Node,
  Link,
  GraphData,
  Plane,
  EntityToNodeConfig,
  DependencyToLinkConfig,
  DEFAULT_RELATION_TYPES,
  DEFAULT_LEVELS
} from '../types/entityTopology';

/**
 * 将实体转换为D3图形节点
 */
export function entityToNode(entity: Entity, config?: EntityToNodeConfig): Node {
  const {
    defaultLevel = 1,
    defaultPlane = 'default',
    statusMapping = {}
  } = config || {};

  return {
    id: entity.id,
    name: entity.name,
    type: entity.type,
    level: defaultLevel,
    plane: defaultPlane,
    description: entity.description || '',
    status: statusMapping[entity.status] || entity.status,
    // 保留原始实体的所有属性
    ...entity
  };
}

/**
 * 将依赖关系转换为D3图形链接
 */
export function dependencyToLink(dependency: Dependency, config?: DependencyToLinkConfig): Link {
  const {
    strengthMapping = {},
    typeMapping = {}
  } = config || {};

  return {
    source: dependency.source,
    target: dependency.target,
    type: typeMapping[dependency.type] || dependency.type,
    strength: strengthMapping[dependency.type] || dependency.strength
  };
}

/**
 * 将实体和依赖关系转换为完整的GraphData
 */
export function transformToGraphData(
  entities: Entity[],
  dependencies: Dependency[],
  options?: {
    entityToNodeConfig?: EntityToNodeConfig;
    dependencyToLinkConfig?: DependencyToLinkConfig;
    customPlanes?: Plane[];
    customLevels?: Array<{ level: number; name: string; color: string }>;
    customRelationTypes?: Array<{ type: string; description: string; color: string; strokeWidth: number }>;
  }
): GraphData {
  const {
    entityToNodeConfig,
    dependencyToLinkConfig,
    customPlanes = [],
    customLevels = DEFAULT_LEVELS,
    customRelationTypes = DEFAULT_RELATION_TYPES
  } = options || {};

  // 转换实体为节点
  const nodes = entities.map(entity => entityToNode(entity, entityToNodeConfig));

  // 转换依赖关系为链接
  const links = dependencies.map(dependency => dependencyToLink(dependency, dependencyToLinkConfig));

  // 生成默认平面（如果没有自定义平面）
  const planes = customPlanes.length > 0 ? customPlanes : generateDefaultPlanes(nodes);

  return {
    planes,
    nodes,
    links,
    metadata: {
      levels: customLevels,
      relationTypes: customRelationTypes
    }
  };
}

/**
 * 根据节点生成默认平面
 */
function generateDefaultPlanes(nodes: Node[]): Plane[] {
  // 获取所有唯一的平面
  const planeNames = [...new Set(nodes.map(node => node.plane))];
  
  return planeNames.map((planeName, index) => ({
    id: `plane_${index}`,
    name: planeName,
    level: index + 1,
    color: getPlaneColor(index),
    borderColor: getPlaneBorderColor(index),
    description: `${planeName} 平面`,
    bounds: {
      minLevel: index + 1,
      maxLevel: index + 1
    }
  }));
}

/**
 * 获取平面颜色
 */
function getPlaneColor(index: number): string {
  const colors = [
    '#e6f7ff', // 蓝色
    '#f6ffed', // 绿色
    '#fff7e6', // 橙色
    '#f9f0ff', // 紫色
    '#fff1f0', // 红色
    '#f0f9ff'  // 青色
  ];
  return colors[index % colors.length];
}

/**
 * 获取平面边框颜色
 */
function getPlaneBorderColor(index: number): string {
  const colors = [
    '#1890ff', // 蓝色
    '#52c41a', // 绿色
    '#faad14', // 橙色
    '#722ed1', // 紫色
    '#f5222d', // 红色
    '#13c2c2'  // 青色
  ];
  return colors[index % colors.length];
}

/**
 * 根据实体类型自动分配层级
 */
export function autoAssignLevels(entities: Entity[]): EntityToNodeConfig {
  const typeToLevelMap: Record<string, number> = {
    // 应用层
    'web-app': 1,
    'mobile-app': 1,
    'frontend': 1,
    
    // 服务层
    'api-service': 2,
    'microservice': 2,
    'backend-service': 2,
    'middleware': 2,
    
    // 数据层
    'database': 3,
    'cache': 3,
    'storage': 3,
    'data-warehouse': 3
  };

  return {
    defaultLevel: 2, // 默认服务层
    statusMapping: {
      'active': 'active',
      'inactive': 'inactive',
      'warning': 'warning',
      'error': 'error'
    }
  };
}

/**
 * 根据依赖关系类型自动分配强度
 */
export function autoAssignStrengths(dependencies: Dependency[]): DependencyToLinkConfig {
  const typeToStrengthMap: Record<string, number> = {
    'depends_on': 0.8,
    'provides_to': 0.6,
    'connects_to': 0.4
  };

  return {
    strengthMapping: typeToStrengthMap,
    typeMapping: {
      'depends_on': 'depends_on',
      'provides_to': 'provides_to',
      'connects_to': 'connects_to'
    }
  };
}

/**
 * 验证GraphData的完整性
 */
export function validateGraphData(graphData: GraphData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // 检查节点
  if (!Array.isArray(graphData.nodes)) {
    errors.push('nodes must be an array');
  } else {
    graphData.nodes.forEach((node, index) => {
      if (!node.id) errors.push(`node[${index}] missing id`);
      if (!node.name) errors.push(`node[${index}] missing name`);
    });
  }

  // 检查链接
  if (!Array.isArray(graphData.links)) {
    errors.push('links must be an array');
  } else {
    graphData.links.forEach((link, index) => {
      if (!link.source) errors.push(`link[${index}] missing source`);
      if (!link.target) errors.push(`link[${index}] missing target`);
      
      // 检查链接的源和目标是否存在于节点中
      const sourceExists = graphData.nodes.some(node => node.id === link.source);
      const targetExists = graphData.nodes.some(node => node.id === link.target);
      
      if (!sourceExists) errors.push(`link[${index}] source '${link.source}' not found in nodes`);
      if (!targetExists) errors.push(`link[${index}] target '${link.target}' not found in nodes`);
    });
  }

  // 检查平面
  if (!Array.isArray(graphData.planes)) {
    errors.push('planes must be an array');
  }

  // 检查元数据
  if (!graphData.metadata) {
    errors.push('metadata is required');
  } else {
    if (!Array.isArray(graphData.metadata.levels)) {
      errors.push('metadata.levels must be an array');
    }
    if (!Array.isArray(graphData.metadata.relationTypes)) {
      errors.push('metadata.relationTypes must be an array');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * 获取图形统计信息
 */
export function getGraphStats(graphData: GraphData) {
  const nodesByType = graphData.nodes.reduce((acc, node) => {
    acc[node.type] = (acc[node.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const linksByType = graphData.links.reduce((acc, link) => {
    acc[link.type] = (acc[link.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const nodesByPlane = graphData.nodes.reduce((acc, node) => {
    acc[node.plane] = (acc[node.plane] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalNodes: graphData.nodes.length,
    totalLinks: graphData.links.length,
    totalPlanes: graphData.planes.length,
    nodesByType,
    linksByType,
    nodesByPlane
  };
}
