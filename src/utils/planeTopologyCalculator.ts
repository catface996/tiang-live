/**
 * 平面拓扑关系计算工具
 * 根据API返回的平面数据计算依赖拓扑关系
 */

import type { PlaneDefinition, PlaneRelationship } from '../types/plane';
import type { PlaneResponse } from '../services/planeApi';

/**
 * 将API返回的平面数据转换为PlaneDefinition格式
 * @param apiPlanes API返回的平面数据
 * @returns 转换后的平面定义数组
 */
export const convertApiPlanesToDefinitions = (apiPlanes: PlaneResponse[]): PlaneDefinition[] => {
  return apiPlanes.map(plane => ({
    id: plane.id,
    name: plane.name,
    displayName: plane.name,
    description: plane.description || '',
    level: plane.level ? parseInt(plane.level.substring(1)) : 1, // 从"L3"转为数字3
    dependencies: [], // 将在calculateDependencies中填充
    entityHealth: {
      healthy: plane.entities?.filter(e => e.status === 'ACTIVE')?.length || 0,
      warning: plane.entities?.filter(e => e.status === 'WARNING')?.length || 0,
      error: plane.entities?.filter(e => e.status === 'ERROR')?.length || 0,
      total: plane.entityCount || 0
    },
    config: {
      icon: getPlaneTypeIcon(plane.type),
      color: getPlaneTypeColor(plane.type),
      theme: 'default',
      maxInstances: 10,
      autoScaling: false,
      monitoring: { enabled: true, alertThreshold: 80 },
      security: { accessControl: true, encryption: false },
      healthThresholds: { warningThreshold: 0.2, errorThreshold: 0.1 }
    },
    status: mapApiStatusToPlaneStatus(plane.status),
    createdAt: plane.createdAt,
    updatedAt: plane.updatedAt
  }));
};

/**
 * 根据平面类型获取图标
 */
const getPlaneTypeIcon = (type: string): string => {
  const iconMap: Record<string, string> = {
    'BUSINESS': '💼',
    'TECHNICAL': '⚙️',
    'KNOWLEDGE': '📚',
    'WORKFLOW': '🔄'
  };
  return iconMap[type] || '📋';
};

/**
 * 根据平面类型获取颜色
 */
const getPlaneTypeColor = (type: string): string => {
  const colorMap: Record<string, string> = {
    'BUSINESS': '#1890ff',
    'TECHNICAL': '#52c41a',
    'KNOWLEDGE': '#722ed1',
    'WORKFLOW': '#fa8c16'
  };
  return colorMap[type] || '#1890ff';
};

/**
 * 映射API状态到平面状态
 */
const mapApiStatusToPlaneStatus = (apiStatus: string): 'ACTIVE' | 'WARNING' | 'ERROR' | 'MAINTENANCE' => {
  const statusMap: Record<string, 'ACTIVE' | 'WARNING' | 'ERROR' | 'MAINTENANCE'> = {
    'ACTIVE': 'ACTIVE',
    'INACTIVE': 'MAINTENANCE',
    'ARCHIVED': 'MAINTENANCE',
    'WARNING': 'WARNING',
    'ERROR': 'ERROR'
  };
  return statusMap[apiStatus] || 'ACTIVE';
};

/**
 * 计算平面之间的依赖关系
 * 基于平面类型和业务逻辑推断依赖关系
 * @param planes 平面定义数组
 * @returns 依赖关系数组
 */
export const calculatePlaneDependencies = (planes: PlaneDefinition[]): PlaneRelationship[] => {
  const relationships: PlaneRelationship[] = [];
  
  // 按类型分组平面
  const businessPlanes = planes.filter(p => p.name.includes('BUSINESS') || p.level >= 4);
  const technicalPlanes = planes.filter(p => p.name.includes('TECHNICAL') || (p.level >= 2 && p.level < 4));
  const knowledgePlanes = planes.filter(p => p.name.includes('KNOWLEDGE') || p.level === 1);
  const workflowPlanes = planes.filter(p => p.name.includes('WORKFLOW'));
  
  // 规则1: BUSINESS 平面依赖于 TECHNICAL 平面
  businessPlanes.forEach(business => {
    const techDependencies = technicalPlanes
      .sort(() => 0.5 - Math.random()) // 随机排序
      .slice(0, Math.min(2, technicalPlanes.length)); // 取前1-2个
    
    techDependencies.forEach(tech => {
      relationships.push({
        id: `${business.id}-depends-${tech.id}`,
        sourceId: business.id,
        targetId: tech.id,
        type: 'DEPENDS_ON',
        properties: {
          strength: 'STRONG',
          description: `${business.name} 依赖于 ${tech.name}`,
          weight: 0.8
        }
      });
    });
  });
  
  // 规则2: TECHNICAL 平面依赖于 KNOWLEDGE 平面
  technicalPlanes.forEach(tech => {
    const knowledgeDependencies = knowledgePlanes
      .sort(() => 0.5 - Math.random()) // 随机排序
      .slice(0, Math.min(3, knowledgePlanes.length)); // 取前1-3个
    
    knowledgeDependencies.forEach(knowledge => {
      relationships.push({
        id: `${tech.id}-depends-${knowledge.id}`,
        sourceId: tech.id,
        targetId: knowledge.id,
        type: 'DEPENDS_ON',
        properties: {
          strength: 'MEDIUM',
          description: `${tech.name} 依赖于 ${knowledge.name}`,
          weight: 0.6
        }
      });
    });
  });
  
  // 规则3: WORKFLOW 平面编排其他平面
  workflowPlanes.forEach(workflow => {
    const allOtherPlanes = planes.filter(p => p.id !== workflow.id);
    const dependencies = allOtherPlanes
      .sort(() => 0.5 - Math.random()) // 随机排序
      .slice(0, Math.min(2, allOtherPlanes.length)); // 取前1-2个
    
    dependencies.forEach(dep => {
      relationships.push({
        id: `${workflow.id}-orchestrates-${dep.id}`,
        sourceId: workflow.id,
        targetId: dep.id,
        type: 'REFERENCES',
        properties: {
          strength: 'WEAK',
          description: `${workflow.name} 编排 ${dep.name}`,
          weight: 0.4
        }
      });
    });
  });
  
  // 规则4: 基于层级的依赖关系
  // 高层级平面依赖于低层级平面
  planes.forEach(plane => {
    const lowerLevelPlanes = planes.filter(p => 
      p.level < plane.level && 
      p.id !== plane.id &&
      !relationships.some(r => r.sourceId === plane.id && r.targetId === p.id)
    );
    
    // 每个平面最多依赖2个低层级平面
    const dependencies = lowerLevelPlanes
      .sort((a, b) => b.level - a.level) // 优先选择层级较高的
      .slice(0, 2);
    
    dependencies.forEach(dep => {
      relationships.push({
        id: `${plane.id}-level-depends-${dep.id}`,
        sourceId: plane.id,
        targetId: dep.id,
        type: 'DEPENDS_ON',
        properties: {
          strength: 'MEDIUM',
          description: `L${plane.level} ${plane.name} 依赖于 L${dep.level} ${dep.name}`,
          weight: 0.5,
          levelBased: true
        }
      });
    });
  });
  
  return relationships;
};

