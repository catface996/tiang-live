import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Space,
  Button,
  Row,
  Col,
  Statistic,
  Tag,
  Modal,
  message,
  Select,
  Input
} from 'antd';
import {
  NodeIndexOutlined,
  PlusOutlined,
  ReloadOutlined,
  FullscreenOutlined,
  DownloadOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../../utils';
import { useAppSelector } from '../../../store';
import SearchFilterBar from '../../../components/Common/SearchFilterBar';
import TopologyCard, { type Topology } from './components/TopologyCard';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const PageContainer = styled.div<{ $isDark: boolean }>`
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: ${props => (props.$isDark ? '#000000' : '#f5f5f5')};
`;

const StatsCard = styled(Card)<{ $isDark: boolean }>`
  border-radius: 8px;
  box-shadow: ${props => (props.$isDark ? '0 2px 8px rgba(255, 255, 255, 0.05)' : '0 2px 8px rgba(0, 0, 0, 0.06)')};
  border: ${props => (props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0')};
  background: ${props => (props.$isDark ? '#141414' : '#ffffff')};

  .ant-card-body {
    padding: 16px;
  }

  .ant-statistic-title {
    color: ${props => (props.$isDark ? '#ffffff' : '#666666')};
  }

  .ant-statistic-content {
    color: ${props => (props.$isDark ? '#ffffff' : '#262626')};
  }
`;

const EntityTopology: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['testTools', 'common']);
  const [searchText, setSearchText] = useState('');
  const [filterPlane, setFilterPlane] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const { currentTheme } = useAppSelector(state => state.theme);
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    setPageTitle(t('testTools:entityTopology.title'));
  }, [t]);

  // 模拟拓扑数据
  const topologyData: Topology[] = [
    {
      id: '1',
      name: 'Web服务拓扑',
      type: 'application',
      status: 'active',
      description: 'Web应用服务器集群的拓扑结构，包含负载均衡器、应用服务器和数据库连接',
      plane: '应用平面',
      tags: ['生产环境', 'Web服务', '高可用'],
      stats: {
        nodeCount: 12,
        linkCount: 18,
        healthScore: 95,
        lastUpdated: '2024-06-15 14:30:25'
      },
      createdAt: '2024-05-20'
    },
    {
      id: '2',
      name: '数据库集群拓扑',
      type: 'database',
      status: 'active',
      description: '数据库主从集群拓扑，包含主库、从库和缓存层的连接关系',
      plane: '数据平面',
      tags: ['数据库', '主从复制', '缓存'],
      stats: {
        nodeCount: 8,
        linkCount: 12,
        healthScore: 88,
        lastUpdated: '2024-06-15 14:25:10'
      },
      createdAt: '2024-04-15'
    },
    {
      id: '3',
      name: '网络基础设施拓扑',
      type: 'network',
      status: 'warning',
      description: '网络设备拓扑图，包含交换机、路由器和防火墙的连接关系',
      plane: '网络平面',
      tags: ['网络设备', '基础设施'],
      stats: {
        nodeCount: 15,
        linkCount: 22,
        healthScore: 72,
        lastUpdated: '2024-06-15 14:20:30'
      },
      createdAt: '2024-06-01'
    },
    {
      id: '4',
      name: '微服务架构拓扑',
      type: 'system',
      status: 'active',
      description: '微服务系统架构拓扑，展示各个服务之间的调用关系和依赖',
      plane: '服务平面',
      tags: ['微服务', '容器化', 'API网关'],
      stats: {
        nodeCount: 25,
        linkCount: 35,
        healthScore: 92,
        lastUpdated: '2024-06-15 14:15:45'
      },
      createdAt: '2024-03-10'
    },
    {
      id: '5',
      name: '监控系统拓扑',
      type: 'system',
      status: 'error',
      description: '监控系统的拓扑结构，包含数据采集、处理和展示组件',
      plane: '监控平面',
      tags: ['监控', '告警', '数据采集'],
      stats: {
        nodeCount: 10,
        linkCount: 14,
        healthScore: 45,
        lastUpdated: '2024-06-15 13:50:20'
      },
      createdAt: '2024-05-05'
    },
    {
      id: '6',
      name: '存储系统拓扑',
      type: 'system',
      status: 'inactive',
      description: '分布式存储系统拓扑，展示存储节点和副本分布情况',
      plane: '存储平面',
      tags: ['分布式存储', '副本', '容灾'],
      stats: {
        nodeCount: 20,
        linkCount: 28,
        healthScore: 0,
        lastUpdated: '2024-06-15 10:30:15'
      },
      createdAt: '2024-02-20'
    }
  ];

  return (
    <PageContainer $isDark={isDark}>
      {/* 页面标题 */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, color: isDark ? '#ffffff' : '#262626' }}>
          <NodeIndexOutlined style={{ marginRight: 12 }} />
          {t('testTools:entityTopology.title')}
        </Title>
        <Paragraph style={{ margin: '8px 0 0 0', color: isDark ? '#ffffff' : '#666666' }}>
          {t('testTools:entityTopology.description')}
        </Paragraph>
      </div>

      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark}>
            <Statistic
              title={t('testTools:entityTopology.stats.totalTopologies')}
              value={topologyData.length}
              prefix={<NodeIndexOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark}>
            <Statistic
              title={t('testTools:entityTopology.stats.activeTopologies')}
              value={topologyData.filter(t => t.status === 'active').length}
              valueStyle={{ color: '#52c41a' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark}>
            <Statistic
              title={t('testTools:entityTopology.stats.warningTopologies')}
              value={topologyData.filter(t => t.status === 'warning' || t.status === 'error').length}
              valueStyle={{ color: '#faad14' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark}>
            <Statistic
              title={t('testTools:entityTopology.stats.avgHealthScore')}
              value={Math.round(topologyData.reduce((sum, t) => sum + t.stats.healthScore, 0) / topologyData.length)}
              suffix="%"
              valueStyle={{ color: '#1890ff' }}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 搜索和过滤栏 */}
      <Card style={{ marginBottom: 24, background: isDark ? '#141414' : '#ffffff' }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={8} md={6}>
            <Input
              placeholder={t('testTools:entityTopology.search.placeholder')}
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={8} md={4}>
            <Select
              value={filterPlane}
              onChange={setFilterPlane}
              style={{ width: '100%' }}
              placeholder={t('testTools:entityTopology.search.selectPlane')}
            >
              <Option value="all">{t('testTools:entityTopology.search.allPlanes')}</Option>
              <Option value="应用平面">{t('testTools:entityTopology.planes.application')}</Option>
              <Option value="数据平面">{t('testTools:entityTopology.planes.data')}</Option>
              <Option value="网络平面">{t('testTools:entityTopology.planes.network')}</Option>
              <Option value="服务平面">{t('testTools:entityTopology.planes.service')}</Option>
              <Option value="监控平面">{t('testTools:entityTopology.planes.monitor')}</Option>
              <Option value="存储平面">{t('testTools:entityTopology.planes.storage')}</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8} md={4}>
            <Select
              value={filterType}
              onChange={setFilterType}
              style={{ width: '100%' }}
              placeholder={t('testTools:entityTopology.search.selectType')}
            >
              <Option value="all">{t('testTools:entityTopology.search.allTypes')}</Option>
              <Option value="network">{t('testTools:types.network')}</Option>
              <Option value="application">{t('testTools:types.application')}</Option>
              <Option value="database">{t('testTools:types.database')}</Option>
              <Option value="system">{t('testTools:types.system')}</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8} md={4}>
            <Select
              value={filterStatus}
              onChange={setFilterStatus}
              style={{ width: '100%' }}
              placeholder={t('testTools:entityTopology.search.selectStatus')}
            >
              <Option value="all">{t('testTools:entityTopology.search.allStatus')}</Option>
              <Option value="active">{t('testTools:status.active')}</Option>
              <Option value="warning">{t('testTools:status.warning')}</Option>
              <Option value="error">{t('testTools:status.error')}</Option>
              <Option value="inactive">{t('testTools:status.inactive')}</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => message.info(t('testTools:entityTopology.actions.createTopology') + '功能开发中...')}
              >
                {t('testTools:entityTopology.actions.createTopology')}
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => message.success(t('testTools:entityTopology.actions.refreshSuccess'))}
                loading={loading}
              />
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 拓扑卡片列表 */}
      <Row gutter={[16, 16]}>
        {topologyData
          .filter(topology => {
            const matchesSearch = topology.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                topology.description.toLowerCase().includes(searchText.toLowerCase());
            const matchesPlane = filterPlane === 'all' || topology.plane === filterPlane;
            const matchesType = filterType === 'all' || topology.type === filterType;
            const matchesStatus = filterStatus === 'all' || topology.status === filterStatus;
            
            return matchesSearch && matchesPlane && matchesType && matchesStatus;
          })
          .map(topology => (
            <Col xs={24} sm={12} lg={8} xl={6} key={topology.id}>
              <TopologyCard
                topology={topology}
                onView={(topology) => message.info(`查看拓扑: ${topology.name}`)}
                onEdit={(topology) => message.info(`编辑拓扑: ${topology.name}`)}
                onDelete={(id) => message.info(`删除拓扑: ${id}`)}
                onRefresh={(id) => message.success(`刷新拓扑: ${id}`)}
              />
            </Col>
          ))}
      </Row>

      {/* 空状态 */}
      {topologyData.filter(topology => {
        const matchesSearch = topology.name.toLowerCase().includes(searchText.toLowerCase()) ||
                            topology.description.toLowerCase().includes(searchText.toLowerCase());
        const matchesPlane = filterPlane === 'all' || topology.plane === filterPlane;
        const matchesType = filterType === 'all' || topology.type === filterType;
        const matchesStatus = filterStatus === 'all' || topology.status === filterStatus;
        
        return matchesSearch && matchesPlane && matchesType && matchesStatus;
      }).length === 0 && (
        <Card style={{ textAlign: 'center', padding: '40px 0', background: isDark ? '#141414' : '#ffffff' }}>
          <NodeIndexOutlined style={{ fontSize: '48px', color: isDark ? '#666666' : '#d9d9d9', marginBottom: 16 }} />
          <Title level={4} style={{ color: isDark ? '#ffffff' : '#666666' }}>
            {t('testTools:entityTopology.empty.title')}
          </Title>
          <Paragraph style={{ color: isDark ? '#ffffff' : '#999999' }}>
            {t('testTools:entityTopology.empty.description')}
          </Paragraph>
        </Card>
      )}
    </PageContainer>
  );
};

export default EntityTopology;
