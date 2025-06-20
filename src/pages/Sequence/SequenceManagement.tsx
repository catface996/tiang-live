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
  Descriptions
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
  MobileOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../utils';
import SearchFilterBar from '../../components/Common/SearchFilterBar';
import SequenceDiagram from '../../components/SequenceDiagram';

const { Title, Paragraph, Text } = Typography;
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

const SequenceCard = styled(Card)`
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
  }
  
  .ant-card-body {
    padding: 16px;
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
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { t } = useTranslation();

  useEffect(() => {
    setPageTitle(t('sequences.title'));
  }, []);

  // Sequence sample data - using function to access t()
  const getSequenceData = (): SequenceData[] => [
    {
      id: '1',
      name: t('sequences.examples.userLogin.name'),
      description: t('sequences.examples.userLogin.description'),
      type: 'authentication',
      status: 'active',
      participants: ['User', 'Frontend', 'Auth Service', 'Database'],
      steps: 8,
      duration: '2-5s',
      createdBy: t('sequences.examples.userLogin.createdBy'),
      createdAt: '2024-06-10',
      lastModified: '2024-06-14',
      mermaidChart: `
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth Service
    participant D as Database
    
    U->>F: Input credentials
    F->>A: Send login request
    A->>D: Query user info
    D-->>A: Return user data
    A->>A: Validate password
    alt Success
        A->>A: Generate JWT Token
        A-->>F: Return token and info
        F-->>U: Login success, redirect
    else Failure
        A-->>F: Return error
        F-->>U: Show login failure
    end
      `
    },
    {
      id: '2',
      name: t('sequences.examples.orderProcess.name'),
      description: t('sequences.examples.orderProcess.description'),
      type: 'business',
      status: 'active',
      participants: ['User', 'Order Service', 'Inventory', 'Payment', 'Notification'],
      steps: 12,
      duration: '10-30s',
      createdBy: t('sequences.examples.orderProcess.createdBy'),
      createdAt: '2024-06-08',
      lastModified: '2024-06-13',
      mermaidChart: `
sequenceDiagram
    participant U as User
    participant O as Order Service
    participant I as Inventory
    participant P as Payment
    participant N as Notification
    
    U->>O: Submit order
    O->>I: Check inventory
    alt Stock available
        O->>O: Create order
        O->>P: Process payment
        P-->>O: Payment success
        O->>I: Reserve inventory
        O->>N: Send confirmation
        N-->>U: Order confirmation
        O-->>U: Order created successfully
    else Out of stock
        O-->>U: Stock unavailable
    end
      `
    },
    {
      id: '3',
      name: t('sequences.examples.healthCheck.name'),
      description: t('sequences.examples.healthCheck.description'),
      type: 'monitoring',
      status: 'active',
      participants: ['Monitor', 'Registry', 'User Service', 'Order Service', 'Payment Service'],
      steps: 10,
      duration: '5-15s',
      createdBy: t('sequences.examples.healthCheck.createdBy'),
      createdAt: '2024-06-05',
      lastModified: '2024-06-12',
      mermaidChart: `
sequenceDiagram
    participant M as Monitor
    participant R as Registry
    participant U as User Service
    participant O as Order Service
    participant P as Payment Service
    
    M->>R: Get service list
    R-->>M: Return services
    par Parallel health checks
        M->>U: Health check
        U-->>M: Health status
    and
        M->>O: Health check
        O-->>M: Health status
    and
        M->>P: Health check
        P-->>M: Health status
    end
    M->>M: Aggregate status
    M->>R: Update status
      `
    },
    {
      id: '4',
      name: t('sequences.examples.dataSync.name'),
      description: t('sequences.examples.dataSync.description'),
      type: 'data',
      status: 'draft',
      participants: ['App Service', 'Master DB', 'Slave DB', 'Sync Service'],
      steps: 6,
      duration: '1-3s',
      createdBy: t('sequences.examples.dataSync.createdBy'),
      createdAt: '2024-06-12',
      lastModified: '2024-06-14',
      mermaidChart: `
