import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Alert, Space } from 'antd';
import styled from 'styled-components';
import * as d3 from 'd3';
import { NodeStatus } from '../types';
import '../../../styles/layered-task-topology.css';

// 使用主题适配的样式组件
const TopologyContainer = styled.div.attrs({
  className: 'topology-container'
})``;

const RightTopLegendsContainer = styled.div.attrs({
  className: 'right-top-legends-container'
})``;

const LegendCard = styled.div.attrs({
  className: 'legend-card'
})``;

const LegendTitle = styled.div.attrs({
  className: 'legend-title'
})``;

const LegendList = styled.div.attrs({
  className: 'legend-list'
})``;

const LegendItem = styled.div.attrs({
  className: 'legend-item'
})``;

const LegendIcon = styled.span.attrs({
  className: 'legend-icon'
})``;

const TipsContainer = styled.div.attrs({
  className: 'tips-container'
})``;

const MainContainer = styled.div.attrs({
  className: 'layered-topology-container'
})``;

const LegendText = styled.span.attrs({
  className: 'legend-text'
})``;

const LayerLegendList = styled.div.attrs({
  className: 'layer-legend-list'
})``;

const LayerLegendItem = styled.div.attrs({
  className: 'layer-legend-item'
})``;

const LayerLegendText = styled.span.attrs({
  className: 'layer-legend-text'
})``;

// 业务层级定义（本地定义避免导入问题）
interface BusinessLayer {
  id: string;
  name: string;
  level: number; // L5-L1
  color: string;
  borderColor: string;
  description: string;
  height: number;
}

