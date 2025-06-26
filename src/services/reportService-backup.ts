import type { Report } from '../types/report';

// 重新导出类型以便其他地方使用
export type { Report } from '../types/report';

// 模拟报告数据 - 在实际项目中这些数据会从API获取
const reportsData: Record<string, Report> = {
  "1": {
    "id": "1",
    "name": "系统健康度分析报告",
    "type": "health",
    "status": "published",
    "author": "系统管理员",
    "createdAt": "2024-06-15 10:30:00",
    "lastModified": "2024-06-15 14:20:00",
    "size": "2.5MB",
    "downloads": 156,
    "description": "本报告全面分析了系统的健康状况，包括服务可用性、性能指标、错误率等关键指标。",
    "summary": {
      "totalServices": 45,
      "healthyServices": 42,
      "warningServices": 2,
      "criticalServices": 1,
      "overallScore": 93.3
    },
    "sections": [
      {
        "titleKey": "executiveSummary",
        "title": "执行摘要",
        "content": "系统整体健康状况良好，93.3%的服务运行正常。在监控的45个核心服务中，42个服务状态健康，2个服务存在性能警告，1个服务需要紧急处理。",
        "type": "summary"
      }
    ]
  },
  "2": {
    "id": "2",
    "name": "电商业务场景分析报告",
    "type": "business",
    "status": "published",
    "author": "业务分析团队",
    "createdAt": "2024-06-20 09:30:00",
    "lastModified": "2024-06-20 16:45:00",
    "size": "4.2MB",
    "downloads": 89,
    "description": "深入分析电商平台核心业务场景的运行状况，包括用户购物流程、订单处理、支付结算等关键业务环节的性能表现和优化建议。",
    "summary": {
      "totalScenarios": 12,
      "healthyScenarios": 9,
      "warningScenarios": 2,
      "criticalScenarios": 1,
      "overallScore": 87.5
    },
    "sections": [
      {
        "titleKey": "serviceStatusAnalysis",
        "title": "服务状态详细分析",
        "content": "以下是各核心业务场景的详细运行状态分析，包括响应时间、成功率、用户体验等关键指标。",
        "type": "analysis",
        "data": [
          {
            "scenario": "用户注册登录",
            "status": "healthy",
            "responseTime": "320ms",
            "successRate": "99.2%",
            "userSatisfaction": "4.5/5",
            "dailyVolume": "8,500",
            "peakConcurrency": "450",
            "conversionRate": "85.2%"
          },
          {
            "scenario": "商品浏览搜索",
            "status": "healthy",
            "responseTime": "180ms",
            "successRate": "99.8%",
            "userSatisfaction": "4.3/5",
            "dailyVolume": "125,000",
            "peakConcurrency": "2,800",
            "conversionRate": "12.5%"
          },
          {
            "scenario": "购物车管理",
            "status": "healthy",
            "responseTime": "95ms",
            "successRate": "99.5%",
            "userSatisfaction": "4.2/5",
            "dailyVolume": "35,600",
            "peakConcurrency": "1,200",
            "conversionRate": "68.3%"
          },
          {
            "scenario": "订单提交",
            "status": "warning",
            "responseTime": "850ms",
            "successRate": "97.8%",
            "userSatisfaction": "3.9/5",
            "dailyVolume": "45,680",
            "peakConcurrency": "800",
            "conversionRate": "89.2%",
            "issues": [
              "高峰期响应时间过长",
              "库存校验偶发超时",
              "优惠券计算逻辑复杂"
            ]
          },
          {
            "scenario": "支付结算",
            "status": "critical",
            "responseTime": "1,200ms",
            "successRate": "96.8%",
            "userSatisfaction": "3.6/5",
            "dailyVolume": "44,200",
            "peakConcurrency": "600",
            "conversionRate": "96.8%",
            "issues": [
              "第三方支付网关延迟",
              "支付重试机制不完善",
              "风控规则过于严格",
              "支付页面加载缓慢"
            ]
          }
        ]
      },
      {
        "titleKey": "performanceTrendAnalysis",
        "title": "性能指标趋势分析",
        "content": "过去30天业务场景关键性能指标变化趋势，重点关注用户体验和业务转化效果。",
        "type": "trend",
        "metrics": [
          {
            "name": "平均响应时间",
            "current": "485ms",
            "previous": "420ms",
            "trend": "+15.5%",
            "status": "warning",
            "target": "400ms",
            "description": "响应时间上升主要由支付流程拖累"
          },
          {
            "name": "业务成功率",
            "current": "98.1%",
            "previous": "98.8%",
            "trend": "-0.7%",
            "status": "warning",
            "target": "99.0%",
            "description": "成功率下降主要来自支付环节"
          },
          {
            "name": "用户转化率",
            "current": "3.2%",
            "previous": "2.9%",
            "trend": "+0.3%",
            "status": "good",
            "target": "3.0%",
            "description": "转化率持续提升，营销策略见效"
          },
          {
            "name": "客户满意度",
            "current": "4.3/5",
            "previous": "4.4/5",
            "trend": "-0.1",
            "status": "warning",
            "target": "4.5/5",
            "description": "满意度略有下降，主要因支付体验"
          }
        ]
      },
      {
        "titleKey": "resourceUsage",
        "title": "资源使用情况",
        "content": "业务场景相关的系统资源使用情况分析，包括服务器、数据库、缓存等资源的利用率。",
        "type": "resources",
        "data": [
          {
            "resource": "Web服务器集群",
            "usage": "72%",
            "threshold": "80%",
            "status": "normal",
            "peak": "89%",
            "average": "65%",
            "trend": "+8%",
            "details": {
              "instances": 12,
              "activeConnections": "8,500",
              "requestsPerSecond": "2,800"
            }
          },
          {
            "resource": "业务数据库",
            "usage": "68%",
            "threshold": "75%",
            "status": "normal",
            "peak": "82%",
            "average": "62%",
            "trend": "+6%",
            "details": {
              "connections": "180/250",
              "queryPerSecond": "1,200",
              "slowQueries": "15/hour"
            }
          },
          {
            "resource": "Redis缓存",
            "usage": "45%",
            "threshold": "70%",
            "status": "good",
            "peak": "58%",
            "average": "42%",
            "trend": "+3%",
            "details": {
              "hitRate": "89.5%",
              "memoryUsed": "4.5GB/10GB",
              "keysCount": "2.8M"
            }
          },
          {
            "resource": "消息队列",
            "usage": "35%",
            "threshold": "60%",
            "status": "good",
            "peak": "52%",
            "average": "32%",
            "trend": "+5%",
            "details": {
              "messagesPerSecond": "850",
              "queueDepth": "120",
              "consumers": "8"
            }
          }
        ]
      },
      {
        "titleKey": "recommendationsAndActionPlan",
        "title": "建议与行动计划",
        "content": "基于业务场景分析结果，提出针对性的优化建议和具体行动计划。",
        "type": "recommendations",
        "recommendations": [
          {
            "priority": "high",
            "item": "优化支付结算流程，减少第三方依赖延迟",
            "deadline": "2024-07-05",
            "assignee": "支付团队",
            "estimatedHours": "40小时",
            "impact": "预计支付成功率提升至98.5%，响应时间减少30%"
          },
          {
            "priority": "medium",
            "item": "改进订单提交流程的性能表现",
            "deadline": "2024-06-30",
            "assignee": "订单团队",
            "estimatedHours": "24小时",
            "impact": "订单提交响应时间减少40%，成功率提升至99%"
          }
        ]
      },
      {
        "titleKey": "dependencyOverview",
        "title": "依赖关系概览",
        "content": "业务场景涉及的系统依赖关系分析，识别关键依赖点和潜在风险。",
        "type": "summary"
      },
      {
        "titleKey": "planeDependendencyDetails",
        "title": "平面依赖详情",
        "content": "各业务场景的详细依赖关系分析，包括服务调用链路和依赖强度。",
        "type": "analysis"
      },
      {
        "titleKey": "circularDependencyAnalysis",
        "title": "循环依赖分析",
        "content": "识别业务场景中的循环依赖问题，评估风险等级。",
        "type": "circular"
      },
      {
        "titleKey": "optimizationRecommendations",
        "title": "优化建议",
        "content": "基于依赖分析的架构优化建议。",
        "type": "recommendations"
      },
      {
        "titleKey": "testEnvironmentAndMethods",
        "title": "测试环境与方法",
        "content": "业务场景测试的环境配置和测试方法说明。",
        "type": "summary"
      },
      {
        "titleKey": "loadTestResults",
        "title": "负载测试结果",
        "content": "各业务场景在不同负载下的性能表现。",
        "type": "analysis"
      },
      {
        "titleKey": "performanceBottleneckAnalysis",
        "title": "性能瓶颈分析",
        "content": "识别业务场景中的性能瓶颈点。",
        "type": "bottleneck"
      },
      {
        "titleKey": "securityAssessmentOverview",
        "title": "安全评估概述",
        "content": "业务场景的安全风险评估概况。",
        "type": "summary"
      },
      {
        "titleKey": "vulnerabilityDetailsAnalysis",
        "title": "漏洞详情分析",
        "content": "业务场景中发现的安全漏洞详细分析。",
        "type": "analysis"
      },
      {
        "titleKey": "fixRecommendations",
        "title": "修复建议",
        "content": "针对发现的安全问题提出的修复建议。",
        "type": "recommendations"
      }
    ]
  },
  "3": {
    "id": "3",
    "name": "业务链路监控分析报告",
    "type": "chain",
    "status": "published",
    "author": "链路监控团队",
    "createdAt": "2024-06-18 11:20:00",
    "lastModified": "2024-06-18 17:30:00",
    "size": "3.8MB",
    "downloads": 127,
    "description": "全面分析核心业务链路的健康状况，包括链路追踪、性能监控、异常检测等关键指标。",
    "summary": {
      "totalChains": 8,
      "healthyChains": 6,
      "warningChains": 1,
      "criticalChains": 1,
      "overallScore": 82.3
    },
    "sections": [
      {
        "titleKey": "executiveSummary",
        "title": "执行摘要",
        "content": "业务链路整体运行状况良好，82.3%的关键链路表现正常。",
        "type": "summary"
      },
      {
        "titleKey": "serviceStatusAnalysis",
        "title": "服务状态详细分析",
        "content": "各业务链路的详细运行状态分析。",
        "type": "analysis"
      },
      {
        "titleKey": "performanceTrendAnalysis",
        "title": "性能指标趋势分析",
        "content": "过去30天业务链路关键性能指标的变化趋势分析。",
        "type": "trend"
      },
      {
        "titleKey": "resourceUsage",
        "title": "资源使用情况",
        "content": "业务链路相关的系统资源使用情况。",
        "type": "resources"
      },
      {
        "titleKey": "recommendationsAndActionPlan",
        "title": "建议与行动计划",
        "content": "基于链路分析结果的优化建议和行动计划。",
        "type": "recommendations"
      },
      {
        "titleKey": "dependencyOverview",
        "title": "依赖关系概览",
        "content": "业务链路的服务依赖关系概览。",
        "type": "summary"
      },
      {
        "titleKey": "planeDependendencyDetails",
        "title": "平面依赖详情",
        "content": "链路中各服务的依赖详情。",
        "type": "analysis"
      },
      {
        "titleKey": "circularDependencyAnalysis",
        "title": "循环依赖分析",
        "content": "链路中的循环依赖检测。",
        "type": "circular"
      },
      {
        "titleKey": "optimizationRecommendations",
        "title": "优化建议",
        "content": "链路优化建议。",
        "type": "recommendations"
      },
      {
        "titleKey": "testEnvironmentAndMethods",
        "title": "测试环境与方法",
        "content": "链路测试环境和方法。",
        "type": "summary"
      },
      {
        "titleKey": "loadTestResults",
        "title": "负载测试结果",
        "content": "链路负载测试结果。",
        "type": "analysis"
      },
      {
        "titleKey": "performanceBottleneckAnalysis",
        "title": "性能瓶颈分析",
        "content": "链路性能瓶颈分析。",
        "type": "bottleneck"
      },
      {
        "titleKey": "securityAssessmentOverview",
        "title": "安全评估概述",
        "content": "链路安全评估概述。",
        "type": "summary"
      },
      {
        "titleKey": "vulnerabilityDetailsAnalysis",
        "title": "漏洞详情分析",
        "content": "链路安全漏洞分析。",
        "type": "analysis"
      },
      {
        "titleKey": "fixRecommendations",
        "title": "修复建议",
        "content": "安全问题修复建议。",
        "type": "recommendations"
      }
    ]
  },
  "4": {
    "id": "4",
    "name": "业务系统架构分析报告",
    "type": "system",
    "status": "published",
    "author": "系统架构团队",
    "createdAt": "2024-06-22 14:15:00",
    "lastModified": "2024-06-22 18:20:00",
    "size": "5.1MB",
    "downloads": 203,
    "description": "全面分析业务系统的架构健康度，包括系统模块化程度、服务治理、数据一致性等关键架构指标。",
    "summary": {
      "totalSystems": 15,
      "healthySystems": 12,
      "warningSystems": 2,
      "criticalSystems": 1,
      "overallScore": 85.7
    },
    "sections": [
      {"titleKey": "executiveSummary", "title": "执行摘要", "content": "业务系统架构整体健康，85.7%的系统模块运行良好。", "type": "summary"},
      {"titleKey": "serviceStatusAnalysis", "title": "服务状态详细分析", "content": "各业务系统的详细运行状态分析。", "type": "analysis"},
      {"titleKey": "performanceTrendAnalysis", "title": "性能指标趋势分析", "content": "业务系统性能指标趋势分析。", "type": "trend"},
      {"titleKey": "resourceUsage", "title": "资源使用情况", "content": "业务系统资源使用情况。", "type": "resources"},
      {"titleKey": "recommendationsAndActionPlan", "title": "建议与行动计划", "content": "系统架构优化建议。", "type": "recommendations"},
      {"titleKey": "dependencyOverview", "title": "依赖关系概览", "content": "系统间依赖关系概览。", "type": "summary"},
      {"titleKey": "planeDependendencyDetails", "title": "平面依赖详情", "content": "系统依赖详情分析。", "type": "analysis"},
      {"titleKey": "circularDependencyAnalysis", "title": "循环依赖分析", "content": "系统循环依赖分析。", "type": "circular"},
      {"titleKey": "optimizationRecommendations", "title": "优化建议", "content": "系统架构优化建议。", "type": "recommendations"},
      {"titleKey": "testEnvironmentAndMethods", "title": "测试环境与方法", "content": "系统测试环境和方法。", "type": "summary"},
      {"titleKey": "loadTestResults", "title": "负载测试结果", "content": "系统负载测试结果。", "type": "analysis"},
      {"titleKey": "performanceBottleneckAnalysis", "title": "性能瓶颈分析", "content": "系统性能瓶颈分析。", "type": "bottleneck"},
      {"titleKey": "securityAssessmentOverview", "title": "安全评估概述", "content": "系统安全评估概述。", "type": "summary"},
      {"titleKey": "vulnerabilityDetailsAnalysis", "title": "漏洞详情分析", "content": "系统安全漏洞分析。", "type": "analysis"},
      {"titleKey": "fixRecommendations", "title": "修复建议", "content": "系统安全问题修复建议。", "type": "recommendations"}
    ]
  },
  "5": {
    "id": "5",
    "name": "中间件服务分析报告",
    "type": "middleware",
    "status": "published",
    "author": "中间件团队",
    "createdAt": "2024-06-25 10:30:00",
    "lastModified": "2024-06-25 16:45:00",
    "size": "4.5MB",
    "downloads": 156,
    "description": "深入分析中间件服务的运行状况，包括消息队列、缓存、数据库中间件等关键组件的性能和稳定性。",
    "summary": {
      "totalMiddleware": 10,
      "healthyMiddleware": 8,
      "warningMiddleware": 1,
      "criticalMiddleware": 1,
      "overallScore": 88.2
    },
    "sections": [
      {"titleKey": "executiveSummary", "title": "执行摘要", "content": "中间件服务整体运行稳定，88.2%的中间件组件表现良好。", "type": "summary"},
      {"titleKey": "serviceStatusAnalysis", "title": "服务状态详细分析", "content": "各中间件服务的详细运行状态分析。", "type": "analysis"},
      {"titleKey": "performanceTrendAnalysis", "title": "性能指标趋势分析", "content": "中间件性能指标趋势分析。", "type": "trend"},
      {"titleKey": "resourceUsage", "title": "资源使用情况", "content": "中间件资源使用情况。", "type": "resources"},
      {"titleKey": "recommendationsAndActionPlan", "title": "建议与行动计划", "content": "中间件优化建议。", "type": "recommendations"},
      {"titleKey": "dependencyOverview", "title": "依赖关系概览", "content": "中间件依赖关系概览。", "type": "summary"},
      {"titleKey": "planeDependendencyDetails", "title": "平面依赖详情", "content": "中间件依赖详情分析。", "type": "analysis"},
      {"titleKey": "circularDependencyAnalysis", "title": "循环依赖分析", "content": "中间件循环依赖分析。", "type": "circular"},
      {"titleKey": "optimizationRecommendations", "title": "优化建议", "content": "中间件优化建议。", "type": "recommendations"},
      {"titleKey": "testEnvironmentAndMethods", "title": "测试环境与方法", "content": "中间件测试环境和方法。", "type": "summary"},
      {"titleKey": "loadTestResults", "title": "负载测试结果", "content": "中间件负载测试结果。", "type": "analysis"},
      {"titleKey": "performanceBottleneckAnalysis", "title": "性能瓶颈分析", "content": "中间件性能瓶颈分析。", "type": "bottleneck"},
      {"titleKey": "securityAssessmentOverview", "title": "安全评估概述", "content": "中间件安全评估概述。", "type": "summary"},
      {"titleKey": "vulnerabilityDetailsAnalysis", "title": "漏洞详情分析", "content": "中间件安全漏洞分析。", "type": "analysis"},
      {"titleKey": "fixRecommendations", "title": "修复建议", "content": "中间件安全问题修复建议。", "type": "recommendations"}
    ]
  },
  "6": {
    "id": "6",
    "name": "基础设施监控分析报告",
    "type": "infrastructure",
    "status": "published",
    "author": "基础设施团队",
    "createdAt": "2024-06-28 09:15:00",
    "lastModified": "2024-06-28 15:30:00",
    "size": "6.2MB",
    "downloads": 234,
    "description": "全面分析基础设施的运行状况，包括服务器、网络、存储、容器等基础组件的性能和可用性。",
    "summary": {
      "totalInfrastructure": 25,
      "healthyInfrastructure": 22,
      "warningInfrastructure": 2,
      "criticalInfrastructure": 1,
      "overallScore": 91.5
    },
    "sections": [
      {"titleKey": "executiveSummary", "title": "执行摘要", "content": "基础设施整体运行稳定，91.5%的基础组件表现优良。", "type": "summary"},
      {"titleKey": "serviceStatusAnalysis", "title": "服务状态详细分析", "content": "各基础设施组件的详细运行状态分析。", "type": "analysis"},
      {"titleKey": "performanceTrendAnalysis", "title": "性能指标趋势分析", "content": "基础设施性能指标趋势分析。", "type": "trend"},
      {"titleKey": "resourceUsage", "title": "资源使用情况", "content": "基础设施资源使用情况。", "type": "resources"},
      {"titleKey": "recommendationsAndActionPlan", "title": "建议与行动计划", "content": "基础设施优化建议。", "type": "recommendations"},
      {"titleKey": "dependencyOverview", "title": "依赖关系概览", "content": "基础设施依赖关系概览。", "type": "summary"},
      {"titleKey": "planeDependendencyDetails", "title": "平面依赖详情", "content": "基础设施依赖详情分析。", "type": "analysis"},
      {"titleKey": "circularDependencyAnalysis", "title": "循环依赖分析", "content": "基础设施循环依赖分析。", "type": "circular"},
      {"titleKey": "optimizationRecommendations", "title": "优化建议", "content": "基础设施优化建议。", "type": "recommendations"},
      {"titleKey": "testEnvironmentAndMethods", "title": "测试环境与方法", "content": "基础设施测试环境和方法。", "type": "summary"},
      {"titleKey": "loadTestResults", "title": "负载测试结果", "content": "基础设施负载测试结果。", "type": "analysis"},
      {"titleKey": "performanceBottleneckAnalysis", "title": "性能瓶颈分析", "content": "基础设施性能瓶颈分析。", "type": "bottleneck"},
      {"titleKey": "securityAssessmentOverview", "title": "安全评估概述", "content": "基础设施安全评估概述。", "type": "summary"},
      {"titleKey": "vulnerabilityDetailsAnalysis", "title": "漏洞详情分析", "content": "基础设施安全漏洞分析。", "type": "analysis"},
      {"titleKey": "fixRecommendations", "title": "修复建议", "content": "基础设施安全问题修复建议。", "type": "recommendations"}
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
