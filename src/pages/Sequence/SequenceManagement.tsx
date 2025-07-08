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
  Modal,
  Tooltip,
  message
} from 'antd';
import { 
  ControlOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  ApiOutlined,
  DatabaseOutlined,
  CloudOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../utils';
import SearchFilterBar from '../../components/Common/SearchFilterBar';
import { SequenceDetail, SequenceForm } from '../../components/Sequence';
import sequenceDataJson from '../../data/sequenceData.json';
import '../../styles/sequence-management.css';

// 时间格式化工具函数
const formatDuration = (duration: string, t: any): string => {
  if (!duration) return '';
  
  // 解析数字范围，如 "2000-5000" 或 "100-500"
  const match = duration.match(/^(\d+)-(\d+)$/);
  if (!match) return duration;
  
  const [, min, max] = match;
  const minNum = parseInt(min);
  const maxNum = parseInt(max);
  
  // 判断单位：大于等于1000的使用秒，小于1000的使用毫秒
  if (minNum >= 1000) {
    const minSec = minNum / 1000;
    const maxSec = maxNum / 1000;
    // 格式化秒数，去掉不必要的小数点
    const minSecStr = minSec % 1 === 0 ? minSec.toString() : minSec.toFixed(1);
    const maxSecStr = maxSec % 1 === 0 ? maxSec.toString() : maxSec.toFixed(1);
    return `${minSecStr}-${maxSecStr} ${t('sequences:units.seconds')}`;
  } else {
    return `${min}-${max} ${t('sequences:units.milliseconds')}`;
  }
};

const { Title, Paragraph } = Typography;

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
`;

const SequenceCard = styled(Card)`
  height: 100%;
  cursor: pointer;
  min-height: 320px;
  background-color: var(--bg-container);
  border: 1px solid var(--border-light);
  
  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-2px);
    border-color: var(--border-hover);
  }
  
  .ant-card-head {
    border-bottom: 1px solid var(--border-light);
    padding: 12px 16px;
    background-color: var(--bg-container);
    
    .ant-card-head-title {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.4;
      width: 100%;
      color: var(--text-primary);
    }
    
    .card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      
      .title-left {
        flex: 1;
        min-width: 0;
        
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-primary);
        }
      }
      
      .title-right {
        flex-shrink: 0;
        margin-left: 8px;
      }
    }
  }
  
  .ant-card-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 57px);
    background-color: var(--bg-container);
  }
  
  .sequence-description {
    flex: 1;
    margin-bottom: 12px;
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 36px;
  }
  
  .sequence-stats {
    margin-bottom: 12px;
    
    .ant-statistic-title {
      font-size: 11px;
      margin-bottom: 2px;
      color: var(--text-disabled);
    }
    
    .ant-statistic-content {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    }
  }
  
  .sequence-meta {
    font-size: 11px;
    color: var(--text-disabled);
    margin-bottom: 12px;
    
    > div {
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  
  .sequence-actions {
    margin-top: auto;
    padding-top: 12px;
    border-top: 1px solid var(--border-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .participants-count {
      font-size: 11px;
      color: var(--text-disabled);
      font-weight: 500;
    }
  }
  
  /* 响应式优化 */
  @media (max-width: 768px) {
    min-height: 280px;
    
    .ant-card-head {
      padding: 10px 12px;
      
      .ant-card-head-title {
        font-size: 13px;
      }
    }
    
    .ant-card-body {
      padding: 12px;
    }
    
    .sequence-description {
      font-size: 12px;
      -webkit-line-clamp: 3;
      min-height: 42px;
    }
    
    .sequence-stats {
      .ant-statistic-content {
        font-size: 13px;
      }
    }
  }
  
  @media (max-width: 576px) {
    min-height: 260px;
    
    .sequence-stats {
      .ant-row {
        flex-direction: column;
        gap: 8px;
      }
      
      .ant-col {
        width: 100% !important;
        max-width: 100% !important;
        flex: none;
      }
    }
  }
`;

interface SequenceData {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  participants: string[];
  steps: number;
  duration: string;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  mermaidChart: string;
}

const SequenceManagement: React.FC = () => {
  const [selectedSequence, setSelectedSequence] = useState<SequenceData | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [editingSequence, setEditingSequence] = useState<SequenceData | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { t } = useTranslation(['sequences', 'common']);

  useEffect(() => {
    setPageTitle(t('sequences:title'));
  }, []);

  // Load sequence data from JSON file
  const sequenceData: SequenceData[] = sequenceDataJson.sequences;

  const sequenceTypeMap = {
    authentication: { name: t('sequences:types.authentication'), color: 'blue', icon: <UserOutlined /> },
    business: { name: t('sequences:types.business'), color: 'green', icon: <ApiOutlined /> },
    monitoring: { name: t('sequences:types.monitoring'), color: 'orange', icon: <ClockCircleOutlined /> },
    data: { name: t('sequences:types.data'), color: 'purple', icon: <DatabaseOutlined /> },
    gateway: { name: t('sequences:types.gateway'), color: 'cyan', icon: <CloudOutlined /> }
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'green', text: t('sequences:statuses.active') },
      inactive: { color: 'red', text: t('sequences:statuses.inactive') },
      draft: { color: 'orange', text: t('sequences:statuses.draft') }
    };
    const config = statusMap[status as keyof typeof statusMap];
    return config ? <Tag color={config.color}>{config.text}</Tag> : <Tag>{status}</Tag>;
  };

  const activeSequences = sequenceData.filter(seq => seq.status === 'active').length;

  const handleViewSequence = (sequence: SequenceData) => {
    setSelectedSequence(sequence);
    setDetailModalVisible(true);
  };

  const handleCreateSequence = () => {
    setEditingSequence(null);
    setFormModalVisible(true);
  };

  const handleEditSequence = (sequence: SequenceData) => {
    setEditingSequence(sequence);
    setFormModalVisible(true);
  };

  const handleFormSubmit = async (values: any) => {
    try {
      if (editingSequence) {
        // 编辑逻辑
        message.success(t('sequences:messages.updateSuccess'));
      } else {
        // 创建逻辑
        message.success(t('sequences:messages.createSuccess'));
      }
      setFormModalVisible(false);
      setEditingSequence(null);
    } catch (error) {
      message.error(editingSequence ? t('sequences:messages.updateFailed') : t('sequences:messages.createFailed'));
    }
  };

  const handleFormCancel = () => {
    setFormModalVisible(false);
    setEditingSequence(null);
  };

  const renderSequenceCards = () => {
    return sequenceData.map(sequence => {
      const typeConfig = sequenceTypeMap[sequence.type as keyof typeof sequenceTypeMap];
      return (
        <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={sequence.id}>
          <SequenceCard
            title={
              <div className="card-title">
                <div className="title-left">
                  <span>{sequence.name}</span>
                </div>
                <div className="title-right">
                  {getStatusTag(sequence.status)}
                </div>
              </div>
            }
            onClick={() => handleViewSequence(sequence)}
          >
            <div style={{ marginBottom: 12 }}>
              <Tag color={typeConfig?.color} icon={typeConfig?.icon}>
                {typeConfig?.name}
              </Tag>
            </div>
            
            <div className="sequence-description">
              {sequence.description}
            </div>
            
            <div className="sequence-stats">
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title={t('sequences:stepCount')}
                    value={sequence.steps}
                    suffix={t('sequences:steps')}
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={t('sequences:executionDuration')}
                    value={formatDuration(sequence.duration, t)}
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
              </Row>
            </div>

            <div className="sequence-meta">
              <div>{t('sequences:createdBy')}: {sequence.createdBy}</div>
              <div>{t('sequences:lastModified')}: {sequence.lastModified}</div>
            </div>

            {/* Action Buttons at Bottom */}
            <div className="sequence-actions">
              <div className="participants-count">
                {t('sequences:participants')}: {sequence.participants.length}
              </div>
              <Space>
                <Tooltip title={t('sequences:viewSequenceDiagram')}>
                  <Button 
                    type="text" 
                    icon={<EyeOutlined />} 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewSequence(sequence);
                    }}
                  />
                </Tooltip>
                <Tooltip title={t('sequences:editSequence')}>
                  <Button 
                    type="text" 
                    icon={<EditOutlined />} 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditSequence(sequence);
                    }}
                  />
                </Tooltip>
              </Space>
            </div>
          </SequenceCard>
        </Col>
      );
    });
  };

  return (
    <PageContainer className="sequence-management-page">
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <ControlOutlined className="text-primary" />
                {t('sequences:title')}
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              {t('sequences:description')}
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              {t('common:refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateSequence}>
              {t('sequences:createSequence')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="sequence-stats-primary">
            <Statistic
              title={t('sequences:stats.totalSequences')}
              value={sequenceData.length}
              prefix={<ControlOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="sequence-stats-success">
            <Statistic
              title={t('sequences:stats.activeSequences')}
              value={activeSequences}
              prefix={<PlayCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="sequence-stats-purple">
            <Statistic
              title={t('sequences:stats.executionCount')}
              value={1247}
              prefix={<ClockCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="sequence-stats-success">
            <Statistic
              title={t('sequences:stats.successRate')}
              value={98.5}
              prefix={<Badge status="success" />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* Filter Bar */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('sequences:searchPlaceholder')}
        filters={[
          {
            key: 'type',
            value: filterType,
            onChange: setFilterType,
            placeholder: t('sequences:typeFilter'),
            width: 120,
            options: [
              { value: 'all', label: t('sequences:allTypes') },
              ...Object.entries(sequenceTypeMap).map(([key, config]) => ({
                value: key,
                label: config.name
              }))
            ]
          },
          {
            key: 'status',
            value: filterStatus,
            onChange: setFilterStatus,
            placeholder: t('sequences:statusFilter'),
            width: 100,
            options: [
              { value: 'all', label: t('sequences:allStatuses') },
              { value: 'active', label: t('sequences:statuses.active') },
              { value: 'inactive', label: t('sequences:statuses.inactive') },
              { value: 'draft', label: t('sequences:statuses.draft') }
            ]
          }
        ]}
        onRefresh={() => window.location.reload()}
      />

      {/* Sequence Cards List */}
      <Row gutter={[24, 24]}>
        {renderSequenceCards()}
      </Row>

      {/* Sequence Details Modal - 使用通用模态框加载详情组件 */}
      <Modal
        title={selectedSequence?.name}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={1200}
        style={{ top: 20 }}
        className="theme-modal"
        destroyOnHidden
      >
        {selectedSequence && (
          <SequenceDetail sequence={selectedSequence} />
        )}
      </Modal>

      {/* Create/Edit Sequence Form Modal - 使用通用模态框加载表单组件 */}
      <Modal
        title={editingSequence ? t('sequences:editSequence') : t('sequences:createSequence')}
        open={formModalVisible}
        onCancel={handleFormCancel}
        footer={null}
        width={800}
        destroyOnHidden
        className="theme-modal"
      >
        <SequenceForm
          sequence={editingSequence}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </Modal>

      {/* Chart Preview Modal - 移除，因为预览功能已集成到表单组件中 */}
    </PageContainer>
  );
};

export default SequenceManagement;