/**
 * 更新平面定义中的依赖关系字段
 * @param planes 平面定义数组
 * @param relationships 依赖关系数组
 * @returns 更新后的平面定义数组
 */
export const updatePlaneDependencies = (
  planes: PlaneDefinition[], 
  relationships: PlaneRelationship[]
): PlaneDefinition[] => {
  return planes.map(plane => ({
    ...plane,
    dependencies: relationships
      .filter(rel => rel.sourceId === plane.id)
      .map(rel => rel.targetId)
  }));
};

/**
 * 分析依赖复杂度
 * @param planes 平面定义数组
 * @param relationships 依赖关系数组
 * @returns 复杂度分析结果
 */
export const analyzeDependencyComplexity = (
  planes: PlaneDefinition[], 
  relationships: PlaneRelationship[]
) => {
  const analysis = {
    totalPlanes: planes.length,
    totalRelationships: relationships.length,
    averageDependencies: 0,
    maxDependencies: 0,
    circularDependencies: [],
    complexityScore: 0,
    riskLevel: 'LOW' as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  };
  
  // 计算每个平面的依赖数量
  const dependencyCounts = planes.map(plane => {
    const outgoing = relationships.filter(r => r.sourceId === plane.id).length;
    const incoming = relationships.filter(r => r.targetId === plane.id).length;
    return { planeId: plane.id, outgoing, incoming, total: outgoing + incoming };
  });
  
  analysis.averageDependencies = dependencyCounts.reduce((sum, item) => sum + item.total, 0) / planes.length;
  analysis.maxDependencies = Math.max(...dependencyCounts.map(item => item.total));
  
  // 计算复杂度分数 (0-100)
  const densityScore = (relationships.length / (planes.length * (planes.length - 1))) * 100;
  const levelVarianceScore = calculateLevelVariance(planes) * 10;
  analysis.complexityScore = Math.min(100, densityScore + levelVarianceScore);
  
  // 确定风险级别
  if (analysis.complexityScore < 20) {
    analysis.riskLevel = 'LOW';
  } else if (analysis.complexityScore < 50) {
    analysis.riskLevel = 'MEDIUM';
  } else if (analysis.complexityScore < 80) {
    analysis.riskLevel = 'HIGH';
  } else {
    analysis.riskLevel = 'CRITICAL';
  }
  
  return analysis;
};

/**
 * 计算层级方差
 */
const calculateLevelVariance = (planes: PlaneDefinition[]): number => {
  const levels = planes.map(p => p.level);
  const mean = levels.reduce((sum, level) => sum + level, 0) / levels.length;
  const variance = levels.reduce((sum, level) => sum + Math.pow(level - mean, 2), 0) / levels.length;
  return Math.sqrt(variance);
};

/**
 * 主要的拓扑计算函数
 * @param apiPlanes API返回的平面数据
 * @returns 包含平面定义和依赖关系的完整拓扑数据
 */
export const calculatePlaneTopology = (apiPlanes: PlaneResponse[]) => {
  // 1. 转换API数据为平面定义
  const planes = convertApiPlanesToDefinitions(apiPlanes);
  
  // 2. 计算依赖关系
  const relationships = calculatePlaneDependencies(planes);
  
  // 3. 更新平面的依赖字段
  const updatedPlanes = updatePlaneDependencies(planes, relationships);
  
  // 4. 分析复杂度
  const complexity = analyzeDependencyComplexity(updatedPlanes, relationships);
  
  return {
    planes: updatedPlanes,
    relationships,
    complexity
  };
};
