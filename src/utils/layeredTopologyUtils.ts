import { NodeStatus } from '../pages/TaskCollection/types';
import layeredNodesData from '../data/layeredTopologyNodes.json';

// 分层任务节点类型（本地定义）
export interface LayeredTaskNode {
  id: string;
  name: string;
  type: 'entity' | 'sequence';
  category: string;
  layer: string; // 对应业务层级ID
  status: NodeStatus;
  actions: string[];
  startTime?: string;
  endTime?: string;
  duration?: number;
  results?: any[];
  dependencies?: string[];
  x?: number;
  y?: number;
}

// 层级名称映射
export const LAYER_NAMES: Record<string, string> = {
  L5: 'L5 - 业务场景层',
  L4: 'L4 - 业务链路层',
  L3: 'L3 - 业务系统层',
  L2: 'L2 - 中间件层',
  L1: 'L1 - 基础设施层'
};

// 获取层级完整名称
export const getLayerFullName = (layerId: string): string => {
  return LAYER_NAMES[layerId] || layerId;
};
export interface LayerStatistics {
  total: number;
  completed: number;
  running: number;
  failed: number;
  pending: number;
}

// 将JSON数据转换为类型化的节点数据
export const loadLayeredTopologyNodes = (): LayeredTaskNode[] => {
  return layeredNodesData.map(node => ({
    ...node,
    status: node.status as NodeStatus
  }));
};

// 获取各层级的节点统计
export const getLayerStatistics = (nodes: LayeredTaskNode[]): Record<string, LayerStatistics> => {
  const stats: Record<string, LayerStatistics> = {
    L5: { total: 0, completed: 0, running: 0, failed: 0, pending: 0 },
    L4: { total: 0, completed: 0, running: 0, failed: 0, pending: 0 },
    L3: { total: 0, completed: 0, running: 0, failed: 0, pending: 0 },
    L2: { total: 0, completed: 0, running: 0, failed: 0, pending: 0 },
    L1: { total: 0, completed: 0, running: 0, failed: 0, pending: 0 }
  };

  nodes.forEach(node => {
    const layer = node.layer;
    if (stats[layer]) {
      stats[layer].total++;
      switch (node.status) {
        case NodeStatus.COMPLETED:
          stats[layer].completed++;
          break;
        case NodeStatus.RUNNING:
          stats[layer].running++;
          break;
        case NodeStatus.FAILED:
          stats[layer].failed++;
          break;
        case NodeStatus.PENDING:
          stats[layer].pending++;
          break;
      }
    }
  });

  return stats;
};

// 根据层级过滤节点
export const getNodesByLayer = (nodes: LayeredTaskNode[], layer: string): LayeredTaskNode[] => {
  return nodes.filter(node => node.layer === layer);
};

// 获取节点的依赖节点
export const getDependencyNodes = (nodes: LayeredTaskNode[], nodeId: string): LayeredTaskNode[] => {
  const node = nodes.find(n => n.id === nodeId);
  if (!node || !node.dependencies) return [];
  
  return nodes.filter(n => node.dependencies!.includes(n.id));
};

// 获取依赖于指定节点的节点
export const getDependentNodes = (nodes: LayeredTaskNode[], nodeId: string): LayeredTaskNode[] => {
  return nodes.filter(node => 
    node.dependencies && node.dependencies.includes(nodeId)
  );
};
