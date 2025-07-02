import React, { useState } from 'react';
import { Card, Button, Space, message } from 'antd';
import TopologyGraph, { TopologyPlane, TopologyNode, TopologyLink } from './TopologyGraph';

const TopologyGraphExample: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // 示例数据
  const planes: TopologyPlane[] = [
    {
      id: "business_plane",
      name: "业务平面",
      level: 1,
      color: "#e6f7ff",
      borderColor: "#1890ff",
      description: "业务场景和流程层"
    },
    {
      id: "application_plane",
      name: "应用平面",
      level: 2,
      color: "#fff7e6",
      borderColor: "#faad14",
      description: "应用系统和服务层"
    },
    {
      id: "infrastructure_plane",
      name: "基础设施平面",
      level: 3,
      color: "#fff2f0",
      borderColor: "#f5222d",
      description: "基础设施和资源层"
    }
  ];

  const nodes: TopologyNode[] = [
    {
      id: "business_1",
      name: "用户注册流程",
      type: "business_process",
      level: 1,
      plane: "business_plane",
      description: "用户注册的完整业务流程",
      status: "active"
    },
    {
      id: "business_2",
      name: "订单处理流程",
      type: "business_process",
      level: 1,
      plane: "business_plane",
      description: "从下单到完成的业务流程",
      status: "active"
    },
    {
      id: "app_1",
      name: "用户服务",
      type: "microservice",
      level: 2,
      plane: "application_plane",
      description: "用户管理微服务",
      status: "running",
      version: "v1.2.0",
      instances: 3
    },
    {
      id: "app_2",
      name: "订单服务",
      type: "microservice",
      level: 2,
      plane: "application_plane",
      description: "订单处理微服务",
      status: "running",
      version: "v2.1.0",
      instances: 5
    },
    {
      id: "app_3",
      name: "支付服务",
      type: "microservice",
      level: 2,
      plane: "application_plane",
      description: "支付处理微服务",
      status: "running",
      version: "v1.8.0",
      instances: 4
    },
    {
      id: "infra_1",
      name: "MySQL集群",
      type: "database",
      level: 3,
      plane: "infrastructure_plane",
      description: "主数据库集群",
      status: "running",
      nodes: 3,
      config: "Master-Slave"
    },
    {
      id: "infra_2",
      name: "Redis集群",
      type: "cache",
      level: 3,
      plane: "infrastructure_plane",
      description: "缓存数据库集群",
      status: "running",
      nodes: 6,
      config: "Cluster"
    }
  ];

  const links: TopologyLink[] = [
    {
      source: "business_1",
      target: "app_1",
      type: "uses",
      strength: 0.8
    },
    {
      source: "business_2",
      target: "app_2",
      type: "uses",
      strength: 0.9
    },
    {
      source: "business_2",
      target: "app_3",
      type: "uses",
      strength: 0.7
    },
    {
      source: "app_1",
      target: "infra_1",
      type: "stores_in",
      strength: 0.6
    },
    {
      source: "app_2",
      target: "infra_1",
      type: "stores_in",
      strength: 0.8
    },
    {
      source: "app_1",
      target: "infra_2",
      type: "uses",
      strength: 0.5
    },
    {
      source: "app_2",
      target: "infra_2",
      type: "uses",
      strength: 0.6
    },
    {
      source: "app_3",
      target: "infra_1",
      type: "stores_in",
      strength: 0.7
    }
  ];

  const handleNodeClick = (node: TopologyNode) => {
    message.info(`点击了节点: ${node.name}`);
    console.log('节点详情:', node);
  };

  const handleNodeHover = (node: TopologyNode | null) => {
    if (node) {
      console.log('悬停在节点:', node.name);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('数据刷新完成');
    }, 1000);
  };

  return (
    <div style={{ padding: 24 }}>
      <Card 
        title="拓扑图组件示例" 
        extra={
          <Space>
            <Button onClick={handleRefresh} loading={loading}>
              刷新数据
            </Button>
          </Space>
        }
      >
        <TopologyGraph
          planes={planes}
          nodes={nodes}
          links={links}
          loading={loading}
          height={600}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          showLegend={true}
          showControls={true}
        />
      </Card>

      <Card title="使用说明" style={{ marginTop: 24 }}>
        <div>
          <h4>功能特性：</h4>
          <ul>
            <li>支持多平面分层显示</li>
            <li>节点可拖拽和交互</li>
            <li>支持缩放和平移</li>
            <li>悬停高亮相关节点</li>
            <li>点击查看节点详情</li>
            <li>自动生成图例</li>
          </ul>
          
          <h4>操作指南：</h4>
          <ul>
            <li>鼠标悬停节点查看详情</li>
            <li>点击节点查看完整信息</li>
            <li>拖拽节点调整位置</li>
            <li>使用右上角控制面板进行缩放操作</li>
            <li>查看左上角图例了解节点和关系类型</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default TopologyGraphExample;
