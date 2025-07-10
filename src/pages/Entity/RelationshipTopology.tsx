import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Space,
  Button,
  Row,
  Col,
  Statistic,
  Input,
  Select,
  Spin,
  Tooltip,
  message
} from 'antd';
import {
  ShareAltOutlined,
  ReloadOutlined,
  SettingOutlined,
  ExportOutlined,
  ApiOutlined,
  DatabaseOutlined,
  LinkOutlined,
  NodeIndexOutlined,
  FullscreenOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  FilterOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../utils';
import D3RelationshipGraph from '../../components/Relation/D3RelationshipGraph';
import SearchFilterBar from '../../components/Common/SearchFilterBar';
import { entityApi, type EntityStatisticsResponse } from '../../services/entityApi';
import '../../styles/entity-management.css';

const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

const PageContainer = styled.div`
  padding: 24px;
  background-color: var(--bg-layout);
  color: var(--text-primary);
  min-height: calc(100vh - 64px);
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const StatsCard = styled(Card)`
  background-color: var(--bg-container);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-card);
  
  .ant-card-body {
    padding: 16px;
  }
  
  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-1px);
  }
  
  .ant-statistic-title {
    color: var(--text-secondary);
  }
  
  .ant-statistic-content {
    color: var(--text-primary);
  }
  
  @media (max-width: 768px) {
    .ant-card-body {
      padding: 12px;
    }
  }
`;

const GraphContainer = styled(Card)`
  background-color: var(--bg-container);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-card);
  
  .ant-card-body {
    padding: 0;
    position: relative;
    min-height: 600px;
  }
  
  .graph-toolbar {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    border-radius: 8px;
    padding: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    .ant-card-body {
      min-height: 400px;
    }
    
    .graph-toolbar {
      top: 8px;
      right: 8px;
      padding: 4px;
    }
  }
`;

const RelationshipTopology: React.FC = () => {
  const { t } = useTranslation(['entities', 'common']);
  
  // 状态管理
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<EntityStatisticsResponse | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

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
      message.error(t('entities:loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadStatistics();
  };

  const handleExport = () => {
    message.info(t('entities:exportGraph'));
  };

  const handleSettings = () => {
    message.info(t('entities:graphSettings'));
  };

  const handleFullscreen = () => {
    message.info(t('entities:fullscreen'));
  };

  const handleZoomIn = () => {
    message.info(t('entities:zoomIn'));
  };

  const handleZoomOut = () => {
    message.info(t('entities:zoomOut'));
  };

  return (
    <PageContainer className="relationship-topology-page">
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <ShareAltOutlined className="text-primary" />
                {t('entities:relationshipGraph')}
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              {t('entities:relationshipGraphDesc')}
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading}>
              {t('common:refresh')}
            </Button>
            <Button icon={<ExportOutlined />} onClick={handleExport}>
              {t('entities:exportGraph')}
            </Button>
            <Button icon={<SettingOutlined />} onClick={handleSettings}>
              {t('entities:graphSettings')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <StatsCard className="topology-stats-primary">
            <Statistic
              title={t('entities:stats.totalEntities')}
              value={statistics?.totalEntities || 0}
              suffix={t('common:unit.count')}
              prefix={<NodeIndexOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <StatsCard className="topology-stats-success">
            <Statistic
              title={t('entities:stats.totalRelationships')}
              value={statistics?.totalRelationships || 0}
              suffix={t('common:unit.count')}
              prefix={<LinkOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <StatsCard className="topology-stats-warning">
            <Statistic
              title={t('entities:stats.entityTypes')}
              value={statistics?.entityTypes || 0}
              suffix={t('common:unitType')}
              prefix={<DatabaseOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <StatsCard className="topology-stats-purple">
            <Statistic
              title={t('entities:stats.connectedSystems')}
              value={5}
              suffix={t('common:unit.count')}
              prefix={<ApiOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('entities:searchPlaceholder')}
        filters={[
          {
            key: 'type',
            value: filterType,
            onChange: setFilterType,
            placeholder: t('entities:filterByType'),
            width: 120,
            options: [
              { label: t('common:all'), value: 'all' },
              { label: t('entities:types.database'), value: 'database' },
              { label: t('entities:types.api'), value: 'api' },
              { label: t('entities:types.service'), value: 'service' },
              { label: t('entities:types.queue'), value: 'queue' }
            ]
          },
          {
            key: 'status',
            value: filterStatus,
            onChange: setFilterStatus,
            placeholder: t('entities:filterByStatus'),
            width: 120,
            options: [
              { label: t('common:all'), value: 'all' },
              { label: t('entities:status.active'), value: 'active' },
              { label: t('entities:status.inactive'), value: 'inactive' },
              { label: t('entities:status.deprecated'), value: 'deprecated' }
            ]
          },
          {
            key: 'level',
            value: filterLevel,
            onChange: setFilterLevel,
            placeholder: t('entities:filterByLevel'),
            width: 120,
            options: [
              { label: t('common:all'), value: 'all' },
              { label: t('entities:levels.core'), value: 'core' },
              { label: t('entities:levels.basic'), value: 'basic' },
              { label: t('entities:levels.business'), value: 'business' }
            ]
          }
        ]}
        onRefresh={handleRefresh}
      />

      {/* 关系图谱 */}
      <GraphContainer>
        <Spin spinning={loading}>
          {/* 图谱工具栏 */}
          <div className="graph-toolbar">
            <Space>
              <Tooltip title={t('entities:zoomIn')}>
                <Button type="text" icon={<ZoomInOutlined />} size="small" onClick={handleZoomIn} />
              </Tooltip>
              <Tooltip title={t('entities:zoomOut')}>
                <Button type="text" icon={<ZoomOutOutlined />} size="small" onClick={handleZoomOut} />
              </Tooltip>
              <Tooltip title={t('entities:fullscreen')}>
                <Button type="text" icon={<FullscreenOutlined />} size="small" onClick={handleFullscreen} />
              </Tooltip>
            </Space>
          </div>

          {/* D3.js 关系图 */}
          <D3RelationshipGraph />
        </Spin>
      </GraphContainer>
    </PageContainer>
  );
};

export default RelationshipTopology;
