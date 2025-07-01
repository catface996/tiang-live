import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import {
  NodeIndexOutlined,
  BranchesOutlined,
  DatabaseOutlined,
  ApiOutlined,
  ToolOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const TestToolsContainer = styled.div`
  padding: 24px;

  .tool-card {
    height: 200px;
    cursor: pointer;
    border: 1px solid var(--border-color);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      border-color: var(--primary-color);
    }

    .ant-card-body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .tool-icon {
      font-size: 48px;
      color: var(--primary-color);
      margin-bottom: 16px;
    }

    .tool-title {
      margin-bottom: 8px !important;
      color: var(--text-color);
    }

    .tool-description {
      color: var(--text-color-secondary);
      margin-bottom: 0 !important;
    }
  }

  .header-section {
    margin-bottom: 32px;
    text-align: center;

    .main-title {
      color: var(--text-color);
      margin-bottom: 8px !important;
    }

    .main-description {
      color: var(--text-color-secondary);
      font-size: 16px;
      margin-bottom: 0 !important;
    }
  }
`;

interface ToolItem {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  status?: 'available' | 'coming-soon' | 'beta';
}

const TestTools: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['testTools', 'common']);

  const tools: ToolItem[] = [
    {
      key: 'entity-topology',
      title: t('testTools:tools.entityTopology.title'),
      description: t('testTools:tools.entityTopology.description'),
      icon: <NodeIndexOutlined />,
      path: '/test-tools/entity-topology',
      status: 'available'
    },
    {
      key: 'relation-graph',
      title: t('testTools:tools.relationGraph.title'),
      description: t('testTools:tools.relationGraph.description'),
      icon: <BranchesOutlined />,
      path: '/test-tools/relation-graph',
      status: 'coming-soon'
    },
    {
      key: 'data-flow',
      title: t('testTools:tools.dataFlow.title'),
      description: t('testTools:tools.dataFlow.description'),
      icon: <DatabaseOutlined />,
      path: '/test-tools/data-flow',
      status: 'coming-soon'
    },
    {
      key: 'api-testing',
      title: t('testTools:tools.apiTesting.title'),
      description: t('testTools:tools.apiTesting.description'),
      icon: <ApiOutlined />,
      path: '/test-tools/api-testing',
      status: 'beta'
    },
    {
      key: 'performance-monitor',
      title: t('testTools:tools.performanceMonitor.title'),
      description: t('testTools:tools.performanceMonitor.description'),
      icon: <ToolOutlined />,
      path: '/test-tools/performance-monitor',
      status: 'coming-soon'
    },
    {
      key: 'experiment-lab',
      title: t('testTools:tools.experimentLab.title'),
      description: t('testTools:tools.experimentLab.description'),
      icon: <ExperimentOutlined />,
      path: '/test-tools/experiment-lab',
      status: 'beta'
    }
  ];

  const handleToolClick = (tool: ToolItem) => {
    if (tool.status === 'available') {
      navigate(tool.path);
    } else if (tool.status === 'beta') {
      navigate(tool.path);
    } else {
      // 敬请期待的功能
      console.log(`${tool.title} 功能即将上线`);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'beta':
        return <span style={{ color: '#faad14', fontSize: '12px' }}> ({t('testTools:toolStatus.beta')})</span>;
      case 'coming-soon':
        return <span style={{ color: '#d9d9d9', fontSize: '12px' }}> ({t('testTools:toolStatus.comingSoon')})</span>;
      default:
        return null;
    }
  };

  return (
    <TestToolsContainer>
      <div className="header-section">
        <Title level={2} className="main-title">
          {t('testTools:title')}
        </Title>
        <Paragraph className="main-description">{t('testTools:description')}</Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {tools.map(tool => (
          <Col xs={24} sm={12} lg={8} xl={6} key={tool.key}>
            <Card
              className="tool-card"
              onClick={() => handleToolClick(tool)}
              hoverable={tool.status === 'available' || tool.status === 'beta'}
              style={{
                opacity: tool.status === 'coming-soon' ? 0.6 : 1,
                cursor: tool.status === 'coming-soon' ? 'not-allowed' : 'pointer'
              }}
            >
              <div className="tool-icon">{tool.icon}</div>
              <Title level={4} className="tool-title">
                {tool.title}
                {getStatusBadge(tool.status)}
              </Title>
              <Paragraph className="tool-description">{tool.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </TestToolsContainer>
  );
};

export default TestTools;
