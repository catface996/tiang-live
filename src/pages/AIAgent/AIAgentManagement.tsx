import React from 'react';
import { Typography, Card } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const AIAgentManagement: React.FC = () => {
  return (
    <div>
      <PageHeader>
        <Title level={2}>AI智能体管理</Title>
      </PageHeader>
      
      <Card>
        <p>AI智能体管理功能正在开发中...</p>
      </Card>
    </div>
  );
};

export default AIAgentManagement;