// 分层任务节点类型（本地定义避免导入问题）
interface LayeredTaskNode {
  id: string;
  name: string;
  type: 'entity' | 'sequence';
  category: string;
  layer: string; // 对应业务层级ID
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

interface LayeredTaskTopologyProps {
  nodes: LayeredTaskNode[];
  onNodeClick?: (node: LayeredTaskNode) => void;
}

// 预定义的业务层级
const BUSINESS_LAYERS: BusinessLayer[] = [
  {
    id: 'L5',
    name: 'L5 - 业务场景层',
    level: 5,
    color: 'rgba(114, 46, 209, 0.1)',
    borderColor: '#722ed1',
    description: '业务场景和用户体验层面',
    height: 120
  },
  {
    id: 'L4',
    name: 'L4 - 业务链路层',
    level: 4,
    color: 'rgba(24, 144, 255, 0.1)',
    borderColor: '#1890ff',
    description: '业务流程和链路层面',
    height: 120
  },
  {
    id: 'L3',
    name: 'L3 - 业务系统层',
    level: 3,
    color: 'rgba(82, 196, 26, 0.1)',
    borderColor: '#52c41a',
    description: '业务应用和系统层面',
    height: 120
  },
  {
    id: 'L2',
    name: 'L2 - 中间件层',
    level: 2,
    color: 'rgba(250, 173, 20, 0.1)',
    borderColor: '#faad14',
    description: '中间件和服务层面',
    height: 120
  },
  {
    id: 'L1',
    name: 'L1 - 基础设施层',
    level: 1,
    color: 'rgba(19, 194, 194, 0.1)',  // 青蓝色半透明背景
    borderColor: '#13c2c2',            // 青蓝色边框
    description: '基础设施和资源层面',
    height: 120
  }
];

const LayeredTaskTopology: React.FC<LayeredTaskTopologyProps> = ({ nodes, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // 使用 useMemo 来稳定化依赖
  const stableNodes = useMemo(() => nodes, [JSON.stringify(nodes)]);

  // 显示操作提示
  useEffect(() => {
    const timer = setTimeout(() => {
      const hint = document.querySelector('.zoom-hint');
      if (hint) {
        hint.classList.add('show');
        setTimeout(() => {
          hint.classList.remove('show');
        }, 3000);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 缩放控制函数
  const handleZoomIn = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom().scaleExtent([0.1, 5]);
    svg.transition().duration(300).call(
      zoom.transform,
      d3.zoomTransform(svg.node()).scale(Math.min(5, zoomLevel * 1.2))
    );
  };

  const handleZoomOut = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom().scaleExtent([0.1, 5]);
    svg.transition().duration(300).call(
      zoom.transform,
      d3.zoomTransform(svg.node()).scale(Math.max(0.1, zoomLevel / 1.2))
    );
  };

  const handleResetZoom = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom().scaleExtent([0.1, 5]);
    svg.transition().duration(500).call(
      zoom.transform,
      d3.zoomIdentity
    );
  };

  // 计算层级边界
  const calculateLayerBounds = (layer: BusinessLayer, width: number, height: number) => {
    const padding = 20;
    const headerHeight = 60;
    const availableHeight = height - headerHeight - padding * 2;
    const layerSpacing = 10;
    
    // 从上到下排列 L5 -> L1
    const layerIndex = 5 - layer.level; // L5=0, L4=1, L3=2, L2=3, L1=4
    const totalLayers = BUSINESS_LAYERS.length;
    const layerHeight = (availableHeight - layerSpacing * (totalLayers - 1)) / totalLayers;
    
    const y = headerHeight + padding + layerIndex * (layerHeight + layerSpacing);

    return {
      x: padding,
      y: y,
      width: width - padding * 2,
      height: layerHeight,
      rx: 8,
      ry: 8
    };
  };

  // 在层级内部布局节点 - 水平居中分布
  const layoutNodesInLayer = (layerNodes: LayeredTaskNode[], bounds: any) => {
    if (layerNodes.length === 0) return;
    
    const minNodeSpacing = 80; // 最小节点间距
    const layerPadding = 40; // 层级内边距
    const availableWidth = bounds.width - layerPadding * 2;
    
    // 计算节点间距，确保节点均匀分布且不超出边界
    let nodeSpacing = minNodeSpacing;
    let totalNodesWidth = (layerNodes.length - 1) * nodeSpacing;
    
    // 如果节点总宽度超出可用宽度，调整间距
    if (totalNodesWidth > availableWidth) {
      nodeSpacing = Math.max(60, availableWidth / (layerNodes.length - 1));
      totalNodesWidth = (layerNodes.length - 1) * nodeSpacing;
    }
    
    // 计算起始X位置，使节点水平居中
    const startX = bounds.x + (bounds.width - totalNodesWidth) / 2;
    const centerY = bounds.y + bounds.height / 2;
    
    // 检查是否需要多行布局
    const maxNodesPerRow = Math.floor(availableWidth / minNodeSpacing) + 1;
    
    if (layerNodes.length <= maxNodesPerRow) {
      // 单行布局 - 水平居中
      layerNodes.forEach((node, index) => {
        node.x = startX + index * nodeSpacing;
        node.y = centerY;
      });
    } else {
      // 多行布局 - 每行都水平居中
      const rows = Math.ceil(layerNodes.length / maxNodesPerRow);
      const rowHeight = Math.max(80, (bounds.height - 40) / rows); // 40为标题预留空间
      
      layerNodes.forEach((node, index) => {
        const row = Math.floor(index / maxNodesPerRow);
        const col = index % maxNodesPerRow;
        const nodesInThisRow = Math.min(maxNodesPerRow, layerNodes.length - row * maxNodesPerRow);
        
        // 计算当前行的起始位置，使该行节点居中
        const rowTotalWidth = (nodesInThisRow - 1) * minNodeSpacing;
        const rowStartX = bounds.x + (bounds.width - rowTotalWidth) / 2;
        
        node.x = rowStartX + col * minNodeSpacing;
        node.y = bounds.y + 40 + row * rowHeight; // 40为标题预留空间
      });
    }
  };

  // 绘制分层拓扑图
  const drawLayeredTopology = () => {
    if (!stableNodes || stableNodes.length === 0 || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 1200;
    const height = 800;
    const nodesCopy = stableNodes.map(node => ({ ...node }));
    
    // 创建主容器 - 这个容器会被缩放和平移
    const g = svg.append("g").attr("class", "main-group");

    // 设置缩放行为
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 5]) // 缩放范围：10%到500%
      .on("zoom", (event) => {
        // 应用缩放和平移变换
        g.attr("transform", event.transform);
        // 更新缩放级别状态
        setZoomLevel(event.transform.k);
      });

    // 应用缩放行为到SVG
    svg.call(zoom);

    // 添加缩放重置功能（双击）
    svg.on("dblclick.zoom", () => {
      svg.transition().duration(500).call(
        zoom.transform,
        d3.zoomIdentity
      );
    });

    // 按层级分组节点
    const nodesByLayer = new Map<string, LayeredTaskNode[]>();
    BUSINESS_LAYERS.forEach(layer => {
      nodesByLayer.set(layer.id, nodesCopy.filter(node => node.layer === layer.id));
    });

    // 绘制层级背景和布局节点
    BUSINESS_LAYERS.forEach(layer => {
      const bounds = calculateLayerBounds(layer, width, height);
      const layerNodes = nodesByLayer.get(layer.id) || [];
      
      // 布局该层级的节点
      layoutNodesInLayer(layerNodes, bounds);

      const layerGroup = g.append("g").attr("class", `layer-${layer.id}`);
      
      // 绘制层级背景矩形
      layerGroup.append('rect')
        .attr('x', bounds.x)
        .attr('y', bounds.y)
        .attr('width', bounds.width)
        .attr('height', bounds.height)
        .attr('rx', bounds.rx)
        .attr('ry', bounds.ry)
        .attr('fill', layer.color)
        .attr('stroke', layer.borderColor)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '8,4') // 添加虚线样式
        .attr('opacity', 0.8);

      // 添加层级标题
      layerGroup.append('text')
        .attr('x', bounds.x + 20)
        .attr('y', bounds.y + 25)
        .attr('font-size', '16px')
        .attr('font-weight', 'bold')
        .attr('fill', layer.borderColor)
        .text(layer.name);

      // 添加层级描述
      layerGroup.append('text')
        .attr('x', bounds.x + 20)
        .attr('y', bounds.y + 45)
        .attr('font-size', '12px')
        .attr('fill', '#666')
        .text(layer.description);

      // 显示该层级的节点数量
      layerGroup.append('text')
        .attr('x', bounds.x + bounds.width - 100)
        .attr('y', bounds.y + 25)
        .attr('font-size', '12px')
        .attr('fill', '#666')
        .text(`节点数: ${layerNodes.length}`);
    });

    // 创建跨层级的依赖链接
    const links: any[] = [];
    nodesCopy.forEach(node => {
      if (node.dependencies) {
        node.dependencies.forEach(depId => {
          const sourceNode = nodesCopy.find(n => n.id === depId);
          if (sourceNode) {
            links.push({
              source: sourceNode,
              target: node,
              type: 'dependency'
            });
          }
        });
      }
    });

    // 添加箭头标记
    const defs = svg.append("defs");
    
    // 依赖关系箭头
    defs.append("marker")
      .attr("id", "dependency-arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 35)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#666");

    // 绘制连接线
    const link = g.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#666")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("marker-end", "url(#dependency-arrow)")
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);

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

    // 获取节点图标
    const getNodeIcon = (node: LayeredTaskNode) => {
      switch (node.layer) {
        case 'L5': return '🎯'; // 业务场景
        case 'L4': return '🔗'; // 业务链路
        case 'L3': return '💼'; // 业务系统
        case 'L2': return '⚙️'; // 中间件
        case 'L1': return '🏗️'; // 基础设施
        default: return node.type === 'entity' ? '🔧' : '⚡';
      }
    };

    // 绘制节点
    const node = g.append("g")
      .selectAll("g")
      .data(nodesCopy)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`)
      .style("cursor", "grab")
      .call(d3.drag<any, any>()
        .on("start", function(event, d: any) {
          // 拖拽开始
          d3.select(this).classed("dragging", true);
          d3.select(this).style("cursor", "grabbing");
          d3.select(this).select("circle")
            .transition()
            .duration(100)
            .attr("r", 35)
            .attr("stroke-width", 4);
          
          // 阻止缩放事件
          event.sourceEvent.stopPropagation();
        })
        .on("drag", function(event, d: any) {
          // 直接使用事件坐标，D3会自动处理缩放变换
          d.x = event.x;
          d.y = event.y;
          
          // 更新节点位置
          d3.select(this).attr("transform", `translate(${d.x},${d.y})`);
          
          // 更新连接线
          link
            .attr("x1", (linkData: any) => linkData.source.x)
            .attr("y1", (linkData: any) => linkData.source.y)
            .attr("x2", (linkData: any) => linkData.target.x)
            .attr("y2", (linkData: any) => linkData.target.y);
        })
        .on("end", function(event, d: any) {
          // 拖拽结束，固定在当前位置
          d3.select(this).classed("dragging", false);
          d3.select(this).style("cursor", "grab");
          d3.select(this).select("circle")
            .transition()
            .duration(200)
            .attr("r", 30)
            .attr("stroke-width", 3);
          
          // 延迟一点时间再允许点击事件，避免拖拽结束时误触发点击
          setTimeout(() => {
            event.sourceEvent.preventDefault = false;
          }, 100);
        })
      );

    // 添加节点圆圈
    node.append("circle")
      .attr("r", 30)
      .attr("fill", (d: any) => getNodeColor(d.status))
      .attr("stroke", "#fff")
      .attr("stroke-width", 3)
      .attr("filter", "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))");

    // 添加节点图标
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-size", "16px")
      .text((d: any) => getNodeIcon(d));

    // 添加节点标签
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "3.8em")
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .attr("font-weight", "500")
      .text((d: any) => d.name);

    // 节点点击事件（避免与拖拽冲突）
    node.on("click", function(_event: any, d: any) {
      // 只有在没有拖拽的情况下才触发点击
      if (_event.defaultPrevented) return;
      if (onNodeClick) {
        onNodeClick(d);
      }
    });

    // 添加节点悬停效果（只在非拖拽状态下生效）
    node.on("mouseenter", function(event, d) {
      if (!d3.select(this).classed("dragging")) {
        d3.select(this).select("circle")
          .transition()
          .duration(200)
          .attr("r", 35)
          .attr("stroke-width", 4);
      }
    })
    .on("mouseleave", function(event, d) {
      if (!d3.select(this).classed("dragging")) {
        d3.select(this).select("circle")
          .transition()
          .duration(200)
          .attr("r", 30)
          .attr("stroke-width", 3);
      }
    });
  };

  // 当数据更新时重新绘制拓扑图
  useEffect(() => {
    drawLayeredTopology();
  }, [stableNodes]);

  return (
    <MainContainer>
      <TipsContainer>
        <Alert
          message="分层拓扑视图"
          description="按照业务层级从上到下展示节点关系：L5业务场景层 → L4业务链路层 → L3业务系统层 → L2中间件层 → L1基础设施层。支持鼠标滚轮缩放、拖拽平移视图、拖拽节点调整位置，点击节点查看详细信息。"
          type="info"
          showIcon
        />
      </TipsContainer>
      <TopologyContainer>
        <svg ref={svgRef}></svg>
        
        {/* 缩放控制按钮 */}
        <div className="zoom-controls">
          <div 
            className="zoom-control-btn" 
            onClick={handleZoomIn}
            title="放大 (滚轮向上)"
          >
            +
          </div>
          <div 
            className="zoom-control-btn" 
            onClick={handleZoomOut}
            title="缩小 (滚轮向下)"
          >
            −
          </div>
          <div 
            className="zoom-control-btn reset" 
            onClick={handleResetZoom}
            title="重置缩放 (双击图表)"
          >
            ⌂
          </div>
        </div>

        {/* 缩放级别显示 */}
        <div className="zoom-level-display">
          缩放: {Math.round(zoomLevel * 100)}%
        </div>

        {/* 操作提示 */}
        <div className="zoom-hint">
          <div>• 鼠标滚轮：缩放</div>
          <div>• 拖拽：平移视图</div>
          <div>• 双击：重置缩放</div>
          <div>• 拖拽节点：调整位置</div>
        </div>
        
        {/* 右上角垂直排列的图例 */}
        <RightTopLegendsContainer>
          {/* 执行状态图例 */}
          <LegendCard>
            <LegendTitle>执行状态</LegendTitle>
            <LegendList>
              <LegendItem>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#52c41a' }}></div>
                <LegendText>已完成</LegendText>
              </LegendItem>
              <LegendItem>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#1890ff' }}></div>
                <LegendText>运行中</LegendText>
              </LegendItem>
              <LegendItem>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#d9d9d9' }}></div>
                <LegendText>等待中</LegendText>
              </LegendItem>
              <LegendItem>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff4d4f' }}></div>
                <LegendText>失败</LegendText>
              </LegendItem>
              <LegendItem>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#faad14' }}></div>
                <LegendText>已跳过</LegendText>
              </LegendItem>
            </LegendList>
          </LegendCard>

          {/* 业务层级图例 */}
          <LegendCard>
            <LegendTitle>业务层级</LegendTitle>
            <LayerLegendList>
              {BUSINESS_LAYERS.map(layer => (
                <LayerLegendItem key={layer.id}>
                  <div style={{ 
                    width: 12, 
                    height: 12, 
                    background: layer.color,
                    border: `1px solid ${layer.borderColor}`,
                    borderRadius: 2
                  }}></div>
                  <LayerLegendText>{layer.name}</LayerLegendText>
                </LayerLegendItem>
              ))}
            </LayerLegendList>
          </LegendCard>

          {/* 图标说明 */}
          <LegendCard>
            <LegendTitle>图标说明</LegendTitle>
            <LegendList>
              <LegendItem>
                <LegendIcon>🎯</LegendIcon>
                <LegendText>业务场景</LegendText>
              </LegendItem>
              <LegendItem>
                <LegendIcon>🔗</LegendIcon>
                <LegendText>业务链路</LegendText>
              </LegendItem>
              <LegendItem>
                <LegendIcon>💼</LegendIcon>
                <LegendText>业务系统</LegendText>
              </LegendItem>
              <LegendItem>
                <LegendIcon>⚙️</LegendIcon>
                <LegendText>中间件</LegendText>
              </LegendItem>
              <LegendItem>
                <LegendIcon>🏗️</LegendIcon>
                <LegendText>基础设施</LegendText>
              </LegendItem>
            </LegendList>
          </LegendCard>
        </RightTopLegendsContainer>
      </TopologyContainer>
    </MainContainer>
  );
};

export default LayeredTaskTopology;
