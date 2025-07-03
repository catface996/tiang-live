/**
 * API类型转换工具函数
 * 用于在旧的组件接口和新的API类型之间进行转换
 */

import type {
  Entity as ApiEntity,
  Agent as ApiAgent,
  EntityDependency as ApiEntityDependency,
  EntityAgentRelation as ApiEntityAgentRelation,
  TopologyAnalysisRequest,
  TopologyAnalysisResponse,
  Status
} from '../types/api';

// 旧的组件接口类型（保持向后兼容）
export interface LegacyEntity {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'warning' | 'error';
  properties: Record<string, unknown>;
  connections: number;
}

export interface LegacyDependency {
  id: string;
  source: string;
  target: string;
  type: 'depends_on' | 'provides_to' | 'connects_to' | 'manages';
  strength: number;
  description?: string;
}

/**
 * 将旧的Entity转换为新的API Entity格式
 */
export function convertLegacyEntityToApi(legacyEntity: LegacyEntity): ApiEntity {
  return {
    id: legacyEntity.id,
    name: legacyEntity.name,
    type: legacyEntity.type,
    status: legacyEntity.status as Status,
    description: (legacyEntity.properties?.description as string) || '',
    tags: (legacyEntity.properties?.tags as string[]) || [],
    properties: legacyEntity.properties,
    metadata: {
      createdAt: (legacyEntity.properties?.createdAt as string) || new Date().toISOString(),
      updatedAt: (legacyEntity.properties?.updatedAt as string) || new Date().toISOString(),
      createdBy: (legacyEntity.properties?.createdBy as string) || 'system',
      version: (legacyEntity.properties?.version as number) || 1
    }
  };
}

/**
 * 将旧的Entity转换为新的API Agent格式（如果是Agent类型）
 */
export function convertLegacyEntityToAgent(legacyEntity: LegacyEntity): ApiAgent {
  return {
    id: legacyEntity.id,
    name: legacyEntity.name,
    type: legacyEntity.type,
    status: legacyEntity.status as Status,
    description: (legacyEntity.properties?.description as string) || '',
    agentType: (legacyEntity.properties?.agentType as ApiAgent['agentType']) || 'monitoring',
    capabilities: (legacyEntity.properties?.capabilities as string[]) || [],
    version: (legacyEntity.properties?.version as string) || '1.0.0',
    configuration: (legacyEntity.properties?.configuration as Record<string, any>) || {},
    resources: {
      cpu: (legacyEntity.properties?.cpu as number) || 0.5,
      memory: (legacyEntity.properties?.memory as number) || 512,
      storage: (legacyEntity.properties?.storage as number) || 1024
    },
    metadata: {
      createdAt: (legacyEntity.properties?.createdAt as string) || new Date().toISOString(),
      updatedAt: (legacyEntity.properties?.updatedAt as string) || new Date().toISOString(),
      lastActive: (legacyEntity.properties?.lastActive as string) || new Date().toISOString(),
      deployedAt: (legacyEntity.properties?.deployedAt as string) || new Date().toISOString(),
      createdBy: (legacyEntity.properties?.createdBy as string) || 'system'
    }
  };
}

/**
 * 将旧的Dependency转换为新的API EntityDependency格式
 */
export function convertLegacyDependencyToApi(legacyDep: LegacyDependency): ApiEntityDependency {
  return {
    id: legacyDep.id,
    source: legacyDep.source,
    target: legacyDep.target,
    type: legacyDep.type as ApiEntityDependency['type'],
    strength: legacyDep.strength,
    description: legacyDep.description,
    properties: {},
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'system'
    }
  };
}

/**
 * 将旧的Dependency转换为新的API EntityAgentRelation格式
 */
export function convertLegacyDependencyToAgentRelation(
  legacyDep: LegacyDependency,
  entityId: string,
  agentId: string
): ApiEntityAgentRelation {
  return {
    id: legacyDep.id,
    entityId: entityId,
    agentId: agentId,
    relationType: legacyDep.type as ApiEntityAgentRelation['relationType'],
    strength: legacyDep.strength,
    description: legacyDep.description,
    configuration: {},
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'system',
      lastActive: new Date().toISOString()
    }
  };
}

