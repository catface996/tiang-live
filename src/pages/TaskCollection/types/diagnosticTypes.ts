// 节点状态枚举
export enum NodeStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  SKIPPED = 'skipped'
}

// 指标健康度枚举
export enum MetricHealth {
  HEALTHY = 'healthy',
  WARNING = 'warning',
  CRITICAL = 'critical',
  UNKNOWN = 'unknown'
}

// 指标检查结果
export interface MetricCheck {
  id: string;
  name: string;
  description: string;
  unit: string;
  healthyRange: {
    min?: number;
    max?: number;
    optimal?: number;
    description: string;
  };
  actualValue: number;
  health: MetricHealth;
  healthScore: number; // 0-100
  timestamp: string;
  trend?: 'up' | 'down' | 'stable';
  previousValue?: number;
}

// 诊断动作结果
export interface DiagnosticAction {
  id: string;
  name: string;
  description: string;
  type: 'health_check' | 'performance_analysis' | 'fault_analysis' | 'security_scan';
  status: 'success' | 'warning' | 'error';
  startTime: string;
  endTime: string;
  duration: number;
  metrics: MetricCheck[];
  overallScore: number; // 0-100
  summary: string;
}
