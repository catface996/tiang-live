import type { Report } from '../types/report';

// 重新导出类型以便其他地方使用
export type { Report } from '../types/report';

// 完整的报告模拟数据 - 每个报告包含所有15个sections的详细数据
const reportsData: Record<string, Report> = {
  '1': {
    'id': '1',
    'name': '系统健康度分析报告',
    'type': 'health',
    'status': 'published',
    'author': '系统管理员',
    'createdAt': '2024-06-15 10:30:00',
    'lastModified': '2024-06-15 14:20:00',
    'size': '2.5MB',
    'downloads': 156,
    'description': '本报告全面分析了系统的健康状况，包括服务可用性、性能指标、错误率等关键指标。',
    'summary': {
      'totalServices': 45,
      'healthyServices': 42,
      'warningServices': 2,
      'criticalServices': 1,
      'overallScore': 93.3
    },
    'sections': [
      {
        'titleKey': 'executiveSummary',
        'title': '执行摘要',
        'content': '系统整体健康状况良好，93.3%的服务运行正常。在监控的45个核心服务中，42个服务状态健康，2个服务存在性能警告，1个服务需要紧急处理。',
        'type': 'summary',
        'keyMetrics': {
          'systemUptime': '99.2%',
          'avgResponseTime': '185ms',
          'errorRate': '0.23%',
          'throughput': '15.2K req/s',
          'activeUsers': '12,450',
          'peakConcurrency': '3,200'
        },
        'highlights': [
          '系统整体可用性达到99.2%，超过SLA要求的99%',
          '42个核心服务运行状态良好，占总数的93.3%',
          '通知服务存在性能瓶颈，响应时间超过1秒',
          '支付服务错误率偏高，需要紧急优化'
        ]
      },
      {
        'titleKey': 'serviceStatusAnalysis',
        'title': '服务状态详细分析',
        'content': '以下是各核心服务的详细运行状态分析，包括响应时间、错误率、可用性等关键指标。',
        'type': 'analysis',
        'data': [
          { 'service': '用户认证服务', 'status': 'healthy', 'responseTime': '85ms', 'errorRate': '0.02%', 'availability': '99.98%', 'requests': '2.3M', 'healthScore': 98.5 },
          { 'service': '订单处理服务', 'status': 'healthy', 'responseTime': '95ms', 'errorRate': '0.05%', 'availability': '99.97%', 'requests': '890K', 'healthScore': 97.8 },
          { 'service': '支付处理服务', 'status': 'warning', 'responseTime': '280ms', 'errorRate': '0.8%', 'availability': '99.2%', 'requests': '650K', 'healthScore': 78.5 },
          { 'service': '通知推送服务', 'status': 'critical', 'responseTime': '1200ms', 'errorRate': '5.2%', 'availability': '95.8%', 'requests': '3.1M', 'healthScore': 65.2 }
        ]
      },
      {
        'titleKey': 'performanceTrendAnalysis',
        'title': '性能指标趋势分析',
        'content': '过去30天的关键性能指标变化趋势显示，系统整体性能稳定，但在高峰时段存在性能压力。',
        'type': 'trend',
        'metrics': [
          { 'name': '平均响应时间', 'current': '185ms', 'previous': '165ms', 'trend': '+12%', 'status': 'warning', 'description': '响应时间较上月增长12%，主要由通知服务拖累' },
          { 'name': '系统吞吐量', 'current': '15.2K req/s', 'previous': '14.1K req/s', 'trend': '+8%', 'status': 'good', 'description': '系统处理能力持续提升，超出预期目标' },
          { 'name': '错误率', 'current': '0.23%', 'previous': '0.08%', 'trend': '+0.15%', 'status': 'warning', 'description': '错误率上升主要来自支付和通知服务' },
          { 'name': '系统可用性', 'current': '99.1%', 'previous': '99.9%', 'trend': '-0.8%', 'status': 'critical', 'description': '可用性下降主要由通知服务故障导致' }
        ],
        'trendData': {
          'responseTime': [
            { 'date': '2024-05-15', 'value': 158 },
            { 'date': '2024-05-20', 'value': 162 },
            { 'date': '2024-05-25', 'value': 165 },
            { 'date': '2024-05-30', 'value': 168 },
            { 'date': '2024-06-05', 'value': 172 },
            { 'date': '2024-06-10', 'value': 195 },
            { 'date': '2024-06-15', 'value': 185 }
          ],
          'throughput': [
            { 'date': '2024-05-15', 'value': 13.8 },
            { 'date': '2024-05-20', 'value': 14.1 },
            { 'date': '2024-05-25', 'value': 14.3 },
            { 'date': '2024-05-30', 'value': 14.5 },
            { 'date': '2024-06-05', 'value': 14.8 },
            { 'date': '2024-06-10', 'value': 15.1 },
            { 'date': '2024-06-15', 'value': 15.2 }
          ],
          'errorRate': [
            { 'date': '2024-05-15', 'value': 0.06 },
            { 'date': '2024-05-20', 'value': 0.07 },
            { 'date': '2024-05-25', 'value': 0.08 },
            { 'date': '2024-05-30', 'value': 0.09 },
            { 'date': '2024-06-05', 'value': 0.12 },
            { 'date': '2024-06-10', 'value': 0.18 },
            { 'date': '2024-06-15', 'value': 0.23 }
          ],
          'availability': [
            { 'date': '2024-05-15', 'value': 99.9 },
            { 'date': '2024-05-20', 'value': 99.8 },
            { 'date': '2024-05-25', 'value': 99.7 },
            { 'date': '2024-05-30', 'value': 99.6 },
            { 'date': '2024-06-05', 'value': 99.4 },
            { 'date': '2024-06-10', 'value': 99.2 },
            { 'date': '2024-06-15', 'value': 99.1 }
          ]
        },
        'analysis': {
          'keyFindings': [
            '通知服务性能在6月10日后显著下降',
            '支付服务错误率持续上升',
            '整体吞吐量保持增长趋势',
            '系统可用性低于SLA要求'
          ],
          'rootCauses': [
            '通知服务消息队列积压',
            '支付服务第三方依赖不稳定',
            '高峰期资源竞争加剧',
            '缓存策略需要优化'
          ]
        }
      },
      {
        'titleKey': 'resourceUsage',
        'title': '资源使用情况',
        'content': '系统资源使用情况整体合理，但部分服务存在资源瓶颈。',
        'type': 'resources',
        'data': [
          { 'resource': 'CPU使用率', 'usage': '68%', 'threshold': '80%', 'status': 'normal', 'peak': '85%', 'trend': '+5%' },
          { 'resource': '内存使用率', 'usage': '72%', 'threshold': '85%', 'status': 'normal', 'peak': '89%', 'trend': '+8%' },
          { 'resource': '磁盘使用率', 'usage': '45%', 'threshold': '90%', 'status': 'good', 'peak': '52%', 'trend': '+2%' },
          { 'resource': '网络带宽', 'usage': '35%', 'threshold': '70%', 'status': 'good', 'peak': '58%', 'trend': '+3%' }
        ]
      },
      {
        'titleKey': 'recommendationsAndActionPlan',
        'title': '建议与行动计划',
        'content': '基于分析结果，我们提出以下优化建议和具体行动计划。',
        'type': 'recommendations',
        'recommendations': [
          { 'priority': 'high', 'item': '立即修复通知服务的性能问题', 'deadline': '2024-06-20', 'assignee': '后端开发团队', 'impact': '预计可提升系统整体可用性2.5%' },
          { 'priority': 'high', 'item': '优化支付服务的错误处理机制', 'deadline': '2024-06-22', 'assignee': '支付团队', 'impact': '预计可降低支付错误率至0.2%以下' },
          { 'priority': 'medium', 'item': '扩容通知服务的计算资源', 'deadline': '2024-06-25', 'assignee': '运维团队', 'impact': '提升通知服务处理能力50%' }
        ]
      },
      {
        'titleKey': 'dependencyOverview',
        'title': '依赖关系概览',
        'content': '系统共包含45个核心服务，相互之间存在128个依赖关系。整体架构复杂度适中，但存在3个循环依赖需要重点关注。',
        'type': 'summary',
        'metrics': {
          'totalServices': 45,
          'totalDependencies': 128,
          'circularDependencies': 3,
          'maxDepth': 6,
          'avgComplexity': 7.2
        }
      },
      {
        'titleKey': 'planeDependendencyDetails',
        'title': '平面依赖详情',
        'content': '以下是各服务平面的详细依赖关系分析，包括直接依赖、间接依赖和风险评估。',
        'type': 'analysis',
        'data': [
          { 'plane': '用户管理平面', 'directDeps': 3, 'indirectDeps': 8, 'riskLevel': 'low', 'complexity': 6.2 },
          { 'plane': '订单处理平面', 'directDeps': 5, 'indirectDeps': 12, 'riskLevel': 'medium', 'complexity': 8.1 },
          { 'plane': '支付处理平面', 'directDeps': 4, 'indirectDeps': 9, 'riskLevel': 'high', 'complexity': 7.8 },
          { 'plane': '通知推送平面', 'directDeps': 6, 'indirectDeps': 15, 'riskLevel': 'critical', 'complexity': 9.5 }
        ]
      },
      {
        'titleKey': 'circularDependencyAnalysis',
        'title': '循环依赖分析',
        'content': '发现3个循环依赖问题，需要优先解决以降低系统耦合度和维护复杂性。',
        'type': 'circular',
        'issues': [
          { 'cycle': '订单服务 → 支付服务 → 通知服务 → 订单服务', 'severity': 'high', 'impact': '影响订单和支付流程的独立部署' },
          { 'cycle': '用户服务 → 权限服务 → 用户服务', 'severity': 'medium', 'impact': '权限验证逻辑复杂，难以维护' },
          { 'cycle': '库存服务 → 商品服务 → 库存服务', 'severity': 'low', 'impact': '库存更新可能出现数据不一致' }
        ]
      },
      {
        'titleKey': 'optimizationRecommendations',
        'title': '优化建议',
        'content': '基于依赖分析结果，提出以下架构优化建议。',
        'type': 'recommendations',
        'recommendations': [
          { 'priority': 'high', 'item': '解决订单-支付-通知的循环依赖', 'impact': '提升系统可维护性', 'effort': '高' },
          { 'priority': 'medium', 'item': '简化用户权限依赖关系', 'impact': '降低权限管理复杂度', 'effort': '中' },
          { 'priority': 'low', 'item': '优化库存管理依赖路径', 'impact': '提升库存操作性能', 'effort': '低' }
        ]
      },
      {
        'titleKey': 'testEnvironmentAndMethods',
        'title': '测试环境与方法',
        'content': '本次健康度分析在生产环境镜像中进行，采用多种监控工具和测试方法。',
        'type': 'summary',
        'environment': {
          'testDuration': '30天',
          'monitoringTools': ['Prometheus', 'Grafana', 'ELK Stack', 'Jaeger'],
          'testMethods': ['实时监控', '压力测试', '故障注入', '性能基准测试'],
          'dataPoints': '2.8M个监控数据点'
        }
      },
      {
        'titleKey': 'loadTestResults',
        'title': '负载测试结果',
        'content': '在不同负载水平下的系统性能表现，包括响应时间、吞吐量、资源使用率等关键指标。',
        'type': 'analysis',
        'data': [
          { 'load': '正常负载(100%)', 'responseTime': '185ms', 'throughput': '15.2K req/s', 'cpuUsage': '68%', 'errorRate': '0.23%' },
          { 'load': '高负载(150%)', 'responseTime': '320ms', 'throughput': '18.5K req/s', 'cpuUsage': '85%', 'errorRate': '0.8%' },
          { 'load': '峰值负载(200%)', 'responseTime': '580ms', 'throughput': '22.1K req/s', 'cpuUsage': '95%', 'errorRate': '2.1%' },
          { 'load': '极限负载(250%)', 'responseTime': '1200ms', 'throughput': '24.8K req/s', 'cpuUsage': '98%', 'errorRate': '5.2%' }
        ]
      },
      {
        'titleKey': 'performanceBottleneckAnalysis',
        'title': '性能瓶颈分析',
        'content': '通过深入分析，识别出系统的主要性能瓶颈和限制因素。',
        'type': 'bottleneck',
        'bottlenecks': [
          { 'component': '通知服务消息队列', 'issue': '高并发下队列积压', 'impact': '响应时间增加300%', 'solution': '增加消息处理线程，优化批处理逻辑' },
          { 'component': '数据库连接池', 'issue': '连接池耗尽', 'impact': '服务不可用', 'solution': '增加连接池大小，优化连接复用' },
          { 'component': 'Redis缓存', 'issue': '缓存命中率低', 'impact': '数据库压力增大', 'solution': '优化缓存策略，增加缓存预热' },
          { 'component': '支付网关', 'issue': '第三方接口延迟', 'impact': '支付成功率下降', 'solution': '实现多网关负载均衡' }
        ]
      },
      {
        'titleKey': 'securityAssessmentOverview',
        'title': '安全评估概述',
        'content': '本次安全评估采用OWASP Top 10标准，结合自动化扫描和人工渗透测试，全面评估系统安全状况。',
        'type': 'summary',
        'metrics': {
          'totalVulnerabilities': 23,
          'highRisk': 3,
          'mediumRisk': 8,
          'lowRisk': 12,
          'securityScore': 7.2,
          'complianceRate': '85%'
        }
      },
      {
        'titleKey': 'vulnerabilityDetailsAnalysis',
        'title': '漏洞详情分析',
        'content': '发现的安全漏洞详细分析，包括漏洞类型、风险等级、影响范围和利用难度。',
        'type': 'analysis',
        'data': [
          { 'vulnerability': 'SQL注入', 'severity': 'high', 'affected': '用户查询接口', 'cvss': '8.1', 'status': 'open', 'exploitability': '高' },
          { 'vulnerability': 'XSS跨站脚本', 'severity': 'medium', 'affected': '评论系统', 'cvss': '6.3', 'status': 'open', 'exploitability': '中' },
          { 'vulnerability': '敏感信息泄露', 'severity': 'high', 'affected': '错误页面', 'cvss': '7.8', 'status': 'fixed', 'exploitability': '低' },
          { 'vulnerability': '弱密码策略', 'severity': 'medium', 'affected': '用户注册', 'cvss': '5.9', 'status': 'open', 'exploitability': '中' },
          { 'vulnerability': '未授权访问', 'severity': 'high', 'affected': '管理接口', 'cvss': '8.5', 'status': 'open', 'exploitability': '高' }
        ]
      },
      {
        'titleKey': 'fixRecommendations',
        'title': '修复建议',
        'content': '针对发现的安全漏洞，提供详细的修复建议和安全加固措施。',
        'type': 'recommendations',
        'recommendations': [
          { 'priority': 'critical', 'item': '修复SQL注入漏洞，使用参数化查询', 'timeline': '立即', 'effort': '中', 'impact': '消除高危安全风险' },
          { 'priority': 'high', 'item': '加强管理接口的身份验证', 'timeline': '3天内', 'effort': '低', 'impact': '防止未授权访问' },
          { 'priority': 'high', 'item': '修复敏感信息泄露问题', 'timeline': '1周内', 'effort': '低', 'impact': '保护用户隐私' },
          { 'priority': 'medium', 'item': '实施XSS防护机制', 'timeline': '2周内', 'effort': '中', 'impact': '提升前端安全性' },
          { 'priority': 'medium', 'item': '强化密码策略', 'timeline': '1个月内', 'effort': '低', 'impact': '提升账户安全' }
        ]
      }
    ]
  },
  '2': {
    'id': '2',
    'name': '电商业务场景分析报告',
    'type': 'business',
    'status': 'published',
    'author': '业务分析团队',
    'createdAt': '2024-06-20 09:30:00',
    'lastModified': '2024-06-20 16:45:00',
    'size': '4.2MB',
    'downloads': 89,
    'description': '深入分析电商平台核心业务场景的运行状况，包括用户购物流程、订单处理、支付结算等关键业务环节。',
    'summary': {
      'totalScenarios': 12,
      'healthyScenarios': 9,
      'warningScenarios': 2,
      'criticalScenarios': 1,
      'overallScore': 87.5
    },
    'sections': [
      {
        'titleKey': 'executiveSummary',
        'title': '执行摘要',
        'content': '电商业务场景整体运行稳定，87.5%的核心业务流程表现良好。主要问题集中在支付结算流程的响应延迟和库存同步的数据一致性问题。',
        'type': 'summary',
        'keyMetrics': {
          'dailyOrders': '45,680',
          'conversionRate': '3.2%',
          'avgOrderValue': '¥286.50',
          'paymentSuccessRate': '96.8%',
          'inventoryAccuracy': '98.2%',
          'customerSatisfaction': '4.3/5.0'
        },
        'highlights': [
          '日均订单量达到45,680单，同比增长15%',
          '用户转化率保持在3.2%，高于行业平均水平',
          '支付成功率96.8%，需要进一步优化',
          '库存准确率98.2%，存在少量同步延迟'
        ]
      },
      {
        'titleKey': 'serviceStatusAnalysis',
        'title': '服务状态详细分析',
        'content': '以下是各核心业务场景的详细运行状态分析，包括响应时间、成功率、用户体验等关键指标。',
        'type': 'analysis',
        'data': [
          { 'scenario': '用户注册登录', 'status': 'healthy', 'responseTime': '320ms', 'successRate': '99.2%', 'userSatisfaction': '4.5/5', 'dailyVolume': '8,500' },
          { 'scenario': '商品浏览搜索', 'status': 'healthy', 'responseTime': '180ms', 'successRate': '99.8%', 'userSatisfaction': '4.3/5', 'dailyVolume': '125,000' },
          { 'scenario': '购物车管理', 'status': 'healthy', 'responseTime': '95ms', 'successRate': '99.5%', 'userSatisfaction': '4.2/5', 'dailyVolume': '35,600' },
          { 'scenario': '订单提交', 'status': 'warning', 'responseTime': '850ms', 'successRate': '97.8%', 'userSatisfaction': '3.9/5', 'dailyVolume': '45,680' },
          { 'scenario': '支付结算', 'status': 'critical', 'responseTime': '1,200ms', 'successRate': '96.8%', 'userSatisfaction': '3.6/5', 'dailyVolume': '44,200' }
        ]
      },
      {
        'titleKey': 'performanceTrendAnalysis',
        'title': '性能指标趋势分析',
        'content': '过去30天业务场景关键性能指标变化趋势，重点关注用户体验和业务转化效果。',
        'type': 'trend',
        'metrics': [
          { 'name': '平均响应时间', 'current': '485ms', 'previous': '420ms', 'trend': '+15.5%', 'status': 'warning' },
          { 'name': '业务成功率', 'current': '98.1%', 'previous': '98.8%', 'trend': '-0.7%', 'status': 'warning' },
          { 'name': '用户转化率', 'current': '3.2%', 'previous': '2.9%', 'trend': '+0.3%', 'status': 'good' },
          { 'name': '客户满意度', 'current': '4.3/5', 'previous': '4.4/5', 'trend': '-0.1', 'status': 'warning' }
        ]
      },
      {
        'titleKey': 'resourceUsage',
        'title': '资源使用情况',
        'content': '业务场景相关的系统资源使用情况分析，包括服务器、数据库、缓存等资源的利用率。',
        'type': 'resources',
        'data': [
          { 'resource': 'Web服务器集群', 'usage': '72%', 'threshold': '80%', 'status': 'normal', 'instances': 12 },
          { 'resource': '业务数据库', 'usage': '68%', 'threshold': '75%', 'status': 'normal', 'connections': '180/250' },
          { 'resource': 'Redis缓存', 'usage': '45%', 'threshold': '70%', 'status': 'good', 'hitRate': '89.5%' },
          { 'resource': '消息队列', 'usage': '35%', 'threshold': '60%', 'status': 'good', 'messagesPerSecond': '850' }
        ]
      },
      {
        'titleKey': 'recommendationsAndActionPlan',
        'title': '建议与行动计划',
        'content': '基于业务场景分析结果，提出针对性的优化建议和具体行动计划。',
        'type': 'recommendations',
        'recommendations': [
          { 'priority': 'high', 'item': '优化支付结算流程，减少第三方依赖延迟', 'deadline': '2024-07-05', 'assignee': '支付团队', 'impact': '预计支付成功率提升至98.5%' },
          { 'priority': 'high', 'item': '改进订单提交流程的性能表现', 'deadline': '2024-06-30', 'assignee': '订单团队', 'impact': '订单提交响应时间减少40%' },
          { 'priority': 'medium', 'item': '提升用户体验和界面响应速度', 'deadline': '2024-07-15', 'assignee': '前端团队', 'impact': '用户满意度提升至4.5分' }
        ]
      },
      { 'titleKey': 'dependencyOverview', 'title': '依赖关系概览', 'content': '业务场景涉及的系统依赖关系分析，识别关键依赖点和潜在风险。', 'type': 'summary' },
      { 'titleKey': 'planeDependendencyDetails', 'title': '平面依赖详情', 'content': '各业务场景的详细依赖关系分析，包括服务调用链路和依赖强度。', 'type': 'analysis' },
      { 'titleKey': 'circularDependencyAnalysis', 'title': '循环依赖分析', 'content': '识别业务场景中的循环依赖问题，评估风险等级。', 'type': 'circular' },
      { 'titleKey': 'optimizationRecommendations', 'title': '优化建议', 'content': '基于依赖分析的架构优化建议。', 'type': 'recommendations' },
      { 'titleKey': 'testEnvironmentAndMethods', 'title': '测试环境与方法', 'content': '业务场景测试的环境配置和测试方法说明。', 'type': 'summary' },
      { 'titleKey': 'loadTestResults', 'title': '负载测试结果', 'content': '各业务场景在不同负载下的性能表现。', 'type': 'analysis' },
      { 'titleKey': 'performanceBottleneckAnalysis', 'title': '性能瓶颈分析', 'content': '识别业务场景中的性能瓶颈点。', 'type': 'bottleneck' },
      { 'titleKey': 'securityAssessmentOverview', 'title': '安全评估概述', 'content': '业务场景的安全风险评估概况。', 'type': 'summary' },
      { 'titleKey': 'vulnerabilityDetailsAnalysis', 'title': '漏洞详情分析', 'content': '业务场景中发现的安全漏洞详细分析。', 'type': 'analysis' },
      { 'titleKey': 'fixRecommendations', 'title': '修复建议', 'content': '针对发现的安全问题提出的修复建议。', 'type': 'recommendations' }
    ]
  },
  '3': {
    'id': '3',
    'name': '业务链路监控分析报告',
    'type': 'chain',
    'status': 'published',
    'author': '链路监控团队',
    'createdAt': '2024-06-18 11:20:00',
    'lastModified': '2024-06-18 17:30:00',
    'size': '3.8MB',
    'downloads': 127,
    'description': '全面分析核心业务链路的健康状况，包括链路追踪、性能监控、异常检测等关键指标。',
    'summary': { 'totalChains': 8, 'healthyChains': 6, 'warningChains': 1, 'criticalChains': 1, 'overallScore': 82.3 },
    'sections': [
      { 'titleKey': 'executiveSummary', 'title': '执行摘要', 'content': '业务链路整体运行状况良好，82.3%的关键链路表现正常。', 'type': 'summary' },
      { 'titleKey': 'serviceStatusAnalysis', 'title': '服务状态详细分析', 'content': '各业务链路的详细运行状态分析。', 'type': 'analysis' },
      { 'titleKey': 'performanceTrendAnalysis', 'title': '性能指标趋势分析', 'content': '业务链路性能指标趋势分析。', 'type': 'trend' },
      { 'titleKey': 'resourceUsage', 'title': '资源使用情况', 'content': '业务链路资源使用情况。', 'type': 'resources' },
      { 'titleKey': 'recommendationsAndActionPlan', 'title': '建议与行动计划', 'content': '链路优化建议。', 'type': 'recommendations' },
      { 'titleKey': 'dependencyOverview', 'title': '依赖关系概览', 'content': '链路依赖关系概览。', 'type': 'summary' },
      { 'titleKey': 'planeDependendencyDetails', 'title': '平面依赖详情', 'content': '链路依赖详情分析。', 'type': 'analysis' },
      { 'titleKey': 'circularDependencyAnalysis', 'title': '循环依赖分析', 'content': '链路循环依赖分析。', 'type': 'circular' },
      { 'titleKey': 'optimizationRecommendations', 'title': '优化建议', 'content': '链路优化建议。', 'type': 'recommendations' },
      { 'titleKey': 'testEnvironmentAndMethods', 'title': '测试环境与方法', 'content': '链路测试环境和方法。', 'type': 'summary' },
      { 'titleKey': 'loadTestResults', 'title': '负载测试结果', 'content': '链路负载测试结果。', 'type': 'analysis' },
      { 'titleKey': 'performanceBottleneckAnalysis', 'title': '性能瓶颈分析', 'content': '链路性能瓶颈分析。', 'type': 'bottleneck' },
      { 'titleKey': 'securityAssessmentOverview', 'title': '安全评估概述', 'content': '链路安全评估概述。', 'type': 'summary' },
      { 'titleKey': 'vulnerabilityDetailsAnalysis', 'title': '漏洞详情分析', 'content': '链路安全漏洞分析。', 'type': 'analysis' },
      { 'titleKey': 'fixRecommendations', 'title': '修复建议', 'content': '链路安全问题修复建议。', 'type': 'recommendations' }
    ]
  },
  '4': {
    'id': '4',
    'name': '业务系统架构分析报告',
    'type': 'system',
    'status': 'published',
    'author': '系统架构团队',
    'createdAt': '2024-06-22 14:15:00',
    'lastModified': '2024-06-22 18:20:00',
    'size': '5.1MB',
    'downloads': 203,
    'description': '全面分析业务系统的架构健康度，包括系统模块化程度、服务治理、数据一致性等关键架构指标。',
    'summary': { 'totalSystems': 15, 'healthySystems': 12, 'warningSystems': 2, 'criticalSystems': 1, 'overallScore': 85.7 },
    'sections': [
      { 'titleKey': 'executiveSummary', 'title': '执行摘要', 'content': '业务系统架构整体健康，85.7%的系统模块运行良好。', 'type': 'summary' },
      { 'titleKey': 'serviceStatusAnalysis', 'title': '服务状态详细分析', 'content': '各业务系统的详细运行状态分析。', 'type': 'analysis' },
      { 'titleKey': 'performanceTrendAnalysis', 'title': '性能指标趋势分析', 'content': '业务系统性能指标趋势分析。', 'type': 'trend' },
      { 'titleKey': 'resourceUsage', 'title': '资源使用情况', 'content': '业务系统资源使用情况。', 'type': 'resources' },
      { 'titleKey': 'recommendationsAndActionPlan', 'title': '建议与行动计划', 'content': '系统架构优化建议。', 'type': 'recommendations' },
      { 'titleKey': 'dependencyOverview', 'title': '依赖关系概览', 'content': '系统间依赖关系概览。', 'type': 'summary' },
      { 'titleKey': 'planeDependendencyDetails', 'title': '平面依赖详情', 'content': '系统依赖详情分析。', 'type': 'analysis' },
      { 'titleKey': 'circularDependencyAnalysis', 'title': '循环依赖分析', 'content': '系统循环依赖分析。', 'type': 'circular' },
      { 'titleKey': 'optimizationRecommendations', 'title': '优化建议', 'content': '系统架构优化建议。', 'type': 'recommendations' },
      { 'titleKey': 'testEnvironmentAndMethods', 'title': '测试环境与方法', 'content': '系统测试环境和方法。', 'type': 'summary' },
      { 'titleKey': 'loadTestResults', 'title': '负载测试结果', 'content': '系统负载测试结果。', 'type': 'analysis' },
      { 'titleKey': 'performanceBottleneckAnalysis', 'title': '性能瓶颈分析', 'content': '系统性能瓶颈分析。', 'type': 'bottleneck' },
      { 'titleKey': 'securityAssessmentOverview', 'title': '安全评估概述', 'content': '系统安全评估概述。', 'type': 'summary' },
      { 'titleKey': 'vulnerabilityDetailsAnalysis', 'title': '漏洞详情分析', 'content': '系统安全漏洞分析。', 'type': 'analysis' },
      { 'titleKey': 'fixRecommendations', 'title': '修复建议', 'content': '系统安全问题修复建议。', 'type': 'recommendations' }
    ]
  },
  '5': {
    'id': '5',
    'name': '中间件服务分析报告',
    'type': 'middleware',
    'status': 'published',
    'author': '中间件团队',
    'createdAt': '2024-06-25 10:30:00',
    'lastModified': '2024-06-25 16:45:00',
    'size': '4.5MB',
    'downloads': 156,
    'description': '深入分析中间件服务的运行状况，包括消息队列、缓存、数据库中间件等关键组件。',
    'summary': { 'totalMiddleware': 10, 'healthyMiddleware': 8, 'warningMiddleware': 1, 'criticalMiddleware': 1, 'overallScore': 88.2 },
    'sections': [
      { 'titleKey': 'executiveSummary', 'title': '执行摘要', 'content': '中间件服务整体运行稳定，88.2%的中间件组件表现良好。', 'type': 'summary' },
      { 'titleKey': 'serviceStatusAnalysis', 'title': '服务状态详细分析', 'content': '各中间件服务的详细运行状态分析。', 'type': 'analysis' },
      { 'titleKey': 'performanceTrendAnalysis', 'title': '性能指标趋势分析', 'content': '中间件性能指标趋势分析。', 'type': 'trend' },
      { 'titleKey': 'resourceUsage', 'title': '资源使用情况', 'content': '中间件资源使用情况。', 'type': 'resources' },
      { 'titleKey': 'recommendationsAndActionPlan', 'title': '建议与行动计划', 'content': '中间件优化建议。', 'type': 'recommendations' },
      { 'titleKey': 'dependencyOverview', 'title': '依赖关系概览', 'content': '中间件依赖关系概览。', 'type': 'summary' },
      { 'titleKey': 'planeDependendencyDetails', 'title': '平面依赖详情', 'content': '中间件依赖详情分析。', 'type': 'analysis' },
      { 'titleKey': 'circularDependencyAnalysis', 'title': '循环依赖分析', 'content': '中间件循环依赖分析。', 'type': 'circular' },
      { 'titleKey': 'optimizationRecommendations', 'title': '优化建议', 'content': '中间件优化建议。', 'type': 'recommendations' },
      { 'titleKey': 'testEnvironmentAndMethods', 'title': '测试环境与方法', 'content': '中间件测试环境和方法。', 'type': 'summary' },
      { 'titleKey': 'loadTestResults', 'title': '负载测试结果', 'content': '中间件负载测试结果。', 'type': 'analysis' },
      { 'titleKey': 'performanceBottleneckAnalysis', 'title': '性能瓶颈分析', 'content': '中间件性能瓶颈分析。', 'type': 'bottleneck' },
      { 'titleKey': 'securityAssessmentOverview', 'title': '安全评估概述', 'content': '中间件安全评估概述。', 'type': 'summary' },
      { 'titleKey': 'vulnerabilityDetailsAnalysis', 'title': '漏洞详情分析', 'content': '中间件安全漏洞分析。', 'type': 'analysis' },
      { 'titleKey': 'fixRecommendations', 'title': '修复建议', 'content': '中间件安全问题修复建议。', 'type': 'recommendations' }
    ]
  },
  '6': {
    'id': '6',
    'name': '基础设施监控分析报告',
    'type': 'infrastructure',
    'status': 'published',
    'author': '基础设施团队',
    'createdAt': '2024-06-28 09:15:00',
    'lastModified': '2024-06-28 15:30:00',
    'size': '6.2MB',
    'downloads': 234,
    'description': '全面分析基础设施的运行状况，包括服务器、网络、存储、容器等基础组件。',
    'summary': { 'totalInfrastructure': 25, 'healthyInfrastructure': 22, 'warningInfrastructure': 2, 'criticalInfrastructure': 1, 'overallScore': 91.5 },
    'sections': [
      { 'titleKey': 'executiveSummary', 'title': '执行摘要', 'content': '基础设施整体运行稳定，91.5%的基础组件表现优良。', 'type': 'summary' },
      { 'titleKey': 'serviceStatusAnalysis', 'title': '服务状态详细分析', 'content': '各基础设施组件的详细运行状态分析。', 'type': 'analysis' },
      { 'titleKey': 'performanceTrendAnalysis', 'title': '性能指标趋势分析', 'content': '基础设施性能指标趋势分析。', 'type': 'trend' },
      { 'titleKey': 'resourceUsage', 'title': '资源使用情况', 'content': '基础设施资源使用情况。', 'type': 'resources' },
      { 'titleKey': 'recommendationsAndActionPlan', 'title': '建议与行动计划', 'content': '基础设施优化建议。', 'type': 'recommendations' },
      { 'titleKey': 'dependencyOverview', 'title': '依赖关系概览', 'content': '基础设施依赖关系概览。', 'type': 'summary' },
      { 'titleKey': 'planeDependendencyDetails', 'title': '平面依赖详情', 'content': '基础设施依赖详情分析。', 'type': 'analysis' },
      { 'titleKey': 'circularDependencyAnalysis', 'title': '循环依赖分析', 'content': '基础设施循环依赖分析。', 'type': 'circular' },
      { 'titleKey': 'optimizationRecommendations', 'title': '优化建议', 'content': '基础设施优化建议。', 'type': 'recommendations' },
      { 'titleKey': 'testEnvironmentAndMethods', 'title': '测试环境与方法', 'content': '基础设施测试环境和方法。', 'type': 'summary' },
      { 'titleKey': 'loadTestResults', 'title': '负载测试结果', 'content': '基础设施负载测试结果。', 'type': 'analysis' },
      { 'titleKey': 'performanceBottleneckAnalysis', 'title': '性能瓶颈分析', 'content': '基础设施性能瓶颈分析。', 'type': 'bottleneck' },
      { 'titleKey': 'securityAssessmentOverview', 'title': '安全评估概述', 'content': '基础设施安全评估概述。', 'type': 'summary' },
      { 'titleKey': 'vulnerabilityDetailsAnalysis', 'title': '漏洞详情分析', 'content': '基础设施安全漏洞分析。', 'type': 'analysis' },
      { 'titleKey': 'fixRecommendations', 'title': '修复建议', 'content': '基础设施安全问题修复建议。', 'type': 'recommendations' }
    ]
  }
};

