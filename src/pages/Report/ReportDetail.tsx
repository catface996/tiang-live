import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
  Space, 
  Button, 
  Row, 
  Col, 
  Statistic,
  Badge,
  Tag,
  Descriptions,
  Divider,
  Progress,
  Table,
  Timeline,
  Alert,
  Breadcrumb,
  theme,
  Spin
} from 'antd';
import { 
  ArrowLeftOutlined,
  FileTextOutlined, 
  DownloadOutlined,
  ShareAltOutlined,
  PrinterOutlined,
  CalendarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setPageTitle } from '../../utils';
import { useAppSelector } from '../../store';

const { Title, Paragraph, Text } = Typography;

const PageContainer = styled.div<{ $isDark: boolean }>`
  padding: 24px;
  min-height: 100vh;
  background: ${props => props.$isDark ? '#000000' : '#f5f5f5'};
  transition: all 0.3s ease;
`;

const ContentCard = styled(Card)<{ $isDark: boolean }>`
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: ${props => props.$isDark 
    ? '0 2px 8px rgba(255, 255, 255, 0.05)' 
    : '0 2px 8px rgba(0, 0, 0, 0.06)'
  };
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  transition: all 0.3s ease;
  
  .ant-card-body {
    padding: 24px;
  }
  
  .ant-card-head {
    background: ${props => props.$isDark ? '#141414' : '#ffffff'};
    border-bottom: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  }
`;

const StatsCard = styled(Card)<{ $isDark: boolean }>`
  text-align: center;
  border-radius: 8px;
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  transition: all 0.3s ease;
  
  .ant-statistic-content {
    color: ${props => props.$isDark ? '#ffffff' : '#262626'};
  }
`;

