import { BaseApiService } from './simpleApi';
import { planeStaticDataService } from './staticDataService';
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

// 使用静态数据服务替代mock服务
const USE_STATIC_DATA = true; // 始终使用静态数据

class PlaneService extends BaseApiService {
  constructor() {
    super('/planes');
  }

  // 平面定义相关API
  async getPlaneDefinitions(params?: QueryParams): Promise<PaginatedResponse<PlaneDefinition>> {
    if (USE_STATIC_DATA) {
      return planeStaticDataService.getPlaneDefinitions(params);
    }
    return this.get('/definitions', { params });
  }

  async getPlaneDefinition(id: string): Promise<PlaneDefinition> {
    if (USE_STATIC_DATA) {
      const response = await planeStaticDataService.getPlaneById(id);
      return response.data;
    }
    return this.get(`/definitions/${id}`);
  }

  async createPlaneDefinition(data: Partial<PlaneDefinition>): Promise<PlaneDefinition> {
    if (USE_STATIC_DATA) {
      // 模拟创建操作
      const newPlane: PlaneDefinition = {
        id: `plane-${Date.now()}`,
        name: data.name || 'new-plane',
        displayName: data.displayName || 'New Plane',
        description: data.description || 'New plane description',
        level: data.level || 1,
        dependencies: data.dependencies || [],
        entityHealth: {
          healthy: 0,
          warning: 0,
          error: 0,
          total: 0
        },
        config: data.config || {
          icon: '📋',
          color: '#1890ff',
          theme: 'default',
          maxInstances: 10,
          autoScaling: false,
          monitoring: { enabled: true, alertThreshold: 80 },
          security: { accessControl: true, encryption: false },
          healthThresholds: { warningThreshold: 0.2, errorThreshold: 0.1 }
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
    if (USE_STATIC_DATA) {
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
    if (USE_STATIC_DATA) {
      // 模拟删除操作
      return Promise.resolve();
    }
    return this.delete(`/definitions/${id}`);
  }

  // 平面拓扑相关API
  async getPlaneTopology(): Promise<PlaneTopology> {
    if (USE_STATIC_DATA) {
      const response = await planeStaticDataService.getPlaneTopology();
      return response.data;
    }
    return this.get('/topology');
  }

  // 平面指标相关API
  async getPlaneMetrics(planeId?: string, timeRange?: { start: string; end: string }): Promise<PlaneMetrics[]> {
    if (USE_STATIC_DATA) {
      const response = await planeStaticDataService.getPlaneMetrics();
      // 将单个PlaneMetrics对象转换为数组格式，以匹配组件期望
      return response.data.planeMetrics || [];
    }
    return this.get('/metrics', { params: { planeId, ...timeRange } });
  }

  async getAllPlanesMetrics(): Promise<PlaneMetrics[]> {
    if (USE_STATIC_DATA) {
      const response = await planeStaticDataService.getPlaneMetrics();
      // 直接返回planeMetrics数组
      return response.data.planeMetrics || [];
    }
    return this.get('/metrics');
  }

  // 平面实例相关API (保持原有的模拟逻辑)
  async getPlaneInstances(planeDefinitionId: string, params?: QueryParams): Promise<PaginatedResponse<PlaneInstance>> {
    // 模拟实例数据
    const mockInstances: PlaneInstance[] = [
      {
        id: `instance-${planeDefinitionId}-1`,
        name: `${planeDefinitionId}-instance-1`,
        planeDefinitionId,
        metadata: { region: 'us-east-1', environment: 'production' },
        properties: { version: '1.0.0', replicas: 3 },
        status: 'RUNNING',
        entityHealth: {
          healthy: 10,
          warning: 2,
          error: 0,
          total: 12
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];

    return Promise.resolve({
      data: mockInstances,
      total: mockInstances.length,
      page: params?.page || 1,
      pageSize: params?.pageSize || 10,
    });
  }

  async createPlaneInstance(data: Partial<PlaneInstance>): Promise<PlaneInstance> {
    const newInstance: PlaneInstance = {
      id: `instance-${Date.now()}`,
      name: data.name || 'new-instance',
      planeDefinitionId: data.planeDefinitionId || '',
      metadata: data.metadata || {},
      properties: data.properties || {},
      status: 'RUNNING',
      entityHealth: {
        healthy: 0,
        warning: 0,
        error: 0,
        total: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };
    return Promise.resolve(newInstance);
  }

  // 平面操作相关API
  async executePlaneOperation(planeId: string, operation: PlaneOperation): Promise<PlaneOperationResult> {
    // 模拟操作结果
    return Promise.resolve({
      operationId: `op-${Date.now()}`,
      planeId,
      operation: operation.type,
      status: 'SUCCESS',
      message: `Operation ${operation.type} completed successfully`,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      result: { success: true }
    });
  }
}

// 导出单例
export const planeService = new PlaneService();
export default planeService;
