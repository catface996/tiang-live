import React, { useEffect } from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import {
  AppstoreOutlined,
  NodeIndexOutlined,
  ShareAltOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import { setPageTitle } from '../../utils';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  useEffect(() => {
    setPageTitle('仪表盘');
  }, []);
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>仪表盘</Title>
      </div>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="平面总数"
              value={12}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="实体总数"
              value={1128}
              prefix={<NodeIndexOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="关系总数"
              value={2456}
              prefix={<ShareAltOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="AI智能体"
              value={89}
              prefix={<RobotOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="系统状态" bordered={false}>
            <p>系统运行正常，所有服务状态良好。</p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="最近活动" bordered={false}>
            <p>暂无最近活动记录。</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
