import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Space,
  Button,
  Row,
  Col,
  Statistic,
  Badge,
  Tag,
  Input,
  Select,
  Spin
} from 'antd';
import {
  ShareAltOutlined,
  ReloadOutlined,
  SettingOutlined,
  ExportOutlined,
  ApiOutlined,
  DatabaseOutlined,
  LinkOutlined,
  NodeIndexOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../utils';
import D3RelationshipGraph from '../../components/Relation/D3RelationshipGraph';
import { entityApi, type EntityStatisticsResponse } from '../../services/entityApi';
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

const StatsCard = styled(Card)`
  .ant-card-body {
    padding: 16px;
  }
`;

const TabContent = styled.div`
  min-height: 400px;
`;

const RelationshipTopology: React.FC = () => {
  const { t } = useTranslation(['entities', 'common']);
  
  // 状态管理
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<EntityStatisticsResponse | null>(null);

  useEffect(() => {
    setPageTitle(t('entities:relationshipGraph'));
    loadStatistics();
  }, [t]);

  // 加载统计数据
  const loadStatistics = async () => {
    try {
      setLoading(true);
      const stats = await entityApi.getStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('加载统计数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadStatistics();
  };

  return (
    <PageContainer className="relationship-topology-page">
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <ShareAltOutlined />
                {t('entities:relationshipGraph')}
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              {t('entities:relationshipGraphDesc')}
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ExportOutlined />}>
              {t('entities:exportGraph')}
            </Button>
            <Button icon={<SettingOutlined />}>
              {t('entities:graphSettings')}
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading}>
              {t('entities:refreshGraph')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      <Card>
        <TabContent>
          {/* 统计信息 */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <StatsCard className="entity-stats-primary">
                <Statistic
                  title={t('entities:stats.totalEntities')}
                  value={statistics?.totalEntities || 0}
                  suffix={t('common:unit.count')}
                  prefix={<NodeIndexOutlined />}
                />
              </StatsCard>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <StatsCard className="entity-stats-success">
                <Statistic
                  title={t('entities:stats.totalRelationships')}
                  value={statistics?.totalRelationships || 0}
                  suffix={t('common:unit.count')}
                  prefix={<LinkOutlined />}
                />
              </StatsCard>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <StatsCard className="entity-stats-warning">
                <Statistic
                  title={t('entities:stats.entityTypes')}
                  value={statistics?.entityTypes || 0}
                  suffix={t('common:unitType')}
                  prefix={<DatabaseOutlined />}
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

          {/* 筛选和搜索 */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={8}>
              <Search
                placeholder={t('entities:searchPlaceholder')}
                allowClear
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder={t('entities:filterByType')}
                allowClear
                style={{ width: '100%' }}
              >
                <Option value="database">{t('entities:types.database')}</Option>
                <Option value="api">{t('entities:types.api')}</Option>
                <Option value="service">{t('entities:types.service')}</Option>
                <Option value="queue">{t('entities:types.queue')}</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder={t('entities:filterByStatus')}
                allowClear
                style={{ width: '100%' }}
              >
                <Option value="active">{t('entities:status.active')}</Option>
                <Option value="inactive">{t('entities:status.inactive')}</Option>
                <Option value="deprecated">{t('entities:status.deprecated')}</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder={t('entities:filterByLevel')}
                allowClear
                style={{ width: '100%' }}
              >
                <Option value="core">{t('entities:levels.core')}</Option>
                <Option value="basic">{t('entities:levels.basic')}</Option>
                <Option value="business">{t('entities:levels.business')}</Option>
              </Select>
            </Col>
          </Row>

          {/* 图例说明 */}
          <Card size="small" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              <Space>
                <Badge color="#1890ff" />
                <span>{t('entities:legend.coreService')}</span>
              </Space>
              <Space>
                <Badge color="#52c41a" />
                <span>{t('entities:legend.basicService')}</span>
              </Space>
              <Space>
                <Badge color="#faad14" />
                <span>{t('entities:legend.businessService')}</span>
              </Space>
              <Space>
                <Badge color="#f5222d" />
                <span>{t('entities:legend.database')}</span>
              </Space>
              <Space>
                <Badge color="#722ed1" />
                <span>{t('entities:legend.messageQueue')}</span>
              </Space>
              <Space>
                <Badge color="#13c2c2" />
                <span>{t('entities:legend.cache')}</span>
              </Space>
            </div>
          </Card>

          {/* D3.js 关系图 */}
          <Card>
            <Spin spinning={loading}>
              <D3RelationshipGraph />
            </Spin>
          </Card>
        </TabContent>
      </Card>
    </PageContainer>
  );
};

export default RelationshipTopology;
