import React from 'react';
import { Typography, Card } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const RelationshipGraph: React.FC = () => {
  return (
    <div>
      <PageHeader>
        <Title level={2}>关系图谱</Title>
      </PageHeader>
      
      <Card>
        <p>关系图谱功能正在开发中...</p>
      </Card>
    </div>
  );
};

export default RelationshipGraph;