/**
 * 分析拓扑数据并转换为API格式
 */
export function analyzeAndConvertTopologyData(
  legacyEntities: LegacyEntity[],
  legacyDependencies: LegacyDependency[]
): {
  entities: ApiEntity[];
  agents: ApiAgent[];
  entityDependencies: ApiEntityDependency[];
  entityAgentRelations: ApiEntityAgentRelation[];
} {
  // 分离实体和Agent
  const entityList = legacyEntities.filter(entity => entity.type !== 'agent');
  const agentList = legacyEntities.filter(entity => entity.type === 'agent');

  // 转换实体
  const entities = entityList.map(convertLegacyEntityToApi);
  const agents = agentList.map(convertLegacyEntityToAgent);

  // 分离实体依赖关系和实体与Agent的关系
  const entityDependencies: ApiEntityDependency[] = [];
  const entityAgentRelations: ApiEntityAgentRelation[] = [];

  legacyDependencies.forEach(dep => {
    const sourceIsAgent = agentList.some(agent => agent.id === dep.source);
    const targetIsAgent = agentList.some(agent => agent.id === dep.target);

    if (!sourceIsAgent && !targetIsAgent) {
      // 实体依赖关系
      entityDependencies.push(convertLegacyDependencyToApi(dep));
    } else {
      // 实体与Agent关系
      const entityId = sourceIsAgent ? dep.target : dep.source;
      const agentId = sourceIsAgent ? dep.source : dep.target;
      entityAgentRelations.push(convertLegacyDependencyToAgentRelation(dep, entityId, agentId));
    }
  });

  return {
    entities,
    agents,
    entityDependencies,
    entityAgentRelations
  };
}

/**
 * 创建拓扑分析请求
 */
export function createTopologyAnalysisRequest(
  legacyEntities: LegacyEntity[],
  legacyDependencies: LegacyDependency[]
): TopologyAnalysisRequest {
  const { entities, agents, entityDependencies, entityAgentRelations } = analyzeAndConvertTopologyData(
    legacyEntities,
    legacyDependencies
  );

  return {
    topologyId: 'topology-' + Date.now(),
    entities,
    agents,
    entityDependencies,
    entityAgentRelations,
    analysisOptions: {
      checkHealthStatus: true,
      detectAnomalies: true,
      performanceAnalysis: true,
      securityCheck: true,
      dependencyAnalysis: true,
      agentEfficiencyAnalysis: true
    }
  };
}

/**
 * 模拟拓扑分析API调用
 */
