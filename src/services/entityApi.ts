/**
 * 实体操作API服务
 */

import axios from 'axios';

// 实体状态枚举
export enum EntityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
  PROCESSING = 'PROCESSING'
}

// 实体数据类型定义
export interface Entity {
  id?: number;
  name: string;
  description?: string;
  type: string;
  status?: EntityStatus;
  planeId: number;
  labels?: string[];
  properties?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

// 保存实体请求
export interface SaveEntityRequest {
  id?: number;
  name: string;
  description?: string;
  type: string;
  planeId: number;
  status?: EntityStatus;
  labels?: string[];
  properties?: Record<string, any>;
  metadata?: Record<string, any>;
}

// 查询实体请求
export interface QueryEntityRequest {
  name?: string;
  type?: string;
  planeId?: number;
  status?: EntityStatus;
  page?: number;
  size?: number;
}

// 获取实体详情请求
export interface GetEntityDetailRequest {
  entityId: number;
}

// 删除实体请求
export interface DeleteEntityRequest {
  entityId: number;
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

// 分页结果类型
export interface PageResult<T> {
  records: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// 创建专门的实体API客户端，直接指向后端的/api/entity路径
const entityApiClient = axios.create({
  baseURL: '/api/entity',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
entityApiClient.interceptors.request.use(
  config => {
    const timestamp = new Date().toISOString();
    const fullURL = `${config.baseURL}${config.url}`;

    console.log(`🚀 [${timestamp}] Entity API Request:`, {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: fullURL,
      data: config.data,
      headers: {
        'Content-Type': config.headers['Content-Type'],
        Authorization: config.headers.Authorization ? '***Bearer Token***' : 'None'
      }
    });

    // 添加认证token
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`🔑 [${timestamp}] Added auth token to request`);
    } else {
      console.log(`⚠️ [${timestamp}] No auth token found in localStorage`);
    }

    console.log(`📤 [${timestamp}] Sending ${config.method?.toUpperCase()} request to: ${fullURL}`);
    console.log(`📋 [${timestamp}] Request payload:`, JSON.stringify(config.data, null, 2));

    return config;
  },
  error => {
    console.error(`❌ [${new Date().toISOString()}] Entity API Request Error:`, error);
    return Promise.reject(error);
  }
);

// 响应拦截器
entityApiClient.interceptors.response.use(
  response => {
    const timestamp = new Date().toISOString();
    const fullURL = `${response.config.baseURL}${response.config.url}`;

    console.log(`✅ [${timestamp}] Entity API Response SUCCESS:`, {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      method: response.config.method?.toUpperCase(),
      fullURL: fullURL,
      dataSize: JSON.stringify(response.data).length + ' bytes'
    });
    console.log(`📥 [${timestamp}] Response data:`, response.data);
    console.log(`🎉 [${timestamp}] ✅ REQUEST SUCCESSFULLY REACHED BACKEND! ✅`);

    return response.data;
  },
  error => {
    const timestamp = new Date().toISOString();
    const fullURL = error.config ? `${error.config.baseURL}${error.config.url}` : 'unknown';

    console.error(`❌ [${timestamp}] Entity API Response ERROR:`, {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      fullURL: fullURL
    });

    if (error.response?.status === 404) {
      console.error(`🔍 [${timestamp}] 404 Error - Backend endpoint not found: ${fullURL}`);
      console.error(`💡 [${timestamp}] Check if backend service is running on http://localhost:8080`);
    } else if (error.response?.status >= 500) {
      console.error(`🔥 [${timestamp}] Server Error - Backend service issue`);
    } else if (error.code === 'ECONNREFUSED') {
      console.error(`🚫 [${timestamp}] Connection Refused - Backend service not running`);
    } else if (!error.response) {
      console.error(`🌐 [${timestamp}] Network Error - Request may not have reached backend`);
    }

    return Promise.reject(error);
  }
);

/**
 * 实体操作API服务类
 */
export // 实体统计响应类型定义
interface EntityStatisticsResponse {
  overallStats: {
    totalCount: number;
    activeCount: number;
    warningCount: number;
    errorCount: number;
    inactiveCount: number;
  };
  typeStats: Array<{
    type: string;
    typeName: string;
    count: number;
    activeCount: number;
    warningCount: number;
    errorCount: number;
    inactiveCount: number;
  }>;
}

const entityApi = {
  /**
   * 保存实体（创建或更新）
   */
  async saveEntity(request: SaveEntityRequest): Promise<ApiResponse<Entity>> {
    return entityApiClient.post('/save', request);
  },

  /**
   * 获取实体详情
   */
  async getEntityDetail(request: GetEntityDetailRequest): Promise<ApiResponse<Entity>> {
    return entityApiClient.post('/detail', request);
  },

  /**
   * 根据ID获取实体详情（便捷方法）
   */
  async getEntityById(entityId: string | number): Promise<ApiResponse<Entity>> {
    return this.getEntityDetail({ entityId: Number(entityId) });
  },

  /**
   * 查询实体列表
   */
  async listEntities(request: QueryEntityRequest = {}): Promise<ApiResponse<Entity[]>> {
    return entityApiClient.post('/list', request);
  },

  /**
   * 获取实体统计信息
   */
  async getEntityStatistics(): Promise<ApiResponse<EntityStatisticsResponse>> {
    console.log('🚀 调用实体统计接口');
    try {
      const response = await entityApiClient.get('/statistics');
      console.log('📊 实体统计接口响应:', response);
      return response;
    } catch (error) {
      console.error('❌ 获取实体统计失败:', error);
      throw error;
    }
  },

  /**
   * 删除实体
   */
  async deleteEntity(request: DeleteEntityRequest): Promise<ApiResponse<void>> {
    return entityApiClient.post('/delete', request);
  },

  /**
   * 根据ID删除实体（便捷方法）
   */
  async deleteEntityById(entityId: string | number): Promise<ApiResponse<void>> {
    return this.deleteEntity({ entityId: Number(entityId) });
  },

  /**
   * 创建新实体
   */
  async createEntity(entity: Omit<SaveEntityRequest, 'id'>): Promise<ApiResponse<Entity>> {
    return this.saveEntity(entity);
  },

  /**
   * 更新实体
   */
  async updateEntity(entity: SaveEntityRequest): Promise<ApiResponse<Entity>> {
    if (!entity.id) {
      throw new Error('更新实体时ID不能为空');
    }
    return this.saveEntity(entity);
  },

  /**
   * 根据类型查询实体列表
   */
  async getEntitiesByType(type: string, page: number = 1, size: number = 10): Promise<ApiResponse<Entity[]>> {
    return this.listEntities({ type, page, size });
  },

  /**
   * 根据平面ID查询实体列表
   */
  async getEntitiesByPlane(planeId: number, page: number = 1, size: number = 10): Promise<ApiResponse<Entity[]>> {
    return this.listEntities({ planeId, page, size });
  },

  /**
   * 根据状态查询实体列表
   */
  async getEntitiesByStatus(status: EntityStatus, page: number = 1, size: number = 10): Promise<ApiResponse<Entity[]>> {
    return this.listEntities({ status, page, size });
  },

  /**
   * 搜索实体（按名称模糊查询）
   */
  async searchEntities(name: string, page: number = 1, size: number = 10): Promise<ApiResponse<Entity[]>> {
    return this.listEntities({ name, page, size });
  },

  /**
   * 批量删除实体
   */
  async batchDeleteEntities(entityIds: number[]): Promise<ApiResponse<void>[]> {
    const deletePromises = entityIds.map(id => this.deleteEntityById(id));
    return Promise.all(deletePromises);
  }
};

export default entityApi;
