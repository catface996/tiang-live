import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Card, Space, Button, Descriptions, Tag, Spin } from 'antd';
import { NodeIndexOutlined, FullscreenOutlined, ZoomInOutlined, ZoomOutOutlined, UndoOutlined, ReloadOutlined } from '@ant-design/icons';
import * as d3 from 'd3';

// 数据接口定义 - 适配 D3RelationshipGraph 的数据结构
interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: string;
  level: number;
  plane: string;
  description: string;
  status: string;
  [key: string]: any;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  type: string;
  strength: number;
}

interface Plane {
  id: string;
  name: string;
  level: number;
  color: string;
  borderColor: string;
  description: string;
}

interface GraphData {
  planes: Plane[];
  nodes: Node[];
  links: Link[];
  metadata: any;
}

// 原始数据接口
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

const TopologyGraph: React.FC<TopologyGraphProps> = ({ 
  entities, 
  dependencies, 
  selectedEntity, 
  onEntitySelect 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: Node } | null>(null);

  // 定义平面配置
  const planes: Plane[] = [
    {
      id: 'business',
      name: '业务层',
      level: 1,
      color: 'rgba(24, 144, 255, 0.1)',
      borderColor: '#1890ff',
      description: '业务应用和服务'
    },
    {
      id: 'service',
      name: '服务层',
      level: 2,
      color: 'rgba(82, 196, 26, 0.1)',
      borderColor: '#52c41a',
      description: '中间件和服务组件'
    },
    {
      id: 'data',
      name: '数据层',
      level: 3,
      color: 'rgba(250, 173, 20, 0.1)',
      borderColor: '#faad14',
      description: '数据存储和处理'
    },
    {
      id: 'infrastructure',
      name: '基础设施层',
      level: 4,
      color: 'rgba(114, 46, 209, 0.1)',
      borderColor: '#722ed1',
      description: '基础设施和网络'
    }
  ];

  // 数据转换函数 - 将原始数据转换为 D3RelationshipGraph 需要的格式
  const transformData = (entities: Entity[], dependencies: Dependency[]): GraphData => {
    // 转换节点数据
    const nodes: Node[] = entities.map(entity => ({
      id: entity.id,
      name: entity.name,
      type: entity.type,
      level: getEntityLevel(entity.type),
      plane: getEntityPlane(entity.type),
      description: `类型: ${entity.type}, 状态: ${entity.status}`,
      status: entity.status,
      ...entity.properties
    }));

    // 转换连线数据
    const links: Link[] = dependencies.map(dep => ({
      source: dep.source,
      target: dep.target,
      type: dep.type,
      strength: dep.strength
    }));

    // 创建元数据
    const metadata = {
      relationTypes: [
        { type: 'depends_on', color: '#1890ff', strokeWidth: 2 },
        { type: 'provides_to', color: '#52c41a', strokeWidth: 2 },
        { type: 'connects_to', color: '#faad14', strokeWidth: 2 }
      ]
    };

    return {
      planes,
      nodes,
      links,
      metadata
    };
  };

  // 根据实体类型确定层级
  const getEntityLevel = (type: string): number => {
    const levelMap: { [key: string]: number } = {
      'application': 1,
      'service': 2,
      'database': 3,
      'network': 4,
      'system': 4
    };
    return levelMap[type] || 2;
  };

  // 根据实体类型确定平面
  const getEntityPlane = (type: string): string => {
    const planeMap: { [key: string]: string } = {
      'application': 'business',
      'service': 'service',
      'database': 'data',
      'network': 'infrastructure',
      'system': 'infrastructure'
    };
    return planeMap[type] || 'service';
  };

  // 颜色映射函数 - 复制自 D3RelationshipGraph
  const getNodeColor = (type: string, level: number) => {
    const levelColors = {
      1: '#1890ff',
      2: '#52c41a',
      3: '#faad14',
      4: '#722ed1'
    };
    return levelColors[level as keyof typeof levelColors] || '#8c8c8c';
  };

  const getLinkColor = (type: string) => {
    const linkColors = {
      depends_on: '#1890ff',
      provides_to: '#52c41a',
      connects_to: '#faad14'
    };
    return linkColors[type as keyof typeof linkColors] || '#d9d9d9';
  };

  const getNodeSize = (level: number) => {
    const sizes = {
      1: 18,
      2: 16,
      3: 14,
      4: 12
    };
    return sizes[level as keyof typeof sizes] || 14;
  };

  // 计算平面边界 - 复制自 D3RelationshipGraph
  const calculatePlaneBounds = (plane: Plane, nodes: Node[], width: number, height: number) => {
    const levelHeight = height / planes.length;
    const planeIndex = plane.level - 1;
    const baseY = planeIndex * levelHeight + 50;
    
    return {
      x: 50,
      y: baseY,
      width: width - 100,
      height: levelHeight - 20,
      rx: 12,
      ry: 12
    };
  };

  // 使用 useMemo 优化数据转换
  const graphData = useMemo(() => {
    if (entities.length === 0) return null;
    return transformData(entities, dependencies);
  }, [entities.length, dependencies.length, entities, dependencies]);

  // 使用 useCallback 优化初始化函数
  const initializeGraph = useCallback(() => {
    if (!svgRef.current || !containerRef.current || !graphData) return;

    setLoading(true);

    const container = containerRef.current;
    const svg = d3.select(svgRef.current);
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 清除之前的内容
    svg.selectAll('*').remove();

    // 设置SVG尺寸
    svg.attr('width', width).attr('height', height);

    // 添加背景点击事件来取消选择
    svg.on('click', (event) => {
      // 只有点击背景时才取消选择
      if (event.target === svg.node()) {
        onEntitySelect(null);
      }
    });

    // 创建缩放行为
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // 创建主容器组
    const g = svg.append('g');

    // 绘制平面矩形框
    const planeRects = g.append('g')
      .attr('class', 'planes')
      .selectAll('g')
      .data(graphData.planes)
      .enter().append('g')
      .attr('class', 'plane');

    planeRects.each(function(plane) {
      const bounds = calculatePlaneBounds(plane, graphData.nodes, width, height);
      if (!bounds) return;

      const planeGroup = d3.select(this);
      
      // 绘制平面背景矩形
      planeGroup.append('rect')
        .attr('x', bounds.x)
        .attr('y', bounds.y)
        .attr('width', bounds.width)
        .attr('height', bounds.height)
        .attr('rx', bounds.rx)
        .attr('ry', bounds.ry)
        .attr('fill', plane.color)
        .attr('stroke', plane.borderColor)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0.3);

      // 添加平面标题
      planeGroup.append('text')
        .attr('x', bounds.x + 20)
        .attr('y', bounds.y + 25)
        .attr('font-size', '16px')
        .attr('font-weight', 'bold')
        .attr('fill', plane.borderColor)
        .text(plane.name);

      // 添加平面描述
      planeGroup.append('text')
        .attr('x', bounds.x + 20)
        .attr('y', bounds.y + 45)
        .attr('font-size', '12px')
        .attr('fill', '#666')
        .text(plane.description);
    });

    // 创建力导向布局，考虑平面约束
    const simulation = d3.forceSimulation<Node>(graphData.nodes)
      .force('link', d3.forceLink<Node, Link>(graphData.links)
        .id(d => d.id)
        .distance(d => {
          const sourceLevel = (d.source as Node).level;
          const targetLevel = (d.target as Node).level;
          const levelDiff = Math.abs(sourceLevel - targetLevel);
          return levelDiff === 1 ? 80 : 120;
        })
        .strength(d => d.strength)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => getNodeSize(d.level) + 8))
      // 添加平面约束力
      .force('plane', () => {
        graphData.nodes.forEach(node => {
          const plane = graphData.planes.find(p => p.id === node.plane);
          if (!plane) return;
          
          const bounds = calculatePlaneBounds(plane, graphData.nodes, width, height);
          if (!bounds) return;

          // 将节点约束在平面范围内
          const padding = 30;
          const minX = bounds.x + padding;
          const maxX = bounds.x + bounds.width - padding;
          const minY = bounds.y + padding + 50;
          const maxY = bounds.y + bounds.height - padding;

          if (node.x! < minX) node.x = minX;
          if (node.x! > maxX) node.x = maxX;
          if (node.y! < minY) node.y = minY;
          if (node.y! > maxY) node.y = maxY;
        });
      });

    // 创建箭头标记
    const defs = g.append('defs');
    
    graphData.metadata.relationTypes.forEach((relType: any) => {
      defs.append('marker')
        .attr('id', `arrow-${relType.type}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 15)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', relType.color);
    });

    // 绘制连线
    const links = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graphData.links)
      .enter().append('line')
      .attr('stroke', d => getLinkColor(d.type))
      .attr('stroke-width', d => {
        const relType = graphData.metadata.relationTypes.find((rt: any) => rt.type === d.type);
        return relType?.strokeWidth || 1;
      })
      .attr('stroke-opacity', 0.8)
      .attr('marker-end', d => `url(#arrow-${d.type})`);

    // 绘制节点
    const nodes = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(graphData.nodes)
      .enter().append('g')
      .attr('class', 'node')
      .call(d3.drag<SVGGElement, Node>()
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
          
          // 确保节点在平面约束范围内
          const plane = graphData.planes.find(p => p.id === d.plane);
          if (plane) {
            const bounds = calculatePlaneBounds(plane, graphData.nodes, width, height);
            if (bounds) {
              const padding = 30;
              const minX = bounds.x + padding;
              const maxX = bounds.x + bounds.width - padding;
              const minY = bounds.y + padding + 50;
              const maxY = bounds.y + bounds.height - padding;

              if (d.fx! < minX) d.fx = minX;
              if (d.fx! > maxX) d.fx = maxX;
              if (d.fy! < minY) d.fy = minY;
              if (d.fy! > maxY) d.fy = maxY;
            }
          }
        })
      );

    // 添加节点圆圈
    nodes.append('circle')
      .attr('r', d => getNodeSize(d.level))
      .attr('fill', d => getNodeColor(d.type, d.level))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer');

    // 添加节点标签
    nodes.append('text')
      .text(d => d.name)
      .attr('x', 0)
      .attr('y', d => getNodeSize(d.level) + 15)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#333')
      .style('pointer-events', 'none');

    // 节点交互事件
    nodes
      .on('mouseover', (event, d) => {
        // 高亮相关节点和连线
        const relatedNodeIds = new Set<string>();
        relatedNodeIds.add(d.id);
        
        graphData.links.forEach(link => {
          const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
          const targetId = typeof link.target === 'string' ? link.target : link.target.id;
          
          if (sourceId === d.id) relatedNodeIds.add(targetId);
          if (targetId === d.id) relatedNodeIds.add(sourceId);
        });

        // 降低非相关节点的透明度
        nodes.style('opacity', node => relatedNodeIds.has(node.id) ? 1 : 0.3);
        links.style('opacity', link => {
          const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
          const targetId = typeof link.target === 'string' ? link.target : link.target.id;
          return (sourceId === d.id || targetId === d.id) ? 1 : 0.1;
        });

        // 显示工具提示
        setTooltip({
          x: event.pageX + 10,
          y: event.pageY - 10,
          content: d
        });
      })
      .on('mouseout', () => {
        // 恢复所有节点和连线的透明度
        nodes.style('opacity', 1);
        links.style('opacity', 0.8);
        setTooltip(null);
      })
      .on('click', (event, d) => {
        // 阻止事件冒泡
        event.stopPropagation();
        
        // 防止重复点击同一个节点
        if (selectedEntity && selectedEntity.id === d.id) {
          return;
        }
        
        // 转换回原始实体格式
        const originalEntity = entities.find(e => e.id === d.id);
        if (originalEntity) {
          // 使用 setTimeout 避免与 D3 事件处理冲突
          setTimeout(() => {
            onEntitySelect(originalEntity);
          }, 0);
        }
      });

    // 更新位置
    simulation.on('tick', () => {
      links
        .attr('x1', d => (d.source as Node).x!)
        .attr('y1', d => (d.source as Node).y!)
        .attr('x2', d => (d.target as Node).x!)
        .attr('y2', d => (d.target as Node).y!);

      nodes.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // 缩放控制函数
    const zoomIn = () => {
      svg.transition().call(zoom.scaleBy, 1.5);
    };

    const zoomOut = () => {
      svg.transition().call(zoom.scaleBy, 1 / 1.5);
    };

    const resetZoom = () => {
      svg.transition().call(zoom.transform, d3.zoomIdentity);
    };

    const resetNodePositions = () => {
      graphData.nodes.forEach(node => {
        node.fx = null;
        node.fy = null;
      });
      simulation.alpha(1).restart();
    };

    // 将控制函数绑定到组件实例
    (svgRef.current as any).zoomIn = zoomIn;
    (svgRef.current as any).zoomOut = zoomOut;
    (svgRef.current as any).resetZoom = resetZoom;
    (svgRef.current as any).resetNodePositions = resetNodePositions;

    setLoading(false);
  }, [graphData, entities, selectedEntity, onEntitySelect]);

  // 图表数据变化时重新初始化 - 添加防抖
  useEffect(() => {
    if (graphData) {
      const timer = setTimeout(() => {
        initializeGraph();
      }, 100); // 100ms 防抖
      
      return () => clearTimeout(timer);
    }
  }, [graphData, initializeGraph]);

  // 选中状态变化时不重新渲染图表，只更新视觉状态
  useEffect(() => {
    if (svgRef.current && graphData) {
      const svg = d3.select(svgRef.current);
      const nodes = svg.selectAll('.node');
      
      // 更新节点选中状态的视觉效果
      nodes.selectAll('circle')
        .attr('stroke-width', (d: any) => {
          return selectedEntity && selectedEntity.id === d.id ? 4 : 2;
        })
        .attr('stroke', (d: any) => {
          return selectedEntity && selectedEntity.id === d.id ? '#ff4d4f' : '#fff';
        });
    }
  }, [selectedEntity, graphData]);

  // 控制函数
  const handleZoomIn = () => {
    (svgRef.current as any)?.zoomIn?.();
  };

  const handleZoomOut = () => {
    (svgRef.current as any)?.zoomOut?.();
  };

  const handleResetZoom = () => {
    (svgRef.current as any)?.resetZoom?.();
  };

  const handleResetPositions = () => {
    (svgRef.current as any)?.resetNodePositions?.();
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="content-right">
      <div className="topology-header-bar">
        <Space>
          <NodeIndexOutlined />
          拓扑关系图
        </Space>
        <Space>
          <Button size="small" icon={<ZoomInOutlined />} onClick={handleZoomIn} />
          <Button size="small" icon={<ZoomOutOutlined />} onClick={handleZoomOut} />
          <Button size="small" icon={<UndoOutlined />} onClick={handleResetZoom} />
          <Button size="small" icon={<ReloadOutlined />} onClick={handleResetPositions} />
          <Button size="small" icon={<FullscreenOutlined />} onClick={handleFullscreen} />
        </Space>
      </div>

      <div className="topology-canvas" ref={containerRef}>
        <Spin spinning={loading}>
          <svg ref={svgRef}></svg>
        </Spin>
      </div>

      {/* 工具提示 */}
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            pointerEvents: 'none',
            zIndex: 1000,
            maxWidth: '200px'
          }}
        >
          <div><strong>{tooltip.content.name}</strong></div>
          <div>类型: {tooltip.content.type}</div>
          <div>状态: {tooltip.content.status}</div>
          <div>层级: L{tooltip.content.level}</div>
          {tooltip.content.description && (
            <div>描述: {tooltip.content.description}</div>
          )}
        </div>
      )}

      {/* 选中实体的详细信息 */}
      {selectedEntity && (
        <div className="entity-details">
          <Card size="small" title={`实体详情: ${selectedEntity.name}`}>
            <Descriptions size="small" column={2}>
              <Descriptions.Item label="ID">{selectedEntity.id}</Descriptions.Item>
              <Descriptions.Item label="类型">{selectedEntity.type}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={selectedEntity.status === 'active' ? 'green' : 'orange'}>
                  {selectedEntity.status}
                </Tag>
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
