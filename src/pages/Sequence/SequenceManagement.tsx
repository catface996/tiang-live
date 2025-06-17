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
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

interface SequenceData {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'active' | 'inactive' | 'draft';
  participants: string[];
  steps: number;
  duration: string;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  mermaidChart: string;
}

const SequenceManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedSequence, setSelectedSequence] = useState<SequenceData | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { t } = useTranslation();

  useEffect(() => {
    setPageTitle(t('sequences.title'));
  }, []);

  // 时序样例数据
  const sequenceData: SequenceData[] = [
    {
      id: '1',
      name: '用户登录认证流程',
      description: '用户通过前端登录，后端验证身份并返回token的完整时序流程',
      type: 'authentication',
      status: 'active',
      participants: ['用户', '前端应用', '认证服务', '数据库'],
      steps: 8,
      duration: '2-5秒',
      createdBy: '系统架构师',
      createdAt: '2024-06-10',
      lastModified: '2024-06-14',
      mermaidChart: `
sequenceDiagram
    participant U as 用户
    participant F as 前端应用
    participant A as 认证服务
    participant D as 数据库
    
    U->>F: 输入用户名密码
    F->>A: 发送登录请求
    A->>D: 查询用户信息
    D-->>A: 返回用户数据
    A->>A: 验证密码
    alt 验证成功
        A->>A: 生成JWT Token
        A-->>F: 返回Token和用户信息
        F-->>U: 登录成功，跳转首页
    else 验证失败
        A-->>F: 返回错误信息
        F-->>U: 显示登录失败
    end
      `
    },
    {
      id: '2',
      name: '订单处理业务流程',
      description: '从用户下单到订单完成的完整业务时序，包含库存检查、支付处理等环节',
      type: 'business',
      status: 'active',
      participants: ['用户', '订单服务', '库存服务', '支付服务', '通知服务'],
      steps: 12,
      duration: '10-30秒',
      createdBy: '业务分析师',
      createdAt: '2024-06-08',
      lastModified: '2024-06-13',
      mermaidChart: `
sequenceDiagram
    participant U as 用户
    participant O as 订单服务
    participant I as 库存服务
    participant P as 支付服务
    participant N as 通知服务
    
    U->>O: 提交订单
    O->>I: 检查库存
    alt 库存充足
        I-->>O: 库存确认
        O->>O: 创建订单
        O->>P: 发起支付
        P-->>O: 支付成功
        O->>I: 扣减库存
        O->>N: 发送订单确认
        N-->>U: 短信/邮件通知
        O-->>U: 订单创建成功
    else 库存不足
        I-->>O: 库存不足
        O-->>U: 商品库存不足
    end
      `
    },
    {
      id: '3',
      name: '微服务健康检查',
      description: '监控系统对各微服务进行健康检查的时序流程，包含服务发现和状态上报',
      type: 'monitoring',
      status: 'active',
      participants: ['监控中心', '服务注册中心', '用户服务', '订单服务', '支付服务'],
      steps: 10,
      duration: '5-10秒',
      createdBy: '运维工程师',
      createdAt: '2024-06-05',
      lastModified: '2024-06-12',
      mermaidChart: `
sequenceDiagram
    participant M as 监控中心
    participant R as 服务注册中心
    participant U as 用户服务
    participant O as 订单服务
    participant P as 支付服务
    
    M->>R: 获取服务列表
    R-->>M: 返回服务实例
    
    par 并行健康检查
        M->>U: 健康检查请求
        U-->>M: 返回健康状态
    and
        M->>O: 健康检查请求
        O-->>M: 返回健康状态
    and
        M->>P: 健康检查请求
        P-->>M: 返回健康状态
    end
    
    M->>M: 汇总健康状态
    M->>R: 更新服务状态
      `
    },
    {
      id: '4',
      name: '数据同步流程',
      description: '主数据库与从数据库之间的数据同步时序，确保数据一致性',
      type: 'data',
      status: 'draft',
      participants: ['应用服务', '主数据库', '从数据库', '同步服务'],
      steps: 6,
      duration: '1-3秒',
      createdBy: '数据库管理员',
      createdAt: '2024-06-12',
      lastModified: '2024-06-14',
      mermaidChart: `
sequenceDiagram
    participant A as 应用服务
    participant M as 主数据库
    participant S as 同步服务
    participant R as 从数据库
    
    A->>M: 写入数据
    M-->>A: 写入确认
    M->>S: 触发同步事件
    S->>M: 读取变更日志
    M-->>S: 返回变更数据
    S->>R: 同步数据到从库
    R-->>S: 同步确认
    S->>S: 记录同步状态
      `
    },
    {
      id: '5',
      name: 'API网关请求路由',
      description: 'API网关接收请求并路由到相应微服务的时序流程，包含认证和限流',
      type: 'gateway',
      status: 'active',
      participants: ['客户端', 'API网关', '认证服务', '用户服务', '限流服务'],
      steps: 9,
      duration: '100-500毫秒',
      createdBy: '架构师',
      createdAt: '2024-06-01',
      lastModified: '2024-06-10',
      mermaidChart: `
sequenceDiagram
    participant C as 客户端
    participant G as API网关
    participant A as 认证服务
    participant L as 限流服务
    participant U as 用户服务
    
    C->>G: API请求
    G->>A: 验证Token
    A-->>G: 认证结果
    
    alt 认证成功
        G->>L: 检查限流
        alt 未超限
            L-->>G: 通过限流
            G->>U: 转发请求
            U-->>G: 返回响应
            G-->>C: 返回结果
        else 超出限流
            L-->>G: 限流拒绝
            G-->>C: 返回限流错误
        end
    else 认证失败
        G-->>C: 返回认证错误
    end
      `
    }
  ];

  const sequenceTypeMap = {
    authentication: { name: '认证', color: 'blue', icon: <UserOutlined /> },
    business: { name: '业务', color: 'green', icon: <ApiOutlined /> },
    monitoring: { name: '监控', color: 'orange', icon: <ClockCircleOutlined /> },
    data: { name: '数据', color: 'purple', icon: <DatabaseOutlined /> },
    gateway: { name: '网关', color: 'cyan', icon: <CloudOutlined /> },
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'green', text: '活跃' },
      inactive: { color: 'red', text: '停用' },
      draft: { color: 'orange', text: '草稿' },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

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
                {typeConfig?.icon}
                <span>{sequence.name}</span>
                {getStatusTag(sequence.status)}
              </Space>
            }
            extra={
              <Space>
                <Tooltip title="查看时序图">
                  <Button 
                    type="link" 
                    icon={<EyeOutlined />} 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewSequence(sequence);
                    }}
                  />
                </Tooltip>
                <Tooltip title="编辑">
                  <Button 
                    type="link" 
                    icon={<EditOutlined />} 
                    size="small"
                  />
                </Tooltip>
              </Space>
            }
            onClick={() => handleViewSequence(sequence)}
          >
            <div style={{ marginBottom: 12 }}>
              <Tag color={typeConfig?.color} icon={typeConfig?.icon}>
                {typeConfig?.name}
              </Tag>
              <Tag icon={<UserOutlined />}>
                {sequence.participants.length}个参与者
              </Tag>
            </div>
            
            <Paragraph 
              ellipsis={{ rows: 2 }} 
              style={{ marginBottom: 16, minHeight: 40 }}
            >
              {sequence.description}
            </Paragraph>

            <div style={{ marginBottom: 12 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title="步骤数"
                    value={sequence.steps}
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="执行时长"
                    value={sequence.duration}
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
              </Row>
            </div>

            <div style={{ fontSize: 12, color: '#666' }}>
              <div>创建者: {sequence.createdBy}</div>
              <div>更新时间: {sequence.lastModified}</div>
            </div>
          </SequenceCard>
        </Col>
      );
    });
  };

  const activeSequences = sequenceData.filter(seq => seq.status === 'active').length;
  const totalSteps = sequenceData.reduce((sum, seq) => sum + seq.steps, 0);
  const totalParticipants = sequenceData.reduce((sum, seq) => sum + seq.participants.length, 0);

  return (
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <ControlOutlined style={{ color: '#1890ff' }} />
                时序管理
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              管理和可视化系统中的业务时序流程，支持时序图设计和流程分析。
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              刷新
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              创建时序
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="时序总数"
              value={sequenceData.length}
              suffix="个"
              valueStyle={{ color: '#1890ff' }}
              prefix={<ControlOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="活跃时序"
              value={activeSequences}
              suffix="个"
              valueStyle={{ color: '#52c41a' }}
              prefix={<PlayCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="总步骤数"
              value={totalSteps}
              suffix="步"
              valueStyle={{ color: '#faad14' }}
              prefix={<ClockCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="参与者总数"
              value={totalParticipants}
              suffix="个"
              valueStyle={{ color: '#722ed1' }}
              prefix={<UserOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder="搜索时序名称、描述..."
        filters={[
          {
            key: 'type',
            value: filterType,
            onChange: setFilterType,
            placeholder: '时序类型',
            width: 120,
            options: [
              { value: 'all', label: '所有类型' },
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
            placeholder: '状态',
            width: 100,
            options: [
              { value: 'all', label: '所有状态' },
              { value: 'active', label: '活跃' },
              { value: 'inactive', label: '停用' },
              { value: 'draft', label: '草稿' }
            ]
          }
        ]}
        onRefresh={() => window.location.reload()}
        extraActions={
          <Button type="primary" icon={<PlusOutlined />}>
            创建时序
          </Button>
        }
      />

      {/* 时序卡片列表 */}
      <Row gutter={[16, 16]}>
        {renderSequenceCards()}
      </Row>

      {/* 时序详情模态框 */}
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
            {/* 基本信息 */}
            <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
              <Descriptions.Item label="时序名称" span={2}>
                {selectedSequence.name}
              </Descriptions.Item>
              <Descriptions.Item label="类型">
                <Tag 
                  color={sequenceTypeMap[selectedSequence.type as keyof typeof sequenceTypeMap]?.color}
                  icon={sequenceTypeMap[selectedSequence.type as keyof typeof sequenceTypeMap]?.icon}
                >
                  {sequenceTypeMap[selectedSequence.type as keyof typeof sequenceTypeMap]?.name}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {getStatusTag(selectedSequence.status)}
              </Descriptions.Item>
              <Descriptions.Item label="步骤数">
                {selectedSequence.steps}步
              </Descriptions.Item>
              <Descriptions.Item label="执行时长">
                {selectedSequence.duration}
              </Descriptions.Item>
              <Descriptions.Item label="参与者" span={2}>
                <Space wrap>
                  {selectedSequence.participants.map((participant, index) => (
                    <Tag key={index} icon={<UserOutlined />}>
                      {participant}
                    </Tag>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="创建者">
                {selectedSequence.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {selectedSequence.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label="描述" span={2}>
                {selectedSequence.description}
              </Descriptions.Item>
            </Descriptions>

            {/* 时序图 */}
            <SequenceDiagram 
              chart={selectedSequence.mermaidChart}
              title="时序图"
            />
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};

export default SequenceManagement;
