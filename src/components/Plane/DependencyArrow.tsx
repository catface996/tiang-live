import React from 'react';
import { ArrowDownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import type { PlaneRelationship } from '../../types';

interface DependencyArrowProps {
  relationship?: PlaneRelationship;
  animated?: boolean;
}

const ArrowContainer = styled.div<{ $animated: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
  position: relative;
  
  .arrow-icon {
    font-size: 24px;
    color: #1890ff;
    ${props => props.$animated && `
      animation: bounce 2s infinite;
    `}
  }
  
  .relationship-label {
    position: absolute;
    right: -80px;
    background: #f0f0f0;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: #666;
    white-space: nowrap;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const getRelationshipLabel = (type: string) => {
  switch (type) {
    case 'DEPENDS_ON':
      return '依赖于';
    case 'CONTAINS':
      return '支撑';
    case 'REFERENCES':
      return '引用';
    default:
      return '支撑';
  }
};

const DependencyArrow: React.FC<DependencyArrowProps> = ({ 
  relationship, 
  animated = true 
}) => {
  return (
    <ArrowContainer $animated={animated}>
      <ArrowDownOutlined className="arrow-icon" />
      {relationship && (
        <div className="relationship-label">
          {getRelationshipLabel(relationship.type)}
        </div>
      )}
    </ArrowContainer>
  );
};

export default DependencyArrow;