const ReportDetail: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<any>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentTheme } = useAppSelector((state) => state.theme);
  const { token } = theme.useToken();
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    setPageTitle(t('reports.detail.title'));
    // 模拟加载报告数据
    setTimeout(() => {
      setReportData(getMockReportData(id));
      setLoading(false);
    }, 1000);
  }, [t, id]);

  // 模拟报告数据
  const getMockReportData = (reportId: string | undefined) => {
    const reports = {
      '1': {
        id: '1',
        name: '系统健康度分析报告',
        type: 'health',
        status: 'published',
        author: '系统管理员',
        createdAt: '2024-06-15 10:30:00',
        lastModified: '2024-06-15 14:20:00',
        size: '2.5MB',
        downloads: 156,
        description: '本报告全面分析了系统的健康状况，包括服务可用性、性能指标、错误率等关键指标。通过多维度数据分析，为系统优化提供决策支持。报告涵盖了过去30天的运行数据，识别出关键问题并提供具体的改进建议。',
        summary: {
          totalServices: 45,
          healthyServices: 42,
          warningServices: 2,
          criticalServices: 1,
          overallScore: 93.3
        },
        sections: [
          {
            title: '执行摘要',
            content: '系统整体健康状况良好，93.3%的服务运行正常。在监控的45个核心服务中，42个服务状态健康，2个服务存在性能警告，1个服务需要紧急处理。主要问题集中在通知服务的响应时间过长和支付服务的错误率偏高。建议优先处理通知服务的性能瓶颈，预计修复后系统整体评分可提升至96%以上。',
            type: 'summary'
          },
          {
            title: '服务状态详细分析',
            content: '以下是各核心服务的详细运行状态分析，包括响应时间、错误率、可用性等关键指标。数据基于过去30天的监控记录。',
            type: 'analysis',
            data: [
              { service: '用户认证服务', status: 'healthy', responseTime: '85ms', errorRate: '0.02%', availability: '99.98%', requests: '2.3M' },
              { service: '用户管理服务', status: 'healthy', responseTime: '120ms', errorRate: '0.1%', availability: '99.95%', requests: '1.8M' },
              { service: '订单处理服务', status: 'healthy', responseTime: '95ms', errorRate: '0.05%', availability: '99.97%', requests: '890K' },
              { service: '库存管理服务', status: 'healthy', responseTime: '110ms', errorRate: '0.08%', availability: '99.96%', requests: '1.2M' },
              { service: '支付处理服务', status: 'warning', responseTime: '280ms', errorRate: '0.8%', availability: '99.2%', requests: '650K' },
              { service: '物流跟踪服务', status: 'healthy', responseTime: '150ms', errorRate: '0.15%', availability: '99.9%', requests: '420K' },
              { service: '通知推送服务', status: 'critical', responseTime: '1200ms', errorRate: '5.2%', availability: '95.8%', requests: '3.1M' },
              { service: '数据分析服务', status: 'healthy', responseTime: '200ms', errorRate: '0.12%', availability: '99.85%', requests: '180K' },
              { service: '搜索引擎服务', status: 'healthy', responseTime: '75ms', errorRate: '0.03%', availability: '99.99%', requests: '2.8M' },
              { service: '文件存储服务', status: 'healthy', responseTime: '45ms', errorRate: '0.01%', availability: '99.99%', requests: '1.5M' }
            ]
          },
          {
            title: '性能指标趋势分析',
            content: '过去30天的关键性能指标变化趋势显示，系统整体性能稳定，但在高峰时段（每日10:00-12:00和19:00-21:00）存在性能压力。通知服务在6月10日开始出现性能下降，支付服务的错误率在6月12日有明显上升。',
            type: 'trend',
            metrics: [
              { name: '平均响应时间', current: '185ms', trend: '+12%', status: 'warning' },
              { name: '系统吞吐量', current: '15.2K req/s', trend: '+8%', status: 'good' },
              { name: '错误率', current: '0.23%', trend: '+0.15%', status: 'warning' },
              { name: '系统可用性', current: '99.1%', trend: '-0.8%', status: 'critical' }
            ]
          },
          {
            title: '资源使用情况',
            content: '系统资源使用情况整体合理，但部分服务存在资源瓶颈。通知服务的CPU使用率持续偏高，内存使用量接近阈值。',
            type: 'resources',
            data: [
              { resource: 'CPU使用率', usage: '68%', threshold: '80%', status: 'normal' },
              { resource: '内存使用率', usage: '72%', threshold: '85%', status: 'normal' },
              { resource: '磁盘使用率', usage: '45%', threshold: '90%', status: 'good' },
              { resource: '网络带宽', usage: '35%', threshold: '70%', status: 'good' },
              { resource: '数据库连接', usage: '156/200', threshold: '180', status: 'normal' }
            ]
          },
          {
            title: '建议与行动计划',
            content: '基于分析结果，我们提出以下优化建议和具体行动计划。建议按优先级顺序执行，以最大化系统性能提升效果。',
            type: 'recommendations',
            recommendations: [
              { 
                priority: 'high', 
                item: '立即修复通知服务的性能问题，优化消息队列处理逻辑', 
                deadline: '2024-06-20',
                assignee: '后端开发团队',
                estimatedHours: '16小时',
                impact: '预计可提升系统整体可用性2.5%'
              },
              { 
                priority: 'high', 
                item: '优化支付服务的错误处理机制，增加重试逻辑', 
                deadline: '2024-06-22',
                assignee: '支付团队',
                estimatedHours: '12小时',
                impact: '预计可降低支付错误率至0.2%以下'
              },
              { 
                priority: 'medium', 
                item: '扩容通知服务的计算资源，增加2个实例', 
                deadline: '2024-06-25',
                assignee: '运维团队',
                estimatedHours: '4小时',
                impact: '提升通知服务处理能力50%'
              },
              { 
                priority: 'medium', 
                item: '建立更完善的监控告警机制，增加预警阈值', 
                deadline: '2024-06-30',
                assignee: '监控团队',
                estimatedHours: '20小时',
                impact: '提前发现潜在问题，减少故障时间'
              },
              { 
                priority: 'low', 
                item: '优化数据库查询性能，添加必要的索引', 
                deadline: '2024-07-05',
                assignee: 'DBA团队',
                estimatedHours: '8小时',
                impact: '提升查询性能15-20%'
              }
            ]
          }
        ]
      },
      '2': {
        id: '2',
        name: '平面依赖关系分析报告',
        type: 'dependency',
        status: 'published',
        author: '架构师团队',
        createdAt: '2024-06-10 09:15:00',
        lastModified: '2024-06-12 16:45:00',
        size: '3.8MB',
        downloads: 89,
        description: '深入分析系统各平面之间的依赖关系，识别潜在的架构风险和优化机会。本报告通过静态代码分析和运行时依赖追踪，全面梳理了系统的依赖图谱，发现了2个循环依赖问题和多个可优化的依赖路径。',
        summary: {
          totalPlanes: 12,
          dependencies: 34,
          circularDeps: 2,
          riskLevel: 'medium',
          complexityScore: 7.2
        },
        sections: [
          {
            title: '依赖关系概览',
            content: '系统共包含12个核心平面，相互之间存在34个依赖关系。整体架构复杂度适中，但存在2个循环依赖需要重点关注。依赖深度最大为5层，平均依赖度为2.8。',
            type: 'summary'
          },
          {
            title: '平面依赖详情',
            content: '以下是各平面的详细依赖关系分析，包括直接依赖、间接依赖和风险评估。',
            type: 'analysis',
            data: [
              { plane: '用户管理平面', directDeps: 3, indirectDeps: 8, riskLevel: 'low', complexity: 'simple' },
              { plane: '订单处理平面', directDeps: 5, indirectDeps: 12, riskLevel: 'medium', complexity: 'moderate' },
              { plane: '支付处理平面', directDeps: 4, indirectDeps: 9, riskLevel: 'high', complexity: 'moderate' },
              { plane: '库存管理平面', directDeps: 2, indirectDeps: 6, riskLevel: 'low', complexity: 'simple' },
              { plane: '物流跟踪平面', directDeps: 3, indirectDeps: 7, riskLevel: 'low', complexity: 'simple' },
              { plane: '通知推送平面', directDeps: 6, indirectDeps: 15, riskLevel: 'high', complexity: 'complex' },
              { plane: '数据分析平面', directDeps: 4, indirectDeps: 11, riskLevel: 'medium', complexity: 'moderate' },
              { plane: '搜索引擎平面', directDeps: 2, indirectDeps: 5, riskLevel: 'low', complexity: 'simple' }
            ]
          },
          {
            title: '循环依赖分析',
            content: '发现2个循环依赖问题，需要优先解决以降低系统耦合度和维护复杂性。',
            type: 'circular',
            issues: [
              {
                cycle: '订单处理平面 → 支付处理平面 → 通知推送平面 → 订单处理平面',
                impact: 'high',
                description: '该循环依赖导致三个核心业务平面紧密耦合，影响独立部署和测试'
              },
              {
                cycle: '用户管理平面 → 数据分析平面 → 用户管理平面',
                impact: 'medium',
                description: '用户数据和分析结果之间的双向依赖，可通过事件驱动模式解耦'
              }
            ]
          },
          {
            title: '优化建议',
            content: '基于依赖分析结果，提出以下架构优化建议。',
            type: 'recommendations',
            recommendations: [
              {
                priority: 'high',
                item: '解决订单-支付-通知的循环依赖，引入事件总线模式',
                deadline: '2024-07-01',
                assignee: '架构团队',
                estimatedHours: '40小时',
                impact: '降低核心业务平面耦合度，提升系统可维护性'
              },
              {
                priority: 'medium',
                item: '重构用户管理和数据分析的依赖关系，采用异步消息传递',
                deadline: '2024-07-15',
                assignee: '后端开发团队',
                estimatedHours: '24小时',
                impact: '提升用户管理平面的独立性'
              },
              {
                priority: 'medium',
                item: '建立依赖关系监控机制，定期检测新的循环依赖',
                deadline: '2024-07-20',
                assignee: '架构团队',
                estimatedHours: '16小时',
                impact: '预防新的架构问题产生'
              }
            ]
          }
        ]
      },
      '3': {
        id: '3',
        name: '性能基准测试报告',
        type: 'performance',
        status: 'published',
        author: '性能测试团队',
        createdAt: '2024-06-08 14:20:00',
        lastModified: '2024-06-09 11:30:00',
        size: '4.2MB',
        downloads: 234,
        description: '全面的系统性能基准测试报告，涵盖负载测试、压力测试、容量测试等多个维度。测试模拟了真实业务场景下的用户行为，评估了系统在不同负载条件下的性能表现。',
        summary: {
          maxConcurrentUsers: 10000,
          avgResponseTime: '185ms',
          throughput: '15200 req/s',
          errorRate: '0.23%',
          performanceScore: 8.5
        },
        sections: [
          {
            title: '测试环境与方法',
            content: '本次性能测试在生产环境的镜像环境中进行，硬件配置与生产环境完全一致。测试工具使用JMeter和LoadRunner，模拟真实用户行为模式，包括登录、浏览、下单、支付等完整业务流程。',
            type: 'summary'
          },
          {
            title: '负载测试结果',
            content: '在不同并发用户数下的系统性能表现如下：',
            type: 'analysis',
            data: [
              { users: '100', responseTime: '45ms', throughput: '2.2K req/s', errorRate: '0%', cpuUsage: '15%' },
              { users: '500', responseTime: '78ms', throughput: '6.4K req/s', errorRate: '0.01%', cpuUsage: '28%' },
              { users: '1000', responseTime: '125ms', throughput: '8.9K req/s', errorRate: '0.05%', cpuUsage: '42%' },
              { users: '2000', responseTime: '185ms', throughput: '12.1K req/s', errorRate: '0.12%', cpuUsage: '58%' },
              { users: '5000', responseTime: '320ms', throughput: '15.2K req/s', errorRate: '0.23%', cpuUsage: '75%' },
              { users: '8000', responseTime: '580ms', throughput: '16.8K req/s', errorRate: '0.45%', cpuUsage: '88%' },
              { users: '10000', responseTime: '850ms', throughput: '17.2K req/s', errorRate: '1.2%', cpuUsage: '95%' }
            ]
          },
          {
            title: '性能瓶颈分析',
            content: '通过性能分析工具识别出以下主要性能瓶颈：',
            type: 'bottlenecks',
            issues: [
              {
                component: '数据库连接池',
                description: '在高并发情况下连接池成为瓶颈，建议增加连接数',
                impact: 'high',
                solution: '将连接池大小从200增加到500'
              },
              {
                component: 'Redis缓存',
                description: '缓存命中率在高负载下降低，影响响应时间',
                impact: 'medium',
                solution: '优化缓存策略，增加缓存容量'
              },
              {
                component: 'JVM垃圾回收',
                description: 'Full GC频率过高，导致响应时间波动',
                impact: 'medium',
                solution: '调整JVM参数，优化垃圾回收策略'
              }
            ]
          },
          {
            title: '优化建议',
            content: '基于性能测试结果，提出以下优化建议：',
            type: 'recommendations',
            recommendations: [
              {
                priority: 'high',
                item: '扩容数据库连接池，优化连接管理策略',
                deadline: '2024-06-25',
                assignee: 'DBA团队',
                estimatedHours: '8小时',
                impact: '预计可提升高并发性能30%'
              },
              {
                priority: 'high',
                item: '优化JVM参数配置，减少GC停顿时间',
                deadline: '2024-06-28',
                assignee: '后端开发团队',
                estimatedHours: '12小时',
                impact: '降低响应时间波动，提升用户体验'
              },
              {
                priority: 'medium',
                item: '增加Redis集群节点，提升缓存性能',
                deadline: '2024-07-05',
                assignee: '运维团队',
                estimatedHours: '16小时',
                impact: '提升缓存命中率和响应速度'
              }
            ]
          }
        ]
      },
      '4': {
        id: '4',
        name: '安全风险评估报告',
        type: 'security',
        status: 'draft',
        author: '安全团队',
        createdAt: '2024-06-12 16:00:00',
        lastModified: '2024-06-14 10:15:00',
        size: '1.8MB',
        downloads: 45,
        description: '系统安全风险全面评估报告，包括漏洞扫描、渗透测试、代码安全审计等多个维度的安全分析。识别了潜在的安全风险点并提供相应的修复建议。',
        summary: {
          totalVulnerabilities: 23,
          highRisk: 2,
          mediumRisk: 8,
          lowRisk: 13,
          securityScore: 7.8
        },
        sections: [
          {
            title: '安全评估概述',
            content: '本次安全评估采用OWASP Top 10标准，结合自动化扫描工具和人工渗透测试，全面评估系统安全状况。发现23个安全问题，其中高危2个，中危8个，低危13个。',
            type: 'summary'
          },
          {
            title: '漏洞详情分析',
            content: '按风险等级分类的漏洞详情：',
            type: 'analysis',
            data: [
              { category: 'SQL注入', count: 3, riskLevel: 'medium', status: 'open', affectedComponents: '用户查询接口' },
              { category: 'XSS跨站脚本', count: 5, riskLevel: 'low', status: 'open', affectedComponents: '前端表单' },
              { category: '身份认证绕过', count: 1, riskLevel: 'high', status: 'open', affectedComponents: '管理后台' },
              { category: '敏感信息泄露', count: 2, riskLevel: 'medium', status: 'open', affectedComponents: '错误页面' },
              { category: '权限提升', count: 1, riskLevel: 'high', status: 'open', affectedComponents: 'API接口' },
              { category: '不安全的加密', count: 4, riskLevel: 'medium', status: 'open', affectedComponents: '密码存储' },
              { category: '配置错误', count: 7, riskLevel: 'low', status: 'open', affectedComponents: '服务器配置' }
            ]
          },
          {
            title: '修复建议',
            content: '针对发现的安全问题，按优先级提供修复建议：',
            type: 'recommendations',
            recommendations: [
              {
                priority: 'high',
                item: '修复管理后台身份认证绕过漏洞，加强访问控制',
                deadline: '2024-06-18',
                assignee: '安全开发团队',
                estimatedHours: '16小时',
                impact: '防止未授权访问管理功能'
              },
              {
                priority: 'high',
                item: '修复API接口权限提升漏洞，实施严格的权限检查',
                deadline: '2024-06-20',
                assignee: '后端开发团队',
                estimatedHours: '12小时',
                impact: '防止普通用户获取管理员权限'
              },
              {
                priority: 'medium',
                item: '修复SQL注入漏洞，使用参数化查询',
                deadline: '2024-06-25',
                assignee: '后端开发团队',
                estimatedHours: '20小时',
                impact: '防止数据库被恶意访问'
              }
            ]
          }
        ]
      }
    };
    
    return reports[reportId as keyof typeof reports] || reports['1'];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      published: 'green',
      draft: 'orange',
      archived: 'default'
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts = {
      published: t('reports.status.published'),
      draft: t('reports.status.draft'),
      archived: t('reports.status.archived')
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getServiceStatusColor = (status: string) => {
    const colors = {
      healthy: 'success',
      warning: 'warning',
      critical: 'error'
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'red',
      medium: 'orange',
      low: 'blue'
    };
    return colors[priority as keyof typeof colors] || 'default';
  };

  const serviceColumns = [
    {
      title: t('reports.detail.service'),
      dataIndex: 'service',
      key: 'service',
      width: '25%',
    },
    {
      title: t('reports.detail.status'),
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: string) => (
        <Badge 
          status={getServiceStatusColor(status)} 
          text={status === 'healthy' ? t('reports.detail.healthy') : 
                status === 'warning' ? t('reports.detail.warning') : 
                t('reports.detail.critical')} 
        />
      ),
    },
    {
      title: t('reports.detail.responseTime'),
      dataIndex: 'responseTime',
      key: 'responseTime',
      width: '15%',
    },
    {
      title: t('reports.detail.errorRate'),
      dataIndex: 'errorRate',
      key: 'errorRate',
      width: '15%',
    },
    {
      title: t('reports.detail.availability'),
      dataIndex: 'availability',
      key: 'availability',
      width: '15%',
    },
    {
      title: t('reports.detail.requests'),
      dataIndex: 'requests',
      key: 'requests',
      width: '15%',
    },
  ];

  if (loading) {
    return (
      <PageContainer $isDark={isDark}>
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16, color: isDark ? '#ffffff' : '#666666' }}>
            {t('reports.detail.loading')}
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!reportData) {
    return (
      <PageContainer $isDark={isDark}>
        <Alert
          message={t('reports.detail.notFound')}
          description={t('reports.detail.notFoundDesc')}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={() => navigate('/reports')}>
              {t('common.back')}
            </Button>
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer $isDark={isDark}>
      {/* 面包屑导航 */}
      <Breadcrumb style={{ marginBottom: 24 }}>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span onClick={() => navigate('/reports')} style={{ cursor: 'pointer' }}>
            {t('reports.title')}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{reportData.name}</Breadcrumb.Item>
      </Breadcrumb>

      {/* 报告头部 */}
      <ContentCard $isDark={isDark}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div style={{ flex: 1 }}>
            <Title level={2} style={{ margin: 0, color: isDark ? '#ffffff' : '#262626' }}>
              <FileTextOutlined style={{ marginRight: 12 }} />
              {reportData.name}
            </Title>
            <Space style={{ marginTop: 8 }}>
              <Tag color={getStatusColor(reportData.status)}>
                {getStatusText(reportData.status)}
              </Tag>
              <Text type="secondary">
                <UserOutlined /> {reportData.author}
              </Text>
              <Text type="secondary">
                <CalendarOutlined /> {reportData.createdAt}
              </Text>
            </Space>
          </div>
          <Space>
            <Button icon={<ShareAltOutlined />}>
              {t('reports.detail.share')}
            </Button>
            <Button icon={<PrinterOutlined />}>
              {t('reports.detail.print')}
            </Button>
            <Button type="primary" icon={<DownloadOutlined />}>
              {t('reports.detail.download')}
            </Button>
          </Space>
        </div>

        <Paragraph style={{ color: isDark ? '#ffffff' : '#595959', fontSize: 16 }}>
          {reportData.description}
        </Paragraph>

        <Descriptions column={4} style={{ marginTop: 24 }}>
          <Descriptions.Item label={t('reports.detail.fileSize')}>
            {reportData.size}
          </Descriptions.Item>
          <Descriptions.Item label={t('reports.detail.downloads')}>
            {reportData.downloads}
          </Descriptions.Item>
          <Descriptions.Item label={t('reports.detail.lastModified')}>
            {reportData.lastModified}
          </Descriptions.Item>
          <Descriptions.Item label={t('reports.detail.reportId')}>
            {reportData.id}
          </Descriptions.Item>
        </Descriptions>
      </ContentCard>

      {/* 报告摘要统计 */}
      {reportData.summary && (
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('reports.detail.totalServices')}
                value={reportData.summary.totalServices}
                prefix={<BarChartOutlined />}
                valueStyle={{ color: isDark ? '#1890ff' : '#1890ff' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('reports.detail.healthyServices')}
                value={reportData.summary.healthyServices}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: isDark ? '#52c41a' : '#52c41a' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('reports.detail.warningServices')}
                value={reportData.summary.warningServices}
                prefix={<ExclamationCircleOutlined />}
                valueStyle={{ color: isDark ? '#faad14' : '#faad14' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('reports.detail.overallScore')}
                value={reportData.summary.overallScore}
                suffix="%"
                prefix={<PieChartOutlined />}
                valueStyle={{ color: isDark ? '#722ed1' : '#722ed1' }}
              />
            </StatsCard>
          </Col>
        </Row>
      )}

      {/* 报告内容 */}
      {reportData.sections?.map((section: any, index: number) => (
        <ContentCard key={index} $isDark={isDark} title={section.title}>
          <Paragraph style={{ color: isDark ? '#ffffff' : '#595959' }}>
            {section.content}
          </Paragraph>

          {section.type === 'analysis' && section.data && (
            <Table
              columns={serviceColumns}
              dataSource={section.data}
              pagination={false}
              size="middle"
              style={{ marginTop: 16 }}
            />
          )}

          {section.type === 'trend' && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <LineChartOutlined style={{ fontSize: 48, color: isDark ? '#1890ff' : '#1890ff' }} />
              <div style={{ marginTop: 16, color: isDark ? '#ffffff' : '#666666' }}>
                {t('reports.detail.chartPlaceholder')}
              </div>
            </div>
          )}

          {section.type === 'recommendations' && section.recommendations && (
            <Timeline style={{ marginTop: 16 }}>
              {section.recommendations.map((rec: any, idx: number) => (
                <Timeline.Item
                  key={idx}
                  color={getPriorityColor(rec.priority)}
                  dot={
                    rec.priority === 'high' ? <ExclamationCircleOutlined /> :
                    rec.priority === 'medium' ? <InfoCircleOutlined /> :
                    <CheckCircleOutlined />
                  }
                >
                  <div>
                    <Space>
                      <Tag color={getPriorityColor(rec.priority)}>
                        {rec.priority === 'high' ? t('reports.detail.highPriority') :
                         rec.priority === 'medium' ? t('reports.detail.mediumPriority') :
                         t('reports.detail.lowPriority')}
                      </Tag>
                      <Text strong style={{ color: isDark ? '#ffffff' : '#262626' }}>
                        {rec.item}
                      </Text>
                    </Space>
                    <div style={{ marginTop: 8, paddingLeft: 0 }}>
                      <Row gutter={[16, 8]}>
                        <Col span={12}>
                          <Text type="secondary">
                            <ClockCircleOutlined /> {t('reports.detail.deadline')}: {rec.deadline}
                          </Text>
                        </Col>
                        {rec.assignee && (
                          <Col span={12}>
                            <Text type="secondary">
                              <UserOutlined /> {t('reports.detail.assignee')}: {rec.assignee}
                            </Text>
                          </Col>
                        )}
                        {rec.estimatedHours && (
                          <Col span={12}>
                            <Text type="secondary">
                              <ClockCircleOutlined /> {t('reports.detail.estimatedHours')}: {rec.estimatedHours}
                            </Text>
                          </Col>
                        )}
                        {rec.impact && (
                          <Col span={24}>
                            <Text type="secondary" style={{ fontStyle: 'italic' }}>
                              {t('reports.detail.expectedImpact')}: {rec.impact}
                            </Text>
                          </Col>
                        )}
                      </Row>
                    </div>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          )}
        </ContentCard>
      ))}
    </PageContainer>
  );
};

export default ReportDetail;
