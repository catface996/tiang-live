/**
 * API服务层 - 统一管理与后端的通信
 */

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type {
  ApiResponse,
  PaginationResponse,
  Entity,
  CreateEntityRequest,
  UpdateEntityRequest,
  EntityQueryRequest,
  Agent,
  CreateAgentRequest,
  UpdateAgentRequest,
  AgentQueryRequest,
  EntityDependency,
  EntityAgentRelation,
  CreateDependencyRequest,
  CreateAgentRelationRequest,
  TopologyData,
  TopologyAnalysisRequest,
  TopologyAnalysisResponse,
  Plane,
  MetricData,
  Alert,
  BatchOperationRequest,
  BatchOperationResponse
} from '../types/api';

// ==================== API客户端配置 ====================

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api') {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // 请求拦截器
    this.client.interceptors.request.use(
      config => {
        // 添加认证token
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 添加请求ID
        config.headers['X-Request-ID'] = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        console.log(`🚀 API请求: ${config.method?.toUpperCase()} ${config.url}`, {
          baseURL: this.client.defaults.baseURL,
          fullURL: `${this.client.defaults.baseURL}${config.url}`,
          headers: config.headers,
          data: config.data
        });

        return config;
      },
      error => {
        console.error('❌ API请求错误:', error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.client.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        console.log(`✅ API响应: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
          status: response.status,
          data: response.data
        });
        return response;
      },
      error => {
        console.error('❌ API响应错误:', error.response?.data || error.message);

        // 统一错误处理
        if (error.response?.status === 401) {
          // 未授权，清除token并跳转登录
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }

        return Promise.reject(error);
      }
    );
  }

  // 通用请求方法
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client.request<ApiResponse<T>>(config);
    return response.data.data;
  }

  // 获取完整响应的请求方法
  private async requestFullResponse<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.request<ApiResponse<T>>(config);
    return response.data;
  }

  // GET请求
  async get<T>(url: string, params?: any): Promise<T> {
    return this.request<T>({ method: 'GET', url, params });
  }

  // POST请求
  async post<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'POST', url, data });
  }

  // POST请求 - 返回完整响应
  async postFullResponse<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.requestFullResponse<T>({ method: 'POST', url, data });
  }

  // PUT请求
  async put<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'PUT', url, data });
  }

  // DELETE请求
  async delete<T>(url: string): Promise<T> {
    return this.request<T>({ method: 'DELETE', url });
  }

  // DELETE请求 - 返回完整响应
  async deleteFullResponse<T>(url: string): Promise<T> {
    return this.requestFullResponse<T>({ method: 'DELETE', url });
  }

  // PATCH请求
  async patch<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'PATCH', url, data });
  }
}

// 创建API客户端实例
const apiClient = new ApiClient();

// ==================== 实体API ====================

export const entityApi = {
  /**
   * 获取实体列表
   */
  async getEntities(params?: EntityQueryRequest): Promise<PaginationResponse<Entity>> {
    return apiClient.get('/entities', params);
  },

  /**
   * 获取单个实体
   */
  async getEntity(id: string): Promise<Entity> {
    return apiClient.get(`/entities/${id}`);
  },

  /**
   * 创建实体
   */
  async createEntity(data: CreateEntityRequest): Promise<Entity> {
    return apiClient.post('/entities', data);
  },

  /**
   * 更新实体
   */
  async updateEntity(id: string, data: UpdateEntityRequest): Promise<Entity> {
    return apiClient.put(`/entities/${id}`, data);
  },

  /**
   * 删除实体
   */
  async deleteEntity(id: string): Promise<void> {
    return apiClient.delete(`/entities/${id}`);
  },

  /**
   * 批量操作实体
   */
  async batchEntities(data: BatchOperationRequest<Entity>): Promise<BatchOperationResponse<Entity>> {
    return apiClient.post('/entities/batch', data);
  }
};

// ==================== Agent API ====================

export const agentApi = {
  /**
   * 获取Agent列表
   */
  async getAgents(params?: AgentQueryRequest): Promise<PaginationResponse<Agent>> {
    return apiClient.get('/agents', params);
  },

  /**
   * 获取单个Agent
   */
  async getAgent(id: string): Promise<Agent> {
    return apiClient.get(`/agents/${id}`);
  },

  /**
   * 创建Agent
   */
  async createAgent(data: CreateAgentRequest): Promise<Agent> {
    return apiClient.post('/agents', data);
  },

  /**
   * 更新Agent
   */
  async updateAgent(id: string, data: UpdateAgentRequest): Promise<Agent> {
    return apiClient.put(`/agents/${id}`, data);
  },

  /**
   * 删除Agent
   */
  async deleteAgent(id: string): Promise<void> {
    return apiClient.delete(`/agents/${id}`);
  },

  /**
   * 启动Agent
   */
  async startAgent(id: string): Promise<void> {
    return apiClient.post(`/agents/${id}/start`);
  },

  /**
   * 停止Agent
   */
  async stopAgent(id: string): Promise<void> {
    return apiClient.post(`/agents/${id}/stop`);
  },

  /**
   * 重启Agent
   */
  async restartAgent(id: string): Promise<void> {
    return apiClient.post(`/agents/${id}/restart`);
  },

  /**
   * 获取Agent日志
   */
  async getAgentLogs(id: string, params?: { lines?: number; since?: string }): Promise<string[]> {
    return apiClient.get(`/agents/${id}/logs`, params);
  }
};

// ==================== 关系API ====================

export const relationApi = {
  /**
   * 获取实体依赖关系
   */
  async getEntityDependencies(params?: {
    entityId?: string;
    sourceId?: string;
    targetId?: string;
  }): Promise<EntityDependency[]> {
    return apiClient.get('/dependencies', params);
  },

  /**
   * 创建实体依赖关系
   */
  async createDependency(data: CreateDependencyRequest): Promise<EntityDependency> {
    return apiClient.post('/dependencies', data);
  },

  /**
   * 删除实体依赖关系
   */
  async deleteDependency(id: string): Promise<void> {
    return apiClient.delete(`/dependencies/${id}`);
  },

  /**
   * 获取实体与Agent关系
   */
  async getEntityAgentRelations(params?: { entityId?: string; agentId?: string }): Promise<EntityAgentRelation[]> {
    return apiClient.get('/relations/entity-agent', params);
  },

  /**
   * 创建实体与Agent关系
   */
  async createAgentRelation(data: CreateAgentRelationRequest): Promise<EntityAgentRelation> {
    return apiClient.post('/relations/entity-agent', data);
  },

  /**
   * 删除实体与Agent关系
   */
  async deleteAgentRelation(id: string): Promise<void> {
    return apiClient.delete(`/relations/entity-agent/${id}`);
  }
};

// ==================== 拓扑API ====================

export const topologyApi = {
  /**
   * 获取拓扑数据
   */
  async getTopology(id: string): Promise<TopologyData> {
    return apiClient.get(`/topology/${id}`);
  },

  /**
   * 获取拓扑列表
   */
  async getTopologies(): Promise<TopologyData[]> {
    return apiClient.get('/topology');
  },

  /**
   * 创建拓扑
   */
  async createTopology(data: Partial<TopologyData>): Promise<TopologyData> {
    return apiClient.post('/topology', data);
  },

  /**
   * 更新拓扑
   */
  async updateTopology(id: string, data: Partial<TopologyData>): Promise<TopologyData> {
    return apiClient.put(`/topology/${id}`, data);
  },

  /**
   * 删除拓扑
   */
  async deleteTopology(id: string): Promise<void> {
    return apiClient.delete(`/topology/${id}`);
  },

  /**
   * 拓扑分析
   */
  async analyzeTopology(data: TopologyAnalysisRequest): Promise<TopologyAnalysisResponse> {
    return apiClient.post('/topology/analysis', data);
  },

  /**
   * 获取拓扑分析历史
   */
  async getAnalysisHistory(topologyId: string): Promise<TopologyAnalysisResponse[]> {
    return apiClient.get(`/topology/${topologyId}/analysis/history`);
  }
};

// ==================== 平面API ====================

export const planeApi = {
  /**
   * 获取平面列表
   */
  async getPlanes(): Promise<Plane[]> {
    return apiClient.get('/planes');
  },

  /**
   * 创建平面
   */
  async createPlane(data: Omit<Plane, 'id' | 'metadata'>): Promise<Plane> {
    return apiClient.post('/planes', data);
  },

  /**
   * 更新平面
   */
  async updatePlane(id: string, data: Partial<Plane>): Promise<Plane> {
    return apiClient.put(`/planes/${id}`, data);
  },

  /**
   * 删除平面
   */
  async deletePlane(id: string): Promise<void> {
    return apiClient.delete(`/planes/${id}`);
  }
};

// ==================== 监控API ====================

export const monitoringApi = {
  /**
   * 获取监控指标
   */
  async getMetrics(params: {
    entityId?: string;
    agentId?: string;
    metricName?: string;
    startTime: string;
    endTime: string;
  }): Promise<MetricData[]> {
    return apiClient.get('/monitoring/metrics', params);
  },

  /**
   * 获取告警列表
   */
  async getAlerts(params?: {
    entityId?: string;
    agentId?: string;
    level?: Alert['level'];
    resolved?: boolean;
    startTime?: string;
    endTime?: string;
  }): Promise<Alert[]> {
    return apiClient.get('/monitoring/alerts', params);
  },

  /**
   * 解决告警
   */
  async resolveAlert(id: string, comment?: string): Promise<void> {
    return apiClient.post(`/monitoring/alerts/${id}/resolve`, { comment });
  },

  /**
   * 获取系统健康状态
   */
  async getHealthStatus(): Promise<{
    overall: 'healthy' | 'warning' | 'critical';
    entities: { total: number; healthy: number; warning: number; error: number };
    agents: { total: number; active: number; inactive: number };
    alerts: { total: number; critical: number; warning: number };
  }> {
    return apiClient.get('/monitoring/health');
  }
};

// ==================== 导出API服务 ====================

// 单独导出apiClient供其他服务使用
export { apiClient };

// 默认导出所有API
export default {
  entity: entityApi,
  agent: agentApi,
  relation: relationApi,
  topology: topologyApi,
  plane: planeApi,
  monitoring: monitoringApi
};
