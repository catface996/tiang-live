import React from 'react';
import { Typography, Tag, Space, Row, Col, Statistic, Button } from 'antd';
import { NodeIndexOutlined, LinkOutlined, HeartOutlined, ReloadOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface TopologyData {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  plane: string;
  tags: string[];
  stats: {
    nodeCount: number;
    linkCount: number;
    healthScore: number;
    lastUpdated: string;
  };
}

interface TopologyHeaderProps {
  topologyData: TopologyData;
  onRefresh: () => void;
}

const TopologyHeader: React.FC<TopologyHeaderProps> = ({ topologyData, onRefresh }) => {
  const handleExport = () => {
    // TODO: 实现导出功能
  };

  return (
    <div className="topology-header">
      <div className="header-content">
        <div className="header-left">
          <Title level={3} style={{ margin: 0 }}>
            <Space>
              <NodeIndexOutlined />
              {topologyData.name}
            </Space>
          </Title>
          <div className="header-description">
            <Text type="secondary">{topologyData.description}</Text>
          </div>
          <div className="header-tags">
            <Space wrap>
              <Tag color="blue">{topologyData.type}</Tag>
              <Tag color="green">{topologyData.plane}</Tag>
              {topologyData.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Space>
          </div>
        </div>
        <div className="header-right">
          <Row gutter={16}>
            <Col span={6}>
              <Statistic title="节点数" value={topologyData.stats.nodeCount} prefix={<NodeIndexOutlined />} />
            </Col>
            <Col span={6}>
              <Statistic title="连接数" value={topologyData.stats.linkCount} prefix={<LinkOutlined />} />
            </Col>
            <Col span={6}>
              <Statistic title="健康度" value={topologyData.stats.healthScore} suffix="%" prefix={<HeartOutlined />} />
            </Col>
            <Col span={6}>
              <Space direction="vertical">
                <Button icon={<ReloadOutlined />} onClick={onRefresh}>
                  刷新
                </Button>
                <Button icon={<DownloadOutlined />} onClick={handleExport}>
                  导出
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default TopologyHeader;