sequenceDiagram
    participant A as App Service
    participant M as Master DB
    participant S as Sync Service
    participant R as Slave DB
    
    A->>M: Write data
    M-->>A: Write confirmation
    M->>S: Trigger sync event
    S->>M: Read change log
    M-->>S: Return change data
    S->>R: Sync data to slave
    R-->>S: Sync confirmation
    S->>S: Record sync status
      `
    },
    {
      id: '5',
      name: t('sequences.examples.apiGateway.name'),
      description: t('sequences.examples.apiGateway.description'),
      type: 'gateway',
      status: 'inactive',
      participants: ['Client', 'API Gateway', 'Auth Service', 'User Service', 'Rate Limiter'],
      steps: 15,
      duration: '100-500ms',
      createdBy: t('sequences.examples.apiGateway.createdBy'),
      createdAt: '2024-06-01',
      lastModified: '2024-06-11',
      mermaidChart: `
sequenceDiagram
    participant C as Client
    participant G as API Gateway
    participant A as Auth Service
    participant L as Rate Limiter
    participant U as User Service
    
    C->>G: Send API request
    G->>A: Verify token
    A-->>G: Auth result
    
    alt Auth success
        G->>L: Check rate limit
        alt Within limit
            L-->>G: Pass rate check
            G->>U: Forward to target service
            U-->>G: Return response
            G-->>C: Return final response
        else Rate exceeded
            L-->>G: Rate limit reject
            G-->>C: Return rate limit error
        end
    else Auth failed
        G-->>C: Return auth error
    end
      `
    }
  ];

  const sequenceData = getSequenceData();

  const sequenceTypeMap = {
    authentication: { name: t('sequences.types.authentication'), color: 'blue', icon: <UserOutlined /> },
    business: { name: t('sequences.types.business'), color: 'green', icon: <ApiOutlined /> },
    monitoring: { name: t('sequences.types.monitoring'), color: 'orange', icon: <ClockCircleOutlined /> },
    data: { name: t('sequences.types.data'), color: 'purple', icon: <DatabaseOutlined /> },
    gateway: { name: t('sequences.types.gateway'), color: 'cyan', icon: <CloudOutlined /> },
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'green', text: t('sequences.statuses.active') },
      inactive: { color: 'red', text: t('sequences.statuses.inactive') },
      draft: { color: 'orange', text: t('sequences.statuses.draft') },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return config ? <Tag color={config.color}>{config.text}</Tag> : <Tag>{status}</Tag>;
  };

  const activeSequences = sequenceData.filter(seq => seq.status === 'active').length;

  const handleViewSequence = (sequence: SequenceData) => {
    setSelectedSequence(sequence);
    setDetailModalVisible(true);
  };

  const renderSequenceCards = () => {
    return sequenceData.map(sequence => {
      const typeConfig = sequenceTypeMap[sequence.type as keyof typeof sequenceTypeMap];
      return (
        <Col xs={24} sm={12} lg={8} xl={6} key={sequence.id}>
          <SequenceCard
            title={
              <Space>
                <span>{sequence.name}</span>
                {getStatusTag(sequence.status)}
              </Space>
            }
            onClick={() => handleViewSequence(sequence)}
          >
            <div style={{ marginBottom: 12 }}>
              <Tag color={typeConfig?.color} icon={typeConfig?.icon}>
                {typeConfig?.name}
              </Tag>
            </div>
            
            <div style={{ marginBottom: 12, fontSize: 13, color: '#666' }}>
              {sequence.description}
            </div>
            
            <div style={{ marginBottom: 12 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title={t('sequences.stepCount')}
                    value={sequence.steps}
                    suffix={t('sequences.steps')}
                    valueStyle={{ fontSize: 16 }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={t('sequences.executionDuration')}
                    value={sequence.duration}
                    valueStyle={{ fontSize: 16 }}
                  />
                </Col>
              </Row>
            </div>

            <div style={{ fontSize: 12, color: '#666', marginBottom: 16 }}>
              <div>{t('sequences.createdBy')}: {sequence.createdBy}</div>
              <div>{t('sequences.lastModified')}: {sequence.lastModified}</div>
            </div>

            {/* Action Buttons at Bottom */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingTop: 12,
              borderTop: '1px solid #f0f0f0'
            }}>
              <div style={{ fontSize: 12, color: '#999' }}>
                {t('sequences.participants')}: {sequence.participants.length}
              </div>
              <Space>
                <Tooltip title={t('sequences.viewSequenceDiagram')}>
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
                <Tooltip title={t('common.edit')}>
                  <Button 
                    type="text" 
                    icon={<EditOutlined />} 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
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
                {t('sequences.title')}
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              {t('sequences.description')}
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              {t('common.refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('sequences.createSequence')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('sequences.stats.totalSequences')}
              value={sequenceData.length}
              suffix={t('common.unit')}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ControlOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('sequences.stats.activeSequences')}
              value={activeSequences}
              suffix={t('common.unit')}
              valueStyle={{ color: '#52c41a' }}
              prefix={<PlayCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('sequences.stats.executionCount')}
              value={1247}
              suffix={t('sequences.executionUnit')}
              valueStyle={{ color: '#722ed1' }}
              prefix={<ClockCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('sequences.stats.successRate')}
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
        searchPlaceholder={t('sequences.searchPlaceholder')}
        filters={[
          {
            key: 'type',
            value: filterType,
            onChange: setFilterType,
            placeholder: t('sequences.typeFilter'),
            width: 120,
            options: [
              { value: 'all', label: t('sequences.allTypes') },
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
            placeholder: t('common.status'),
            width: 100,
            options: [
              { value: 'all', label: t('sequences.allStatuses') },
              { value: 'active', label: t('sequences.statuses.active') },
              { value: 'inactive', label: t('sequences.statuses.inactive') },
              { value: 'draft', label: t('sequences.statuses.draft') }
            ]
          }
        ]}
        onRefresh={() => window.location.reload()}
      />

      {/* Sequence Cards List */}
      <Row gutter={[16, 16]}>
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
              <Descriptions.Item label={t('sequences.sequenceName')} span={2}>
                {selectedSequence.name}
              </Descriptions.Item>
              <Descriptions.Item label={t('common.type')}>
                <Tag 
                  color={sequenceTypeMap[selectedSequence.type as keyof typeof sequenceTypeMap]?.color}
                  icon={sequenceTypeMap[selectedSequence.type as keyof typeof sequenceTypeMap]?.icon}
                >
                  {sequenceTypeMap[selectedSequence.type as keyof typeof sequenceTypeMap]?.name}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={t('common.status')}>
                {getStatusTag(selectedSequence.status)}
              </Descriptions.Item>
              <Descriptions.Item label={t('sequences.stepCount')}>
                {selectedSequence.steps}{t('sequences.steps')}
              </Descriptions.Item>
              <Descriptions.Item label={t('sequences.executionDuration')}>
                {selectedSequence.duration}
              </Descriptions.Item>
              <Descriptions.Item label={t('sequences.participants')} span={2}>
                <Space wrap>
                  {selectedSequence.participants.map((participant, index) => (
                    <Tag key={index} icon={<UserOutlined />}>
                      {participant}
                    </Tag>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label={t('sequences.createdBy')}>
                {selectedSequence.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label={t('sequences.createdAt')}>
                {selectedSequence.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label={t('common.description')} span={2}>
                {selectedSequence.description}
              </Descriptions.Item>
            </Descriptions>

            {/* Sequence Diagram */}
            <SequenceDiagram 
              chart={selectedSequence.mermaidChart}
              title={t('sequences.sequenceDiagram')}
            />
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};

export default SequenceManagement;
