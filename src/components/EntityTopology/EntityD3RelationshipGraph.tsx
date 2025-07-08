import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Card, Spin, Alert, Space, Tag, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  FullscreenOutlined,
  ReloadOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  UndoOutlined,
  UpOutlined,
  DownOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import entityTopologyData from '../../data/entityTopologyMock.json';
import { type LegacyEntity, type LegacyDependency } from '../../utils/apiTypeConverter';

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
  bounds: {
    minLevel: number;
    maxLevel: number;
  };
}

interface GraphData {
  planes: Plane[];
  nodes: Node[];
  links: Link[];
  metadata: any;
}

const GraphContainer = styled.div`
  width: 100%;
  height: 800px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  position: relative;
  background-color: var(--background-color);
  overflow: hidden;
`;

const ControlPanel = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 8px;
  box-shadow: var(--card-shadow);
`;

const LegendContainer = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  box-shadow: var(--card-shadow);
  max-width: 300px;
  transition: all 0.3s ease;
`;

const LegendHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: var(--hover-bg);
  }
`;

const LegendContent = styled.div<{ collapsed: boolean }>`
  padding: ${props => (props.collapsed ? '0' : '12px')};
  max-height: ${props => (props.collapsed ? '0' : '400px')};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const TooltipContainer = styled.div`
  position: absolute;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 12px;
  box-shadow: var(--card-shadow);
  pointer-events: none;
  z-index: 20;
  max-width: 250px;
  font-size: 12px;
  line-height: 1.4;
`;

interface EntityD3RelationshipGraphProps {
  onNodeSelect?: (node: Node | null) => void;
  entities?: LegacyEntity[];
  dependencies?: LegacyDependency[];
}

