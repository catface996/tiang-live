import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
  Tabs, 
  Space, 
  Button, 
  Row, 
  Col, 
  Statistic,
  Badge,
  Tag,
  Input,
  Select,
  Drawer,
  Descriptions,
  Empty
} from 'antd';
import { 
  NodeIndexOutlined, 
  ShareAltOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  SettingOutlined,
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  FileTextOutlined,
  LinkOutlined,
  AppstoreOutlined,
  ApiOutlined,
  DatabaseOutlined,
  TableOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { setPageTitle } from '../../utils';
import EntityCard from '../../components/Entity/EntityCard';
import entitiesData from '../../data/entitiesMock.json';

const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

const PageContainer = styled.div`
  padding: 24px;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const TabContent = styled.div`
  min-height: 500px;
`;

const StatsCard = styled(Card)`
  .ant-card-body {
    padding: 16px;
  }
`;

const FilterBar = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background: var(--card-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
`;

const EntityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 16px;
`;

const EntityManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [entities, setEntities] = useState<any[]>([]);

  useEffect(() => {
    setPageTitle('实体管理');
    setEntities(entitiesData.entities);
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleEntityClick = (entity: any) => {
    setSelectedEntity(entity);
    setDrawerVisible(true);
  };

  const getEntityStats = () => {
    const stats = {
      total: entities.length,
      active: entities.filter(e => e.status === 'active' || e.status === 'running').length,
      inactive: entities.filter(e => e.status === 'inactive').length,
      warning: entities.filter(e => e.status === 'warning').length
    };
    return stats;
  };

  const getEntityTypeStats = () => {
    const typeStats: { [key: string]: number } = {};
    entities.forEach(entity => {
      typeStats[entity.type] = (typeStats[entity.type] || 0) + 1;
    });
    return typeStats;
  };

  const getFilteredEntities = () => {
    let filtered = entities;

    // 按标签页过滤
    if (activeTab !== 'all') {
      filtered = filtered.filter(entity => entity.type === activeTab);
    }

    // 按搜索文本过滤
    if (searchText) {
      filtered = filtered.filter(entity => 
        entity.name.toLowerCase().includes(searchText.toLowerCase()) ||
        entity.description.toLowerCase().includes(searchText.toLowerCase()) ||
        entity.tags?.some((tag: string) => tag.toLowerCase().includes(searchText.toLowerCase()))
      );
    }

    // 按类型过滤
    if (filterType !== 'all') {
      filtered = filtered.filter(entity => entity.type === filterType);
    }

    // 按状态过滤
    if (filterStatus !== 'all') {
      filtered = filtered.filter(entity => entity.status === filterStatus);
    }

    return filtered;
  };

  const renderEntityManagement = () => {
    const stats = getEntityStats();
    const filteredEntities = getFilteredEntities();

    return (
      <TabContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <Title level={3} style={{ margin: 0 }}>实体管理</Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
              管理系统中的各种实体对象，包括报表、业务链路、系统、接口、数据库等。
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ExportOutlined />}>
              导出
            </Button>
            <Button icon={<ReloadOutlined />}>
              刷新
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              创建实体
            </Button>
          </Space>
        </div>

        {/* 统计信息 */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <StatsCard>
              <Statistic
                title="实体总数"
                value={stats.total}
                suffix="个"
                valueStyle={{ color: '#1890ff' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard>
              <Statistic
                title="活跃实体"
                value={stats.active}
                suffix="个"
                valueStyle={{ color: '#52c41a' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard>
              <Statistic
                title="告警实体"
                value={stats.warning}
                suffix="个"
                valueStyle={{ color: '#faad14' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard>
              <Statistic
                title="异常实体"
                value={stats.inactive}
                suffix="个"
                valueStyle={{ color: '#f5222d' }}
              />
            </StatsCard>
          </Col>
        </Row>

        {/* 过滤条件 */}
        <FilterBar>
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Search
                placeholder="搜索实体名称、描述或标签"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: '100%' }}
                allowClear
              />
            </Col>
            <Col>
              <Select
                value={filterType}
                onChange={setFilterType}
                style={{ width: 120 }}
                placeholder="类型"
              >
                <Option value="all">所有类型</Option>
                <Option value="report">报表</Option>
                <Option value="business_link">业务链路</Option>
                <Option value="business_system">业务系统</Option>
                <Option value="api">接口</Option>
                <Option value="database">数据库</Option>
                <Option value="table">数据表</Option>
                <Option value="middleware">中间件</Option>
                <Option value="microservice">微服务</Option>
                <Option value="scheduled_job">定时任务</Option>
                <Option value="configuration">配置</Option>
              </Select>
            </Col>
            <Col>
              <Select
                value={filterStatus}
                onChange={setFilterStatus}
                style={{ width: 100 }}
                placeholder="状态"
              >
                <Option value="all">所有状态</Option>
                <Option value="active">活跃</Option>
                <Option value="running">运行中</Option>
                <Option value="inactive">停用</Option>
                <Option value="warning">告警</Option>
              </Select>
            </Col>
          </Row>
        </FilterBar>

        {/* 实体卡片网格 */}
        {filteredEntities.length > 0 ? (
          <EntityGrid>
            {filteredEntities.map((entity) => (
              <EntityCard
                key={entity.id}
                entity={entity}
                onClick={handleEntityClick}
              />
            ))}
          </EntityGrid>
        ) : (
          <Empty 
            description="没有找到匹配的实体"
            style={{ margin: '60px 0' }}
          />
        )}
      </TabContent>
    );
  };

  const renderEntityDetail = () => {
    if (!selectedEntity) return null;

    return (
      <Drawer
        title={`实体详情: ${selectedEntity.name}`}
        placement="right"
        width={600}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="实体ID">{selectedEntity.id}</Descriptions.Item>
          <Descriptions.Item label="实体名称">{selectedEntity.name}</Descriptions.Item>
          <Descriptions.Item label="实体类型">
            <Tag color="blue">{selectedEntity.type}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="分类">{selectedEntity.category}</Descriptions.Item>
          <Descriptions.Item label="状态">
            <Badge 
              status={selectedEntity.status === 'active' || selectedEntity.status === 'running' ? 'success' : 'error'} 
              text={selectedEntity.status} 
            />
          </Descriptions.Item>
          <Descriptions.Item label="描述">{selectedEntity.description}</Descriptions.Item>
          <Descriptions.Item label="负责人">{selectedEntity.owner}</Descriptions.Item>
          
          {selectedEntity.version && (
            <Descriptions.Item label="版本">{selectedEntity.version}</Descriptions.Item>
          )}
          
          {selectedEntity.technology && (
            <Descriptions.Item label="技术栈">{selectedEntity.technology}</Descriptions.Item>
          )}
          
          {selectedEntity.instances && (
            <Descriptions.Item label="实例数">{selectedEntity.instances}</Descriptions.Item>
          )}
          
          {selectedEntity.method && (
            <Descriptions.Item label="请求方法">
              <Tag color={selectedEntity.method === 'GET' ? 'green' : 'blue'}>
                {selectedEntity.method}
              </Tag>
            </Descriptions.Item>
          )}
          
          {selectedEntity.path && (
            <Descriptions.Item label="接口路径">
              <code>{selectedEntity.path}</code>
            </Descriptions.Item>
          )}
          
          {selectedEntity.database && (
            <Descriptions.Item label="所属数据库">{selectedEntity.database}</Descriptions.Item>
          )}
          
          {selectedEntity.tableName && (
            <Descriptions.Item label="表名">
              <code>{selectedEntity.tableName}</code>
            </Descriptions.Item>
          )}
          
          <Descriptions.Item label="标签">
            <Space>
              {selectedEntity.tags?.map((tag: string, index: number) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </Space>
          </Descriptions.Item>
        </Descriptions>

        {/* 指标信息 */}
        {selectedEntity.metrics && (
          <Card title="性能指标" size="small" style={{ marginTop: 16 }}>
            <Row gutter={16}>
              {Object.entries(selectedEntity.metrics).map(([key, value]) => (
                <Col span={8} key={key}>
                  <Statistic
                    title={key}
                    value={value as string | number}
                    valueStyle={{ fontSize: '14px' }}
                  />
                </Col>
              ))}
            </Row>
          </Card>
        )}

        {/* SLA信息 */}
        {selectedEntity.sla && (
          <Card title="SLA指标" size="small" style={{ marginTop: 16 }}>
            <Descriptions column={1} size="small">
              {Object.entries(selectedEntity.sla).map(([key, value]) => (
                <Descriptions.Item key={key} label={key}>
                  {value as string}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Card>
        )}
      </Drawer>
    );
  };

  const typeStats = getEntityTypeStats();

  return (
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              实体管理
              <Badge 
                count="NEW" 
                style={{ 
                  backgroundColor: '#52c41a', 
                  marginLeft: 12,
                  fontSize: 12 
                }} 
              />
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              统一管理系统中的各种实体对象，包括报表、业务链路、系统、接口、数据库等，提供完整的实体生命周期管理。
            </Paragraph>
          </div>
        </div>
      </PageHeader>

      <Card>
        <Tabs 
          activeKey={activeTab} 
          onChange={handleTabChange}
          size="large"
          tabBarStyle={{ marginBottom: 24 }}
        >
          <Tabs.TabPane 
            tab={
              <Space>
                <NodeIndexOutlined />
                全部实体
                <Badge count={getEntityStats().total} showZero />
              </Space>
            } 
            key="all"
          >
            {renderEntityManagement()}
          </Tabs.TabPane>
          
          <Tabs.TabPane 
            tab={
              <Space>
                <FileTextOutlined />
                报表
                <Badge count={typeStats.report || 0} showZero />
              </Space>
            } 
            key="report"
          >
            {renderEntityManagement()}
          </Tabs.TabPane>
          
          <Tabs.TabPane 
            tab={
              <Space>
                <LinkOutlined />
                业务链路
                <Badge count={typeStats.business_link || 0} showZero />
              </Space>
            } 
            key="business_link"
          >
            {renderEntityManagement()}
          </Tabs.TabPane>
          
          <Tabs.TabPane 
            tab={
              <Space>
                <AppstoreOutlined />
                业务系统
                <Badge count={typeStats.business_system || 0} showZero />
              </Space>
            } 
            key="business_system"
          >
            {renderEntityManagement()}
          </Tabs.TabPane>
          
          <Tabs.TabPane 
            tab={
              <Space>
                <ApiOutlined />
                接口
                <Badge count={typeStats.api || 0} showZero />
              </Space>
            } 
            key="api"
          >
            {renderEntityManagement()}
          </Tabs.TabPane>
          
          <Tabs.TabPane 
            tab={
              <Space>
                <DatabaseOutlined />
                数据库
                <Badge count={typeStats.database || 0} showZero />
              </Space>
            } 
            key="database"
          >
            {renderEntityManagement()}
          </Tabs.TabPane>
          
          <Tabs.TabPane 
            tab={
              <Space>
                <TableOutlined />
                数据表
                <Badge count={typeStats.table || 0} showZero />
              </Space>
            } 
            key="table"
          >
            {renderEntityManagement()}
          </Tabs.TabPane>
        </Tabs>
      </Card>

      {renderEntityDetail()}
    </PageContainer>
  );
};

export default EntityManagement;
