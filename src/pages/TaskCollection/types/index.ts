export enum NodeStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  SKIPPED = 'skipped'
}

export enum MetricHealth {
  HEALTHY = 'healthy',
  WARNING = 'warning',
  CRITICAL = 'critical',
  UNKNOWN = 'unknown'
}

export interface MetricCheck {
  id: string;
  name: string;
  description: string;
  unit: string;
  healthyRange: {
    min?: number;
    max?: number;
    description: string;
  };
  actualValue: number;
  health: MetricHealth;
  healthScore: number;
  timestamp: string;
}

export interface DiagnosticAction {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'success' | 'warning' | 'error';
  startTime: string;
  endTime: string;
  duration: number;
  metrics: MetricCheck[];
  overallScore: number;
  summary: string;
}

export interface NodeAnalysis {
  overallHealthScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  keyFindings: string[];
  performanceSummary: string;
  securitySummary: string;
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    category: string;
    title: string;
    description: string;
    estimatedImpact: string;
  }>;
}

export interface EnhancedDiagnosticReport {
  nodeId: string;
  nodeName: string;
  nodeType: 'entity' | 'sequence';
  status: NodeStatus;
  executionTime: {
    startTime: string;
    endTime?: string;
    totalDuration?: number;
  };
  actions: DiagnosticAction[];
  analysis: NodeAnalysis;
  lastUpdated: string;
}
