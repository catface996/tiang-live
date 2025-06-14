import React from 'react';
import { Card, Empty, Spin } from 'antd';
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
  background: #fafafa;
  border-radius: 8px;
  padding: 32px;
  margin: 24px 0;
  min-height: 400px;
`;

const PlaneLevel = styled.div`
  margin-bottom: 32px;
  
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
      <Card title="平面拓扑结构">
        <TopologyContainer>
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <Spin size="large" />
            <div style={{ marginTop: 16 }}>加载平面拓扑中...</div>
          </div>
        </TopologyContainer>
      </Card>
    );
  }

  if (planes.length === 0) {
    return (
      <Card title="平面拓扑结构">
        <TopologyContainer>
          <Empty 
            description="暂无平面数据"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </TopologyContainer>
      </Card>
    );
  }

  return (
    <Card title="平面拓扑结构">
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
