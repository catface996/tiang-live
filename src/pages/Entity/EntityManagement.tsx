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
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../utils';
import EntityCard from '../../components/Entity/EntityCard';
import D3RelationshipGraph from '../../components/Relation/D3RelationshipGraph';
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
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('entities');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [entities, setEntities] = useState<any[]>([]);

  useEffect(() => {
    setPageTitle(t('entities.title'));
    setEntities(entitiesData.entities);
  }, [t]);

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

    // 按分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(entity => entity.type === selectedCategory);
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
            <Title level={3} style={{ margin: 0 }}>{t('entities.title')}</Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
              {t('entities.subtitle')}
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ExportOutlined />}>
              {t('common.export')}
            </Button>
            <Button icon={<ReloadOutlined />}>
              {t('common.refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('entities.createEntity')}
            </Button>
          </Space>
        </div>

        {/* 统计信息 */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <StatsCard>
              <Statistic
                title={t('entities.stats.totalEntities')}
                value={stats.total}
                suffix={t('common.unit')}
                valueStyle={{ color: '#1890ff' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard>
              <Statistic
                title={t('entities.stats.activeEntities')}
                value={stats.active}
                suffix={t('common.unit')}
                valueStyle={{ color: '#52c41a' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard>
              <Statistic
                title={t('entities.stats.warningEntities')}
                value={stats.warning}
                suffix={t('common.unit')}
                valueStyle={{ color: '#faad14' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard>
              <Statistic
                title={t('entities.stats.errorEntities')}
                value={stats.inactive}
                suffix={t('common.unit')}
                valueStyle={{ color: '#f5222d' }}
              />
            </StatsCard>
          </Col>
        </Row>

        {/* 分类标签 */}
        <div style={{ marginBottom: 16 }}>
          <Space wrap>
            <Tag.CheckableTag
              checked={selectedCategory === 'all'}
              onChange={() => setSelectedCategory('all')}
            >
              全部 ({stats.total})
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={selectedCategory === 'report'}
              onChange={() => setSelectedCategory('report')}
            >
              📊 报表 ({typeStats.report || 0})
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={selectedCategory === 'business_link'}
              onChange={() => setSelectedCategory('business_link')}
            >
              🔗 业务链路 ({typeStats.business_link || 0})
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={selectedCategory === 'business_system'}
              onChange={() => setSelectedCategory('business_system')}
            >
              🏢 业务系统 ({typeStats.business_system || 0})
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={selectedCategory === 'api'}
              onChange={() => setSelectedCategory('api')}
            >
              🔌 接口 ({typeStats.api || 0})
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={selectedCategory === 'database'}
              onChange={() => setSelectedCategory('database')}
            >
              💾 数据库 ({typeStats.database || 0})
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={selectedCategory === 'table'}
              onChange={() => setSelectedCategory('table')}
            >
              📋 数据表 ({typeStats.table || 0})
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={selectedCategory === 'middleware'}
              onChange={() => setSelectedCategory('middleware')}
            >
              ☁️ 中间件 ({typeStats.middleware || 0})
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={selectedCategory === 'microservice'}
              onChange={() => setSelectedCategory('microservice')}
            >
              🔧 微服务 ({typeStats.microservice || 0})
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={selectedCategory === 'scheduled_job'}
              onChange={() => setSelectedCategory('scheduled_job')}
            >
              ⏰ 定时任务 ({typeStats.scheduled_job || 0})
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={selectedCategory === 'configuration'}
              onChange={() => setSelectedCategory('configuration')}
            >
              ⚙️ 配置 ({typeStats.configuration || 0})
            </Tag.CheckableTag>
          </Space>
        </div>

        {/* 过滤条件 */}
        <FilterBar>
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Search
                placeholder={t('entities.searchPlaceholder')}
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
                placeholder={t('entities.typeFilter')}
              >
                <Option value="all">{t('entities.allTypes')}</Option>
                <Option value="report">{t('entities.types.report')}</Option>
                <Option value="business_link">{t('entities.types.businessLink')}</Option>
                <Option value="business_system">{t('entities.types.businessSystem')}</Option>
                <Option value="api">{t('entities.types.api')}</Option>
                <Option value="database">{t('entities.types.database')}</Option>
                <Option value="table">{t('entities.types.table')}</Option>
                <Option value="middleware">{t('entities.types.middleware')}</Option>
                <Option value="microservice">{t('entities.types.microservice')}</Option>
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
            description={t('entities.noEntitiesFound')}
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
        title={`${t('entities.entityDetail')}: ${selectedEntity.name}`}
        placement="right"
        width={600}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label={t('entities.entityId')}>{selectedEntity.id}</Descriptions.Item>
          <Descriptions.Item label={t('entities.entityName')}>{selectedEntity.name}</Descriptions.Item>
          <Descriptions.Item label={t('entities.entityType')}>
            <Tag color="blue">{selectedEntity.type}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t('entities.category')}>{selectedEntity.category}</Descriptions.Item>
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

  const renderRelationshipGraph = () => (
    <TabContent>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>{t('entities.relationshipGraph')}</Title>
          <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
            {t('entities.relationshipGraphDesc')}
          </Paragraph>
        </div>
        <Space>
          <Button icon={<ExportOutlined />}>
            {t('entities.exportGraph')}
          </Button>
          <Button icon={<SettingOutlined />}>
            {t('entities.graphSettings')}
          </Button>
          <Button icon={<ReloadOutlined />}>
            {t('entities.refreshGraph')}
          </Button>
        </Space>
      </div>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('entities.stats.totalRelations')}
              value={25}
              suffix={t('common.unitRelation')}
              valueStyle={{ color: '#1890ff' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('entities.stats.relationTypes')}
              value={5}
              suffix={t('common.unitType')}
              valueStyle={{ color: '#52c41a' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('entities.stats.graphNodes')}
              value={21}
              suffix={t('common.unit')}
              valueStyle={{ color: '#faad14' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="支付系统"
              value={5}
              suffix="个"
              valueStyle={{ color: '#722ed1' }}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* D3.js 关系图谱 */}
      <D3RelationshipGraph />
    </TabContent>
  );

  const typeStats = getEntityTypeStats();

  return (
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              {t('entities.title')}
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
              {t('entities.description')}
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
                {t('entities.title')}
                <Badge count={getEntityStats().total} showZero />
              </Space>
            } 
            key="entities"
          >
            {renderEntityManagement()}
          </Tabs.TabPane>
          
          <Tabs.TabPane 
            tab={
              <Space>
                <ShareAltOutlined />
                {t('entities.relationshipGraph')}
              </Space>
            } 
            key="relationships"
          >
            {renderRelationshipGraph()}
          </Tabs.TabPane>
        </Tabs>
      </Card>

      {renderEntityDetail()}
    </PageContainer>
  );
};

export default EntityManagement;
