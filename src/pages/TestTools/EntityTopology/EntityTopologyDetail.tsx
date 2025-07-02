import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Space, Spin, Empty, Breadcrumb, message, Modal } from 'antd';
import { NodeIndexOutlined, HomeOutlined, ToolOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import '../../../styles/entity-topology-detail.css';
import TopologyHeader from '../../../components/EntityTopology/TopologyHeader';
import DataTabs from '../../../components/EntityTopology/DataTabs';
import EntityD3RelationshipGraph from '../../../components/EntityTopology/EntityD3RelationshipGraph';
import entityTopologyData from '../../../data/entityTopologyMock.json';

const { Title, Text } = Typography;

// 类型定义 - 适配D3RelationshipGraph组件
interface Node {
  id: string;
  name: string;
  type: string;
  level: number;
  plane: string;
  description: string;
  status: string;
  [key: string]: any;
}

interface Link {
  source: string;
  target: string;
  type: string;
  strength: number;
}

interface Plane {
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

interface GraphData {
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

// 保留原有的Entity和Dependency接口用于数据转换
interface Entity {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'warning' | 'error';
  properties: Record<string, unknown>;
  connections: number;
}

interface Dependency {
  id: string;
  source: string;
  target: string;
  type: 'depends_on' | 'provides_to' | 'connects_to';
  strength: number;
  description?: string;
}

interface TopologyData {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
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
  // 新增适配D3RelationshipGraph的数据
  graphData?: GraphData;
}

const EntityTopologyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [topologyData, setTopologyData] = useState<TopologyData | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  // 模拟数据加载
  const loadTopologyDetail = useCallback(async () => {
    setLoading(true);
    try {
      // 转换为原有的Entity和Dependency格式（用于DataTabs组件）
      const entities: Entity[] = entityTopologyData.nodes.map(node => ({
        id: node.id,
        name: node.name,
        type: node.type,
        status: node.status as 'active' | 'inactive' | 'warning' | 'error',
        properties: {
          level: node.level,
          plane: node.plane,
          description: node.description,
          ...Object.fromEntries(
            Object.entries(node).filter(
              ([key]) => !['id', 'name', 'type', 'level', 'plane', 'description', 'status'].includes(key)
            )
          )
        },
        connections: 0 // 将在下面计算
      }));

      // 计算每个实体的连接数
      entities.forEach(entity => {
        entity.connections = entityTopologyData.links.filter(
          link => link.source === entity.id || link.target === entity.id
        ).length;
      });

      const dependencies: Dependency[] = entityTopologyData.links.map((link, index) => ({
        id: `dep-${index + 1}`,
        source: link.source,
        target: link.target,
        type: link.type as 'depends_on' | 'provides_to' | 'connects_to',
        strength: link.strength,
        description:
          entityTopologyData.metadata.relationTypes.find((rt: any) => rt.type === link.type)?.description ||
          link.type.replace('_', ' ')
      }));

      const mockData: TopologyData = {
        id: id || '1',
        name: '企业应用拓扑',
        description: '企业核心应用系统拓扑图，展示前端应用、业务服务、中间件和基础设施的依赖关系。',
        type: 'application',
        status: 'active',
        plane: '应用平面',
        tags: ['核心', '生产环境', '微服务'],
        stats: {
          nodeCount: entities.length,
          linkCount: dependencies.length,
          healthScore: 98,
          lastUpdated: '2024-07-02 09:00:00'
        },
        entities,
        dependencies
      };

      setTopologyData(mockData);
    } catch (error) {
      console.error('Failed to load topology detail:', error);
      message.error('加载拓扑数据失败');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadTopologyDetail();
  }, [loadTopologyDetail]);

  // 处理Agents按钮点击
  const handleAgentsClick = (entity: Entity) => {
    // TODO: 实现Agents查看功能
  };

  // 处理单个实体删除
  const handleDeleteEntity = (entity: Entity) => {
    if (!topologyData) return;

    Modal.confirm({
      title: '确认删除',
      content: `确定要删除实体 "${entity.name}" 吗？删除后相关的依赖关系也会被移除。`,
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        const updatedEntities = topologyData.entities.filter(e => e.id !== entity.id);

        // 同时删除相关的依赖关系
        const updatedDependencies = topologyData.dependencies.filter(
          dep => dep.source !== entity.id && dep.target !== entity.id
        );

        setTopologyData({
          ...topologyData,
          entities: updatedEntities,
          dependencies: updatedDependencies,
          stats: {
            ...topologyData.stats,
            nodeCount: updatedEntities.length,
            linkCount: updatedDependencies.length
          }
        });

        message.success(`成功删除实体 "${entity.name}"`);
      }
    });
  };

  // 处理依赖关系删除
  const handleDeleteDependency = (dependency: Dependency) => {
    if (!topologyData) return;

    const sourceEntity = topologyData.entities.find(e => e.id === dependency.source);
    const targetEntity = topologyData.entities.find(e => e.id === dependency.target);
    const sourceName = sourceEntity ? sourceEntity.name : dependency.source;
    const targetName = targetEntity ? targetEntity.name : dependency.target;

    Modal.confirm({
      title: '确认删除',
      content: `确定要删除依赖关系 "${sourceName} → ${targetName}" 吗？`,
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        const updatedDependencies = topologyData.dependencies.filter(dep => dep.id !== dependency.id);

        setTopologyData({
          ...topologyData,
          dependencies: updatedDependencies,
          stats: {
            ...topologyData.stats,
            linkCount: updatedDependencies.length
          }
        });

        message.success(`成功删除依赖关系 "${sourceName} → ${targetName}"`);
      }
    });
  };

  // 处理新增依赖关系
  const handleAddDependency = () => {
    message.info('新增依赖关系功能开发中...');
    // TODO: 实现新增依赖关系功能，可以打开一个模态框让用户选择源实体、目标实体和关系类型
  };

  // 处理新增实体
  const handleAddEntity = () => {
    message.info('新增实体功能开发中...');
    // TODO: 实现新增实体功能，可以打开一个模态框让用户输入实体信息
  };

  if (loading) {
    return (
      <div className="entity-topology-detail-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!topologyData) {
    return (
      <div className="entity-topology-detail-empty">
        <Empty description="拓扑数据不存在" />
      </div>
    );
  }

  return (
    <div className="entity-topology-detail">
      {/* 面包屑导航 */}
      <div className="breadcrumb-container">
        <Breadcrumb
          items={[
            {
              href: '/dashboard',
              title: (
                <Space>
                  <HomeOutlined />
                  <span>首页</span>
                </Space>
              )
            },
            {
              href: '/test-tools',
              title: (
                <Space>
                  <ToolOutlined />
                  <span>测试工具</span>
                </Space>
              )
            },
            {
              href: '/test-tools/entity-topology',
              title: (
                <Space>
                  <NodeIndexOutlined />
                  <span>实体拓扑</span>
                </Space>
              )
            },
            {
              title: topologyData.name
            }
          ]}
        />
      </div>

      {/* 顶部基础信息区域 - 20%高度 */}
      <TopologyHeader topologyData={topologyData} onRefresh={loadTopologyDetail} />

      {/* 底部主要内容区域 - 80%高度 */}
      <div className="topology-content">
        {/* 左侧面板 */}
        <DataTabs
          entities={topologyData.entities}
          dependencies={topologyData.dependencies}
          onDeleteEntity={handleDeleteEntity}
          onDeleteDependency={handleDeleteDependency}
          onAddEntity={handleAddEntity}
          onAddDependency={handleAddDependency}
          onAgentsClick={handleAgentsClick}
        />

        {/* 右侧D3拓扑图 */}
        <div className="content-right">
          <EntityD3RelationshipGraph
            onNodeSelect={node => {
              if (node) {
                // 将D3图的节点转换为Entity格式
                const entity = topologyData.entities.find(e => e.id === node.id);
                setSelectedEntity(entity || null);
              } else {
                setSelectedEntity(null);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EntityTopologyDetail;
