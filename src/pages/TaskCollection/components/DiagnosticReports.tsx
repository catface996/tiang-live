import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Card,
  Alert,
  Collapse,
  Badge,
  Tag,
  Row,
  Col,
  Typography,
  List,
  Progress,
  Statistic,
  Divider,
  Tooltip,
  Space
} from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  HeartOutlined,
  BarChartOutlined,
  BugOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  RiseOutlined,
  FallOutlined,
  MinusOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import diagnosticData from '../../../data/diagnosticReportsData.json';

const { Title, Text, Paragraph } = Typography;

const DiagnosticCard = styled(Card)`
  margin-bottom: 16px;
  
  .ant-card-head {
    padding: 12px 16px;
    min-height: auto;
  }
  
  .ant-card-body {
    padding: 16px;
  }
`;

const MetricCard = styled(Card)`
  margin-bottom: 12px;
  border: 1px solid #f0f0f0;
  
  .ant-card-body {
    padding: 12px;
  }
`;

const HealthScoreCard = styled.div<{ score: number }>`
  padding: 16px;
  border-radius: 8px;
  background: ${props => 
    props.score >= 90 ? 'linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%)' :
    props.score >= 70 ? 'linear-gradient(135deg, #fffbe6 0%, #fff1b8 100%)' :
    'linear-gradient(135deg, #fff2f0 0%, #ffccc7 100%)'
  };
  border: 1px solid ${props => 
    props.score >= 90 ? '#b7eb8f' :
    props.score >= 70 ? '#ffe58f' :
    '#ffa39e'
  };
`;

interface DiagnosticReportsProps {
  nodeIds?: string[];
}

