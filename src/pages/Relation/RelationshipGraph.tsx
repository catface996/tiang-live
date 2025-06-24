import React, { useEffect, useRef } from 'react';
import { Typography, Card, Space, Button, Alert } from 'antd';
import { ReloadOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as d3 from 'd3';
import { setPageTitle } from '../../utils';

const { Title, Paragraph } = Typography;

const PageHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 600px;
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

const RelationshipGraph: React.FC = () => {
  const { t } = useTranslation(['common']);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setPageTitle(t('relationships:title'));
    drawGraph();
  }, [t]);

  const drawGraph = () => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;

    // 示例数据
    const nodes = [
      { id: 'user_service', name: '用户服务', type: 'service', group: 1 },
      { id: 'order_service', name: '订单服务', type: 'service', group: 1 },
      { id: 'payment_service', name: '支付服务', type: 'service', group: 1 },
      { id: 'mysql_db', name: 'MySQL数据库', type: 'database', group: 2 },
      { id: 'redis_cache', name: 'Redis缓存', type: 'cache', group: 3 },
      { id: 'api_gateway', name: 'API网关', type: 'gateway', group: 4 }
    ];

    const links = [
      { source: 'api_gateway', target: 'user_service' },
      { source: 'api_gateway', target: 'order_service' },
      { source: 'api_gateway', target: 'payment_service' },
      { source: 'user_service', target: 'mysql_db' },
      { source: 'order_service', target: 'mysql_db' },
      { source: 'payment_service', target: 'mysql_db' },
      { source: 'user_service', target: 'redis_cache' },
      { source: 'order_service', target: 'redis_cache' }
    ];

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", 20)
      .attr("fill", (d: any) => {
        switch (d.type) {
          case 'service': return '#1890ff';
          case 'database': return '#52c41a';
          case 'cache': return '#faad14';
          case 'gateway': return '#722ed1';
          default: return '#d9d9d9';
        }
      })
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

    const labels = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
      .text((d: any) => d.name)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "white");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      labels
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <PageHeader>
        <div>
          <Title level={2}>实体关系图谱</Title>
          <Paragraph>展示系统中各个实体之间的关系和依赖</Paragraph>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={drawGraph}>
            刷新
          </Button>
          <Button icon={<FullscreenOutlined />}>
            全屏
          </Button>
        </Space>
      </PageHeader>
      
      <Card title="关系图谱">
        <Alert
          message="操作提示"
          description="拖拽节点可以调整位置，不同颜色代表不同类型的实体。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <GraphContainer>
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
            <div style={{ fontSize: 12, marginBottom: 8, fontWeight: 'bold' }}>图例</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#1890ff' }}></div>
                <span style={{ fontSize: 11 }}>服务</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#52c41a' }}></div>
                <span style={{ fontSize: 11 }}>数据库</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#faad14' }}></div>
                <span style={{ fontSize: 11 }}>缓存</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#722ed1' }}></div>
                <span style={{ fontSize: 11 }}>网关</span>
              </div>
            </div>
          </div>
        </GraphContainer>
      </Card>
    </div>
  );
};

export default RelationshipGraph;
