import React, { useEffect, useRef, useMemo } from 'react';
import { Alert } from 'antd';
import styled from 'styled-components';
import * as d3 from 'd3';

const TopologyContainer = styled.div`
  width: 100%;
  height: 700px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #fafafa;
  position: relative;
  overflow: hidden;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

// 面板定义
interface Panel {
  id: string;
  name: string;
  level: number;
  color: string;
  borderColor: string;
  description: string;
}

// 节点状态枚举
enum NodeStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  SKIPPED = 'skipped'
}

// 节点类型
interface TaskNode {
  id: string;
  name: string;
  type: 'entity' | 'sequence';
  category: string;
  panel: string;
  status: NodeStatus;
  actions: string[];
  startTime?: string;
  endTime?: string;
  duration?: number;
  results?: any[];
  dependencies?: string[];
  x?: number;
  y?: number;
}

interface TaskTopologyProps {
  nodes: TaskNode[];
  panels: Panel[];
  onNodeClick?: (node: TaskNode) => void;
}

const TaskTopology: React.FC<TaskTopologyProps> = ({ nodes, panels, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // 使用 useMemo 来稳定化依赖
  const stableNodes = useMemo(() => nodes, [JSON.stringify(nodes)]);
  const stablePanels = useMemo(() => panels, [JSON.stringify(panels)]);

  // 计算面板边界
  const calculatePanelBounds = (panel: Panel, nodes: TaskNode[], width: number, height: number) => {
    const panelNodes = nodes.filter(node => node.panel === panel.id);
    if (panelNodes.length === 0) return null;

    const padding = 40;
    const panelHeight = (height - padding * 4) / 3; // 三个面板平分高度
    const y = padding + (panel.level - 1) * (panelHeight + padding);

    return {
      x: padding,
      y: y,
      width: width - padding * 2,
      height: panelHeight,
      rx: 8,
      ry: 8
    };
  };

  // 绘制分层拓扑图
  const drawTopology = () => {
    if (!stableNodes || stableNodes.length === 0 || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 700;
    const nodesCopy = stableNodes.map(node => ({ ...node }));
    
    // 创建主容器
    const g = svg.append("g");

    // 绘制面板背景
    stablePanels.forEach(panel => {
      const bounds = calculatePanelBounds(panel, nodesCopy, width, height);
      if (!bounds) return;

      const panelGroup = g.append("g").attr("class", `panel-${panel.id}`);
      
      // 绘制面板背景矩形
      panelGroup.append('rect')
        .attr('x', bounds.x)
        .attr('y', bounds.y)
        .attr('width', bounds.width)
        .attr('height', bounds.height)
        .attr('rx', bounds.rx)
        .attr('ry', bounds.ry)
        .attr('fill', panel.color)
        .attr('stroke', panel.borderColor)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0.8);

      // 添加面板标题
      panelGroup.append('text')
        .attr('x', bounds.x + 20)
        .attr('y', bounds.y + 25)
        .attr('font-size', '16px')
        .attr('font-weight', 'bold')
        .attr('fill', panel.borderColor)
        .text(panel.name);

      // 添加面板描述
      panelGroup.append('text')
        .attr('x', bounds.x + 20)
        .attr('y', bounds.y + 45)
        .attr('font-size', '12px')
        .attr('fill', '#666')
        .text(panel.description);
    });

    // 创建链接数据
    const links: any[] = [];
    nodesCopy.forEach(node => {
      if (node.dependencies) {
        node.dependencies.forEach(depId => {
          links.push({
            source: depId,
            target: node.id
          });
        });
      }
    });

    // 创建力导向图，添加面板约束
    const simulation = d3.forceSimulation(nodesCopy as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("collision", d3.forceCollide().radius(35))
      .force("panel", () => {
        // 面板约束力
        nodesCopy.forEach(node => {
          const panel = stablePanels.find(p => p.id === node.panel);
          if (!panel) return;
          
          const bounds = calculatePanelBounds(panel, nodesCopy, width, height);
          if (!bounds) return;

          const padding = 50;
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

    // 添加箭头标记
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 35)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999");

    // 绘制连接线
    const link = g.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead)");

    // 获取节点颜色
    const getNodeColor = (status: NodeStatus) => {
      switch (status) {
        case NodeStatus.COMPLETED:
          return '#52c41a';
        case NodeStatus.RUNNING:
          return '#1890ff';
        case NodeStatus.FAILED:
          return '#ff4d4f';
        case NodeStatus.PENDING:
          return '#d9d9d9';
        case NodeStatus.SKIPPED:
          return '#faad14';
        default:
          return '#d9d9d9';
      }
    };

    // 绘制节点
    const node = g.append("g")
      .selectAll("g")
      .data(nodesCopy)
      .enter().append("g")
      .attr("class", "node")
      .style("cursor", "pointer")
      .call(d3.drag<any, any>()
        .on("start", (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d: any) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // 添加节点圆圈
    node.append("circle")
      .attr("r", 30)
      .attr("fill", (d: any) => getNodeColor(d.status))
      .attr("stroke", "#fff")
      .attr("stroke-width", 3);

    // 添加节点图标
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-size", "16px")
      .attr("fill", "white")
      .text((d: any) => d.type === 'entity' ? '🔧' : '⚡');

    // 添加节点标签
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "3.8em")
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .text((d: any) => d.name);

    // 添加状态标签
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "5.2em")
      .attr("font-size", "10px")
      .attr("fill", "#666")
      .text((d: any) => {
        switch (d.status) {
          case NodeStatus.COMPLETED:
            return '已完成';
          case NodeStatus.RUNNING:
            return '运行中';
          case NodeStatus.FAILED:
            return '失败';
          case NodeStatus.PENDING:
            return '等待中';
          case NodeStatus.SKIPPED:
            return '已跳过';
          default:
            return '';
        }
      });

    // 节点点击事件
    node.on("click", (_event: any, d: any) => {
      if (onNodeClick) {
        onNodeClick(d);
      }
    });

    // 更新位置
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });
  };

  // 当数据更新时重新绘制拓扑图
  useEffect(() => {
    drawTopology();
  }, [stableNodes, stablePanels]);

  return (
    <div>
      <Alert
        message="操作提示"
        description="点击节点查看详细信息，拖拽节点调整位置。节点按面板分层展示，不同颜色代表不同的执行状态。"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <TopologyContainer>
        <svg ref={svgRef}></svg>
        <div style={{ 
          position: 'absolute', 
          top: 16, 
          right: 16, 
          background: 'white', 
          padding: 12, 
          borderRadius: 6,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: 12, marginBottom: 8, fontWeight: 'bold' }}>状态图例</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#52c41a' }}></div>
              <span style={{ fontSize: 11 }}>已完成</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#1890ff' }}></div>
              <span style={{ fontSize: 11 }}>运行中</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#d9d9d9' }}></div>
              <span style={{ fontSize: 11 }}>等待中</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff4d4f' }}></div>
              <span style={{ fontSize: 11 }}>失败</span>
            </div>
          </div>
        </div>
        <div style={{ 
          position: 'absolute', 
          bottom: 16, 
          right: 16, 
          background: 'white', 
          padding: 12, 
          borderRadius: 6,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: 12, marginBottom: 8, fontWeight: 'bold' }}>面板图例</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {stablePanels.map(panel => (
              <div key={panel.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ 
                  width: 12, 
                  height: 12, 
                  background: panel.color,
                  border: `1px solid ${panel.borderColor}`,
                  borderRadius: 2
                }}></div>
                <span style={{ fontSize: 11 }}>{panel.name}</span>
              </div>
            ))}
          </div>
        </div>
      </TopologyContainer>
    </div>
  );
};

export default TaskTopology;
export type { TaskNode, Panel };
