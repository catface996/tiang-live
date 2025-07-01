import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Space,
  Table,
  Statistic,
  Descriptions,
  Spin,
  Empty,
  Breadcrumb,
  message,
  Modal
} from 'antd';
import {
  NodeIndexOutlined,
  LinkOutlined,
  DatabaseOutlined,
  HeartOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  DownloadOutlined,
  HomeOutlined,
  ToolOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as d3 from 'd3';
import '../../../styles/entity-topology-detail.css';

const { Title, Text } = Typography;

// 类型定义
interface Entity {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'warning' | 'error';
  properties: Record<string, any>;
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
  const navigate = useNavigate();
  const { t } = useTranslation(['entityTopology', 'common']);
  const svgRef = useRef<SVGSVGElement>(null);

  const [loading, setLoading] = useState(true);
  const [topologyData, setTopologyData] = useState<TopologyData | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [selectedEntityIds, setSelectedEntityIds] = useState<string[]>([]);

  // 模拟数据加载
  useEffect(() => {
    loadTopologyDetail();
  }, [id]);

  const loadTopologyDetail = async () => {
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
  };

  // 删除选中的实体
  const handleDeleteEntities = () => {
    if (!topologyData || selectedEntityIds.length === 0) return;

    Modal.confirm({
      title: '确认删除',
      content: `确定要删除选中的 ${selectedEntityIds.length} 个实体吗？删除后相关的依赖关系也会被移除。`,
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        const updatedEntities = topologyData.entities.filter(entity => !selectedEntityIds.includes(entity.id));

        // 同时删除相关的依赖关系
        const updatedDependencies = topologyData.dependencies.filter(
          dep => !selectedEntityIds.includes(dep.source) && !selectedEntityIds.includes(dep.target)
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

        // 清空选中状态
        setSelectedEntityIds([]);

        // 如果当前选中的实体被删除了，也清空选中状态
        if (selectedEntity && selectedEntityIds.includes(selectedEntity.id)) {
          setSelectedEntity(null);
        }

        message.success(`成功删除 ${selectedEntityIds.length} 个实体`);
      }
    });
  };

  // 处理实体选择变化
  const handleEntitySelectionChange = (selectedRowKeys: React.Key[]) => {
    setSelectedEntityIds(selectedRowKeys as string[]);
  };

  // 处理Agents按钮点击
  const handleAgentsClick = (entity: Entity) => {
    message.info(`查看实体 "${entity.name}" 的Agents功能开发中...`);
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
  const handleDeleteDependency = (dependency: any) => {
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

  // D3.js 拓扑图渲染
  useEffect(() => {
    if (!topologyData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 600;
    const height = 400;

    svg.attr('width', width).attr('height', height);

    // 创建力导向图
    const simulation = d3
      .forceSimulation(topologyData.entities as any)
      .force(
        'link',
        d3
          .forceLink(topologyData.dependencies)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // 绘制连接线
    const link = svg
      .append('g')
      .selectAll('line')
      .data(topologyData.dependencies)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d: any) => Math.sqrt(d.strength * 10));

    // 绘制节点
    const node = svg
      .append('g')
      .selectAll('circle')
      .data(topologyData.entities)
      .enter()
      .append('circle')
      .attr('r', 20)
      .attr('fill', (d: any) => {
        switch (d.status) {
          case 'active':
            return '#52c41a';
          case 'warning':
            return '#faad14';
          case 'error':
            return '#ff4d4f';
          default:
            return '#d9d9d9';
        }
      })
      .style('cursor', 'pointer')
      .on('click', (event, d: any) => {
        setSelectedEntity(d);
      });

    // 添加节点标签
    const label = svg
      .append('g')
      .selectAll('text')
      .data(topologyData.entities)
      .enter()
      .append('text')
      .text((d: any) => d.name)
      .attr('font-size', '12px')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('pointer-events', 'none');

    // 更新位置
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);

      label.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y + 30);
    });

    // 拖拽功能
    const drag = d3
      .drag()
      .on('start', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d: any) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag as any);
  }, [topologyData]);

  // 实体列表列定义
  const entityColumns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Entity) => (
        <Space>
          <NodeIndexOutlined />
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="blue">{type}</Tag>
    },
    {
      title: '操作',
      key: 'actions',
      width: 80,
      render: (_, record: Entity) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<DatabaseOutlined />}
            onClick={() => handleAgentsClick(record)}
            title="查看Agents"
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteEntity(record)}
            title="删除实体"
          />
        </Space>
      )
    }
  ];

  // 依赖关系列定义
  const dependencyColumns = [
    {
      title: '源实体',
      dataIndex: 'source',
      key: 'source',
      render: (source: string) => {
        const entity = topologyData?.entities.find(e => e.id === source);
        return entity ? entity.name : source;
      }
    },
    {
      title: '目标实体',
      dataIndex: 'target',
      key: 'target',
      render: (target: string) => {
        const entity = topologyData?.entities.find(e => e.id === target);
        return entity ? entity.name : target;
      }
    },
    {
      title: '关系类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const colors = {
          depends_on: 'purple',
          provides_to: 'green',
          connects_to: 'blue'
        };
        return <Tag color={colors[type as keyof typeof colors]}>{type}</Tag>;
      }
    },
    {
      title: '操作',
      key: 'actions',
      width: 60,
      render: (_, record: any) => (
        <Button
          type="text"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteDependency(record)}
          title="删除依赖关系"
        />
      )
    }
  ];

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
      <div className="topology-header">
        <div className="header-content">
          <div className="header-left">
            <Title level={3} style={{ margin: 0 }}>
              <Space>
                <NodeIndexOutlined />
                {topologyData.name}
              </Space>
            </Title>
            <div className="header-description">
              <Text type="secondary">{topologyData.description}</Text>
            </div>
            <div className="header-tags">
              <Space wrap>
                <Tag color="blue">{topologyData.type}</Tag>
                <Tag color="green">{topologyData.plane}</Tag>
                {topologyData.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Space>
            </div>
          </div>
          <div className="header-right">
            <Row gutter={16}>
              <Col span={6}>
                <Statistic title="节点数" value={topologyData.stats.nodeCount} prefix={<NodeIndexOutlined />} />
              </Col>
              <Col span={6}>
                <Statistic title="连接数" value={topologyData.stats.linkCount} prefix={<LinkOutlined />} />
              </Col>
              <Col span={6}>
                <Statistic
                  title="健康度"
                  value={topologyData.stats.healthScore}
                  suffix="%"
                  prefix={<HeartOutlined />}
                />
              </Col>
              <Col span={6}>
                <Space direction="vertical">
                  <Button icon={<ReloadOutlined />} onClick={loadTopologyDetail}>
                    刷新
                  </Button>
                  <Button icon={<DownloadOutlined />}>导出</Button>
                </Space>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* 底部主要内容区域 - 80%高度 */}
      <div className="topology-content">
        {/* 左侧面板 */}
        <div className="content-left">
          {/* 实体清单 - 上半部分 */}
          <div className="entities-section">
            <Table
              title={() => (
                <Space>
                  <DatabaseOutlined />
                  实体清单 ({topologyData.entities.length})
                </Space>
              )}
              columns={entityColumns}
              dataSource={topologyData.entities}
              rowKey="id"
              size="small"
              pagination={false}
              scroll={{ y: 200 }}
            />
          </div>

          {/* 依赖关系 - 下半部分 */}
          <div className="dependencies-section">
            <Table
              title={() => (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <LinkOutlined />
                    依赖关系 ({topologyData.dependencies.length})
                  </Space>
                  <Button type="primary" size="small" icon={<PlusOutlined />} onClick={handleAddDependency}>
                    新增
                  </Button>
                </div>
              )}
              columns={dependencyColumns}
              dataSource={topologyData.dependencies}
              rowKey="id"
              size="small"
              pagination={false}
              scroll={{ y: 200 }}
            />
          </div>
        </div>

        {/* 右侧D3拓扑图 */}
        <div className="content-right">
          <div className="topology-header-bar">
            <Space>
              <NodeIndexOutlined />
              拓扑关系图
              <Button
                size="small"
                icon={<FullscreenOutlined />}
                onClick={() => {
                  /* 全屏功能 */
                }}
              >
                全屏
              </Button>
            </Space>
          </div>

          <div className="topology-canvas">
            <svg ref={svgRef}></svg>
          </div>

          {/* 选中实体的详细信息 */}
          {selectedEntity && (
            <div className="entity-details">
              <Card size="small" title={`实体详情: ${selectedEntity.name}`}>
                <Descriptions size="small" column={2}>
                  <Descriptions.Item label="ID">{selectedEntity.id}</Descriptions.Item>
                  <Descriptions.Item label="类型">{selectedEntity.type}</Descriptions.Item>
                  <Descriptions.Item label="状态">
                    <Tag color={selectedEntity.status === 'active' ? 'green' : 'orange'}>{selectedEntity.status}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="连接数">{selectedEntity.connections}</Descriptions.Item>
                  {Object.entries(selectedEntity.properties).map(([key, value]) => (
                    <Descriptions.Item key={key} label={key}>
                      {String(value)}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityTopologyDetail;
