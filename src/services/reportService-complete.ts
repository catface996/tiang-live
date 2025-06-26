import type { Report } from '../types/report';

// 重新导出类型以便其他地方使用
export type { Report } from '../types/report';

// 完整的报告模拟数据 - 包含所有sections的详细数据
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
        "content": "系统整体健康状况良好，93.3%的服务运行正常。在监控的45个核心服务中，42个服务状态健康，2个服务存在性能警告，1个服务需要紧急处理。主要问题集中在通知服务的响应时间过长和支付服务的错误率偏高。建议优先处理通知服务的性能瓶颈，预计修复后系统整体评分可提升至96%以上。",
        "type": "summary",
        "keyMetrics": {
          "systemUptime": "99.2%",
          "avgResponseTime": "185ms",
          "errorRate": "0.23%",
          "throughput": "15.2K req/s",
          "activeUsers": "12,450",
          "peakConcurrency": "3,200"
        },
        "highlights": [
          "系统整体可用性达到99.2%，超过SLA要求的99%",
          "42个核心服务运行状态良好，占总数的93.3%",
          "通知服务存在性能瓶颈，响应时间超过1秒",
          "支付服务错误率偏高，需要紧急优化",
          "数据库连接池使用率78%，接近预警阈值"
        ],
        "riskAssessment": {
          "high": ["通知服务性能瓶颈", "支付服务错误率高"],
          "medium": ["数据库连接池使用率高", "缓存命中率下降"],
          "low": ["日志存储空间不足", "监控告警延迟"]
        }
      },
      {
        "titleKey": "serviceStatusAnalysis",
        "title": "服务状态详细分析",
        "content": "以下是各核心服务的详细运行状态分析，包括响应时间、错误率、可用性等关键指标。数据基于过去30天的监控记录。",
        "type": "analysis",
        "data": [
          {
            "service": "用户认证服务",
            "status": "healthy",
            "responseTime": "85ms",
            "errorRate": "0.02%",
            "availability": "99.98%",
            "requests": "2.3M",
            "instances": 3,
            "cpuUsage": "45%",
            "memoryUsage": "62%",
            "lastIncident": "2024-06-01",
            "slaCompliance": "100%",
            "healthScore": 98.5
          },
          {
            "service": "用户管理服务",
            "status": "healthy",
            "responseTime": "120ms",
            "errorRate": "0.1%",
            "availability": "99.95%",
            "requests": "1.8M",
            "instances": 2,
            "cpuUsage": "38%",
            "memoryUsage": "55%",
            "lastIncident": "2024-05-28",
            "slaCompliance": "99.8%",
            "healthScore": 96.2
          },
          {
            "service": "订单处理服务",
            "status": "healthy",
            "responseTime": "95ms",
            "errorRate": "0.05%",
            "availability": "99.97%",
            "requests": "890K",
            "instances": 4,
            "cpuUsage": "52%",
            "memoryUsage": "68%",
            "lastIncident": "2024-05-15",
            "slaCompliance": "100%",
            "healthScore": 97.8
          },
          {
            "service": "支付处理服务",
            "status": "warning",
            "responseTime": "280ms",
            "errorRate": "0.8%",
            "availability": "99.2%",
            "requests": "650K",
            "instances": 2,
            "cpuUsage": "75%",
            "memoryUsage": "82%",
            "lastIncident": "2024-06-12",
            "slaCompliance": "95.2%",
            "healthScore": 78.5,
            "issues": [
              "第三方支付网关响应延迟",
              "数据库连接池耗尽",
              "内存泄漏导致频繁重启"
            ]
          },
          {
            "service": "通知推送服务",
            "status": "critical",
            "responseTime": "1200ms",
            "errorRate": "5.2%",
            "availability": "95.8%",
            "requests": "3.1M",
            "instances": 3,
            "cpuUsage": "89%",
            "memoryUsage": "91%",
            "lastIncident": "2024-06-14",
            "slaCompliance": "85.3%",
            "healthScore": 65.2,
            "issues": [
              "消息队列积压严重，处理延迟超过5分钟",
              "Redis缓存命中率下降至45%",
              "WebSocket连接频繁断开",
              "推送成功率仅为78%"
            ]
          }
        ],
        "summary": {
          "totalServices": 45,
          "healthyServices": 42,
          "warningServices": 2,
          "criticalServices": 1,
          "avgHealthScore": 87.2,
          "topIssues": [
            "通知服务性能严重下降",
            "支付服务稳定性问题",
            "高峰期资源使用率过高"
          ]
        }
      },
      {
        "titleKey": "performanceTrendAnalysis",
        "title": "性能指标趋势分析",
        "content": "过去30天的关键性能指标变化趋势显示，系统整体性能稳定，但在高峰时段存在性能压力。通知服务在6月10日开始出现性能下降，支付服务的错误率在6月12日有明显上升。",
        "type": "trend",
        "metrics": [
          {
            "name": "平均响应时间",
            "current": "185ms",
            "previous": "165ms",
            "trend": "+12%",
            "status": "warning",
            "target": "150ms",
            "description": "响应时间较上月增长12%，主要由通知服务拖累",
            "trendData": [
              {"date": "2024-05-15", "value": 158},
              {"date": "2024-05-20", "value": 162},
              {"date": "2024-05-25", "value": 165},
              {"date": "2024-05-30", "value": 168},
              {"date": "2024-06-05", "value": 172},
              {"date": "2024-06-10", "value": 195},
              {"date": "2024-06-15", "value": 185}
            ]
          },
          {
            "name": "系统吞吐量",
            "current": "15.2K req/s",
            "previous": "14.1K req/s",
            "trend": "+8%",
            "status": "good",
            "target": "12K req/s",
            "description": "系统处理能力持续提升，超出预期目标",
            "trendData": [
              {"date": "2024-05-15", "value": 13.8},
              {"date": "2024-05-20", "value": 14.1},
              {"date": "2024-05-25", "value": 14.3},
              {"date": "2024-05-30", "value": 14.5},
              {"date": "2024-06-05", "value": 14.8},
              {"date": "2024-06-10", "value": 15.1},
              {"date": "2024-06-15", "value": 15.2}
            ]
          },
          {
            "name": "错误率",
            "current": "0.23%",
            "previous": "0.08%",
            "trend": "+0.15%",
            "status": "warning",
            "target": "0.1%",
            "description": "错误率上升主要来自支付和通知服务",
            "trendData": [
              {"date": "2024-05-15", "value": 0.06},
              {"date": "2024-05-20", "value": 0.07},
              {"date": "2024-05-25", "value": 0.08},
              {"date": "2024-05-30", "value": 0.09},
              {"date": "2024-06-05", "value": 0.12},
              {"date": "2024-06-10", "value": 0.18},
              {"date": "2024-06-15", "value": 0.23}
            ]
          },
          {
            "name": "系统可用性",
            "current": "99.1%",
            "previous": "99.9%",
            "trend": "-0.8%",
            "status": "critical",
            "target": "99.5%",
            "description": "可用性下降主要由通知服务故障导致",
            "trendData": [
              {"date": "2024-05-15", "value": 99.9},
              {"date": "2024-05-20", "value": 99.8},
              {"date": "2024-05-25", "value": 99.7},
              {"date": "2024-05-30", "value": 99.6},
              {"date": "2024-06-05", "value": 99.4},
              {"date": "2024-06-10", "value": 99.2},
              {"date": "2024-06-15", "value": 99.1}
            ]
          }
        ],
        "analysis": {
          "keyFindings": [
            "通知服务性能在6月10日后显著下降",
            "支付服务错误率持续上升",
            "整体吞吐量保持增长趋势",
            "系统可用性低于SLA要求"
          ],
          "rootCauses": [
            "通知服务消息队列积压",
            "支付服务第三方依赖不稳定",
            "高峰期资源竞争加剧",
            "缓存策略需要优化"
          ]
        }
      }
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
