import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Space,
  Input,
  Select,
  message,
  Spin,
  Empty,
  Typography,
  Statistic,
  Modal,
  Form,
  Pagination
} from 'antd';
import {
  PlusOutlined,
  ReloadOutlined,
  NodeIndexOutlined,
  LinkOutlined,
  HeartOutlined,
  DatabaseOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TopologyCard from './components/TopologyCard';
import '../../../styles/entity-topology.css';
import { graphApi, GraphStatus } from '../../../services/graphApi';

const { Search } = Input;
const { Option } = Select;
const { Title, Paragraph } = Typography;

// 在主页面中定义类型，避免导入问题
interface TopologyStats {
  nodeCount: number;
  linkCount: number;
  healthScore: number;
  lastUpdated: string;
}

interface Topology {
  id: string;
  name: string;
  type: 'network' | 'application' | 'database' | 'system';
  status: 'active' | 'inactive' | 'warning' | 'error';
  description: string;
  plane: string;
  tags?: string[];
  stats: TopologyStats;
  createdAt: string;
}

const EntityTopology: React.FC = () => {
  const { t } = useTranslation(['entityTopology', 'common']);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [labelsFilter, setLabelsFilter] = useState<string>('all');
  const [topologies, setTopologies] = useState<Topology[]>([]);

  // 分页状态管理
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  // 创建拓扑图相关状态
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createForm] = Form.useForm();
  const [createLoading, setCreateLoading] = useState(false);

  // 模拟数据
  const mockTopologies: Topology[] = [
    {
      id: '1',
      name: '核心网络拓扑',
      type: 'network',
      status: 'active',
      description: '企业核心网络基础设施拓扑图，包含主要路由器、交换机和防火墙设备的连接关系。',
      plane: '网络平面',
      tags: ['核心', '生产环境', '高可用'],
      stats: {
        nodeCount: 156,
        linkCount: 234,
        healthScore: 95,
        lastUpdated: '2024-01-15 14:30:25'
      },
      createdAt: '2024-01-10 09:00:00'
    },
    {
      id: '2',
      name: '应用服务拓扑',
      type: 'application',
      status: 'warning',
      description: '微服务架构应用拓扑，展示各个服务之间的依赖关系和调用链路。',
      plane: '应用平面',
      tags: ['微服务', '容器化', 'K8s'],
      stats: {
        nodeCount: 89,
        linkCount: 145,
        healthScore: 78,
        lastUpdated: '2024-01-15 14:25:10'
      },
      createdAt: '2024-01-12 10:30:00'
    },
    {
      id: '3',
      name: '数据库集群拓扑',
      type: 'database',
      status: 'active',
      description: '数据库集群架构拓扑，包含主从复制、分片和备份策略的完整视图。',
      plane: '数据平面',
      tags: ['MySQL', '集群', '主从复制'],
      stats: {
        nodeCount: 24,
        linkCount: 36,
        healthScore: 92,
        lastUpdated: '2024-01-15 14:20:45'
      },
      createdAt: '2024-01-08 16:45:00'
    },
    {
      id: '4',
      name: '系统监控拓扑',
      type: 'system',
      status: 'error',
      description: '系统监控基础设施拓扑，展示监控代理、收集器和存储系统的部署结构。',
      plane: '监控平面',
      tags: ['监控', 'Prometheus', 'Grafana'],
      stats: {
        nodeCount: 45,
        linkCount: 67,
        healthScore: 45,
        lastUpdated: '2024-01-15 14:15:30'
      },
      createdAt: '2024-01-14 11:20:00'
    },
    {
      id: '5',
      name: '边缘计算拓扑',
      type: 'network',
      status: 'inactive',
      description: '边缘计算节点拓扑，展示边缘设备与中心云平台的连接和数据流向。',
      plane: '边缘平面',
      tags: ['边缘计算', 'IoT', '5G'],
      stats: {
        nodeCount: 78,
        linkCount: 112,
        healthScore: 0,
        lastUpdated: '2024-01-14 18:45:20'
      },
      createdAt: '2024-01-13 14:10:00'
    },
    {
      id: '6',
      name: '安全防护拓扑',
      type: 'system',
      status: 'active',
      description: '网络安全防护体系拓扑，包含防火墙、入侵检测和安全审计系统的部署架构。',
      plane: '安全平面',
      tags: ['安全', '防火墙', 'IDS'],
      stats: {
        nodeCount: 32,
        linkCount: 48,
        healthScore: 88,
        lastUpdated: '2024-01-15 14:10:15'
      },
      createdAt: '2024-01-11 13:25:00'
    }
  ];

  useEffect(() => {
    loadTopologies();
  }, []);

  const loadTopologies = async () => {
    setLoading(true);
    try {
      // 调用真实的API接口获取图列表
      const response = await graphApi.listGraphs({
        // 可以添加查询条件，比如只查询当前用户的图
        ownerId: 1, // 假设当前用户ID为1，实际应该从用户上下文获取
        status: GraphStatus.ACTIVE, // 只查询活跃状态的图
        page: 1, // 第一页
        size: 50 // 每页50条，足够显示大部分情况
      });

      if (response.success && response.data && response.data.records) {
        // 将API返回的Graph数据转换为Topology格式
        const topologyList = response.data.records.map(graph => ({
          id: graph.id?.toString() || '',
          name: graph.name,
          type: 'network' as const, // 默认类型，可以根据graph.metadata中的信息确定
          status: mapGraphStatusToTopologyStatus(graph.status),
          description: graph.description || '',
          plane: 'default', // 默认平面，可以从metadata中获取
          tags: graph.labels || [],
          stats: {
            nodeCount: graph.entityCount || 0,
            linkCount: graph.relationCount || 0,
            healthScore: 95, // 默认健康分数，可以从metadata中计算
            lastUpdated: graph.updatedAt || graph.createdAt || new Date().toISOString()
          },
          createdAt: graph.createdAt || new Date().toISOString()
        }));

        setTopologies(topologyList);
        console.log('✅ 成功加载拓扑图列表:', {
          total: response.data.total,
          page: response.data.page,
          size: response.data.size,
          records: topologyList.length
        });
      } else {
        console.warn('⚠️ API返回数据格式异常:', response);
        setTopologies([]); // 设置为空数组，不使用mock数据
        message.error(t('entityTopology:messages.loadFailed'));
      }
    } catch (error) {
      console.error('❌ 加载拓扑图列表失败:', error);
      setTopologies([]); // 设置为空数组，不使用mock数据
      message.error(t('entityTopology:messages.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  // 辅助函数：将Graph状态映射为Topology状态
  const mapGraphStatusToTopologyStatus = (graphStatus?: GraphStatus): 'active' | 'inactive' | 'warning' | 'error' => {
    switch (graphStatus) {
      case GraphStatus.ACTIVE:
        return 'active';
      case GraphStatus.INACTIVE:
        return 'inactive';
      case GraphStatus.PROCESSING:
        return 'warning';
      case GraphStatus.ARCHIVED:
        return 'error';
      default:
        return 'active';
    }
  };

  // 处理创建拓扑图
  const handleCreateTopology = () => {
    setCreateModalVisible(true);
    createForm.resetFields();
  };

  // 提交创建拓扑图
  const handleCreateSubmit = async (values: any) => {
    setCreateLoading(true);
    try {
      console.log('🚀 开始创建拓扑图:', values);

      // 构建保存图的请求数据
      const saveGraphRequest = {
        name: values.name,
        description: values.description || '',
        labels: values.tags || [],
        status: GraphStatus.ACTIVE,
        ownerId: 1, // 假设当前用户ID为1，实际应该从用户上下文获取
        metadata: {
          type: values.type,
          plane: values.plane || 'default',
          nodeCount: 0,
          linkCount: 0,
          healthScore: 100,
          version: '1.0',
          createdBy: 'user', // 实际应该从用户上下文获取
          createdAt: new Date().toISOString()
        }
      };

      console.log('📤 发送创建图请求到后端:', saveGraphRequest);

      // 调用后端API保存图到数据库
      const response = await graphApi.saveGraph(saveGraphRequest);

      console.log('✅ 后端响应:', response);

      if (response.success) {
        const savedGraph = response.data;
        console.log('🎉 图已成功保存到数据库:', savedGraph);

        // 创建前端显示用的拓扑对象
        const newTopology: Topology = {
          id: savedGraph.id?.toString() || `topology_${Date.now()}`,
          name: savedGraph.name,
          type: values.type,
          status: 'active',
          description: savedGraph.description || '',
          plane: values.plane || 'default',
          tags: savedGraph.labels || [],
          stats: {
            nodeCount: savedGraph.entityCount || 0,
            linkCount: savedGraph.relationCount || 0,
            healthScore: 100,
            lastUpdated: savedGraph.updatedAt || new Date().toISOString()
          },
          createdAt: savedGraph.createdAt || new Date().toISOString()
        };

        // 添加到前端拓扑列表
        setTopologies(prev => [newTopology, ...prev]);

        message.success(t('entityTopology:messages.createSuccess'));
        setCreateModalVisible(false);
        createForm.resetFields();

        // 跳转到新创建的拓扑详情页
        navigate(`/test-tools/entity-topology/${newTopology.id}`);

        console.log('🎯 跳转到拓扑详情页:', newTopology.id);
      } else {
        console.error('❌ 后端返回失败:', response.message);
        message.error(response.message || t('entityTopology:messages.createFailed'));
      }
    } catch (error) {
      console.error('❌ 创建拓扑图失败:', error);
      message.error(t('entityTopology:messages.createFailed'));
    } finally {
      setCreateLoading(false);
    }
  };

  // 取消创建拓扑图
  const handleCreateCancel = () => {
    setCreateModalVisible(false);
    createForm.resetFields();
  };

  // 获取所有可用的labels
  const getAllAvailableLabels = (): string[] => {
    const allLabels = topologies.reduce((labels: string[], topology) => {
      topology.tags.forEach(tag => {
        if (!labels.includes(tag)) {
          labels.push(tag);
        }
      });
      return labels;
    }, []);
    return allLabels.sort();
  };

  // 过滤拓扑数据
  const filteredTopologies = topologies.filter(topology => {
    const matchesSearch =
      topology.name.toLowerCase().includes(searchText.toLowerCase()) ||
      topology.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || topology.status === statusFilter;
    const matchesLabels = labelsFilter === 'all' || topology.tags?.includes(labelsFilter);

    return matchesSearch && matchesStatus && matchesLabels;
  });

  // 分页处理
  const startIndex = (pagination.current - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const paginatedTopologies = filteredTopologies.slice(startIndex, endIndex);

  // 更新分页总数
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      total: filteredTopologies.length
    }));
  }, [filteredTopologies.length]);

  // 分页处理函数
  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination(prev => ({
      ...prev,
      current: page,
      pageSize: pageSize || prev.pageSize
    }));
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setPagination(prev => ({
      ...prev,
      current: 1,  // 改变页面大小时重置到第一页
      pageSize: size
    }));
  };

  const handleView = (topology: Topology) => {
    navigate(`/test-tools/entity-topology/${topology.id}`);
  };

  const handleEdit = (topology: Topology) => {
    message.info(`${t('entityTopology:actions.edit')} ${topology.name}`);
  };

  const handleDelete = (id: string) => {
    message.info(`${t('entityTopology:actions.delete')} ID: ${id}`);
  };

  const handleRefresh = (id: string) => {
    message.success(`${t('entityTopology:actions.refreshSuccess')} ID: ${id}`);
  };

  // 计算统计数据
  const activeTopologies = topologies.filter(t => t.status === 'active').length;
  const totalNodes = topologies.reduce((sum, t) => sum + t.stats.nodeCount, 0);
  const totalLinks = topologies.reduce((sum, t) => sum + t.stats.linkCount, 0);
  const avgHealthScore =
    topologies.length > 0
      ? (topologies.reduce((sum, t) => sum + t.stats.healthScore, 0) / topologies.length).toFixed(1)
      : '0';

  return (
    <div className="entity-topology-page">
      <div className="page-header">
        <Title level={2} className="page-title">
          <Space>
            <NodeIndexOutlined />
            {t('entityTopology:title')}
          </Space>
        </Title>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={() => loadTopologies()}>
            {t('common:refresh')}
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTopology}>
            {t('entityTopology:actions.createTopology')}
          </Button>
        </Space>
      </div>

      {/* Paragraph单独一行，充满宽度 */}
      <Paragraph className="page-description">{t('entityTopology:description')}</Paragraph>

      {/* 统计信息 */}
      <Row gutter={16} className="stats-row">
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card stats-primary">
            <Statistic
              title={t('entityTopology:stats.totalTopologies')}
              value={topologies.length}
              prefix={<NodeIndexOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card stats-success">
            <Statistic
              title={t('entityTopology:stats.activeTopologies')}
              value={activeTopologies}
              prefix={<HeartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card stats-warning">
            <Statistic title={t('entityTopology:stats.totalNodes')} value={totalNodes} prefix={<DatabaseOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card stats-info">
            <Statistic
              title={t('entityTopology:stats.avgHealthScore')}
              value={avgHealthScore}
              suffix="%"
              prefix={<LinkOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 搜索和过滤器 */}
      <Card className="filter-card">
        <Row gutter={[16, 16]} align="middle">
          {/* 搜索框 - 使用flex auto自适应宽度 */}
          <Col flex="auto">
            <Search
              placeholder={t('entityTopology:search.placeholder')}
              value={searchText}
              allowClear
              onSearch={setSearchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: '100%' }}
              enterButton={<SearchOutlined />}
            />
          </Col>
          
          {/* 过滤器 */}
          <Col>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 120 }}
              placeholder={t('entityTopology:search.statusFilter')}
            >
              <Option value="all">{t('entityTopology:filters.allStatus')}</Option>
              <Option value="active">{t('entityTopology:status.active')}</Option>
              <Option value="inactive">{t('entityTopology:status.inactive')}</Option>
              <Option value="warning">{t('entityTopology:status.warning')}</Option>
              <Option value="error">{t('entityTopology:status.error')}</Option>
            </Select>
          </Col>
          
          <Col>
            <Select
              value={labelsFilter}
              onChange={setLabelsFilter}
              style={{ width: 120 }}
              placeholder={t('entityTopology:search.labelsFilter')}
            >
              <Option value="all">{t('entityTopology:filters.allLabels')}</Option>
              {getAllAvailableLabels().map(label => (
                <Option key={label} value={label}>
                  {label}
                </Option>
              ))}
            </Select>
          </Col>
          
          {/* 刷新按钮 */}
          <Col>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={() => loadTopologies()} 
              title={t('common:refresh')} 
            />
          </Col>
        </Row>
      </Card>

      {/* 拓扑卡片展示 */}
      <div className="topology-content">
        <Spin spinning={loading}>
          {filteredTopologies.length === 0 ? (
            <Card className="empty-card">
              <Empty description={t('entityTopology:empty.description')} className="empty-state" />
            </Card>
          ) : (
            <>
              <Row gutter={[24, 24]}>
                {paginatedTopologies.map(topology => (
                  <Col xs={24} sm={12} lg={8} xl={6} key={topology.id}>
                    <TopologyCard
                      topology={topology}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onRefresh={handleRefresh}
                      onClick={handleView}
                    />
                  </Col>
                ))}
              </Row>

              {/* 分页组件 */}
              {filteredTopologies.length > 0 && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  marginTop: '32px',
                  padding: '16px 0'
                }}>
                  <Pagination
                    current={pagination.current}
                    total={pagination.total}
                    pageSize={pagination.pageSize}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total, range) => 
                      `${range[0]}-${range[1]} / ${total} ${t('entityTopology:pagination.items')}`
                    }
                    pageSizeOptions={['10', '20', '50', '100']}
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageSizeChange}
                    size="default"
                  />
                </div>
              )}
            </>
          )}
        </Spin>
      </div>

      {/* 创建拓扑图Modal */}
      <Modal
        title={t('entityTopology:actions.createTopology')}
        open={createModalVisible}
        onCancel={handleCreateCancel}
        onOk={() => createForm.submit()}
        confirmLoading={createLoading}
        width={600}
        destroyOnHidden
      >
        <Form form={createForm} layout="vertical" onFinish={handleCreateSubmit}>
          <Form.Item
            name="name"
            label={t('entityTopology:form.name')}
            rules={[
              { required: true, message: t('entityTopology:form.nameRequired') },
              { max: 50, message: t('entityTopology:form.nameMaxLength') }
            ]}
          >
            <Input placeholder={t('entityTopology:form.namePlaceholder')} />
          </Form.Item>

          <Form.Item
            name="type"
            label={t('entityTopology:form.type')}
            rules={[{ required: true, message: t('entityTopology:form.typeRequired') }]}
          >
            <Select placeholder={t('entityTopology:form.typePlaceholder')}>
              <Option value="network">{t('entityTopology:types.network')}</Option>
              <Option value="application">{t('entityTopology:types.application')}</Option>
              <Option value="database">{t('entityTopology:types.database')}</Option>
              <Option value="system">{t('entityTopology:types.system')}</Option>
            </Select>
          </Form.Item>

          <Form.Item name="plane" label={t('entityTopology:form.plane')}>
            <Select placeholder={t('entityTopology:form.planePlaceholder')} allowClear>
              <Option value="control">{t('entityTopology:planes.control')}</Option>
              <Option value="data">{t('entityTopology:planes.data')}</Option>
              <Option value="management">{t('entityTopology:planes.management')}</Option>
              <Option value="service">{t('entityTopology:planes.service')}</Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" label={t('entityTopology:form.description')}>
            <Input.TextArea
              rows={3}
              placeholder={t('entityTopology:form.descriptionPlaceholder')}
              maxLength={200}
              showCount
            />
          </Form.Item>

          <Form.Item name="tags" label={t('entityTopology:form.tags')}>
            <Select
              mode="tags"
              placeholder={t('entityTopology:form.tagsPlaceholder')}
              tokenSeparators={[',']}
              maxTagCount={5}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EntityTopology;
