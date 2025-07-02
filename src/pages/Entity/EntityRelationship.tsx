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
  Tag
} from 'antd';
import { 
  NodeIndexOutlined, 
  ShareAltOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  SettingOutlined,
  SearchOutlined,
  FilterOutlined,
  ExportOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { setPageTitle } from '../../utils';
import TopologyGraph from '../../components/TopologyGraph';

// 临时类型定义，避免导入问题
interface TopologyPlane {
  id: string;
  name: string;
  level: number;
  color: string;
  borderColor: string;
  description: string;
}

interface TopologyNode {
  id: string;
  name: string;
  type: string;
  level: number;
  plane: string;
  description: string;
  status: string;
  [key: string]: any;
}

interface TopologyLink {
  source: string;
  target: string;
  type: string;
  strength: number;
}

const { Title, Paragraph } = Typography;

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

const FeatureCard = styled(Card)`
  height: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const EntityRelationship: React.FC = () => {
  const [activeTab, setActiveTab] = useState('entities');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 模拟数据 - 实际使用时应该从props或API获取
  const [planes] = useState<TopologyPlane[]>([
    {
      id: "business_scenario_plane",
      name: "业务场景平面",
      level: 1,
      color: "#e6f7ff",
      borderColor: "#1890ff",
      description: "核心业务场景和用户旅程"
    },
    {
      id: "business_link_plane",
      name: "业务链路平面",
      level: 2,
      color: "#f6ffed",
      borderColor: "#52c41a",
      description: "业务场景的具体执行链路"
    },
    {
      id: "application_plane", 
      name: "应用平面",
      level: 3,
      color: "#fff7e6",
      borderColor: "#faad14",
      description: "业务系统和应用服务层"
    },
    {
      id: "middleware_plane",
      name: "中间件平面", 
      level: 4,
      color: "#f9f0ff",
      borderColor: "#722ed1",
      description: "中间件和基础服务层"
    },
    {
      id: "infrastructure_plane",
      name: "基础设施平面",
      level: 5,
      color: "#fff2f0",
      borderColor: "#f5222d",
      description: "基础设施和资源层"
    }
  ]);

  const [nodes] = useState<TopologyNode[]>([
    {
      id: "business_scenario_1",
      name: "电商下单场景",
      type: "business_scenario",
      level: 1,
      plane: "business_scenario_plane",
      description: "用户在电商平台完成商品购买的完整流程",
      status: "active"
    },
    {
      id: "business_scenario_2", 
      name: "支付结算场景",
      type: "business_scenario",
      level: 1,
      plane: "business_scenario_plane",
      description: "处理用户支付和商户结算的完整业务场景",
      status: "active"
    },
    {
      id: "business_link_1",
      name: "用户下单链路",
      type: "business_link", 
      level: 2,
      plane: "business_link_plane",
      description: "从商品选择到订单确认的业务链路",
      status: "active"
    },
    {
      id: "system_1",
      name: "用户中心系统",
      type: "business_system",
      level: 3,
      plane: "application_plane",
      description: "管理用户信息、认证、权限的核心系统",
      status: "running",
      version: "v2.1.0",
      instances: 6
    },
    {
      id: "system_2", 
      name: "商品管理系统",
      type: "business_system",
      level: 3,
      plane: "application_plane",
      description: "商品信息、价格、促销管理系统",
      status: "running",
      version: "v1.8.2",
      instances: 4
    }
  ]);

  const [links] = useState<TopologyLink[]>([
    {
      source: "business_scenario_1",
      target: "business_link_1",
      type: "contains",
      strength: 0.8
    },
    {
      source: "business_link_1",
      target: "system_1",
      type: "uses",
      strength: 0.6
    },
    {
      source: "business_link_1",
      target: "system_2",
      type: "uses",
      strength: 0.6
    }
  ]);

  useEffect(() => {
    setPageTitle('实体关系');
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleNodeClick = (node: TopologyNode) => {
    console.log('Node clicked:', node);
  };

  const handleNodeHover = (node: TopologyNode | null) => {
    console.log('Node hovered:', node);
  };

  const renderEntityManagement = () => (
    <TabContent>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>实体管理</Title>
          <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
            管理系统中的各种实体对象，包括实体类型定义、实体实例创建和属性配置。
          </Paragraph>
        </div>
        <Space>
          <Button icon={<SearchOutlined />}>
            搜索
          </Button>
          <Button icon={<FilterOutlined />}>
            筛选
          </Button>
          <Button icon={<ReloadOutlined />}>
            刷新
          </Button>
          <Button type="primary" icon={<PlusOutlined />}>
            创建实体
          </Button>
        </Space>
      </div>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="实体类型"
              value={0}
              suffix="个"
              valueStyle={{ color: '#1890ff' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="实体实例"
              value={0}
              suffix="个"
              valueStyle={{ color: '#52c41a' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="活跃实体"
              value={0}
              suffix="个"
              valueStyle={{ color: '#faad14' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="异常实体"
              value={0}
              suffix="个"
              valueStyle={{ color: '#f5222d' }}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 功能介绍 */}
      <Row gutter={16}>
        <Col xs={24} md={12} lg={8}>
          <FeatureCard
            title={
              <Space>
                <NodeIndexOutlined style={{ color: '#1890ff' }} />
                实体类型管理
              </Space>
            }
          >
            <Paragraph>
              定义和管理不同类型的实体，包括属性定义、约束规则和生命周期配置。
            </Paragraph>
            <div>
              <Tag color="blue">类型定义</Tag>
              <Tag color="blue">属性配置</Tag>
              <Tag color="blue">约束规则</Tag>
            </div>
          </FeatureCard>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <FeatureCard
            title={
              <Space>
                <PlusOutlined style={{ color: '#52c41a' }} />
                实体实例管理
              </Space>
            }
          >
            <Paragraph>
              创建、编辑和管理具体的实体实例，支持批量操作和状态管理。
            </Paragraph>
            <div>
              <Tag color="green">实例创建</Tag>
              <Tag color="green">批量操作</Tag>
              <Tag color="green">状态管理</Tag>
            </div>
          </FeatureCard>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <FeatureCard
            title={
              <Space>
                <SearchOutlined style={{ color: '#faad14' }} />
                搜索与过滤
              </Space>
            }
          >
            <Paragraph>
              强大的搜索和过滤功能，支持多维度查询和高级筛选条件。
            </Paragraph>
            <div>
              <Tag color="orange">全文搜索</Tag>
              <Tag color="orange">高级筛选</Tag>
              <Tag color="orange">快速定位</Tag>
            </div>
          </FeatureCard>
        </Col>
      </Row>
    </TabContent>
  );

  const renderRelationshipGraph = () => (
    <TabContent>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>关系图谱</Title>
          <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
            基于D3.js的交互式关系图谱，展示从业务场景到基础设施的完整技术架构关系。
          </Paragraph>
        </div>
        <Space>
          <Button icon={<ExportOutlined />}>
            导出图谱
          </Button>
          <Button icon={<SettingOutlined />}>
            图谱设置
          </Button>
          <Button icon={<ReloadOutlined />}>
            刷新图谱
          </Button>
        </Space>
      </div>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="关系总数"
              value={25}
              suffix="条"
              valueStyle={{ color: '#1890ff' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="关系类型"
              value={5}
              suffix="种"
              valueStyle={{ color: '#52c41a' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="图谱节点"
              value={21}
              suffix="个"
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

      {/* 拓扑图谱 */}
      <TopologyGraph
        planes={planes}
        nodes={nodes}
        links={links}
        loading={loading}
        error={error}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        showLegend={true}
        showControls={true}
      />

      {/* 功能介绍 */}
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col xs={24} md={12} lg={8}>
          <FeatureCard
            title={
              <Space>
                <ShareAltOutlined style={{ color: '#1890ff' }} />
                多层级架构
              </Space>
            }
          >
            <Paragraph>
              展示从业务场景、业务链路、业务系统、中间件到基础设施的5层架构关系。
            </Paragraph>
            <div>
              <Tag color="blue">业务场景</Tag>
              <Tag color="green">业务链路</Tag>
              <Tag color="orange">业务系统</Tag>
              <Tag color="purple">中间件</Tag>
              <Tag color="red">基础设施</Tag>
            </div>
          </FeatureCard>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <FeatureCard
            title={
              <Space>
                <SearchOutlined style={{ color: '#52c41a' }} />
                交互式探索
              </Space>
            }
          >
            <Paragraph>
              展示完整的支付结算生态系统，包含支付网关、钱包、风控、清结算等核心系统。
            </Paragraph>
            <div>
              <Tag color="blue">支付网关</Tag>
              <Tag color="green">钱包系统</Tag>
              <Tag color="orange">风控系统</Tag>
              <Tag color="purple">清结算</Tag>
              <Tag color="red">账务系统</Tag>
            </div>
          </FeatureCard>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <FeatureCard
            title={
              <Space>
                <SettingOutlined style={{ color: '#faad14' }} />
                关系类型
              </Space>
            }
          >
            <Paragraph>
              支持包含、依赖、使用、运行、存储、日志等6种关系类型的可视化展示。
            </Paragraph>
            <div>
              <Tag color="orange">包含关系</Tag>
              <Tag color="orange">依赖关系</Tag>
              <Tag color="orange">使用关系</Tag>
              <Tag color="orange">运行关系</Tag>
            </div>
          </FeatureCard>
        </Col>
      </Row>
    </TabContent>
  );

  return (
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              实体关系
              <Badge 
                count="开发中" 
                style={{ 
                  backgroundColor: '#faad14', 
                  marginLeft: 12,
                  fontSize: 12 
                }} 
              />
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              统一管理系统中的实体对象和它们之间的关系，提供完整的实体生命周期管理和关系可视化分析。
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
                实体管理
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
                关系图谱
              </Space>
            } 
            key="relationships"
          >
            {renderRelationshipGraph()}
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default EntityRelationship;
