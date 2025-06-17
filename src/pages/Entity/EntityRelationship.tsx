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
import D3RelationshipGraph from '../../components/Relation/D3RelationshipGraph';

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
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const EntityRelationship: React.FC = () => {
  const [activeTab, setActiveTab] = useState('entities');

  useEffect(() => {
    setPageTitle('实体关系');
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
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
              value={28}
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
              value={19}
              suffix="个"
              valueStyle={{ color: '#faad14' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="平面层级"
              value={5}
              suffix="层"
              valueStyle={{ color: '#722ed1' }}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* D3.js 关系图谱 */}
      <D3RelationshipGraph />

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
              支持节点拖拽、缩放平移、悬浮高亮和点击查看详情等丰富交互功能。
            </Paragraph>
            <div>
              <Tag color="green">节点拖拽</Tag>
              <Tag color="green">缩放平移</Tag>
              <Tag color="green">悬浮高亮</Tag>
              <Tag color="green">详情查看</Tag>
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
