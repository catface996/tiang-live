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
  Tabs,
  Descriptions,
  Tree,
  Tooltip,
  Input,
  Select
} from 'antd';
import { 
  SolutionOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeploymentUnitOutlined,
  ShopOutlined,
  BankOutlined,
  MedicineBoxOutlined,
  CarOutlined,
  BookOutlined,
  GlobalOutlined,
  TeamOutlined,
  ApiOutlined,
  DatabaseOutlined,
  CloudOutlined,
  SecurityScanOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { setPageTitle } from '../../utils';

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

const SolutionCard = styled(Card)`
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const FilterBar = styled.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;

interface BusinessEntity {
  id: string;
  name: string;
  type: string;
  description: string;
  attributes: string[];
}

interface BusinessRelation {
  id: string;
  from: string;
  to: string;
  type: string;
  description: string;
}

interface IndustrySolution {
  id: string;
  name: string;
  industry: string;
  description: string;
  scenario: string;
  entities: BusinessEntity[];
  relations: BusinessRelation[];
  complexity: 'simple' | 'medium' | 'complex';
  status: 'active' | 'draft' | 'deprecated';
  tags: string[];
  createdBy: string;
  createdAt: string;
  lastModified: string;
  usageCount: number;
}

const IndustrySolutionManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<IndustrySolution | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setPageTitle(t('solutions.title'));
  }, [t]);

  // 行业方案数据
  const solutionData: IndustrySolution[] = [
    {
      id: '1',
      name: '电商平台业务架构',
      industry: 'ecommerce',
      description: '完整的电商平台业务架构方案，包含用户管理、商品管理、订单处理、支付结算等核心业务模块',
      scenario: '适用于B2C电商平台、在线商城、跨境电商等场景',
      entities: [
        {
          id: 'user',
          name: '用户',
          type: '业务实体',
          description: '平台注册用户，包含个人和企业用户',
          attributes: ['用户ID', '用户名', '邮箱', '手机号', '用户类型', '注册时间']
        },
        {
          id: 'product',
          name: '商品',
          type: '业务实体',
          description: '平台销售的商品信息',
          attributes: ['商品ID', '商品名称', '价格', '库存', '分类', '品牌', '规格']
        },
        {
          id: 'order',
          name: '订单',
          type: '业务实体',
          description: '用户购买行为产生的订单记录',
          attributes: ['订单ID', '用户ID', '商品列表', '总金额', '订单状态', '创建时间']
        },
        {
          id: 'payment',
          name: '支付',
          type: '业务实体',
          description: '订单支付相关信息',
          attributes: ['支付ID', '订单ID', '支付方式', '支付金额', '支付状态', '支付时间']
        }
      ],
      relations: [
        {
          id: 'user-order',
          from: 'user',
          to: 'order',
          type: '一对多',
          description: '一个用户可以创建多个订单'
        },
        {
          id: 'order-product',
          from: 'order',
          to: 'product',
          type: '多对多',
          description: '一个订单可以包含多个商品，一个商品可以属于多个订单'
        },
        {
          id: 'order-payment',
          from: 'order',
          to: 'payment',
          type: '一对一',
          description: '每个订单对应一个支付记录'
        }
      ],
      complexity: 'medium',
      status: 'active',
      tags: ['电商', 'B2C', '在线支付', '库存管理'],
      createdBy: '业务架构师',
      createdAt: '2024-06-01',
      lastModified: '2024-06-14',
      usageCount: 156
    },
    {
      id: '2',
      name: '银行核心业务系统',
      industry: 'finance',
      description: '银行核心业务系统架构，涵盖账户管理、交易处理、风险控制、合规监管等金融业务',
      scenario: '适用于商业银行、信用社、金融科技公司等金融机构',
      entities: [
        {
          id: 'account',
          name: '账户',
          type: '业务实体',
          description: '客户在银行开立的各类账户',
          attributes: ['账户号', '账户类型', '客户ID', '余额', '状态', '开户时间']
        },
        {
          id: 'customer',
          name: '客户',
          type: '业务实体',
          description: '银行服务的个人或企业客户',
          attributes: ['客户ID', '客户姓名', '身份证号', '联系方式', '客户等级', '风险评级']
        },
        {
          id: 'transaction',
          name: '交易',
          type: '业务实体',
          description: '客户进行的各类金融交易',
          attributes: ['交易ID', '交易类型', '金额', '账户号', '交易时间', '交易状态']
        },
        {
          id: 'loan',
          name: '贷款',
          type: '业务实体',
          description: '银行提供的各类贷款产品',
          attributes: ['贷款ID', '客户ID', '贷款金额', '利率', '期限', '担保方式', '审批状态']
        }
      ],
      relations: [
        {
          id: 'customer-account',
          from: 'customer',
          to: 'account',
          type: '一对多',
          description: '一个客户可以拥有多个账户'
        },
        {
          id: 'account-transaction',
          from: 'account',
          to: 'transaction',
          type: '一对多',
          description: '一个账户可以产生多笔交易'
        },
        {
          id: 'customer-loan',
          from: 'customer',
          to: 'loan',
          type: '一对多',
          description: '一个客户可以申请多笔贷款'
        }
      ],
      complexity: 'complex',
      status: 'active',
      tags: ['银行', '金融', '风控', '合规'],
      createdBy: '金融架构师',
      createdAt: '2024-05-15',
      lastModified: '2024-06-12',
      usageCount: 89
    }
  ];

  const industryMap = {
    ecommerce: { name: t('solutions.industry.ecommerce'), color: 'blue', icon: <ShopOutlined /> },
    finance: { name: t('solutions.industry.finance'), color: 'green', icon: <BankOutlined /> },
    healthcare: { name: t('solutions.industry.healthcare'), color: 'red', icon: <MedicineBoxOutlined /> },
    automotive: { name: t('solutions.industry.automotive'), color: 'orange', icon: <CarOutlined /> },
    education: { name: t('solutions.industry.education'), color: 'purple', icon: <BookOutlined /> },
    logistics: { name: t('solutions.industry.logistics'), color: 'cyan', icon: <GlobalOutlined /> },
  };

  const getComplexityTag = (complexity: string) => {
    const complexityMap = {
      simple: { color: 'green', text: t('solutions.complexity.simple') },
      medium: { color: 'orange', text: t('solutions.complexity.medium') },
      complex: { color: 'red', text: t('solutions.complexity.complex') },
    };
    const config = complexityMap[complexity as keyof typeof complexityMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'green', text: t('solutions.status.active') },
      draft: { color: 'orange', text: t('solutions.status.draft') },
      deprecated: { color: 'red', text: t('solutions.status.deprecated') },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const handleViewSolution = (solution: IndustrySolution) => {
    setSelectedSolution(solution);
    setDetailModalVisible(true);
  };

  return (
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <SolutionOutlined style={{ color: '#1890ff' }} />
                {t('solutions.title')}
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              {t('solutions.subtitle')}
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              {t('solutions.refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('solutions.createSolution')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('solutions.stats.totalSolutions')}
              value={solutionData.length}
              suffix={t('common.unit.count')}
              valueStyle={{ color: '#1890ff' }}
              prefix={<SolutionOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('solutions.stats.activeSolutions')}
              value={solutionData.filter(s => s.status === 'active').length}
              suffix={t('common.unit.count')}
              valueStyle={{ color: '#52c41a' }}
              prefix={<DeploymentUnitOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('solutions.stats.businessEntities')}
              value={solutionData.reduce((sum, s) => sum + s.entities.length, 0)}
              suffix={t('common.unit.count')}
              valueStyle={{ color: '#faad14' }}
              prefix={<ApiOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('solutions.stats.totalUsage')}
              value={solutionData.reduce((sum, s) => sum + s.usageCount, 0)}
              suffix={t('common.unit.times')}
              valueStyle={{ color: '#722ed1' }}
              prefix={<TeamOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <Card style={{ marginBottom: 24 }}>
        <FilterBar>
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Input
                placeholder={t('solutions.search.placeholder')}
                prefix={<SearchOutlined />}
                allowClear
              />
            </Col>
            <Col>
              <Select
                placeholder={t('solutions.search.industryType')}
                style={{ width: 120 }}
                allowClear
              >
                {Object.entries(industryMap).map(([key, config]) => (
                  <Option key={key} value={key}>
                    <Space>
                      {config.icon}
                      {config.name}
                    </Space>
                  </Option>
                ))}
              </Select>
            </Col>
            <Col>
              <Select
                placeholder={t('solutions.search.complexity')}
                style={{ width: 100 }}
                allowClear
              >
                <Option value="simple">{t('solutions.complexity.simple')}</Option>
                <Option value="medium">{t('solutions.complexity.medium')}</Option>
                <Option value="complex">{t('solutions.complexity.complex')}</Option>
              </Select>
            </Col>
            <Col>
              <Select
                placeholder={t('solutions.search.status')}
                style={{ width: 100 }}
                allowClear
              >
                <Option value="active">{t('solutions.status.active')}</Option>
                <Option value="draft">{t('solutions.status.draft')}</Option>
                <Option value="deprecated">{t('solutions.status.deprecated')}</Option>
              </Select>
            </Col>
          </Row>
        </FilterBar>
      </Card>

      {/* 方案卡片列表 */}
      <Row gutter={16}>
        {solutionData.map(solution => {
          const industryConfig = industryMap[solution.industry as keyof typeof industryMap];
          return (
            <Col xs={24} sm={12} lg={8} xl={6} key={solution.id}>
              <SolutionCard
                title={
                  <Space>
                    {industryConfig?.icon}
                    <span>{solution.name}</span>
                    {getStatusTag(solution.status)}
                  </Space>
                }
                extra={
                  <Space>
                    <Tooltip title={t('solutions.card.viewDetails')}>
                      <Button 
                        type="link" 
                        icon={<EyeOutlined />} 
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewSolution(solution);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title={t('solutions.card.edit')}>
                      <Button 
                        type="link" 
                        icon={<EditOutlined />} 
                        size="small"
                      />
                    </Tooltip>
                  </Space>
                }
                onClick={() => handleViewSolution(solution)}
              >
                <div style={{ marginBottom: 12 }}>
                  <Tag color={industryConfig?.color} icon={industryConfig?.icon}>
                    {industryConfig?.name}
                  </Tag>
                  {getComplexityTag(solution.complexity)}
                </div>
                
                <Paragraph 
                  ellipsis={{ rows: 2 }} 
                  style={{ marginBottom: 16, minHeight: 40 }}
                >
                  {solution.description}
                </Paragraph>

                <div style={{ marginBottom: 12 }}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic
                        title={t('solutions.card.businessEntities')}
                        value={solution.entities.length}
                        suffix={t('common.unit.count')}
                        valueStyle={{ fontSize: 14 }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title={t('solutions.card.usageCount')}
                        value={solution.usageCount}
                        suffix={t('common.unit.times')}
                        valueStyle={{ fontSize: 14 }}
                      />
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <Space wrap>
                    {solution.tags.slice(0, 3).map(tag => (
                      <Tag key={tag} size="small">{tag}</Tag>
                    ))}
                    {solution.tags.length > 3 && (
                      <Tag size="small">+{solution.tags.length - 3}</Tag>
                    )}
                  </Space>
                </div>

                <div style={{ fontSize: 12, color: '#666' }}>
                  <div>{t('solutions.card.creator')}: {solution.createdBy}</div>
                  <div>{t('solutions.card.updateTime')}: {solution.lastModified}</div>
                </div>
              </SolutionCard>
            </Col>
          );
        })}
      </Row>

      {/* 方案详情模态框 */}
      <Modal
        title={selectedSolution?.name}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={1200}
        style={{ top: 20 }}
      >
        {selectedSolution && (
          <div>
            {/* 基本信息 */}
            <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
              <Descriptions.Item label="方案名称" span={2}>
                {selectedSolution.name}
              </Descriptions.Item>
              <Descriptions.Item label="行业类型">
                <Tag 
                  color={industryMap[selectedSolution.industry as keyof typeof industryMap]?.color}
                  icon={industryMap[selectedSolution.industry as keyof typeof industryMap]?.icon}
                >
                  {industryMap[selectedSolution.industry as keyof typeof industryMap]?.name}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="复杂度">
                {getComplexityTag(selectedSolution.complexity)}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {getStatusTag(selectedSolution.status)}
              </Descriptions.Item>
              <Descriptions.Item label="使用次数">
                {selectedSolution.usageCount}次
              </Descriptions.Item>
              <Descriptions.Item label="业务实体数">
                {selectedSolution.entities.length}个
              </Descriptions.Item>
              <Descriptions.Item label="关系数">
                {selectedSolution.relations.length}个
              </Descriptions.Item>
              <Descriptions.Item label="创建者">
                {selectedSolution.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {selectedSolution.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label="标签" span={2}>
                <Space wrap>
                  {selectedSolution.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="方案描述" span={2}>
                {selectedSolution.description}
              </Descriptions.Item>
              <Descriptions.Item label="适用场景" span={2}>
                {selectedSolution.scenario}
              </Descriptions.Item>
            </Descriptions>

            {/* 详细内容标签页 */}
            <Tabs defaultActiveKey="entities">
              <Tabs.TabPane tab="业务实体" key="entities">
                <Row gutter={16}>
                  {selectedSolution.entities.map(entity => (
                    <Col xs={24} sm={12} lg={8} key={entity.id}>
                      <Card 
                        title={
                          <Space>
                            <DatabaseOutlined style={{ color: '#1890ff' }} />
                            {entity.name}
                          </Space>
                        }
                        size="small"
                        style={{ marginBottom: 16 }}
                      >
                        <div style={{ marginBottom: 8 }}>
                          <Tag color="blue">{entity.type}</Tag>
                        </div>
                        <Paragraph style={{ fontSize: 12, marginBottom: 12 }}>
                          {entity.description}
                        </Paragraph>
                        <div>
                          <Text strong style={{ fontSize: 12 }}>属性:</Text>
                          <div style={{ marginTop: 4 }}>
                            {entity.attributes.map(attr => (
                              <Tag key={attr} size="small" style={{ marginBottom: 4 }}>
                                {attr}
                              </Tag>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="实体关系" key="relations">
                <Row gutter={16}>
                  {selectedSolution.relations.map(relation => (
                    <Col xs={24} sm={12} lg={8} key={relation.id}>
                      <Card 
                        title={
                          <Space>
                            <ApiOutlined style={{ color: '#52c41a' }} />
                            {selectedSolution.entities.find(e => e.id === relation.from)?.name} 
                            → 
                            {selectedSolution.entities.find(e => e.id === relation.to)?.name}
                          </Space>
                        }
                        size="small"
                        style={{ marginBottom: 16 }}
                      >
                        <div style={{ marginBottom: 8 }}>
                          <Tag color="green">{relation.type}</Tag>
                        </div>
                        <Paragraph style={{ fontSize: 12 }}>
                          {relation.description}
                        </Paragraph>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};

export default IndustrySolutionManagement;
