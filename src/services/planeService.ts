import { BaseApiService } from './simpleApi';
import { mockPlaneService } from './mockPlaneService';
import type { 
  PlaneDefinition, 
  PlaneInstance, 
  PlaneTopology, 
  PlaneMetrics,
  PlaneOperation,
  PlaneOperationResult,
  PaginatedResponse,
  QueryParams 
} from '../types';

// 判断是否使用模拟数据
const USE_MOCK_DATA = import.meta.env.DEV || import.meta.env.VITE_USE_MOCK_DATA === 'true';

class PlaneService extends BaseApiService {
  constructor() {
    super('/planes');
  }

  // 平面定义相关API
  async getPlaneDefinitions(params?: QueryParams): Promise<PaginatedResponse<PlaneDefinition>> {
    if (USE_MOCK_DATA) {
      return mockPlaneService.getPlaneDefinitions();
    }
    return this.get('/definitions', { params });
  }

  async getPlaneDefinition(id: string): Promise<PlaneDefinition> {
    if (USE_MOCK_DATA) {
      return mockPlaneService.getPlaneDefinition(id);
    }
    return this.get(`/definitions/${id}`);
  }

  async createPlaneDefinition(data: Partial<PlaneDefinition>): Promise<PlaneDefinition> {
    if (USE_MOCK_DATA) {
      // 模拟创建操作
      const newPlane: PlaneDefinition = {
        id: `plane-${Date.now()}`,
        name: data.name || 'new-plane',
        displayName: data.displayName || 'New Plane',
        description: data.description || 'New plane description',
        level: data.level || 1,
        dependencies: data.dependencies || [],
        config: data.config || {
          icon: '📋',
          color: '#1890ff',
          maxInstances: 10,
          autoScaling: false,
          monitoring: { enabled: true },
          security: { accessControl: true, encryption: false },
        },
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data,
      };
      return Promise.resolve(newPlane);
    }
    return this.post('/definitions', data);
  }

  async updatePlaneDefinition(id: string, data: Partial<PlaneDefinition>): Promise<PlaneDefinition> {
    if (USE_MOCK_DATA) {
      const existingPlane = await this.getPlaneDefinition(id);
      const updatedPlane = {
        ...existingPlane,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      return Promise.resolve(updatedPlane);
    }
    return this.put(`/definitions/${id}`, data);
  }

  async deletePlaneDefinition(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      return Promise.resolve();
    }
    return this.delete(`/definitions/${id}`);
  }

  // 平面实例相关API
  async getPlaneInstances(planeId?: string, params?: QueryParams): Promise<PaginatedResponse<PlaneInstance>> {
    if (USE_MOCK_DATA) {
      // 返回空的实例列表
      return Promise.resolve({
        data: [],
        total: 0,
        page: 1,
        pageSize: 10,
        hasNext: false,
        hasPrev: false,
      });
    }
    const url = planeId ? `/definitions/${planeId}/instances` : '/instances';
    return this.get(url, { params });
  }

  async getPlaneInstance(id: string): Promise<PlaneInstance> {
    if (USE_MOCK_DATA) {
      throw new Error('Mock instance not found');
    }
    return this.get(`/instances/${id}`);
  }

  async createPlaneInstance(planeId: string, data: Partial<PlaneInstance>): Promise<PlaneInstance> {
    if (USE_MOCK_DATA) {
      const newInstance: PlaneInstance = {
        id: `instance-${Date.now()}`,
        name: data.name || 'new-instance',
        planeDefinitionId: planeId,
        metadata: data.metadata || {},
        properties: data.properties || {},
        status: 'RUNNING',
        healthScore: 100,
        entityCount: 0,
        relationshipCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data,
      };
      return Promise.resolve(newInstance);
    }
    return this.post(`/definitions/${planeId}/instances`, data);
  }

