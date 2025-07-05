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
  Modal,
  Descriptions,
  Empty,
  Spin
} from 'antd';
import {
  NodeIndexOutlined,
  ShareAltOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
  ExportOutlined,
  LinkOutlined,
  AppstoreOutlined,
  ApiOutlined,
  DatabaseOutlined,
  TableOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../utils';
import EntityCard from '../../components/Entity/EntityCard';
import D3RelationshipGraph from '../../components/Relation/D3RelationshipGraph';
import { entityApi, type EntityStatisticsResponse } from '../../services/entityApi';
import enumApi, { type EnumItem } from '../../services/enumApi';
import '../../styles/entity-management.css';

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
  const { t } = useTranslation(['entities', 'common']);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('entities');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [entities, setEntities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [entityTypes, setEntityTypes] = useState<EnumItem[]>([]);
  const [entityStatuses, setEntityStatuses] = useState<EnumItem[]>([]);
  const [enumLoading, setEnumLoading] = useState(false);
  const [statistics, setStatistics] = useState<EntityStatisticsResponse | null>(null);
  const [statisticsLoading, setStatisticsLoading] = useState(false);

  useEffect(() => {
    setPageTitle(t('entities:title'));
    loadEntities();
    loadEnumData();
    loadStatistics(); // 加载统计数据
  }, [t]); // 添加必要的依赖

  // 加载统计数据
  const loadStatistics = async () => {
    console.log('🚀 开始加载实体统计数据');
    setStatisticsLoading(true);
    try {
      const response = await entityApi.getEntityStatistics();
      console.log('📊 统计数据API响应:', response);

      if (response && response.success && response.data) {
        console.log('✅ 统计数据加载成功:', response.data);
        setStatistics(response.data);
      } else {
        console.error('❌ 统计数据加载失败:', response);
        message.error('加载统计数据失败: ' + (response?.message || '未知错误'));
        setStatistics(null);
      }
    } catch (error) {
      console.error('❌ 统计数据加载异常:', error);
      message.error('加载统计数据失败: ' + (error.message || '网络错误'));
      setStatistics(null);
    } finally {
      setStatisticsLoading(false);
      console.log('🏁 统计数据加载完成');
    }
  };

  // 加载枚举数据
  const loadEnumData = async () => {
    setEnumLoading(true);
    try {
      console.log('🚀 开始加载枚举数据 - 使用batch接口');

      // 批量获取实体相关枚举
      const response = await enumApi.getEntityEnums();

      console.log('📡 Batch API完整响应:', JSON.stringify(response, null, 2));

      if (response && response.success && response.data) {
        console.log('✅ Batch接口调用成功');
        console.log('📊 返回的枚举数据:', response.data);
        console.log('📊 数据类型:', typeof response.data);
        console.log('📊 是否为数组:', Array.isArray(response.data));

        if (Array.isArray(response.data)) {
          console.log('📊 枚举数组长度:', response.data.length);

          // 遍历每个枚举项
          response.data.forEach((enumItem, index) => {
            console.log(`📋 枚举项 ${index}:`, {
              type: enumItem.type,
              itemsCount: enumItem.items ? enumItem.items.length : 0,
              items: enumItem.items
            });
          });

          // 查找EntityType - 使用正确的字段名 typeName
          const entityTypeEnum = response.data.find(item => item.typeName === 'EntityType');
          if (entityTypeEnum && entityTypeEnum.items) {
            console.log('✅ 找到EntityType枚举，设置到状态');
            console.log('📂 EntityType原始items:', entityTypeEnum.items);
            setEntityTypes(entityTypeEnum.items);

            // 立即验证设置结果
            setTimeout(() => {
              console.log('🔍 验证EntityType设置结果:', entityTypes);
            }, 100);
          } else {
            console.warn('⚠️ 未找到EntityType枚举');
            setEntityTypes([]);
          }

          // 查找EntityStatus - 使用正确的字段名 typeName
          const entityStatusEnum = response.data.find(item => item.typeName === 'EntityStatus');
          if (entityStatusEnum && entityStatusEnum.items) {
            console.log('✅ 找到EntityStatus枚举，设置到状态');
            console.log('📊 EntityStatus原始items:', entityStatusEnum.items);
            setEntityStatuses(entityStatusEnum.items);

            // 立即验证设置结果
            setTimeout(() => {
              console.log('🔍 验证EntityStatus设置结果:', entityStatuses);
            }, 100);
          } else {
            console.warn('⚠️ 未找到EntityStatus枚举');
            setEntityStatuses([]);
          }
        } else {
          console.error('❌ 返回的data不是数组格式');
          setEntityTypes([]);
          setEntityStatuses([]);
        }
      } else {
        console.error('❌ Batch API调用失败或返回格式异常:', {
          hasResponse: !!response,
          success: response?.success,
          hasData: !!response?.data
        });
        setEntityTypes([]);
        setEntityStatuses([]);
      }
    } catch (error) {
      console.error('❌ 加载枚举数据异常:', error);
      setEntityTypes([]);
      setEntityStatuses([]);
    } finally {
      setEnumLoading(false);
      console.log('🏁 枚举数据加载完成');
    }
  };

  // 加载实体列表数据
  const loadEntities = async () => {
    setLoading(true);
    try {
      console.log('🚀 开始加载实体列表');

      // 调用真实的API接口获取实体列表
      const response = await entityApi.listEntities({
        page: 1,
        size: 100 // 加载足够多的数据用于展示
      });

      if (response.success && response.data) {
        console.log('✅ 成功获取实体列表:', response.data);
        console.log('📊 原始数据示例:', response.data[0]);

        // 将后端数据转换为前端组件期望的格式
        const transformedEntities = response.data.map(entity => {
          console.log('🔄 转换前的实体数据:', entity);
          console.log('📊 Properties:', entity.properties);
          console.log('📋 Metadata:', entity.metadata);

          const transformed = {
            ...entity,
            // 字段映射：将后端字段映射到前端组件期望的字段
            tags: entity.labels || [], // labels -> tags
            owner: entity.properties?.owner || entity.metadata?.owner || entity.createdBy || '未知', // 从properties、metadata或createdBy获取负责人
            // 保持原有字段
            id: entity.id,
            name: entity.name,
            description: entity.description || '暂无描述',
            type: entity.type, // 直接使用type，不再映射为category
            status: entity.status?.toLowerCase() || 'active', // 转换为小写
            planeId: entity.planeId,
            properties: entity.properties || {},
            metadata: entity.metadata || {},
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
          };

          console.log('🔄 转换后的实体数据:', transformed);
          console.log('🏷️ 标签数据:', transformed.tags);
          console.log('📂 类型数据:', transformed.type);
          console.log('👤 负责人数据:', transformed.owner);

          return transformed;
        });

        setEntities(transformedEntities);
        console.log('🔄 数据转换完成，总数:', transformedEntities.length);
        console.log('📋 转换后的完整数据:', transformedEntities);
      } else {
        console.warn('⚠️ API返回数据格式异常:', response);
        setEntities([]);
        // 这里可以添加错误提示
      }
    } catch (error) {
      console.error('❌ 加载实体列表失败:', error);
      setEntities([]);
      // 这里可以添加错误提示
    } finally {
      setLoading(false);
    }
  };

  // 处理创建实体
  const handleCreateEntity = () => {
    navigate('/entities/create');
  };

  // 处理编辑实体
  const handleEditEntity = (entity: any) => {
    navigate(`/entities/edit/${entity.id}`);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  // 刷新所有数据
  const handleRefreshAll = async () => {
    console.log('🔄 刷新所有数据');
    await Promise.all([loadEntities(), loadStatistics()]);
  };

  const handleEntityClick = (entity: any) => {
    setSelectedEntity(entity);
    setModalVisible(true);
  };

  const getEntityStats = () => {
    // 优先使用API返回的统计数据
    if (statistics && statistics.overallStats) {
      console.log('✅ 使用API统计数据:', statistics.overallStats);
      return {
        total: statistics.overallStats.totalCount,
        active: statistics.overallStats.activeCount,
        inactive: statistics.overallStats.inactiveCount,
        warning: statistics.overallStats.warningCount,
        error: statistics.overallStats.errorCount
      };
    }

    // 如果API数据不可用，回退到本地计算（兼容性处理）
    console.log('⚠️ API统计数据不可用，使用本地计算');
    const stats = {
      total: entities.length,
      active: entities.filter(e => e.status === 'active' || e.status === 'running').length,
      inactive: entities.filter(e => e.status === 'inactive').length,
      warning: entities.filter(e => e.status === 'warning').length,
      error: entities.filter(e => e.status === 'error' || e.status === 'failed').length
    };
    return stats;
  };

  const getEntityTypeStats = () => {
    // 这个函数现在主要用于兼容性，实际的类型统计直接使用statistics.typeStats
    if (statistics && statistics.typeStats && statistics.typeStats.length > 0) {
      console.log('✅ API类型统计数据可用');
      const typeStats: { [key: string]: number } = {};
      statistics.typeStats.forEach(typeStat => {
        typeStats[typeStat.type] = typeStat.count;
      });
      return typeStats;
    }

    // 如果API数据不可用，回退到本地计算（兼容性处理）
    console.log('⚠️ API类型统计数据不可用，使用本地计算');
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

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter(
        entity =>
          entity.name.toLowerCase().includes(searchText.toLowerCase()) ||
          entity.description.toLowerCase().includes(searchText.toLowerCase()) ||
          entity.tags?.some((tag: string) => tag.toLowerCase().includes(searchText.toLowerCase()))
      );
    }

    // Filter by type
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
    const typeStats = getEntityTypeStats(); // 在函数内部获取类型统计
    const filteredEntities = getFilteredEntities();

    return (
      <TabContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <Title level={3} style={{ margin: 0 }}>
              {t('entities:title')}
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{t('entities:subtitle')}</Paragraph>
          </div>
          <Space>
            <Button icon={<ExportOutlined />}>{t('common:export')}</Button>
            <Button icon={<ReloadOutlined />} onClick={handleRefreshAll} loading={loading || statisticsLoading}>
              {t('common:refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateEntity}>
              {t('entities:createEntity')}
            </Button>
          </Space>
        </div>

        {/* 统计信息 */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <StatsCard className="entity-stats-primary">
              <Statistic
                title={t('entities:stats.totalEntities')}
                value={stats.total}
                suffix={t('common:unit.count')}
                prefix={<DatabaseOutlined />}
                loading={statisticsLoading}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard className="entity-stats-success">
              <Statistic
                title={t('entities:stats.activeEntities')}
                value={stats.active}
                suffix={t('common:unit.count')}
                prefix={<AppstoreOutlined />}
                loading={statisticsLoading}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard className="entity-stats-warning">
              <Statistic
                title={t('entities:stats.warningEntities')}
                value={stats.warning}
                suffix={t('common:unit.count')}
                prefix={<ExclamationCircleOutlined />}
                loading={statisticsLoading}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard className="entity-stats-error">
              <Statistic
                title={t('entities:stats.errorEntities')}
                value={stats.error || stats.inactive}
                suffix={t('common:unit.count')}
                prefix={<CloseCircleOutlined />}
                loading={statisticsLoading}
              />
            </StatsCard>
          </Col>
        </Row>

        {/* 分类标签 */}
        <div style={{ marginBottom: 16 }}>
          <Space wrap>
            <Tag.CheckableTag checked={selectedCategory === 'all'} onChange={() => setSelectedCategory('all')}>
              全部 ({stats.total})
            </Tag.CheckableTag>
            {/* 动态渲染后端返回的实体类型 */}
            {statistics &&
              statistics.typeStats &&
              statistics.typeStats.map(typeStat => {
                // 使用枚举值转换类型显示名称
                const typeEnum = entityTypes.find(item => item.value === typeStat.type);
                const typeLabel = typeEnum ? typeEnum.label : typeStat.type;

                console.log(`🏷️ 渲染类型标签: ${typeStat.type} -> ${typeLabel} (${typeStat.count})`);

                return (
                  <Tag.CheckableTag
                    key={typeStat.type}
                    checked={selectedCategory === typeStat.type}
                    onChange={() => {
                      console.log(`🎯 选择类型分类: ${typeStat.type}`);
                      setSelectedCategory(typeStat.type);
                    }}
                  >
                    {typeLabel} ({typeStat.count})
                  </Tag.CheckableTag>
                );
              })}
          </Space>
        </div>

        {/* 过滤条件 */}
        <FilterBar>
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Search
                placeholder={t('entities:searchPlaceholder')}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: '100%' }}
                allowClear
              />
            </Col>
            <Col>
              <Select
                value={filterType}
                onChange={setFilterType}
                style={{ width: 120 }}
                placeholder={t('entities:typeFilter')}
                loading={enumLoading}
              >
                <Option value="all">{t('entities:allTypes')}</Option>
                {entityTypes.map(type => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col>
              <Select
                value={filterStatus}
                onChange={setFilterStatus}
                style={{ width: 100 }}
                placeholder="状态"
                loading={enumLoading}
              >
                <Option value="all">所有状态</Option>
                {entityStatuses.map(status => (
                  <Option key={status.value} value={status.value}>
                    {status.label}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </FilterBar>

        {/* Entity Cards Grid */}
        <Spin spinning={loading}>
          {filteredEntities.length > 0 ? (
            <EntityGrid>
              {filteredEntities.map(entity => (
                <EntityCard
                  key={entity.id}
                  entity={entity}
                  entityTypes={entityTypes}
                  onClick={handleEntityClick}
                  onEdit={handleEditEntity}
                />
              ))}
            </EntityGrid>
          ) : (
            <Empty description={t('entities:noEntitiesFound')} style={{ margin: '60px 0' }} />
          )}
        </Spin>
      </TabContent>
    );
  };

  const renderEntityDetail = () => {
    if (!selectedEntity) return null;

    return (
      <Modal
        title={`${t('entities:entityDetail')}: ${selectedEntity.name}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            {t('common:close')}
          </Button>,
          <Button key="edit" type="primary" icon={<EditOutlined />}>
            {t('common:edit')}
          </Button>
        ]}
      >
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label={t('entities:entityId')}>{selectedEntity.id}</Descriptions.Item>
          <Descriptions.Item label={t('entities:entityName')}>{selectedEntity.name}</Descriptions.Item>
          <Descriptions.Item label={t('entities:entityType')}>
            <Tag color="blue">{selectedEntity.type}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t('entities:category')}>{selectedEntity.category}</Descriptions.Item>
          <Descriptions.Item label="状态">
            <Badge
              status={selectedEntity.status === 'active' || selectedEntity.status === 'running' ? 'success' : 'error'}
              text={selectedEntity.status}
            />
          </Descriptions.Item>
          <Descriptions.Item label="描述">{selectedEntity.description}</Descriptions.Item>
          <Descriptions.Item label="负责人">{selectedEntity.owner}</Descriptions.Item>

          {selectedEntity.version && <Descriptions.Item label="版本">{selectedEntity.version}</Descriptions.Item>}

          {selectedEntity.technology && (
            <Descriptions.Item label="技术栈">{selectedEntity.technology}</Descriptions.Item>
          )}

          {selectedEntity.instances && <Descriptions.Item label="实例数">{selectedEntity.instances}</Descriptions.Item>}

          {selectedEntity.method && (
            <Descriptions.Item label="请求方法">
              <Tag color={selectedEntity.method === 'GET' ? 'green' : 'blue'}>{selectedEntity.method}</Tag>
            </Descriptions.Item>
          )}

          {selectedEntity.path && (
            <Descriptions.Item label={t('entities:apiPath')}>
              <code>{selectedEntity.path}</code>
            </Descriptions.Item>
          )}

          {selectedEntity.database && (
            <Descriptions.Item label={t('entities:belongsToDatabase')}>{selectedEntity.database}</Descriptions.Item>
          )}

          {selectedEntity.tableName && (
            <Descriptions.Item label={t('entities:tableName')}>
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
                  <Statistic title={key} value={value as string | number} />
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
      </Modal>
    );
  };

  const renderRelationshipGraph = () => (
    <TabContent>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>
            {t('entities:relationshipGraph')}
          </Title>
          <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{t('entities:relationshipGraphDesc')}</Paragraph>
        </div>
        <Space>
          <Button icon={<ExportOutlined />}>{t('entities:exportGraph')}</Button>
          <Button icon={<SettingOutlined />}>{t('entities:graphSettings')}</Button>
          <Button icon={<ReloadOutlined />} onClick={loadEntities} loading={loading}>
            {t('entities:refreshGraph')}
          </Button>
        </Space>
      </div>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="entity-stats-primary">
            <Statistic
              title={t('entities:stats.totalRelations')}
              value={25}
              suffix={t('common:unitRelation')}
              prefix={<LinkOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="entity-stats-success">
            <Statistic
              title={t('entities:stats.relationTypes')}
              value={5}
              suffix={t('common:unitType')}
              prefix={<TableOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="entity-stats-warning">
            <Statistic
              title={t('entities:stats.graphNodes')}
              value={21}
              suffix={t('common:unit.count')}
              prefix={<NodeIndexOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="entity-stats-purple">
            <Statistic
              title={t('entities:stats.connectedSystems')}
              value={5}
              suffix={t('common:unit.count')}
              prefix={<ApiOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* D3.js Relationship Graph */}
      <D3RelationshipGraph />
    </TabContent>
  );

  return (
    <PageContainer className="entity-management-page">
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              {t('entities:title')}
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>{t('entities:description')}</Paragraph>
          </div>
        </div>
      </PageHeader>

      <Card>
        <Tabs activeKey={activeTab} onChange={handleTabChange} size="large" tabBarStyle={{ marginBottom: 24 }}>
          <Tabs.TabPane
            tab={
              <Space>
                <NodeIndexOutlined />
                {t('entities:title')}
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
                {t('entities:relationshipGraph')}
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
