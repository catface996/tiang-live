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
import '../../../styles/diagnostic-reports.css';

const { Title, Text, Paragraph } = Typography;

// 使用主题适配的样式组件
const DiagnosticCard = styled(Card).attrs({
  className: 'diagnostic-card'
})``;

const MetricCard = styled(Card).attrs({
  className: 'metric-card'
})``;

const HealthScoreCard = styled.div.attrs<{ score: number }>(props => ({
  className: `health-score-card ${
    props.score >= 90 ? 'excellent' : 
    props.score >= 70 ? 'good' : 'poor'
  }`
}))<{ score: number }>``;

const SummaryCards = styled.div.attrs({
  className: 'summary-cards'
})``;

const DiagnosticReportsContainer = styled.div.attrs({
  className: 'diagnostic-reports'
})``;

const CollapseContainer = styled(Collapse).attrs({
  className: 'diagnostic-reports-collapse'
})``;

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
      
      // 显示所有可用的诊断报告
      let filteredReports = diagnosticData.diagnosticReports;
      
      // 如果指定了nodeIds且存在匹配的报告，则过滤报告
      if (stableNodeIds && stableNodeIds.length > 0) {
        const matchedReports = diagnosticData.diagnosticReports.filter(
          report => stableNodeIds.includes(report.nodeId)
        );
        // 如果有匹配的报告，使用过滤后的；否则显示所有报告
        if (matchedReports.length > 0) {
          filteredReports = matchedReports;
        }
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

  // 格式化数值，最多保留3位小数
  const formatNumber = (value: number | string): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return String(value);
    
    // 如果是整数，直接返回
    if (num % 1 === 0) return String(num);
    
    // 保留最多3位小数，去掉末尾的0
    return parseFloat(num.toFixed(3)).toString();
  };

  // 获取健康度颜色
  const getHealthColor = (health: string) => {
    return diagnosticData.metricHealthLevels[health as keyof typeof diagnosticData.metricHealthLevels]?.color || '#d9d9d9';
  };

  // 获取节点类型颜色
  const getNodeTypeColor = (nodeType: string) => {
    const colorMap: Record<string, string> = {
      '业务场景': 'purple',
      '业务链路': 'blue', 
      '业务系统': 'green',
      '中间件': 'orange',
      '基础设施': 'red',
      // 兼容旧的类型
      'entity': 'blue',
      'sequence': 'green'
    };
    return colorMap[nodeType] || 'default';
  };

  // 计算风险项数量
  const calculateRiskItems = (report: any) => {
    let riskCount = 0;
    
    // 1. 统计健康状态异常的指标
    report.actions.forEach((action: any) => {
      if (action.metrics) {
        action.metrics.forEach((metric: any) => {
          if (metric.health === 'critical' || metric.health === 'warning') {
            riskCount++;
          }
        });
      }
    });
    
    // 2. 统计失败的动作
    const failedActions = report.actions.filter((action: any) => 
      action.status === 'error' || action.status === 'failed'
    );
    riskCount += failedActions.length;
    
    // 3. 如果整体风险等级为high或critical，额外增加风险项
    if (report.analysis.riskLevel === 'high' || report.analysis.riskLevel === 'critical') {
      riskCount += 1;
    }
    
    return riskCount;
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
            value={formatNumber(metric.actualValue)}
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
            percent={Math.round(metric.healthScore)}
            strokeColor={getHealthColor(metric.health)}
            format={() => formatNumber(metric.healthScore)}
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
            <span>(上次: {formatNumber(metric.previousValue)}{metric.unit})</span>
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
            value={formatNumber(action.duration)}
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
            percent={Math.round(action.overallScore)}
            strokeColor={action.overallScore >= 90 ? '#52c41a' : action.overallScore >= 70 ? '#faad14' : '#ff4d4f'}
            format={() => formatNumber(action.overallScore)}
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
        <div className="collapse-label">
          <div className="collapse-label-left">
            <Badge 
              status={
                report.status === 'completed' ? 'success' :
                report.status === 'running' ? 'processing' :
                report.status === 'failed' ? 'error' : 'default'
              }
            />
            <span className="node-name">{report.nodeName}</span>
            <Tag color={getNodeTypeColor(report.nodeType)}>
              {report.nodeType}
            </Tag>
            <Tag color={riskConfig.color}>
              {riskConfig.label}
            </Tag>
          </div>
          <div className="collapse-label-right">
            <Tooltip title="整体健康评分">
              <div className="health-score">
                <TrophyOutlined className="status-warning" />
                <span className="score-text">
                  {formatNumber(report.analysis.overallHealthScore)}/100
                </span>
              </div>
            </Tooltip>
            <span className="stat-item">
              动作: {report.actions.length}项
            </span>
            <span className="stat-item">
              建议: {report.analysis.recommendations.length}条
            </span>
            <span className={`stat-item ${calculateRiskItems(report) > 0 ? 'risk-warning' : ''}`}>
              风险: {calculateRiskItems(report)}项
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
                  value={formatNumber(report.analysis.overallHealthScore)}
                  suffix="/100"
                  valueStyle={{ 
                    fontSize: 32, 
                    fontWeight: 'bold'
                  }}
                  className={`score-value ${
                    report.analysis.overallHealthScore >= 90 ? 'excellent' : 
                    report.analysis.overallHealthScore >= 70 ? 'good' : 'poor'
                  }`}
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
                  <Text>{formatNumber(report.executionTime.totalDuration || 0)}秒</Text>
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
          <SummaryCards>
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
          </SummaryCards>

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
    <DiagnosticReportsContainer>
      <CollapseContainer 
        defaultActiveKey={['0']} 
        ghost 
        items={collapseItems}
      />
    </DiagnosticReportsContainer>
  );
};

export default DiagnosticReports;