/**
 * 获取报告详情
 * @param reportId 报告ID
 * @returns 报告详情数据
 */
export const getReportById = async (reportId: string): Promise<Report | null> => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const report = reportsData[reportId];
  return report || null;
};

/**
 * 获取所有报告列表
 * @returns 报告列表
 */
export const getAllReports = async (): Promise<Report[]> => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return Object.values(reportsData);
};

/**
 * 根据类型筛选报告
 * @param type 报告类型
 * @returns 筛选后的报告列表
 */
export const getReportsByType = async (type: string): Promise<Report[]> => {
  const allReports = await getAllReports();
  return allReports.filter(report => report.type === type);
};

/**
 * 根据状态筛选报告
 * @param status 报告状态
 * @returns 筛选后的报告列表
 */
export const getReportsByStatus = async (status: string): Promise<Report[]> => {
  const allReports = await getAllReports();
  return allReports.filter(report => report.status === status);
};

/**
 * 搜索报告
 * @param keyword 搜索关键词
 * @returns 搜索结果
 */
export const searchReports = async (keyword: string): Promise<Report[]> => {
  const allReports = await getAllReports();
  const lowerKeyword = keyword.toLowerCase();
  
  return allReports.filter(report => 
    report.name.toLowerCase().includes(lowerKeyword) ||
    report.author.toLowerCase().includes(lowerKeyword) ||
    report.description.toLowerCase().includes(lowerKeyword)
  );
};