  async updatePlaneInstance(id: string, data: Partial<PlaneInstance>): Promise<PlaneInstance> {
    if (USE_MOCK_DATA) {
      throw new Error('Mock update not implemented');
    }
    return this.put(`/instances/${id}`, data);
  }

  async deletePlaneInstance(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      return Promise.resolve();
    }
    return this.delete(`/instances/${id}`);
  }

  // 平面拓扑相关API
  async getPlaneTopology(): Promise<PlaneTopology> {
    if (USE_MOCK_DATA) {
      return mockPlaneService.getPlaneTopology();
    }
    return this.get('/topology');
  }

  async validateTopology(topology: PlaneTopology): Promise<{ valid: boolean; errors?: string[] }> {
    if (USE_MOCK_DATA) {
      return Promise.resolve({ valid: true });
    }
    return this.post('/topology/validate', topology);
  }

  // 平面指标相关API
  async getPlaneMetrics(planeId: string, timeRange?: { start: string; end: string }): Promise<PlaneMetrics[]> {
    if (USE_MOCK_DATA) {
      const allMetrics = await mockPlaneService.getAllPlanesMetrics();
      return allMetrics.filter(metric => metric.planeId === planeId);
    }
    return this.get(`/definitions/${planeId}/metrics`, { params: timeRange });
  }

  async getAllPlanesMetrics(): Promise<PlaneMetrics[]> {
    if (USE_MOCK_DATA) {
      return mockPlaneService.getAllPlanesMetrics();
    }
    return this.get('/metrics');
  }

  // 平面操作相关API
  async executePlaneOperation(operation: PlaneOperation): Promise<PlaneOperationResult> {
    if (USE_MOCK_DATA) {
      return Promise.resolve({
        success: true,
        operationId: `op-${Date.now()}`,
        message: `Operation ${operation.type} executed successfully`,
      });
    }
    return this.post('/operations', operation);
  }

  async getOperationHistory(planeId?: string, params?: QueryParams): Promise<PaginatedResponse<PlaneOperation>> {
    if (USE_MOCK_DATA) {
      return Promise.resolve({
        data: [],
        total: 0,
        page: 1,
        pageSize: 10,
        hasNext: false,
        hasPrev: false,
      });
    }
    const url = planeId ? `/definitions/${planeId}/operations` : '/operations';
    return this.get(url, { params });
  }

  // 平面状态管理
  async startPlaneInstance(instanceId: string): Promise<PlaneOperationResult> {
    if (USE_MOCK_DATA) {
      return Promise.resolve({
        success: true,
        operationId: `start-${Date.now()}`,
        message: 'Instance started successfully',
      });
    }
    return this.post(`/instances/${instanceId}/start`);
  }

  async stopPlaneInstance(instanceId: string): Promise<PlaneOperationResult> {
    if (USE_MOCK_DATA) {
      return Promise.resolve({
        success: true,
        operationId: `stop-${Date.now()}`,
        message: 'Instance stopped successfully',
      });
    }
    return this.post(`/instances/${instanceId}/stop`);
  }

  async restartPlaneInstance(instanceId: string): Promise<PlaneOperationResult> {
    if (USE_MOCK_DATA) {
      return Promise.resolve({
        success: true,
        operationId: `restart-${Date.now()}`,
        message: 'Instance restarted successfully',
      });
    }
    return this.post(`/instances/${instanceId}/restart`);
  }

  // 平面健康检查
  async checkPlaneHealth(planeId: string): Promise<{ healthy: boolean; issues?: string[] }> {
    if (USE_MOCK_DATA) {
      return Promise.resolve({ healthy: true });
    }
    return this.get(`/definitions/${planeId}/health`);
  }

  async checkAllPlanesHealth(): Promise<Record<string, { healthy: boolean; issues?: string[] }>> {
    if (USE_MOCK_DATA) {
      return Promise.resolve({});
    }
    return this.get('/health');
  }
}

export const planeService = new PlaneService();
