import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Space, Spin, Empty, Breadcrumb, message, Modal } from 'antd';
import { NodeIndexOutlined, HomeOutlined, ToolOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import '../../../styles/entity-topology-detail.css';
import TopologyHeader from '../../../components/EntityTopology/TopologyHeader';
import DataTabs from '../../../components/EntityTopology/DataTabs';
import TopologyGraph from '../../../components/EntityTopology/TopologyGraph';

const { Title, Text } = Typography;

// 类型定义
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
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockData: TopologyData = {
        id: id || '1',
        name: '核心网络拓扑',
        description: '企业核心网络基础设施拓扑图，包含主要路由器、交换机和防火墙设备的连接关系。',
        type: 'network',
        status: 'active',
        plane: '网络平面',
        tags: ['核心', '生产环境', '高可用'],
        stats: {
          nodeCount: 8,
          linkCount: 7,
          healthScore: 95,
          lastUpdated: '2024-06-29 15:30:00'
        },
        entities: [
          {
            id: 'router-1',
            name: '核心路由器-1',
            type: 'router',
            status: 'active',
            properties: { ip: '192.168.1.1', model: 'Cisco ASR 1000' },
            connections: 5
          },
          {
            id: 'switch-1',
            name: '核心交换机-1',
            type: 'switch',
            status: 'active',
            properties: { ip: '192.168.1.10', model: 'Cisco Catalyst 9500' },
            connections: 8
          },
          {
            id: 'firewall-1',
            name: '防火墙-1',
            type: 'firewall',
            status: 'warning',
            properties: { ip: '192.168.1.100', model: 'Fortinet FortiGate' },
            connections: 3
          },
          {
            id: 'server-1',
            name: '应用服务器-1',
            type: 'server',
            status: 'active',
            properties: { ip: '192.168.2.10', os: 'Ubuntu 20.04' },
            connections: 2
          },
          {
            id: 'router-2',
            name: '核心路由器-2',
            type: 'router',
            status: 'active',
            properties: { ip: '192.168.1.2', model: 'Cisco ASR 1000' },
            connections: 4
          },
          {
            id: 'switch-2',
            name: '接入交换机-1',
            type: 'switch',
            status: 'active',
            properties: { ip: '192.168.1.20', model: 'Cisco Catalyst 2960' },
            connections: 6
          },
          {
            id: 'server-2',
            name: '数据库服务器-1',
            type: 'database',
            status: 'active',
            properties: { ip: '192.168.2.20', os: 'CentOS 7' },
            connections: 3
          },
          {
            id: 'lb-1',
            name: '负载均衡器-1',
            type: 'loadbalancer',
            status: 'active',
            properties: { ip: '192.168.1.200', model: 'F5 BIG-IP' },
            connections: 5
          }
        ],
        dependencies: [
          {
            id: 'dep-1',
            source: 'router-1',
            target: 'switch-1',
            type: 'connects_to',
            strength: 0.9,
            description: '主干网络连接'
          },
          {
            id: 'dep-2',
            source: 'switch-1',
            target: 'firewall-1',
            type: 'connects_to',
            strength: 0.8,
            description: '安全网关连接'
          },
          {
            id: 'dep-3',
            source: 'firewall-1',
            target: 'server-1',
            type: 'provides_to',
            strength: 0.7,
            description: '安全访问控制'
          },
          {
            id: 'dep-4',
            source: 'router-2',
            target: 'switch-2',
            type: 'connects_to',
            strength: 0.8,
            description: '接入网络连接'
          },
          {
            id: 'dep-5',
            source: 'lb-1',
            target: 'server-1',
            type: 'provides_to',
            strength: 0.9,
            description: '负载均衡服务'
          },
          {
            id: 'dep-6',
            source: 'lb-1',
            target: 'server-2',
            type: 'provides_to',
            strength: 0.8,
            description: '数据库负载均衡'
          },
          {
            id: 'dep-7',
            source: 'server-1',
            target: 'server-2',
            type: 'depends_on',
            strength: 0.7,
            description: '应用依赖数据库'
          }
        ]
      };

      setTopologyData(mockData);
    } catch (error) {
      console.error('Failed to load topology detail:', error);
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

        // 如果当前选中的实体被删除了，清空选中状态
        if (selectedEntity && selectedEntity.id === entity.id) {
          setSelectedEntity(null);
        }

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
        <TopologyGraph
          entities={topologyData.entities}
          dependencies={topologyData.dependencies}
          selectedEntity={selectedEntity}
          onEntitySelect={setSelectedEntity}
        />
      </div>
    </div>
  );
};

export default EntityTopologyDetail;