export async function simulateTopologyAnalysis(request: TopologyAnalysisRequest): Promise<TopologyAnalysisResponse> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1500));

  const { entities, agents, entityDependencies, entityAgentRelations } = request;

  // 根据实际数据生成分析结果
  const activeEntities = entities.filter(entity => entity.status === 'active');
  const warningEntities = entities.filter(entity => entity.status === 'warning');
  const errorEntities = entities.filter(entity => entity.status === 'error');
  const activeAgents = agents.filter(agent => agent.status === 'active');

  return {
    analysisId: 'analysis-' + Date.now(),
    topologyId: request.topologyId,
    timestamp: new Date().toISOString(),
    summary: {
      totalEntities: entities.length,
      totalAgents: agents.length,
      totalEntityDependencies: entityDependencies.length,
      totalEntityAgentRelations: entityAgentRelations.length,
      overallHealth: errorEntities.length > 0 ? 'critical' : warningEntities.length > 0 ? 'warning' : 'good',
      healthScore: Math.max(60, 100 - errorEntities.length * 20 - warningEntities.length * 10)
    },
    entityAnalysis: {
      activeEntities: activeEntities.length,
      warningEntities: warningEntities.length,
      errorEntities: errorEntities.length,
      orphanedEntities: entities.filter(
        entity =>
          !entityDependencies.some(dep => dep.source === entity.id || dep.target === entity.id) &&
          !entityAgentRelations.some(rel => rel.entityId === entity.id)
      ).length,
      criticalEntities: entities
        .filter(entity => {
          const connectionCount = entityDependencies.filter(
            dep => dep.source === entity.id || dep.target === entity.id
          ).length;
          return connectionCount > 3;
        })
        .map(entity => ({
          id: entity.id,
          name: entity.name,
          connectionCount: entityDependencies.filter(dep => dep.source === entity.id || dep.target === entity.id)
            .length,
          riskLevel:
            entity.status === 'error'
              ? ('high' as const)
              : entity.status === 'warning'
                ? ('medium' as const)
                : ('low' as const)
        }))
    },
    agentAnalysis: {
      activeAgents: activeAgents.length,
      agentCoverage:
        entities.length > 0 ? ((entityAgentRelations.length / entities.length) * 100).toFixed(1) + '%' : '0%',
      agentEfficiency: agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        managedEntities: entityAgentRelations.filter(rel => rel.agentId === agent.id).length,
        status: agent.status,
        capabilities: agent.capabilities,
        utilizationRate:
          entityAgentRelations.filter(rel => rel.agentId === agent.id).length / Math.max(entities.length, 1)
      })),
      unmanagedEntities: entities
        .filter(entity => !entityAgentRelations.some(rel => rel.entityId === entity.id))
        .map(entity => ({
          id: entity.id,
          name: entity.name,
          type: entity.type,
          riskLevel:
            entity.status === 'error'
              ? ('high' as const)
              : entity.status === 'warning'
                ? ('medium' as const)
                : ('low' as const)
        }))
    },
    dependencyAnalysis: {
      totalDependencies: entityDependencies.length,
      dependencyTypes: [...new Set(entityDependencies.map(dep => dep.type))],
      circularDependencies: [], // 简化处理
      strongDependencies: entityDependencies.filter(dep => dep.strength > 0.8).length,
      weakDependencies: entityDependencies.filter(dep => dep.strength <= 0.5).length,
      bottlenecks: entities
        .filter(entity => {
          const connectionCount = entityDependencies.filter(
            dep => dep.source === entity.id || dep.target === entity.id
          ).length;
          return connectionCount > 3;
        })
        .map(entity => ({
          entityId: entity.id,
          entityName: entity.name,
          severity:
            entity.status === 'error'
              ? ('high' as const)
              : entity.status === 'warning'
                ? ('medium' as const)
                : ('low' as const),
          reason: `处理 ${entityDependencies.filter(dep => dep.source === entity.id || dep.target === entity.id).length} 个依赖关系`,
          suggestion: '考虑负载均衡或优化依赖结构'
        }))
    },
    relationAnalysis: {
      totalRelations: entityAgentRelations.length,
      relationTypes: [...new Set(entityAgentRelations.map(rel => rel.relationType))],
      agentUtilization: agents.map(agent => ({
        agentId: agent.id,
        agentName: agent.name,
        relationCount: entityAgentRelations.filter(rel => rel.agentId === agent.id).length,
        utilizationRate:
          entityAgentRelations.filter(rel => rel.agentId === agent.id).length > 2
            ? ('active' as const)
            : entityAgentRelations.filter(rel => rel.agentId === agent.id).length > 0
              ? ('normal' as const)
              : ('idle' as const)
      }))
    },
    issues: [
      ...(errorEntities.length > 0
        ? [
            {
              type: 'error' as const,
              severity: 'high' as const,
              category: 'entity_health',
              message: `发现 ${errorEntities.length} 个实体状态异常`,
              affectedItems: errorEntities.map(e => e.id),
              recommendation: '立即检查异常实体的日志和配置'
            }
          ]
        : []),
      ...(warningEntities.length > 0
        ? [
            {
              type: 'warning' as const,
              severity: 'medium' as const,
              category: 'entity_health',
              message: `发现 ${warningEntities.length} 个实体状态警告`,
              affectedItems: warningEntities.map(e => e.id),
              recommendation: '检查警告实体的性能指标'
            }
          ]
        : []),
      ...(agents.length === 0
        ? [
            {
              type: 'warning' as const,
              severity: 'medium' as const,
              category: 'agent_coverage',
              message: '未部署任何Agent，缺乏智能监控能力',
              affectedItems: ['topology'],
              recommendation: '建议部署监控和管理Agent'
            }
          ]
        : [])
    ],
    recommendations: [
      ...(activeAgents.length > 0 ? ['Agent监控系统运行正常'] : ['建议部署Agent监控系统']),
      ...(entityDependencies.length > entities.length * 2 ? ['拓扑复杂度较高，建议优化依赖关系'] : []),
      '定期检查实体健康状态',
      '优化Agent资源分配',
      '建立完善的监控告警机制'
    ],
    performance: {
      avgResponseTime: '245ms',
      throughput: '1250 req/s',
      errorRate: entities.length > 0 ? ((errorEntities.length / entities.length) * 100).toFixed(2) + '%' : '0%',
      availability: entities.length > 0 ? ((activeEntities.length / entities.length) * 100).toFixed(1) + '%' : '0%'
    },
    security: {
      vulnerabilities: errorEntities.length,
      securityScore: Math.max(70, 100 - errorEntities.length * 15),
      recommendations: [
        ...(agents.length > 0 ? ['Agent监控正常运行'] : ['建议部署监控Agent']),
        '定期更新安全补丁',
        '启用访问控制'
      ]
    }
  };
}

