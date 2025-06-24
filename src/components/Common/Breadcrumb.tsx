import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledBreadcrumb = styled(AntBreadcrumb)`
  margin-bottom: 16px;
  
  .ant-breadcrumb-link {
    cursor: pointer;
    
    &:hover {
      color: #1890ff;
    }
  }
`;

interface BreadcrumbItem {
  title: string;
  path?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  const breadcrumbItems = items.map((item, index) => ({
    title: (
      <span 
        onClick={() => handleClick(item.path)}
        style={{ 
          cursor: item.path ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        {item.icon}
        {item.title}
      </span>
    )
  }));

  return <StyledBreadcrumb items={breadcrumbItems} />;
};

export default Breadcrumb;
