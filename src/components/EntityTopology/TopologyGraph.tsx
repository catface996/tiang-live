import React, { useEffect, useRef, useCallback } from 'react';
import { Card, Space, Button, Descriptions, Tag } from 'antd';
import { NodeIndexOutlined, FullscreenOutlined } from '@ant-design/icons';
import * as d3 from 'd3';

interface Entity {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'warning' | 'error';
  properties: Record<string, unknown>;
  connections: number;
}

interface Dependency {
  id: string;
  source: string;
  target: string;
  type: 'depends_on' | 'provides_to' | 'connects_to';
  strength: number;
  description?: string;
}

interface TopologyGraphProps {
  entities: Entity[];
  dependencies: Dependency[];
  selectedEntity: Entity | null;
  onEntitySelect: (entity: Entity | null) => void;
}

const TopologyGraph: React.FC<TopologyGraphProps> = ({ entities, dependencies, selectedEntity, onEntitySelect }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // D3.js 拓扑图渲染
  const initializeGraph = useCallback(() => {
    if (!entities.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 600;
    const height = 400;

    svg.attr('width', width).attr('height', height);

    // 创建数据的深拷贝，避免D3修改原始数据
    const entitiesForD3 = entities.map(entity => ({ ...entity }));
    const dependenciesForD3 = dependencies.map(dep => ({ ...dep }));

    // 计算节点的层级（基于依赖关系）
    const calculateNodeLevels = () => {
      const levels: { [key: string]: number } = {};
      const visited = new Set<string>();
      const visiting = new Set<string>();

      const dfs = (nodeId: string): number => {
        if (visiting.has(nodeId)) {
          return 0;
        }
        if (visited.has(nodeId)) {
          return levels[nodeId] || 0;
        }

        visiting.add(nodeId);
        let maxLevel = 0;

        const deps = dependenciesForD3.filter(dep => dep.target === nodeId);

        for (const dep of deps) {
          const sourceLevel = dfs(dep.source);
          maxLevel = Math.max(maxLevel, sourceLevel + 1);
        }

        visiting.delete(nodeId);
        visited.add(nodeId);
        levels[nodeId] = maxLevel;

        return maxLevel;
      };

      entitiesForD3.forEach(entity => {
        if (!visited.has(entity.id)) {
          dfs(entity.id);
        }
      });

      return levels;
    };

    const nodeLevels = calculateNodeLevels();
    const maxLevel = Math.max(...Object.values(nodeLevels));

    // 为节点设置初始位置（按层级排列）
    entitiesForD3.forEach((entity: d3.SimulationNodeDatum & Entity) => {
      const level = nodeLevels[entity.id] || 0;
      const nodesAtLevel = entitiesForD3.filter(e => (nodeLevels[e.id] || 0) === level);
      const indexAtLevel = nodesAtLevel.findIndex(e => e.id === entity.id);

      entity.x = (width / (maxLevel + 1)) * (level + 1);
      entity.y = (height / (nodesAtLevel.length + 1)) * (indexAtLevel + 1);
      entity.fx = entity.x;
    });

    // 创建主容器组
    const g = svg.append('g');

    // 创建箭头标记
    const defs = g.append('defs');
    defs
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#1890ff');

    // 创建力导向布局
    const simulation = d3
      .forceSimulation<d3.SimulationNodeDatum & Entity>(entitiesForD3)
      .force(
        'link',
        d3
          .forceLink<d3.SimulationNodeDatum & Entity, d3.SimulationLinkDatum<d3.SimulationNodeDatum & Entity>>(
            dependenciesForD3
          )
          .id(d => d.id)
          .distance(80)
          .strength(0.5)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('collision', d3.forceCollide().radius(25))
      .force('y', d3.forceY().strength(0.1));

    // 绘制连接线
    const links = g
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(dependenciesForD3)
      .enter()
      .append('line')
      .attr('stroke', '#1890ff')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 1)
      .attr('marker-end', 'url(#arrowhead)');

    // 绘制节点
    const nodes = g
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(entitiesForD3)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .call(
        d3
          .drag<SVGGElement, d3.SimulationNodeDatum & Entity>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            // 保持x坐标固定，只允许y方向移动
            d.fx = (width / (maxLevel + 1)) * ((nodeLevels[d.id] || 0) + 1);
            d.fy = null;
          })
      );

    // 添加节点圆圈
    nodes
      .append('circle')
      .attr('r', 20)
      .attr('fill', d => {
        switch (d.status) {
          case 'active':
            return '#52c41a';
          case 'warning':
            return '#faad14';
          case 'error':
            return '#ff4d4f';
          default:
            return '#d9d9d9';
        }
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // 添加节点标签
    nodes
      .append('text')
      .text(d => d.name)
      .attr('x', 0)
      .attr('y', 35)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('fill', '#333')
      .style('pointer-events', 'none')
      .style('font-weight', 'bold');

    // 添加层级标签
    g.append('g')
      .attr('class', 'level-labels')
      .selectAll('text.level-label')
      .data(Array.from({ length: maxLevel + 1 }, (_, i) => i))
      .enter()
      .append('text')
      .attr('class', 'level-label')
      .text(d => `L${d}`)
      .attr('x', d => (width / (maxLevel + 1)) * (d + 1))
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#999')
      .style('font-weight', 'bold');

    // 节点点击事件
    nodes.on('click', (event, d) => {
      const originalEntity = entities.find(e => e.id === d.id);
      if (originalEntity) {
        onEntitySelect(originalEntity);
      }
    });

    // 更新位置
    simulation.on('tick', () => {
      links
        .attr('x1', d => (d.source as d3.SimulationNodeDatum).x || 0)
        .attr('y1', d => (d.source as d3.SimulationNodeDatum).y || 0)
        .attr('x2', d => (d.target as d3.SimulationNodeDatum).x || 0)
        .attr('y2', d => (d.target as d3.SimulationNodeDatum).y || 0);

      nodes.attr('transform', d => `translate(${d.x || 0},${d.y || 0})`);
    });
  }, [entities, dependencies, onEntitySelect]);

  useEffect(() => {
    initializeGraph();
  }, [initializeGraph]);

  return (
    <div className="content-right">
      <div className="topology-header-bar">
        <Space>
          <NodeIndexOutlined />
          拓扑关系图
          <Button
            size="small"
            icon={<FullscreenOutlined />}
            onClick={() => {
              // TODO: 实现全屏功能
            }}
          >
            全屏
          </Button>
        </Space>
      </div>

      <div className="topology-canvas">
        <svg ref={svgRef}></svg>
      </div>

      {/* 选中实体的详细信息 */}
      {selectedEntity && (
        <div className="entity-details">
          <Card size="small" title={`实体详情: ${selectedEntity.name}`}>
            <Descriptions size="small" column={2}>
              <Descriptions.Item label="ID">{selectedEntity.id}</Descriptions.Item>
              <Descriptions.Item label="类型">{selectedEntity.type}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={selectedEntity.status === 'active' ? 'green' : 'orange'}>{selectedEntity.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="连接数">{selectedEntity.connections}</Descriptions.Item>
              {Object.entries(selectedEntity.properties).map(([key, value]) => (
                <Descriptions.Item key={key} label={key}>
                  {String(value)}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TopologyGraph;
