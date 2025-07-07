import React from 'react';
import { ArrowDownOutlined, BranchesOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import type { PlaneDefinition, PlaneRelationship } from '../../types';
import { getPrimaryColorById } from '../../utils/planeColors';

interface MultipleDependencyArrowsProps {
  currentPlane: PlaneDefinition;
  allPlanes: PlaneDefinition[];
  relationships: PlaneRelationship[];
  animated?: boolean;
}

const ArrowContainer = styled.div<{ $animated: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
  position: relative;
`;

const MainArrow = styled.div<{ $animated: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  
  .arrow-icon {
    font-size: 24px;
    color: #1890ff;
    ${props => props.$animated && `
      animation: bounce 2s infinite;
    `}
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

const DependencyInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  max-width: 300px;
`;

const DependencyTag = styled.div<{ $planeId: string; $strength: string }>`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  color: white;
  background: ${props => getPrimaryColorById(props.$planeId)};
  opacity: ${props => {
    switch (props.$strength) {
      case 'critical': return 1;
      case 'strong': return 0.9;
      case 'medium': return 0.8;
      case 'weak': return 0.7;
      default: return 0.8;
    }
  }};
  white-space: nowrap;
  border: 1px solid ${props => getPrimaryColorById(props.$planeId)};
`;

const getRelationshipStrength = (relationship: PlaneRelationship): string => {
  return relationship.properties?.strength || 'medium';
};

const getRelationshipDescription = (relationship: PlaneRelationship): string => {
  return relationship.properties?.description || '支撑关系';
};

const MultipleDependencyArrows: React.FC<MultipleDependencyArrowsProps> = ({
  currentPlane,
  allPlanes,
  relationships,
  animated = true
}) => {
  // 获取当前平面的所有依赖关系（当前平面作为源，依赖其他平面）
  const currentDependencies = relationships.filter(rel => 
    rel.sourceId === currentPlane.id
  );

  if (currentDependencies.length === 0) {
    return null;
  }

  // 按依赖强度排序
  const sortedDependencies = currentDependencies.sort((a, b) => {
    const strengthOrder = { critical: 4, strong: 3, medium: 2, weak: 1 };
    const aStrength = strengthOrder[getRelationshipStrength(a) as keyof typeof strengthOrder] || 0;
    const bStrength = strengthOrder[getRelationshipStrength(b) as keyof typeof strengthOrder] || 0;
    return bStrength - aStrength;
  });

  return (
    <ArrowContainer $animated={animated}>
      <MainArrow $animated={animated}>
        {currentDependencies.length > 1 ? (
          <Tooltip title={`${currentPlane.displayName} 依赖 ${currentDependencies.length} 个平面`}>
            <BranchesOutlined className="arrow-icon" />
          </Tooltip>
        ) : (
          <ArrowDownOutlined className="arrow-icon" />
        )}
      </MainArrow>
      
      <DependencyInfo>
        {sortedDependencies.map((relationship) => {
          const targetPlane = allPlanes.find(p => p.id === relationship.targetId);
          const strength = getRelationshipStrength(relationship);
          const description = getRelationshipDescription(relationship);
          
          return (
            <Tooltip 
              key={relationship.id}
              title={`${currentPlane.displayName} → ${targetPlane?.displayName}: ${description}`}
            >
              <DependencyTag $planeId={relationship.targetId} $strength={strength}>
                {targetPlane?.displayName || relationship.targetId}
              </DependencyTag>
            </Tooltip>
          );
        })}
      </DependencyInfo>
    </ArrowContainer>
  );
};

export default MultipleDependencyArrows;
