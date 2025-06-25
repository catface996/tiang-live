// 任务节点类型定义
export interface TaskNode {
  id: string;
  name: string;
  type: 'entity' | 'sequence';
  status: 'completed' | 'running' | 'pending' | 'failed' | 'skipped';
  panel: string;
  dependencies?: string[];
  x?: number;
  y?: number;
  startTime?: string;
  endTime?: string;
  duration?: number;
  description?: string;
  metadata?: Record<string, any>;
}

// 面板类型定义
export interface Panel {
  id: string;
  name: string;
  description: string;
  color: string;
  borderColor: string;
  nodes?: TaskNode[];
}
