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
import SearchFilterBar from '../../components/Common/SearchFilterBar';

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
  const [searchText, setSearchText] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterComplexity, setFilterComplexity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
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
    },
    {
      id: '3',
      name: '智慧医疗管理平台',
      industry: 'healthcare',
      description: '医疗机构数字化管理平台，整合患者管理、诊疗流程、医疗资源调度和医保结算等功能',
      scenario: '适用于医院、诊所、社区医疗中心等医疗机构',
      entities: [
        {
          id: 'patient',
          name: '患者',
          type: '业务实体',
          description: '就诊患者的基本信息和病历',
          attributes: ['患者ID', '姓名', '性别', '年龄', '联系方式', '病历号', '医保信息']
        },
        {
          id: 'doctor',
          name: '医生',
          type: '业务实体',
          description: '医院医护人员信息',
          attributes: ['医生ID', '姓名', '科室', '职称', '专长', '排班信息']
        },
        {
          id: 'appointment',
          name: '预约',
          type: '业务实体',
          description: '患者的就诊预约记录',
          attributes: ['预约ID', '患者ID', '医生ID', '科室', '预约时间', '预约状态']
        },
        {
          id: 'diagnosis',
          name: '诊断',
          type: '业务实体',
          description: '医生对患者的诊断结果',
          attributes: ['诊断ID', '患者ID', '医生ID', '诊断结果', '诊断时间', '处方ID']
        }
      ],
      relations: [
        {
          id: 'patient-appointment',
          from: 'patient',
          to: 'appointment',
          type: '一对多',
          description: '一个患者可以有多个预约记录'
        },
        {
          id: 'doctor-appointment',
          from: 'doctor',
          to: 'appointment',
          type: '一对多',
          description: '一个医生可以有多个预约安排'
        },
        {
          id: 'patient-diagnosis',
          from: 'patient',
          to: 'diagnosis',
          type: '一对多',
          description: '一个患者可以有多个诊断记录'
        }
      ],
      complexity: 'complex',
      status: 'active',
      tags: ['医疗', '患者管理', '预约系统', '电子病历'],
      createdBy: '医疗信息架构师',
      createdAt: '2024-05-20',
      lastModified: '2024-06-10',
      usageCount: 78
    },
    {
      id: '4',
      name: '智能物流配送系统',
      industry: 'logistics',
      description: '现代化物流配送系统架构，支持订单管理、路线规划、车辆调度和实时追踪等功能',
      scenario: '适用于快递公司、物流企业、电商配送等场景',
      entities: [
        {
          id: 'package',
          name: '包裹',
          type: '业务实体',
          description: '待配送的包裹信息',
          attributes: ['包裹ID', '订单ID', '重量', '体积', '物品类型', '优先级']
        },
        {
          id: 'vehicle',
          name: '车辆',
          type: '业务实体',
          description: '配送车辆信息',
          attributes: ['车辆ID', '车型', '载重', '当前位置', '状态', '司机ID']
        },
        {
          id: 'route',
          name: '路线',
          type: '业务实体',
          description: '配送路线规划',
          attributes: ['路线ID', '起点', '终点', '途经点', '预计时间', '实际时间', '距离']
        },
        {
          id: 'warehouse',
          name: '仓库',
          type: '业务实体',
          description: '物流仓库信息',
          attributes: ['仓库ID', '名称', '位置', '容量', '存储类型', '操作时间']
        }
      ],
      relations: [
        {
          id: 'package-route',
          from: 'package',
          to: 'route',
          type: '多对一',
          description: '多个包裹可以共享一条配送路线'
        },
        {
          id: 'vehicle-route',
          from: 'vehicle',
          to: 'route',
          type: '一对多',
          description: '一个车辆可以执行多条配送路线'
        },
        {
          id: 'warehouse-package',
          from: 'warehouse',
          to: 'package',
          type: '一对多',
          description: '一个仓库可以存储多个包裹'
        }
      ],
      complexity: 'medium',
      status: 'active',
      tags: ['物流', '配送', '路线规划', '实时追踪'],
      createdBy: '物流系统架构师',
      createdAt: '2024-05-25',
      lastModified: '2024-06-08',
      usageCount: 92
    },
    {
      id: '5',
      name: '智慧校园管理系统',
      industry: 'education',
      description: '现代化校园管理系统，整合学生管理、课程安排、教学资源和校园服务等功能',
      scenario: '适用于大学、中小学、培训机构等教育组织',
      entities: [
        {
          id: 'student',
          name: '学生',
          type: '业务实体',
          description: '在校学生信息',
          attributes: ['学生ID', '姓名', '年级', '班级', '联系方式', '入学时间', '学籍状态']
        },
        {
          id: 'teacher',
          name: '教师',
          type: '业务实体',
          description: '教职工信息',
          attributes: ['教师ID', '姓名', '科目', '职称', '联系方式', '入职时间']
        },
        {
          id: 'course',
          name: '课程',
          type: '业务实体',
          description: '教学课程信息',
          attributes: ['课程ID', '课程名称', '学分', '课时', '教师ID', '教室', '时间段']
        },
        {
          id: 'classroom',
          name: '教室',
          type: '业务实体',
          description: '教学场所信息',
          attributes: ['教室ID', '名称', '位置', '容量', '设备配置', '状态']
        }
      ],
      relations: [
        {
          id: 'student-course',
          from: 'student',
          to: 'course',
          type: '多对多',
          description: '学生可以选修多门课程，课程可以有多个学生'
        },
        {
          id: 'teacher-course',
          from: 'teacher',
          to: 'course',
          type: '一对多',
          description: '一个教师可以教授多门课程'
        },
        {
          id: 'course-classroom',
          from: 'course',
          to: 'classroom',
          type: '多对多',
          description: '课程可以在不同教室进行，教室可以用于不同课程'
        }
      ],
      complexity: 'medium',
      status: 'active',
      tags: ['教育', '学生管理', '课程安排', '教学资源'],
      createdBy: '教育信息架构师',
      createdAt: '2024-05-18',
      lastModified: '2024-06-05',
      usageCount: 65
    },
    {
      id: '6',
      name: '智能制造生产管理',
      industry: 'automotive',
      description: '智能制造生产管理系统，支持生产计划、设备管理、质量控制和供应链协同等功能',
      scenario: '适用于汽车制造、电子组装、工业生产等制造业',
      entities: [
        {
          id: 'product',
          name: '产品',
          type: '业务实体',
          description: '生产的产品信息',
          attributes: ['产品ID', '名称', '型号', '规格', 'BOM清单', '生产周期']
        },
        {
          id: 'equipment',
          name: '设备',
          type: '业务实体',
          description: '生产设备信息',
          attributes: ['设备ID', '名称', '类型', '状态', '维护周期', '生产能力']
        },
        {
          id: 'workorder',
          name: '工单',
          type: '业务实体',
          description: '生产工单信息',
          attributes: ['工单ID', '产品ID', '计划数量', '开始时间', '结束时间', '状态']
        },
        {
          id: 'material',
          name: '物料',
          type: '业务实体',
          description: '生产所需物料信息',
          attributes: ['物料ID', '名称', '规格', '库存量', '供应商', '采购周期']
        }
      ],
      relations: [
        {
          id: 'product-workorder',
          from: 'product',
          to: 'workorder',
          type: '一对多',
          description: '一个产品可以有多个生产工单'
        },
        {
          id: 'equipment-workorder',
          from: 'equipment',
          to: 'workorder',
          type: '多对多',
          description: '设备可以执行多个工单，工单可能需要多台设备'
        },
        {
          id: 'product-material',
          from: 'product',
          to: 'material',
          type: '多对多',
          description: '产品由多种物料组成，物料可用于多种产品'
        }
      ],
      complexity: 'complex',
      status: 'active',
      tags: ['制造', '生产管理', '设备监控', '质量控制'],
      createdBy: '制造系统架构师',
      createdAt: '2024-05-10',
      lastModified: '2024-06-12',
      usageCount: 103
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
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('solutions.search.placeholder')}
        filters={[
          {
            key: 'industry',
            value: filterIndustry,
            onChange: setFilterIndustry,
            placeholder: t('solutions.search.industryType'),
            width: 120,
            options: [
              { value: 'all', label: t('solutions.allIndustries') },
              ...Object.entries(industryMap).map(([key, config]) => ({
                value: key,
                label: config.name
              }))
            ]
          },
          {
            key: 'complexity',
            value: filterComplexity,
            onChange: setFilterComplexity,
            placeholder: t('solutions.search.complexity'),
            width: 100,
            options: [
              { value: 'all', label: '所有复杂度' },
              { value: 'simple', label: t('solutions.complexity.simple') },
              { value: 'medium', label: t('solutions.complexity.medium') },
              { value: 'complex', label: t('solutions.complexity.complex') }
            ]
          },
          {
            key: 'status',
            value: filterStatus,
            onChange: setFilterStatus,
            placeholder: t('solutions.search.status'),
            width: 100,
            options: [
              { value: 'all', label: '所有状态' },
              { value: 'active', label: t('solutions.status.active') },
              { value: 'draft', label: t('solutions.status.draft') },
              { value: 'deprecated', label: t('solutions.status.deprecated') }
            ]
          }
        ]}
        onRefresh={() => window.location.reload()}
      />

      {/* 方案卡片列表 */}
      <Row gutter={[16, 16]}>
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
              <Descriptions.Item label={t('solutions.modal.solutionName')} span={2}>
                {selectedSolution.name}
              </Descriptions.Item>
              <Descriptions.Item label={t('solutions.modal.industryType')}>
                <Tag 
                  color={industryMap[selectedSolution.industry as keyof typeof industryMap]?.color}
                  icon={industryMap[selectedSolution.industry as keyof typeof industryMap]?.icon}
                >
                  {industryMap[selectedSolution.industry as keyof typeof industryMap]?.name}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={t('solutions.modal.complexity')}>
                {getComplexityTag(selectedSolution.complexity)}
              </Descriptions.Item>
              <Descriptions.Item label={t('solutions.modal.status')}>
                {getStatusTag(selectedSolution.status)}
              </Descriptions.Item>
              <Descriptions.Item label={t('solutions.modal.usageCount')}>
                {selectedSolution.usageCount}{t('common.unit.times')}
              </Descriptions.Item>
              <Descriptions.Item label={t('solutions.modal.entityCount')}>
                {selectedSolution.entities.length}{t('common.unit.count')}
              </Descriptions.Item>
              <Descriptions.Item label={t('solutions.modal.relationCount')}>
                {selectedSolution.relations.length}{t('common.unit.count')}
              </Descriptions.Item>
              <Descriptions.Item label={t('solutions.modal.creator')}>
                {selectedSolution.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label={t('solutions.modal.createTime')}>
                {selectedSolution.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label={t('solutions.modal.tags')} span={2}>
                <Space wrap>
                  {selectedSolution.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label={t('solutions.modal.description')} span={2}>
                {selectedSolution.description}
              </Descriptions.Item>
              <Descriptions.Item label={t('solutions.modal.scenario')} span={2}>
                {selectedSolution.scenario}
              </Descriptions.Item>
            </Descriptions>

            {/* 详细内容标签页 */}
            <Tabs defaultActiveKey="entities">
              <Tabs.TabPane tab={t('solutions.modal.businessEntities')} key="entities">
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
                          <Text strong style={{ fontSize: 12 }}>{t('solutions.modal.attributes')}:</Text>
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
              
              <Tabs.TabPane tab={t('solutions.modal.entityRelations')} key="relations">
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