const DiagnosticReports: React.FC<DiagnosticReportsProps> = ({ nodeIds }) => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 使用 useMemo 来稳定化 nodeIds
  const stableNodeIds = useMemo(() => nodeIds, [JSON.stringify(nodeIds)]);

  const loadDiagnosticReports = useCallback(async () => {
    setLoading(true);
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let filteredReports = diagnosticData.diagnosticReports;
      
      // 如果指定了nodeIds，则过滤报告
      if (stableNodeIds && stableNodeIds.length > 0) {
        filteredReports = diagnosticData.diagnosticReports.filter(
          report => stableNodeIds.includes(report.nodeId)
        );
      }
      
      setReports(filteredReports);
    } catch (error) {
      console.error('加载诊断报告失败:', error);
    } finally {
      setLoading(false);
    }
  }, [stableNodeIds]);

  useEffect(() => {
    loadDiagnosticReports();
  }, [loadDiagnosticReports]);

  // 获取健康度颜色
  const getHealthColor = (health: string) => {
    return diagnosticData.metricHealthLevels[health as keyof typeof diagnosticData.metricHealthLevels]?.color || '#d9d9d9';
  };

  // 获取健康度图标
  const getHealthIcon = (health: string) => {
    const color = getHealthColor(health);
    switch (health) {
      case 'healthy':
        return <CheckCircleOutlined style={{ color }} />;
      case 'warning':
        return <WarningOutlined style={{ color }} />;
      case 'critical':
        return <ExclamationCircleOutlined style={{ color }} />;
      default:
        return <InfoCircleOutlined style={{ color }} />;
    }
  };

  // 获取动作图标
  const getActionIcon = (actionType: string) => {
    const actionConfig = diagnosticData.actionTypes[actionType as keyof typeof diagnosticData.actionTypes];
    const color = actionConfig?.color || '#666';
    
    switch (actionType) {
      case 'health_check':
        return <HeartOutlined style={{ color }} />;
      case 'performance_analysis':
        return <BarChartOutlined style={{ color }} />;
      case 'fault_analysis':
        return <BugOutlined style={{ color }} />;
      case 'security_scan':
        return <SafetyCertificateOutlined style={{ color }} />;
      default:
        return <FileTextOutlined style={{ color }} />;
    }
  };

  // 获取趋势图标
  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return <RiseOutlined style={{ color: '#ff4d4f' }} />;
      case 'down':
        return <FallOutlined style={{ color: '#52c41a' }} />;
      case 'stable':
        return <MinusOutlined style={{ color: '#1890ff' }} />;
      default:
        return null;
    }
  };

  // 获取风险等级配置
  const getRiskConfig = (riskLevel: string) => {
    return diagnosticData.riskLevels[riskLevel as keyof typeof diagnosticData.riskLevels] || {
      color: '#d9d9d9',
      label: '未知',
      description: '未知风险等级'
    };
  };

  // 渲染指标检查结果
  const renderMetricCheck = (metric: any) => (
    <MetricCard key={metric.id} size="small">
      <Row gutter={16} align="middle">
        <Col span={8}>
          <div>
            <Text strong>{metric.name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {metric.description}
            </Text>
          </div>
        </Col>
        <Col span={4}>
          <Statistic
            title="实际值"
            value={metric.actualValue}
            suffix={metric.unit}
            valueStyle={{ fontSize: 16 }}
          />
        </Col>
        <Col span={6}>
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>健康范围</Text>
            <br />
            <Text style={{ fontSize: 12 }}>
              {metric.healthyRange.description}
            </Text>
          </div>
        </Col>
        <Col span={3}>
          <div style={{ textAlign: 'center' }}>
            {getHealthIcon(metric.health)}
            <br />
            <Text style={{ fontSize: 12, color: getHealthColor(metric.health) }}>
              {diagnosticData.metricHealthLevels[metric.health as keyof typeof diagnosticData.metricHealthLevels]?.label || '未知'}
            </Text>
          </div>
        </Col>
        <Col span={3}>
          <Progress
            type="circle"
            size={40}
            percent={metric.healthScore}
            strokeColor={getHealthColor(metric.health)}
            format={() => `${metric.healthScore}`}
          />
        </Col>
      </Row>
      {metric.trend && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#666', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span>趋势:</span>
          {getTrendIcon(metric.trend)}
          <span>
            {metric.trend === 'up' ? '上升' : metric.trend === 'down' ? '下降' : '稳定'}
          </span>
          {metric.previousValue && (
            <span>(上次: {metric.previousValue}{metric.unit})</span>
          )}
        </div>
      )}
    </MetricCard>
  );

  // 渲染诊断动作
  const renderDiagnosticAction = (action: any) => (
    <Card key={action.id} size="small" style={{ marginBottom: 16 }}>
      <Row gutter={16} align="middle" style={{ marginBottom: 16 }}>
        <Col span={2}>
          {getActionIcon(action.type)}
        </Col>
        <Col span={10}>
          <Title level={5} style={{ margin: 0 }}>{action.name}</Title>
          <Text type="secondary">{action.description}</Text>
        </Col>
        <Col span={4}>
          <Statistic
            title="执行时长"
            value={action.duration}
            suffix="秒"
            valueStyle={{ fontSize: 14 }}
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="指标数量"
            value={action.metrics.length}
            suffix="项"
            valueStyle={{ fontSize: 14 }}
          />
        </Col>
        <Col span={4}>
          <Progress
            type="circle"
            size={50}
            percent={action.overallScore}
            strokeColor={action.overallScore >= 90 ? '#52c41a' : action.overallScore >= 70 ? '#faad14' : '#ff4d4f'}
            format={() => `${action.overallScore}`}
          />
        </Col>
      </Row>
      
      <Divider style={{ margin: '12px 0' }} />
      
      <div style={{ marginBottom: 16 }}>
        <Text strong>执行摘要: </Text>
        <Text>{action.summary}</Text>
      </div>
      
      <Title level={5}>指标检查详情</Title>
      {action.metrics.map(renderMetricCheck)}
    </Card>
  );

  // 渲染建议
  const renderRecommendations = (recommendations: any[]) => (
    <List
      dataSource={recommendations}
      renderItem={(rec) => (
        <List.Item>
          <Card size="small" style={{ width: '100%' }}>
            <Row gutter={16} align="top">
              <Col span={2}>
                <Tag color={rec.priority === 'high' ? 'red' : rec.priority === 'medium' ? 'orange' : 'blue'}>
                  {rec.priority === 'high' ? '高' : rec.priority === 'medium' ? '中' : '低'}
                </Tag>
              </Col>
              <Col span={3}>
                <Tag color="purple">
                  {rec.category === 'performance' ? '性能' :
                   rec.category === 'security' ? '安全' :
                   rec.category === 'reliability' ? '可靠性' : '维护'}
                </Tag>
              </Col>
              <Col span={19}>
                <div>
                  <Text strong>{rec.title}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {rec.description}
                  </Text>
                  <br />
                  <Text style={{ fontSize: 12, color: '#1890ff' }}>
                    预期影响: {rec.estimatedImpact}
                  </Text>
                </div>
              </Col>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  );

  if (loading) {
    return <Alert message="正在加载诊断报告..." type="info" showIcon />;
  }

  if (!reports || reports.length === 0) {
    return (
      <Alert
        message="暂无诊断报告"
        description="节点执行完成后将生成详细的诊断报告"
        type="info"
        showIcon
      />
    );
  }

  const collapseItems = reports.map((report, index) => {
    const riskConfig = getRiskConfig(report.analysis.riskLevel);
    
    return {
      key: index.toString(),
      label: (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Badge 
              status={
                report.status === 'completed' ? 'success' :
                report.status === 'running' ? 'processing' :
                report.status === 'failed' ? 'error' : 'default'
              }
            />
            <span style={{ fontWeight: 'bold' }}>{report.nodeName}</span>
            <Tag color={report.nodeType === 'entity' ? 'blue' : 'green'}>
              {report.nodeType === 'entity' ? '实体' : '时序'}
            </Tag>
            <Tag color={riskConfig.color}>
              {riskConfig.label}
            </Tag>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Tooltip title="整体健康评分">
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <TrophyOutlined style={{ color: '#faad14' }} />
                <span style={{ fontSize: 14, fontWeight: 'bold' }}>
                  {report.analysis.overallHealthScore}/100
                </span>
              </div>
            </Tooltip>
            <span style={{ fontSize: 12, color: '#666' }}>
              动作: {report.actions.length}项
            </span>
            <span style={{ fontSize: 12, color: '#666' }}>
              建议: {report.analysis.recommendations.length}条
            </span>
          </div>
        </div>
      ),
      children: (
        <DiagnosticCard>
          {/* 整体健康评分 */}
          <HealthScoreCard score={report.analysis.overallHealthScore}>
            <Row gutter={16} align="middle">
              <Col span={8}>
                <Statistic
                  title="整体健康评分"
                  value={report.analysis.overallHealthScore}
                  suffix="/100"
                  valueStyle={{ 
                    fontSize: 32, 
                    fontWeight: 'bold',
                    color: report.analysis.overallHealthScore >= 90 ? '#52c41a' :
                           report.analysis.overallHealthScore >= 70 ? '#faad14' : '#ff4d4f'
                  }}
                  prefix={<TrophyOutlined />}
                />
              </Col>
              <Col span={8}>
                <div>
                  <Text strong>风险等级: </Text>
                  <Tag color={riskConfig.color} style={{ fontSize: 14 }}>
                    {riskConfig.label}
                  </Tag>
                </div>
                <div style={{ marginTop: 8 }}>
                  <Text strong>执行时长: </Text>
                  <Text>{report.executionTime.totalDuration || 0}秒</Text>
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <Text strong>最后更新: </Text>
                  <Text type="secondary">{report.lastUpdated}</Text>
                </div>
              </Col>
            </Row>
          </HealthScoreCard>

          <Divider />

          {/* 关键发现 */}
          <div style={{ marginBottom: 24 }}>
            <Title level={5}>
              <ThunderboltOutlined style={{ color: '#faad14', marginRight: 8 }} />
              关键发现
            </Title>
            <List
              size="small"
              dataSource={report.analysis.keyFindings}
              renderItem={(finding: string) => (
                <List.Item>
                  <Text>• {finding}</Text>
                </List.Item>
              )}
            />
          </div>

          {/* 性能和安全摘要 */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={12}>
              <Card size="small" title="性能摘要">
                <Paragraph style={{ fontSize: 13, margin: 0 }}>
                  {report.analysis.performanceSummary}
                </Paragraph>
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" title="安全摘要">
                <Paragraph style={{ fontSize: 13, margin: 0 }}>
                  {report.analysis.securitySummary}
                </Paragraph>
              </Card>
            </Col>
          </Row>

          {/* 诊断动作详情 */}
          <div style={{ marginBottom: 24 }}>
            <Title level={5}>诊断动作详情</Title>
            {report.actions.map(renderDiagnosticAction)}
          </div>

          {/* 优化建议 */}
          <div>
            <Title level={5}>优化建议</Title>
            {renderRecommendations(report.analysis.recommendations)}
          </div>
        </DiagnosticCard>
      )
    };
  });

  return (
    <Collapse 
      defaultActiveKey={['0']} 
      ghost 
      items={collapseItems}
    />
  );
};

export default DiagnosticReports;
