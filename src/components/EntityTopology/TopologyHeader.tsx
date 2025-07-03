import React from 'react';
import { Typography, Tag, Space, Row, Col, Statistic } from 'antd';
import { NodeIndexOutlined, LinkOutlined, HeartOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['entityTopology', 'common']);

  return (
    <div className="topology-header-full-width">
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
          <Row gutter={[24, 16]}>
            <Col span={8}>
              <Statistic
                title={t('detail.header.stats.nodeCount')}
                value={topologyData.stats.nodeCount}
                prefix={<NodeIndexOutlined />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={t('detail.header.stats.linkCount')}
                value={topologyData.stats.linkCount}
                prefix={<LinkOutlined />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={t('detail.header.stats.healthScore')}
                value={topologyData.stats.healthScore}
                suffix="%"
                prefix={<HeartOutlined />}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default TopologyHeader;
