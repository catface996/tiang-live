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
  Form
} from 'antd';
import {
  PlusOutlined,
  ReloadOutlined,
  NodeIndexOutlined,
  LinkOutlined,
  HeartOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TopologyCard from './components/TopologyCard';
import '../../../styles/entity-topology.css';

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
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [topologies, setTopologies] = useState<Topology[]>([]);

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
      setTopologies(mockTopologies);
    } catch (error) {
      message.error(t('entityTopology:messages.loadFailed'));
    } finally {
      setLoading(false);
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
      // 生成新的拓扑图ID
      const newId = `topology_${Date.now()}`;

      // 创建新的拓扑图对象
      const newTopology: Topology = {
        id: newId,
        name: values.name,
        type: values.type,
        status: 'active',
        description: values.description || '',
        plane: values.plane || 'default',
        tags: values.tags || [],
        stats: {
          nodeCount: 0,
          linkCount: 0,
          healthScore: 100,
          lastUpdated: new Date().toISOString()
        },
        createdAt: new Date().toISOString()
      };

      // 添加到拓扑列表
      setTopologies(prev => [newTopology, ...prev]);

      message.success(t('entityTopology:messages.createSuccess'));
      setCreateModalVisible(false);
      createForm.resetFields();

      // 跳转到新创建的拓扑详情页
      navigate(`/test-tools/entity-topology/${newId}`);
    } catch (error) {
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

  // 过滤拓扑数据
  const filteredTopologies = topologies.filter(topology => {
    const matchesSearch =
      topology.name.toLowerCase().includes(searchText.toLowerCase()) ||
      topology.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || topology.status === statusFilter;
    const matchesType = typeFilter === 'all' || topology.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

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
          <Col xs={24} sm={16} md={18}>
            <Space wrap size={[8, 8]} className="filter-controls">
              <Search
                placeholder={t('entityTopology:search.placeholder')}
                allowClear
                className="search-input"
                onSearch={setSearchText}
                onChange={e => setSearchText(e.target.value)}
              />
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                className="filter-select"
                placeholder={t('entityTopology:search.statusFilter')}
              >
                <Option value="all">{t('entityTopology:filters.allStatus')}</Option>
                <Option value="active">{t('entityTopology:status.active')}</Option>
                <Option value="inactive">{t('entityTopology:status.inactive')}</Option>
                <Option value="warning">{t('entityTopology:status.warning')}</Option>
                <Option value="error">{t('entityTopology:status.error')}</Option>
              </Select>
              <Select
                value={typeFilter}
                onChange={setTypeFilter}
                className="filter-select"
                placeholder={t('entityTopology:search.typeFilter')}
              >
                <Option value="all">{t('entityTopology:filters.allTypes')}</Option>
                <Option value="network">{t('entityTopology:types.network')}</Option>
                <Option value="application">{t('entityTopology:types.application')}</Option>
                <Option value="database">{t('entityTopology:types.database')}</Option>
                <Option value="system">{t('entityTopology:types.system')}</Option>
              </Select>
              <Button icon={<ReloadOutlined />} onClick={() => loadTopologies()} title={t('common:refresh')} />
            </Space>
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
            <Row gutter={[24, 24]}>
              {filteredTopologies.map(topology => (
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
        destroyOnClose
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
