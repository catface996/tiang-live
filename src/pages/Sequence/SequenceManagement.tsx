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
  Input,
  Select,
  Descriptions,
  Form,
  Switch,
  message,
  Divider
} from 'antd';
import { 
  ControlOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  ApiOutlined,
  DatabaseOutlined,
  CloudOutlined,
  MobileOutlined,
  SaveOutlined,
  CloseOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../utils';
import SearchFilterBar from '../../components/Common/SearchFilterBar';
import SequenceDiagram from '../../components/SequenceDiagram';
import sequenceDataJson from '../../data/sequenceData.json';

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

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const PageContainer = styled.div`
  padding: 24px;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const MermaidCodeEditor = styled(TextArea)`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace !important;
  font-size: 13px;
  line-height: 1.5;
  background-color: #f6f8fa;
  border: 1px solid #d1d9e0;
  
  &:focus {
    background-color: #ffffff;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  
  &::placeholder {
    color: #8c8c8c;
    font-size: 12px;
  }
`;

const StatsCard = styled(Card)`
  .ant-card-body {
    padding: 16px;
  }
`;

const SequenceCard = styled(Card)`
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 320px;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
    padding: 12px 16px;
    
    .ant-card-head-title {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.4;
      width: 100%;
    }
    
    .card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      
      .title-left {
        flex: 1;
        min-width: 0; /* 允许文本截断 */
        
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
  }
  
  .sequence-description {
    flex: 1;
    margin-bottom: 12px;
    font-size: 13px;
    color: #666;
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
      color: #999;
    }
    
    .ant-statistic-content {
      font-size: 14px;
      font-weight: 600;
    }
  }
  
  .sequence-meta {
    font-size: 11px;
    color: #999;
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
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .participants-count {
      font-size: 11px;
      color: #999;
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
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewChart, setPreviewChart] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [form] = Form.useForm();
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
    gateway: { name: t('sequences:types.gateway'), color: 'cyan', icon: <CloudOutlined /> },
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'green', text: t('sequences:statuses.active') },
      inactive: { color: 'red', text: t('sequences:statuses.inactive') },
      draft: { color: 'orange', text: t('sequences:statuses.draft') },
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
    form.resetFields();
    setFormModalVisible(true);
  };

  const handleEditSequence = (sequence: SequenceData) => {
    setEditingSequence(sequence);
    form.setFieldsValue({
      name: sequence.name,
      description: sequence.description,
      type: sequence.type,
      status: sequence.status,
      participants: sequence.participants,
      duration: sequence.duration,
      mermaidChart: sequence.mermaidChart
    });
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
      form.resetFields();
    } catch (error) {
      message.error(editingSequence ? t('sequences:messages.updateFailed') : t('sequences:messages.createFailed'));
    }
  };

  const handleFormCancel = () => {
    setFormModalVisible(false);
    form.resetFields();
    setEditingSequence(null);
  };

  const handlePreviewChart = () => {
    const chartCode = form.getFieldValue('mermaidChart');
    if (chartCode) {
      setPreviewChart(chartCode);
      setPreviewVisible(true);
    } else {
      message.warning(t('sequences:messages.noChartCode'));
    }
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
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <ControlOutlined style={{ color: '#1890ff' }} />
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
          <StatsCard>
            <Statistic
              title={t('sequences:stats.totalSequences')}
              value={sequenceData.length}
              suffix={t('common:unit.count')}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ControlOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('sequences:stats.activeSequences')}
              value={activeSequences}
              suffix={t('common:unit.count')}
              valueStyle={{ color: '#52c41a' }}
              prefix={<PlayCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('sequences:stats.executionCount')}
              value={1247}
              suffix={t('sequences:executionUnit')}
              valueStyle={{ color: '#722ed1' }}
              prefix={<ClockCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('sequences:stats.successRate')}
              value={98.5}
              suffix="%"
              valueStyle={{ color: '#52c41a' }}
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
            placeholder: t('common:status'),
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

      {/* Sequence Details Modal */}
      <Modal
        title={selectedSequence?.name}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={1200}
        style={{ top: 20 }}
      >
        {selectedSequence && (
          <div>
            {/* Basic Information */}
            <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
              <Descriptions.Item label={t('sequences:sequenceName')} span={2}>
                {selectedSequence.name}
              </Descriptions.Item>
              <Descriptions.Item label={t('common:type')}>
                <Tag 
                  color={sequenceTypeMap[selectedSequence.type as keyof typeof sequenceTypeMap]?.color}
                  icon={sequenceTypeMap[selectedSequence.type as keyof typeof sequenceTypeMap]?.icon}
                >
                  {sequenceTypeMap[selectedSequence.type as keyof typeof sequenceTypeMap]?.name}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={t('common:status')}>
                {getStatusTag(selectedSequence.status)}
              </Descriptions.Item>
              <Descriptions.Item label={t('sequences:stepCount')}>
                {selectedSequence.steps}{t('sequences:steps')}
              </Descriptions.Item>
              <Descriptions.Item label={t('sequences:executionDuration')}>
                {formatDuration(selectedSequence.duration, t)}
              </Descriptions.Item>
              <Descriptions.Item label={t('sequences:participants')} span={2}>
                <Space wrap>
                  {selectedSequence.participants.map((participant, index) => (
                    <Tag key={index} icon={<UserOutlined />}>
                      {participant}
                    </Tag>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label={t('sequences:createdBy')}>
                {selectedSequence.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label={t('sequences:createdAt')}>
                {selectedSequence.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label={t('common:description')} span={2}>
                {selectedSequence.description}
              </Descriptions.Item>
            </Descriptions>

            {/* Sequence Diagram */}
            <SequenceDiagram 
              chart={selectedSequence.mermaidChart}
              title={t('sequences:sequenceDiagram')}
            />
          </div>
        )}
      </Modal>

      {/* Create/Edit Sequence Form Modal */}
      <Modal
        title={editingSequence ? t('sequences:editSequence') : t('sequences:createSequence')}
        open={formModalVisible}
        onCancel={handleFormCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{
            status: 'draft',
            type: 'business'
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label={t('sequences:form.name')}
                rules={[
                  { required: true, message: t('sequences:form.nameRequired') },
                  { max: 100, message: t('sequences:form.nameMaxLength') }
                ]}
              >
                <Input placeholder={t('sequences:form.namePlaceholder')} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label={t('sequences:form.description')}
                rules={[
                  { required: true, message: t('sequences:form.descriptionRequired') },
                  { max: 500, message: t('sequences:form.descriptionMaxLength') }
                ]}
              >
                <TextArea 
                  rows={4} 
                  placeholder={t('sequences:form.descriptionPlaceholder')}
                  showCount
                  maxLength={500}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label={t('sequences:form.type')}
                rules={[{ required: true, message: t('sequences:form.typeRequired') }]}
              >
                <Select placeholder={t('sequences:form.typePlaceholder')}>
                  <Option value="authentication">
                    <Space>
                      <UserOutlined />
                      {t('sequences:types.authentication')}
                    </Space>
                  </Option>
                  <Option value="business">
                    <Space>
                      <ApiOutlined />
                      {t('sequences:types.business')}
                    </Space>
                  </Option>
                  <Option value="monitoring">
                    <Space>
                      <ClockCircleOutlined />
                      {t('sequences:types.monitoring')}
                    </Space>
                  </Option>
                  <Option value="data">
                    <Space>
                      <DatabaseOutlined />
                      {t('sequences:types.data')}
                    </Space>
                  </Option>
                  <Option value="gateway">
                    <Space>
                      <CloudOutlined />
                      {t('sequences:types.gateway')}
                    </Space>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label={t('sequences:form.status')}
                rules={[{ required: true, message: t('sequences:form.statusRequired') }]}
              >
                <Select placeholder={t('sequences:form.statusPlaceholder')}>
                  <Option value="draft">{t('sequences:statuses.draft')}</Option>
                  <Option value="active">{t('sequences:statuses.active')}</Option>
                  <Option value="inactive">{t('sequences:statuses.inactive')}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="participants"
                label={t('sequences:form.participants')}
                rules={[{ required: true, message: t('sequences:form.participantsRequired') }]}
              >
                <Select
                  mode="tags"
                  placeholder={t('sequences:form.participantsPlaceholder')}
                  style={{ width: '100%' }}
                >
                  <Option value="User">{t('sequences:participantOptions.user')}</Option>
                  <Option value="Frontend">{t('sequences:participantOptions.frontend')}</Option>
                  <Option value="Backend">{t('sequences:participantOptions.backend')}</Option>
                  <Option value="Database">{t('sequences:participantOptions.database')}</Option>
                  <Option value="Cache">{t('sequences:participantOptions.cache')}</Option>
                  <Option value="Queue">{t('sequences:participantOptions.queue')}</Option>
                  <Option value="External API">{t('sequences:participantOptions.externalApi')}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duration"
                label={t('sequences:form.duration')}
                rules={[{ required: true, message: t('sequences:form.durationRequired') }]}
              >
                <Input 
                  placeholder={t('sequences:form.durationPlaceholder')}
                  addonAfter={t('sequences:form.durationUnit')}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="mermaidChart"
                label={
                  <Space>
                    {t('sequences:form.mermaidChart')}
                    <Button 
                      type="link" 
                      size="small" 
                      icon={<EyeOutlined />}
                      onClick={handlePreviewChart}
                    >
                      {t('sequences:form.previewChart')}
                    </Button>
                  </Space>
                }
                rules={[
                  { required: true, message: t('sequences:form.mermaidChartRequired') }
                ]}
              >
                <MermaidCodeEditor 
                  rows={8} 
                  placeholder={t('sequences:form.mermaidChartPlaceholder')}
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={handleFormCancel} icon={<CloseOutlined />}>
                {t('common:cancel')}
              </Button>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                {editingSequence ? t('common:update') : t('common:create')}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* Chart Preview Modal */}
      <Modal
        title={t('sequences:form.chartPreview')}
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={1000}
        style={{ top: 20 }}
      >
        {previewChart && (
          <SequenceDiagram 
            chart={previewChart}
            title={t('sequences:form.previewTitle')}
          />
        )}
      </Modal>
    </PageContainer>
  );
};

export default SequenceManagement;