/**
 * 显示分析结果的工具函数
 */
export function displayAnalysisResults(result: TopologyAnalysisResponse): void {
  console.log('📈 分析结果摘要:');
  console.log(`   - 实体数量: ${result.summary.totalEntities}`);
  console.log(`   - Agent数量: ${result.summary.totalAgents}`);
  console.log(`   - 实体依赖关系: ${result.summary.totalEntityDependencies} 个`);
  console.log(`   - 实体-Agent关系: ${result.summary.totalEntityAgentRelations} 个`);
  console.log(`   - 整体健康度: ${result.summary.overallHealth} (${result.summary.healthScore}/100)`);
  console.log(`   - Agent覆盖率: ${result.agentAnalysis.agentCoverage}`);

  // 显示Agent效率分析
  if (result.agentAnalysis.agentEfficiency.length > 0) {
    console.log('🤖 Agent效率分析:');
    result.agentAnalysis.agentEfficiency.forEach((agent, index) => {
      console.log(`   ${index + 1}. ${agent.name}`);
      console.log(`      状态: ${agent.status}`);
      console.log(`      管理实体: ${agent.managedEntities} 个`);
      console.log(`      利用率: ${(agent.utilizationRate * 100).toFixed(1)}%`);
      console.log(`      能力: ${agent.capabilities.join(', ')}`);
    });
  }

  // 显示未管理的实体
  if (result.agentAnalysis.unmanagedEntities.length > 0) {
    console.log('⚠️  未被Agent管理的实体:');
    result.agentAnalysis.unmanagedEntities.forEach((entity, index) => {
      console.log(`   ${index + 1}. ${entity.name} (${entity.type}) - 风险等级: ${entity.riskLevel}`);
    });
  }

  // 显示瓶颈分析
  if (result.dependencyAnalysis.bottlenecks.length > 0) {
    console.log('🚨 发现的瓶颈:');
    result.dependencyAnalysis.bottlenecks.forEach((bottleneck, index) => {
      console.log(`   ${index + 1}. [${bottleneck.severity.toUpperCase()}] ${bottleneck.entityName}`);
      console.log(`      原因: ${bottleneck.reason}`);
      console.log(`      建议: ${bottleneck.suggestion}`);
    });
  }

  // 显示发现的问题
  if (result.issues.length > 0) {
    console.log('🚨 发现的问题:');
    result.issues.forEach((issue, index) => {
      console.log(`   ${index + 1}. [${issue.severity.toUpperCase()}] ${issue.message}`);
      console.log(`      类别: ${issue.category}`);
      console.log(`      建议: ${issue.recommendation}`);
    });
  }

  console.log('🎯 分析诊断完成!');
}
