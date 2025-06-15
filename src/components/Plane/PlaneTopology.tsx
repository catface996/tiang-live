import React from 'react';
import { Card, Empty, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import type { PlaneDefinition, PlaneRelationship } from '../../types';
import PlaneCard from './PlaneCard';
import MultipleDependencyArrows from './MultipleDependencyArrows';

interface PlaneTopologyProps {
  planes: PlaneDefinition[];
  relationships: PlaneRelationship[];
  loading?: boolean;
  onPlaneAction: (action: 'view' | 'edit' | 'add', planeId: string) => void;
}

const TopologyContainer = styled.div`
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  min-height: 400px;
  transition: all 0.3s ease;
`;

const PlaneLevel = styled.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const PlaneTopology: React.FC<PlaneTopologyProps> = ({
  planes,
  relationships,
  loading = false,
  onPlaneAction,
}) => {
  const { t } = useTranslation();
  
  // 按层级排序平面 - 层级数字越大越在顶层显示
  const sortedPlanes = [...planes].sort((a, b) => b.level - a.level);

  // 检查是否有下一个层级的平面（层级数字更小的）
  const hasNextLevel = (currentLevel: number): boolean => {
    return sortedPlanes.some(plane => plane.level === currentLevel - 1);
  };

  // 获取平面的依赖关系
  const getPlaneDependencies = (planeId: string): PlaneRelationship[] => {
    return relationships.filter(rel => rel.targetId === planeId);
  };

  if (loading) {
    return (
      <Card title={t('planes.topology.title')}>
        <TopologyContainer>
          <div className="loading-container">
            <Spin size="large" />
            <div className="loading-text">{t('planes.loading.topology')}</div>
          </div>
        </TopologyContainer>
      </Card>
    );
  }

  if (planes.length === 0) {
    return (
      <Card title={t('planes.topology.title')}>
        <TopologyContainer>
          <Empty 
            description={t('planes.loading.noPlaneData')}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </TopologyContainer>
      </Card>
    );
  }

  return (
    <Card title={t('planes.topology.title')}>
      <TopologyContainer>
        {sortedPlanes.map((plane, index) => {
          return (
            <PlaneLevel key={plane.id}>
              <PlaneCard
                plane={plane}
                onAction={onPlaneAction}
              />
              
              {/* 如果有下一个层级（层级数字更小），显示多重依赖箭头 */}
              {hasNextLevel(plane.level) && (
                <MultipleDependencyArrows
                  currentPlane={plane}
                  allPlanes={sortedPlanes}
                  relationships={relationships}
                  animated={true}
                />
              )}
            </PlaneLevel>
          );
        })}
      </TopologyContainer>
    </Card>
  );
};

export default PlaneTopology;
