export interface Report {
  id: string;
  name: string;
  type: string;
  status: 'published' | 'draft' | 'archived';
  author: string;
  createdAt: string;
  lastModified: string;
  size: string;
  downloads: number;
  description: string;
  summary?: any;
  sections?: any[];
}

export interface ReportSection {
  titleKey?: string;
  title: string;
  content: string;
  type: string;
  data?: any[];
  keyMetrics?: Record<string, string>;
  highlights?: string[];
  metrics?: any[];
  trendData?: any;
  recommendations?: any[];
  issues?: any[];
  bottlenecks?: any[];
}

export interface ReportSummary {
  totalServices?: number;
  healthyServices?: number;
  warningServices?: number;
  criticalServices?: number;
  overallScore?: number;
  totalPlanes?: number;
  dependencies?: number;
  circularDeps?: number;
  riskLevel?: string;
  complexityScore?: number;
  testDuration?: string;
  totalRequests?: string;
  avgResponseTime?: string;
  maxThroughput?: string;
  errorRate?: string;
  totalVulnerabilities?: number;
  highRisk?: number;
  mediumRisk?: number;
  lowRisk?: number;
  securityScore?: number;
}
