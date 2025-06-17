import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Card, Spin, Alert, Space, Tag, Tooltip, Button } from 'antd';
import { FullscreenOutlined, ReloadOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import businessRelationshipData from '../../data/businessRelationshipMock.json';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: string;
  level: number;
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

interface GraphData {
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
  padding: 12px;
  box-shadow: var(--card-shadow);
  max-width: 300px;
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

const D3RelationshipGraph: React.FC = () => {
  const { t } = useTranslation();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: any } | null>(null);

  // 颜色映射
  const getNodeColor = (type: string, level: number) => {
    const levelColors = {
      1: '#1890ff', // 业务场景层 - 蓝色
      2: '#52c41a', // 业务链路层 - 绿色
      3: '#faad14', // 业务系统层 - 橙色
      4: '#722ed1', // 中间件层 - 紫色
      5: '#f5222d', // 基础设施层 - 红色
    };
    return levelColors[level as keyof typeof levelColors] || '#8c8c8c';
  };

  const getLinkColor = (type: string) => {
    const linkColors = {
      contains: '#1890ff',
      depends_on: '#52c41a',
      uses: '#faad14',
      runs_on: '#722ed1',
      stores_in: '#f5222d',
      logs_to: '#8c8c8c',
    };
    return linkColors[type as keyof typeof linkColors] || '#d9d9d9';
  };

  const getNodeSize = (level: number) => {
    const sizes = {
      1: 20, // 业务场景 - 最大
      2: 16, // 业务链路
      3: 14, // 业务系统
      4: 12, // 中间件
      5: 10, // 基础设施 - 最小
    };
    return sizes[level as keyof typeof sizes] || 12;
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
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // 创建主容器组
    const g = svg.append('g');

    // 创建力导向布局
    const simulation = d3.forceSimulation<Node>(graphData.nodes)
      .force('link', d3.forceLink<Node, Link>(graphData.links)
        .id(d => d.id)
        .distance(d => {
          const sourceLevel = (d.source as Node).level;
          const targetLevel = (d.target as Node).level;
          const levelDiff = Math.abs(sourceLevel - targetLevel);
          return levelDiff === 1 ? 100 : 150; // 相邻层级距离更近
        })
        .strength(d => d.strength)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => getNodeSize(d.level) + 5))
      .force('x', d3.forceX(width / 2).strength(0.1))
      .force('y', d3.forceY(height / 2).strength(0.1));

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
          d.fx = null;
          d.fy = null;
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
        setSelectedNode(d);
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

    // 将控制函数绑定到组件实例
    (svgRef.current as any).zoomIn = zoomIn;
    (svgRef.current as any).zoomOut = zoomOut;
    (svgRef.current as any).resetZoom = resetZoom;
  };

  // 加载数据
  useEffect(() => {
    try {
      setLoading(true);
      setGraphData(businessRelationshipData as GraphData);
      setError(null);
    } catch (err) {
      setError('Failed to load relationship data');
    } finally {
      setLoading(false);
    }
  }, []);

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

  const handleRefresh = () => {
    initializeGraph();
  };

  if (loading) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>Loading relationship graph...</div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      </Card>
    );
  }

  return (
    <Card title="业务关系图谱" style={{ marginBottom: 24 }}>
      <GraphContainer ref={containerRef}>
        <svg ref={svgRef}></svg>
        
        {/* 控制面板 */}
        <ControlPanel>
          <Space direction="vertical" size="small">
            <Button size="small" icon={<ZoomInOutlined />} onClick={handleZoomIn} />
            <Button size="small" icon={<ZoomOutOutlined />} onClick={handleZoomOut} />
            <Button size="small" icon={<FullscreenOutlined />} onClick={handleResetZoom} />
            <Button size="small" icon={<ReloadOutlined />} onClick={handleRefresh} />
          </Space>
        </ControlPanel>

        {/* 图例 */}
        <LegendContainer>
          <div style={{ marginBottom: 12, fontWeight: 'bold', fontSize: '14px' }}>
            图例
          </div>
          <div style={{ marginBottom: 8 }}>
            <div style={{ marginBottom: 4, fontSize: '12px', fontWeight: 'bold' }}>节点类型:</div>
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
            <div style={{ marginBottom: 4, fontSize: '12px', fontWeight: 'bold' }}>关系类型:</div>
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
        </LegendContainer>

        {/* 工具提示 */}
        {tooltip && (
          <TooltipContainer style={{ left: tooltip.x, top: tooltip.y }}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{tooltip.content.name}</div>
            <div style={{ marginBottom: 2 }}>类型: {tooltip.content.type}</div>
            <div style={{ marginBottom: 2 }}>层级: {tooltip.content.level}</div>
            <div style={{ marginBottom: 2 }}>状态: 
              <Tag color={tooltip.content.status === 'active' || tooltip.content.status === 'running' ? 'green' : 'red'} size="small" style={{ marginLeft: 4 }}>
                {tooltip.content.status}
              </Tag>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              {tooltip.content.description}
            </div>
          </TooltipContainer>
        )}
      </GraphContainer>

      {/* 选中节点详情 */}
      {selectedNode && (
        <Card 
          title={`节点详情: ${selectedNode.name}`} 
          size="small" 
          style={{ marginTop: 16 }}
          extra={<Button size="small" onClick={() => setSelectedNode(null)}>关闭</Button>}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div>
              <strong>基本信息:</strong>
              <div>ID: {selectedNode.id}</div>
              <div>类型: {selectedNode.type}</div>
              <div>层级: {selectedNode.level}</div>
              <div>状态: <Tag color={selectedNode.status === 'active' || selectedNode.status === 'running' ? 'green' : 'red'}>{selectedNode.status}</Tag></div>
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

export default D3RelationshipGraph;
