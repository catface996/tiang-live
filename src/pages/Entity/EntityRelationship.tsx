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
            可视化展示实体间的关系网络，支持图形化的关系分析和探索。
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
              value={0}
              suffix="条"
              valueStyle={{ color: '#1890ff' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="关系类型"
              value={0}
              suffix="种"
              valueStyle={{ color: '#52c41a' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="图谱节点"
              value={0}
              suffix="个"
              valueStyle={{ color: '#faad14' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="连接强度"
              value={0}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
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
                <ShareAltOutlined style={{ color: '#1890ff' }} />
                关系可视化
              </Space>
            }
          >
            <Paragraph>
              以图形化方式展示实体间的复杂关系网络，支持多种布局算法。
            </Paragraph>
            <div>
              <Tag color="blue">力导向布局</Tag>
              <Tag color="blue">层次布局</Tag>
              <Tag color="blue">环形布局</Tag>
            </div>
          </FeatureCard>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <FeatureCard
            title={
              <Space>
                <SearchOutlined style={{ color: '#52c41a' }} />
                路径分析
              </Space>
            }
          >
            <Paragraph>
              分析实体间的关系路径，发现隐藏的关联关系和影响链路。
            </Paragraph>
            <div>
              <Tag color="green">最短路径</Tag>
              <Tag color="green">影响分析</Tag>
              <Tag color="green">关联发现</Tag>
            </div>
          </FeatureCard>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <FeatureCard
            title={
              <Space>
                <SettingOutlined style={{ color: '#faad14' }} />
                交互操作
              </Space>
            }
          >
            <Paragraph>
              丰富的交互功能，支持节点拖拽、缩放、筛选和详情查看。
            </Paragraph>
            <div>
              <Tag color="orange">节点拖拽</Tag>
              <Tag color="orange">缩放平移</Tag>
              <Tag color="orange">详情查看</Tag>
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