const EntityD3RelationshipGraph: React.FC<EntityD3RelationshipGraphProps> = ({
  onNodeSelect,
  entities,
  dependencies
}) => {
  const { t } = useTranslation(['entityTopology', 'common']);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: any } | null>(null);
  const [legendCollapsed, setLegendCollapsed] = useState(true); // 默认折叠

  // 颜色映射
  const getNodeColor = (type: string, level: number) => {
    // Agent类型使用特殊颜色
    if (type === 'agent') {
      return '#722ed1'; // 紫色，表示AI智能
    }

    const levelColors = {
      1: '#1890ff', // 前端应用层 - 蓝色
      2: '#52c41a', // 业务服务层 - 绿色
      3: '#722ed1', // 中间件层 - 紫色
      4: '#faad14', // 数据存储层 - 橙色
      5: '#5F9EA0' // 基础设施层 - 黛青色
    };
    return levelColors[level as keyof typeof levelColors] || '#8c8c8c';
  };

  const getLinkColor = (type: string) => {
    const linkColors = {
      depends_on: '#1890ff',
      routes_to: '#52c41a',
      uses: '#722ed1',
      stores_in: '#faad14',
      runs_on: '#f5222d',
      publishes_to: '#13c2c2',
      subscribes_to: '#eb2f96',
      monitors: '#8c8c8c',
      manages: '#722ed1' // Agent管理连接使用紫色
    };
    return linkColors[type as keyof typeof linkColors] || '#d9d9d9';
  };

  const getNodeSize = (level: number, type?: string) => {
    // Agent节点使用特殊大小
    if (type === 'agent') {
      return 22; // Agent节点稍大一些，突出显示
    }

    const sizes = {
      1: 20, // 前端应用 - 最大
      2: 18, // 业务服务
      3: 16, // 中间件
      4: 14, // 数据存储
      5: 12 // 基础设施 - 最小
    };
    return sizes[level as keyof typeof sizes] || 14;
  };

  // Calculate plane bounding boxes
  const calculatePlaneBounds = (plane: Plane, nodes: Node[], width: number, height: number) => {
    const planeNodes = nodes.filter(node => node.plane === plane.id);
    if (planeNodes.length === 0) return null;

    // 动态计算平面高度，基于实际平面数量
    const totalPlanes = graphData?.planes.length || 1;
    const levelHeight = height / totalPlanes;
    
    // 找到当前平面在排序后数组中的索引位置（降序排列）
    const sortedPlanes = graphData?.planes || [];
    const planeIndex = sortedPlanes.findIndex(p => p.id === plane.id);
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

  // 初始化图表
  const initializeGraph = () => {
    if (!svgRef.current || !containerRef.current || !graphData) return;

    const container = containerRef.current;
    const svg = d3.select(svgRef.current);
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 清除之前的内容
    svg.selectAll('*').remove();

    // 设置SVG尺寸
    svg.attr('width', width).attr('height', height);

    // 创建缩放行为
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on('zoom', event => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // 创建主容器组
    const g = svg.append('g');

    // 绘制平面矩形框
    const planeRects = g
      .append('g')
      .attr('class', 'planes')
      .selectAll('g')
      .data(graphData.planes)
      .enter()
      .append('g')
      .attr('class', 'plane');

    planeRects.each(function (plane) {
      const bounds = calculatePlaneBounds(plane, graphData.nodes, width, height);
      if (!bounds) return;

      const planeGroup = d3.select(this);

      // 绘制平面背景矩形
      planeGroup
        .append('rect')
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
      planeGroup
        .append('text')
        .attr('x', bounds.x + 20)
        .attr('y', bounds.y + 25)
        .attr('font-size', '16px')
        .attr('font-weight', 'bold')
        .attr('fill', plane.borderColor)
        .text(plane.name);

      // 添加平面描述
      planeGroup
        .append('text')
        .attr('x', bounds.x + 20)
        .attr('y', bounds.y + 45)
        .attr('font-size', '12px')
        .attr('fill', 'var(--text-secondary)')
        .text(plane.description);
    });

    // 创建力导向布局，考虑平面约束
    const simulation = d3
      .forceSimulation<Node>(graphData.nodes)
      .force(
        'link',
        d3
          .forceLink<Node, Link>(graphData.links)
          .id(d => d.id)
          .distance(d => {
            const sourceLevel = (d.source as Node).level;
            const targetLevel = (d.target as Node).level;
            const levelDiff = Math.abs(sourceLevel - targetLevel);
            return levelDiff === 1 ? 80 : 120; // 相邻层级距离更近
          })
          .strength(d => d.strength)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'collision',
        d3.forceCollide().radius(d => getNodeSize(d.level, d.type) + 8)
      )
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
          const minY = bounds.y + padding + 50; // 留出标题空间
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
      defs
        .append('marker')
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
    const links = g
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graphData.links)
      .enter()
      .append('line')
      .attr('stroke', d => getLinkColor(d.type))
      .attr('stroke-width', d => {
        const relType = graphData.metadata.relationTypes.find((rt: any) => rt.type === d.type);
        return relType?.strokeWidth || 1;
      })
      .attr('stroke-opacity', 0.8)
      .attr('stroke-dasharray', d => (d.type === 'manages' ? '5,5' : null)) // Agent连接使用虚线
      .attr('marker-end', d => `url(#arrow-${d.type})`);

    // 绘制节点
    const nodes = g
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(graphData.nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .call(
        d3
          .drag<SVGGElement, Node>()
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
                const minY = bounds.y + padding + 50; // 留出标题空间
                const maxY = bounds.y + bounds.height - padding;

                // 约束节点位置在平面范围内
                if (d.fx! < minX) d.fx = minX;
                if (d.fx! > maxX) d.fx = maxX;
                if (d.fy! < minY) d.fy = minY;
                if (d.fy! > maxY) d.fy = maxY;
              }
            }
          })
      );

    // 添加节点圆圈
    nodes
      .append('circle')
      .attr('r', d => getNodeSize(d.level, d.type))
      .attr('fill', d => getNodeColor(d.type, d.level))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer');

    // 为Agent节点添加机器人图标
    nodes
      .filter(d => d.type === 'agent')
      .append('text')
      .text('🤖') // 使用emoji作为机器人图标
      .attr('x', 0)
      .attr('y', 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', d => getNodeSize(d.level, d.type) * 0.8)
      .style('pointer-events', 'none');

    // 添加节点标签
    nodes
      .append('text')
      .text(d => d.name)
      .attr('x', 0)
      .attr('y', d => getNodeSize(d.level, d.type) + 15)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', 'var(--text-color)')
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
        nodes.style('opacity', node => (relatedNodeIds.has(node.id) ? 1 : 0.3));
        links.style('opacity', link => {
          const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
          const targetId = typeof link.target === 'string' ? link.target : link.target.id;
          return sourceId === d.id || targetId === d.id ? 1 : 0.1;
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
        setSelectedNode(d);
        onNodeSelect?.(d);
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
      // 重置所有节点的固定位置，恢复自动布局
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
  };

  // 转换外部数据为图表数据格式
  const convertToGraphData = (entities: Entity[], dependencies: Dependency[]): GraphData => {
    // 首先转换实体数据，直接使用实体的平面信息
    const nodes: Node[] = entities.map(entity => {
      // 直接使用实体的平面信息
      const plane = entity.plane?.id || 'default_plane';
      // 将平面level从字符串转换为数字（L1->1, L2->2, L3->3, L4->4）
      const level = entity.plane?.level ? parseInt(entity.plane.level.replace('L', '')) : 1;

      return {
        id: entity.id,
        name: entity.name,
        type: entity.type,
        level,
        plane,
        description: entity.description || `${entity.name} - ${entity.type}`,
        status: entity.status,
        ...entity.properties
      };
    });

    // 根据实体统计实际使用的平面
    const usedPlaneMap = new Map<string, Plane>();
    entities.forEach(entity => {
      if (entity.plane) {
        usedPlaneMap.set(entity.plane.id, entity.plane);
      }
    });

    console.log('📊 实体平面统计详情:', {
      totalEntities: entities.length,
      entitiesWithPlane: entities.filter(e => e.plane).length,
      entitiesWithoutPlane: entities.filter(e => !e.plane).length,
      entityPlaneDetails: entities.map(entity => ({
        entityId: entity.id,
        entityName: entity.name,
        entityType: entity.type,
        hasPlane: !!entity.plane,
        planeId: entity.plane?.id || 'N/A',
        planeName: entity.plane?.name || 'N/A',
        planeLevel: entity.plane?.level || 'N/A',
        planeType: entity.plane?.type || 'N/A'
      })),
      uniquePlanes: Array.from(usedPlaneMap.values()).map(plane => ({
        id: plane.id,
        name: plane.name,
        level: plane.level,
        type: plane.type,
        entityCount: entities.filter(e => e.plane?.id === plane.id).length
      }))
    });

    // 转换为图表需要的平面格式，并按level降序排序
    const planes: Plane[] = Array.from(usedPlaneMap.values())
      .map(plane => ({
        id: plane.id,
        name: plane.name,
        level: parseInt(plane.level.replace('L', '')), // 转换L1->1, L2->2等
        color: getPlaneColor(plane.level),
        borderColor: getPlaneBorderColor(plane.level),
        description: `${plane.name} (${plane.type})`,
        bounds: { minLevel: 1, maxLevel: 5 }
      }))
      .sort((a, b) => b.level - a.level); // 按层级降序排序 (L4->L3->L2->L1)

    // 如果没有实体，至少显示一个默认平面
    if (planes.length === 0) {
      planes.push({
        id: 'default_plane',
        name: '默认平面',
        level: 1,
        color: '#e6f7ff',
        borderColor: '#1890ff',
        description: '默认平面',
        bounds: { minLevel: 1, maxLevel: 1 }
      });
    }

    // 转换依赖关系为链接
    const links: Link[] = dependencies.map(dep => ({
      source: dep.source,
      target: dep.target,
      type: dep.type,
      strength: dep.strength
    }));

    // 根据实际数据动态生成元数据
    const metadata = {
      // 根据实际平面生成层级信息
      levels: planes.map(plane => ({
        level: plane.level,
        name: plane.name,
        color: plane.borderColor
      })),
      // 根据实际依赖关系生成关系类型信息
      relationTypes: Array.from(new Set(dependencies.map(dep => dep.type))).map(type => ({
        type,
        description: getRelationTypeDescription(type),
        color: getRelationTypeColor(type),
        strokeWidth: 2
      })),
      planesUsed: planes.length,
      totalNodes: nodes.length,
      totalLinks: links.length
    };

    console.log('🎯 根据实体平面信息动态生成图数据:', {
      totalEntities: entities.length,
      usedPlanes: planes.map(p => ({ id: p.id, name: p.name, level: p.level })),
      planesSortOrder: planes.map((p, index) => ({ 
        index, 
        level: p.level, 
        name: p.name,
        displayOrder: `第${index + 1}个显示` 
      })),
      nodesPerPlane: planes.map(plane => ({
        plane: plane.name,
        count: nodes.filter(n => n.plane === plane.id).length
      })),
      relationTypes: metadata.relationTypes.map(rt => rt.type)
    });

    return { planes, nodes, links, metadata };
  };

  // 获取关系类型描述
  const getRelationTypeDescription = (type: string): string => {
    switch (type) {
      case 'depends_on': return '依赖于';
      case 'provides_to': return '提供给';
      case 'connects_to': return '连接到';
      default: return type;
    }
  };

  // 获取关系类型颜色
  const getRelationTypeColor = (type: string): string => {
    switch (type) {
      case 'depends_on': return '#1890ff';
      case 'provides_to': return '#52c41a';
      case 'connects_to': return '#faad14';
      default: return '#666666';
    }
  };

  // 根据平面层级获取颜色
  const getPlaneColor = (level: string): string => {
    switch (level) {
      case 'L1': return '#e6f7ff';
      case 'L2': return '#f9f0ff';
      case 'L3': return '#f0f8f8';
      case 'L4': return '#fff7e6';
      case 'L5': return '#f6ffed';
      default: return '#e6f7ff';
    }
  };

  // 根据平面层级获取边框颜色
  const getPlaneBorderColor = (level: string): string => {
    switch (level) {
      case 'L1': return '#1890ff';
      case 'L2': return '#722ed1';
      case 'L3': return '#5F9EA0';
      case 'L4': return '#faad14';
      case 'L5': return '#52c41a';
      default: return '#1890ff';
    }
  };

  // 加载数据
  useEffect(() => {
    try {
      setLoading(true);

      if (entities && dependencies) {
        // 使用外部传入的数据
        const convertedData = convertToGraphData(entities, dependencies);
        setGraphData(convertedData);
      } else {
        // 使用默认的模拟数据
        setGraphData(entityTopologyData as GraphData);
      }

      setError(null);
    } catch (err) {
      setError('Failed to load entity topology data');
    } finally {
      setLoading(false);
    }
  }, [entities, dependencies]); // 依赖于外部数据变化

  // 初始化图表
  useEffect(() => {
    if (graphData && !loading) {
      const timer = setTimeout(() => {
        initializeGraph();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [graphData, loading]);

  // 窗口大小变化时重新绘制
  useEffect(() => {
    const handleResize = () => {
      if (graphData && !loading) {
        initializeGraph();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [graphData, loading]);

  const handleZoomIn = () => {
    (svgRef.current as any)?.zoomIn?.();
  };

  const handleZoomOut = () => {
    (svgRef.current as any)?.zoomOut?.();
  };

  const handleResetZoom = () => {
    (svgRef.current as any)?.resetZoom?.();
  };

  const handleResetNodePositions = () => {
    (svgRef.current as any)?.resetNodePositions?.();
  };

  const handleRefresh = () => {
    initializeGraph();
  };

  const handleAnalysisDiagnosis = async () => {
    console.log('🔍 开始分析诊断...');

    // 使用实际传入的entities和dependencies数据
    const actualEntities = entities || [];
    const actualDependencies = dependencies || [];

    // 分离实体和Agent
    const entityList = actualEntities.filter(entity => entity.type !== 'agent');
    const agentList = actualEntities.filter(entity => entity.type === 'agent');

    // 分离实体依赖关系和实体与Agent的关系
    const entityDependencies = actualDependencies.filter(dep => {
      const sourceIsAgent = agentList.some(agent => agent.id === dep.source);
      const targetIsAgent = agentList.some(agent => agent.id === dep.target);
      // 只有当源和目标都不是Agent时，才是实体依赖关系
      return !sourceIsAgent && !targetIsAgent;
    });

    const entityAgentRelations = actualDependencies.filter(dep => {
      const sourceIsAgent = agentList.some(agent => agent.id === dep.source);
      const targetIsAgent = agentList.some(agent => agent.id === dep.target);
      // 当源或目标有一个是Agent时，就是实体与Agent的关系
      return sourceIsAgent || targetIsAgent;
    });

    // 构建分析数据
    const analysisData = {
      timestamp: new Date().toISOString(),
      topologyId: 'topology-' + Date.now(),
      entities: entityList.map(entity => ({
        id: entity.id,
        name: entity.name,
        type: entity.type,
        status: entity.status,
        connections: entity.connections,
        properties: entity.properties
      })),
      agents: agentList.map(agent => ({
        id: agent.id,
        name: agent.name,
        type: agent.type,
        status: agent.status,
        agentType: agent.properties?.agentType || 'unknown',
        capabilities: agent.properties?.capabilities || [],
        version: agent.properties?.version || 'unknown',
        lastActive: agent.properties?.lastActive || new Date().toISOString(),
        description: agent.properties?.description || ''
      })),
      entityDependencies: entityDependencies.map(dep => ({
        id: dep.id,
        source: dep.source,
        target: dep.target,
        type: dep.type,
        strength: dep.strength,
        description: dep.description
      })),
      entityAgentRelations: entityAgentRelations.map(relation => ({
        id: relation.id,
        entityId: relation.type === 'manages' ? relation.target : relation.source,
        agentId: relation.type === 'manages' ? relation.source : relation.target,
        relationType: relation.type,
        strength: relation.strength,
        description: relation.description,
        createdAt: new Date().toISOString()
      })),
      analysisRequest: {
        checkHealthStatus: true,
        detectAnomalies: true,
        performanceAnalysis: true,
        securityCheck: true,
        dependencyAnalysis: true,
        agentEfficiencyAnalysis: true
      }
    };

    console.log('📊 准备发送的分析数据:', analysisData);

    try {
      // 模拟发送到后端API
      console.log('🚀 模拟发送POST请求到: /api/v1/topology/analysis');
      console.log('📤 请求头:', {
        'Content-Type': 'application/json',
        Authorization: 'Bearer <token>',
        'X-Request-ID': 'req-' + Date.now()
      });
      console.log('📦 请求体:', JSON.stringify(analysisData, null, 2));

      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 根据实际数据生成更准确的模拟响应
      const activeEntities = entityList.filter(entity => entity.status === 'active');
      const warningEntities = entityList.filter(entity => entity.status === 'warning');
      const errorEntities = entityList.filter(entity => entity.status === 'error');
      const activeAgents = agentList.filter(agent => agent.status === 'active');

      // 模拟后端响应
      const mockResponse = {
        success: true,
        requestId: 'req-' + Date.now(),
        analysisId: 'analysis-' + Date.now(),
        timestamp: new Date().toISOString(),
        results: {
          summary: {
            totalEntities: entityList.length,
            totalAgents: agentList.length,
            totalEntityDependencies: entityDependencies.length,
            totalEntityAgentRelations: entityAgentRelations.length,
            overallHealth: errorEntities.length > 0 ? 'critical' : warningEntities.length > 0 ? 'warning' : 'good',
            healthScore: Math.max(60, 100 - errorEntities.length * 20 - warningEntities.length * 10)
          },
          entityAnalysis: {
            activeEntities: activeEntities.length,
            warningEntities: warningEntities.length,
            errorEntities: errorEntities.length,
            orphanedEntities: entityList.filter(
              entity =>
                !entityDependencies.some(dep => dep.source === entity.id || dep.target === entity.id) &&
                !entityAgentRelations.some(rel => rel.entityId === entity.id)
            ).length,
            criticalEntities: entityList
              .filter(entity => {
                const incomingDeps = entityDependencies.filter(dep => dep.target === entity.id).length;
                const outgoingDeps = entityDependencies.filter(dep => dep.source === entity.id).length;
                return incomingDeps + outgoingDeps > 3; // 连接数超过3的视为关键实体
              })
              .map(entity => ({
                id: entity.id,
                name: entity.name,
                connectionCount: entityDependencies.filter(dep => dep.source === entity.id || dep.target === entity.id)
                  .length
              }))
          },
          agentAnalysis: {
            activeAgents: activeAgents.length,
            agentCoverage:
              entityAgentRelations.length > 0
                ? ((entityAgentRelations.length / Math.max(entityList.length, 1)) * 100).toFixed(1) + '%'
                : '0%',
            agentEfficiency: agentList.map(agent => ({
              id: agent.id,
              name: agent.name,
              managedEntities: entityAgentRelations.filter(rel => rel.agentId === agent.id).length,
              status: agent.status,
              capabilities: agent.properties?.capabilities || []
            })),
            unmanagedEntities: entityList
              .filter(entity => !entityAgentRelations.some(rel => rel.entityId === entity.id))
              .map(entity => ({
                id: entity.id,
                name: entity.name,
                type: entity.type
              }))
          },
          dependencyAnalysis: {
            totalDependencies: entityDependencies.length,
            dependencyTypes: [...new Set(entityDependencies.map(dep => dep.type))],
            circularDependencies: [], // 简化处理，实际应该检测环形依赖
            strongDependencies: entityDependencies.filter(dep => dep.strength > 0.8).length,
            weakDependencies: entityDependencies.filter(dep => dep.strength <= 0.5).length
          },
          relationAnalysis: {
            totalRelations: entityAgentRelations.length,
            relationTypes: [...new Set(entityAgentRelations.map(rel => rel.relationType))],
            agentUtilization: agentList.map(agent => ({
              agentId: agent.id,
              agentName: agent.name,
              relationCount: entityAgentRelations.filter(rel => rel.agentId === agent.id).length,
              utilizationRate:
                entityAgentRelations.filter(rel => rel.agentId === agent.id).length > 0 ? 'active' : 'idle'
            }))
          },
          issues: [
            ...(errorEntities.length > 0
              ? [
                  {
                    type: 'error',
                    severity: 'high',
                    category: 'entity_health',
                    message: `发现 ${errorEntities.length} 个实体状态异常`,
                    affectedItems: errorEntities.map(e => e.id),
                    recommendation: '立即检查异常实体的日志和配置'
                  }
                ]
              : []),
            ...(warningEntities.length > 0
              ? [
                  {
                    type: 'warning',
                    severity: 'medium',
                    category: 'entity_health',
                    message: `发现 ${warningEntities.length} 个实体状态警告`,
                    affectedItems: warningEntities.map(e => e.id),
                    recommendation: '检查警告实体的性能指标'
                  }
                ]
              : []),
            ...(agentList.length === 0
              ? [
                  {
                    type: 'warning',
                    severity: 'medium',
                    category: 'agent_coverage',
                    message: '未部署任何Agent，缺乏智能监控能力',
                    affectedItems: ['topology'],
                    recommendation: '建议部署监控和管理Agent'
                  }
                ]
              : []),
            ...(entityAgentRelations.length < entityList.length * 0.5
              ? [
                  {
                    type: 'info',
                    severity: 'low',
                    category: 'agent_coverage',
                    message: 'Agent覆盖率较低，部分实体缺乏智能管理',
                    affectedItems: ['agent_coverage'],
                    recommendation: '考虑为更多实体配置Agent管理'
                  }
                ]
              : [])
          ],
          recommendations: [
            ...(activeAgents.length > 0 ? ['Agent监控系统运行正常'] : ['建议部署Agent监控系统']),
            ...(entityDependencies.length > entityList.length * 2 ? ['拓扑复杂度较高，建议优化依赖关系'] : []),
            '定期检查实体健康状态',
            '优化Agent资源分配',
            '建立完善的监控告警机制'
          ]
        }
      };

      console.log('✅ 模拟后端响应:', mockResponse);
      console.log('📈 分析结果摘要:');
      console.log(`   - 实体数量: ${mockResponse.results.summary.totalEntities}`);
      console.log(`   - Agent数量: ${mockResponse.results.summary.totalAgents}`);
      console.log(`   - 实体依赖关系: ${mockResponse.results.summary.totalEntityDependencies} 个`);
      console.log(`   - 实体-Agent关系: ${mockResponse.results.summary.totalEntityAgentRelations} 个`);
      console.log(
        `   - 整体健康度: ${mockResponse.results.summary.overallHealth} (${mockResponse.results.summary.healthScore}/100)`
      );
      console.log(`   - Agent覆盖率: ${mockResponse.results.agentAnalysis.agentCoverage}`);

      // 显示Agent效率分析
      if (mockResponse.results.agentAnalysis.agentEfficiency.length > 0) {
        console.log('🤖 Agent效率分析:');
        mockResponse.results.agentAnalysis.agentEfficiency.forEach((agent, index) => {
          console.log(`   ${index + 1}. ${agent.name}`);
          console.log(`      状态: ${agent.status}`);
          console.log(`      管理实体: ${agent.managedEntities} 个`);
          console.log(
            `      能力: ${Array.isArray(agent.capabilities) ? agent.capabilities.join(', ') : agent.capabilities}`
          );
        });
      }

      // 显示未管理的实体
      if (mockResponse.results.agentAnalysis.unmanagedEntities.length > 0) {
        console.log('⚠️  未被Agent管理的实体:');
        mockResponse.results.agentAnalysis.unmanagedEntities.forEach((entity, index) => {
          console.log(`   ${index + 1}. ${entity.name} (${entity.type})`);
        });
      }

      // 显示发现的问题
      if (mockResponse.results.issues.length > 0) {
        console.log('🚨 发现的问题:');
        mockResponse.results.issues.forEach((issue, index) => {
          console.log(`   ${index + 1}. [${issue.severity.toUpperCase()}] ${issue.message}`);
          console.log(`      类别: ${issue.category}`);
          console.log(`      建议: ${issue.recommendation}`);
        });
      }

      console.log('🎯 分析诊断完成!');
    } catch (error) {
      console.error('❌ 分析诊断失败:', error);
      console.log('🔄 建议重试或联系系统管理员');
    }
  };

  if (loading) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>{t('detail.graph.loading')}</div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Alert message="错误" description={error} type="error" showIcon />
      </Card>
    );
  }

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{t('detail.graph.title')}</span>
          <Button type="primary" size="small" icon={<ExperimentOutlined />} onClick={handleAnalysisDiagnosis}>
            {t('detail.graph.actions.analysisDiagnosis')}
          </Button>
        </div>
      }
      style={{ marginBottom: 24 }}
    >
      <GraphContainer ref={containerRef}>
        <svg ref={svgRef}></svg>

        {/* 控制面板 */}
        <ControlPanel>
          <Space direction="vertical" size="small">
            <Button size="small" icon={<ZoomInOutlined />} onClick={handleZoomIn} title="放大" />
            <Button size="small" icon={<ZoomOutOutlined />} onClick={handleZoomOut} title="缩小" />
            <Button size="small" icon={<FullscreenOutlined />} onClick={handleResetZoom} title="重置视图" />
            <Button
              size="small"
              icon={<UndoOutlined />}
              onClick={handleResetNodePositions}
              title={t('detail.graph.actions.resetNodePositions')}
            />
            <Button size="small" icon={<ReloadOutlined />} onClick={handleRefresh} title="刷新图表" />
          </Space>
        </ControlPanel>

        {/* Legend */}
        <LegendContainer>
          <LegendHeader onClick={() => setLegendCollapsed(!legendCollapsed)}>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{t('detail.graph.legend.title')}</div>
            {legendCollapsed ? <DownOutlined /> : <UpOutlined />}
          </LegendHeader>

          <LegendContent collapsed={legendCollapsed}>
            {/* Plane Legend */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ marginBottom: 4, fontSize: '12px', fontWeight: 'bold' }}>平面:</div>
              {graphData?.planes.map((plane: Plane) => (
                <div key={plane.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                  <div
                    style={{
                      width: 16,
                      height: 12,
                      backgroundColor: plane.color,
                      border: `1px solid ${plane.borderColor}`,
                      borderRadius: 2,
                      marginRight: 6
                    }}
                  />
                  <span style={{ fontSize: '11px' }}>{plane.name}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 8 }}>
              <div style={{ marginBottom: 4, fontSize: '12px', fontWeight: 'bold' }}>
                {t('detail.graph.legend.nodeTypes')}:
              </div>
              {/* Agent节点类型 */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: '#722ed1',
                    marginRight: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '8px'
                  }}
                >
                  🤖
                </div>
                <span style={{ fontSize: '11px' }}>AI Agent</span>
              </div>
              {/* 其他节点类型 */}
              {graphData?.metadata.levels.map((level: any) => (
                <div key={level.level} style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: level.color,
                      marginRight: 6
                    }}
                  />
                  <span style={{ fontSize: '11px' }}>{level.name}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ marginBottom: 4, fontSize: '12px', fontWeight: 'bold' }}>
                {t('detail.graph.legend.relationshipTypes')}:
              </div>
              {/* Agent管理关系 */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <div
                  style={{
                    width: 16,
                    height: 2,
                    backgroundColor: '#722ed1',
                    marginRight: 6,
                    borderTop: '2px dashed #722ed1',
                    backgroundColor: 'transparent'
                  }}
                />
                <span style={{ fontSize: '11px' }}>Agent管理</span>
              </div>
              {/* 其他关系类型 */}
              {graphData?.metadata.relationTypes.map((relType: any) => (
                <div key={relType.type} style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                  <div
                    style={{
                      width: 16,
                      height: 2,
                      backgroundColor: relType.color,
                      marginRight: 6
                    }}
                  />
                  <span style={{ fontSize: '11px' }}>{relType.description}</span>
                </div>
              ))}
            </div>
          </LegendContent>
        </LegendContainer>

        {/* 工具提示 */}
        {tooltip && (
          <TooltipContainer style={{ left: tooltip.x, top: tooltip.y }}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{tooltip.content.name}</div>
            <div style={{ marginBottom: 2 }}>类型: {tooltip.content.type}</div>
            <div style={{ marginBottom: 2 }}>层级: {tooltip.content.level}</div>
            <div style={{ marginBottom: 2 }}>平面: {tooltip.content.plane}</div>
            <div style={{ marginBottom: 2 }}>
              状态:
              <Tag color={tooltip.content.status === 'active' ? 'green' : 'red'} size="small" style={{ marginLeft: 4 }}>
                {tooltip.content.status}
              </Tag>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{tooltip.content.description}</div>
          </TooltipContainer>
        )}
      </GraphContainer>

      {/* Selected Node Details */}
      {selectedNode && (
        <Card
          title={t('detail.graph.nodeDetails.title', { name: selectedNode.name })}
          size="small"
          style={{ marginTop: 16 }}
          extra={
            <Button size="small" onClick={() => setSelectedNode(null)}>
              关闭
            </Button>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div>
              <strong>基本信息:</strong>
              <div>ID: {selectedNode.id}</div>
              <div>类型: {selectedNode.type}</div>
              <div>层级: {selectedNode.level}</div>
              <div>平面: {selectedNode.plane}</div>
              <div>
                状态: <Tag color={selectedNode.status === 'active' ? 'green' : 'red'}>{selectedNode.status}</Tag>
              </div>
            </div>
            <div>
              <strong>描述:</strong>
              <div>{selectedNode.description}</div>
            </div>
            {selectedNode.instances && (
              <div>
                <strong>实例信息:</strong>
                <div>实例数: {selectedNode.instances}</div>
                {selectedNode.version && <div>版本: {selectedNode.version}</div>}
                {selectedNode.technology && <div>技术栈: {selectedNode.technology}</div>}
              </div>
            )}
            {selectedNode.nodes && (
              <div>
                <strong>{t('detail.graph.nodeDetails.clusterInfo')}:</strong>
                <div>
                  {t('detail.graph.nodeDetails.nodeCount')}: {selectedNode.nodes}
                </div>
                {selectedNode.config && (
                  <div>
                    {t('detail.graph.nodeDetails.config')}: {selectedNode.config}
                  </div>
                )}
                {selectedNode.technology && (
                  <div>
                    {t('detail.graph.nodeDetails.technology')}: {selectedNode.technology}
                  </div>
                )}
                {selectedNode.region && (
                  <div>
                    {t('detail.graph.nodeDetails.region')}: {selectedNode.region}
                  </div>
                )}
              </div>
            )}
            {selectedNode.databases && (
              <div>
                <strong>{t('detail.graph.nodeDetails.databases')}:</strong>
                <div style={{ marginTop: 4 }}>
                  {selectedNode.databases.map((db: string, index: number) => (
                    <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
                      {db}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
            {selectedNode.metrics && (
              <div>
                <strong>业务指标:</strong>
                <div>日均量: {selectedNode.metrics.dailyVolume?.toLocaleString()}</div>
                <div>成功率: {selectedNode.metrics.successRate}%</div>
              </div>
            )}
          </div>
        </Card>
      )}
    </Card>
  );
};

export default EntityD3RelationshipGraph;
