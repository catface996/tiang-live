/**
 * 图操作API服务
 */

import axios from 'axios';

// 图状态枚举
export enum GraphStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
  PROCESSING = 'PROCESSING'
}

// 图数据类型定义
export interface Graph {
  id?: number;
  name: string;
  description?: string;
  labels?: string[];
  status?: GraphStatus;
  ownerId: number;
  entityCount?: number;
  relationCount?: number;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

// 保存图请求
export interface SaveGraphRequest {
  id?: number;
  name: string;
  description?: string;
  labels?: string[];
  status?: GraphStatus;
  ownerId: number;
  metadata?: Record<string, any>;
}

// 查询图请求
export interface QueryGraphRequest {
  name?: string;
  ownerId?: number;
  status?: GraphStatus;
  label?: string;
  page?: number;
  size?: number;
}

// 删除图请求
export interface DeleteGraphRequest {
  graphId: number;
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

// 创建专门的图API客户端，指向后端服务器的/api/graph路径
const graphApiClient = axios.create({
  baseURL: 'http://localhost:8080/api/graph',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
graphApiClient.interceptors.request.use(
  config => {
    const timestamp = new Date().toISOString();
    const fullURL = `${config.baseURL}${config.url}`;

    console.log(`🚀 [${timestamp}] Graph API Request:`, {
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
    console.error(`❌ [${new Date().toISOString()}] Graph API Request Error:`, error);
    return Promise.reject(error);
  }
);

// 响应拦截器
graphApiClient.interceptors.response.use(
  response => {
    const timestamp = new Date().toISOString();
    const fullURL = `${response.config.baseURL}${response.config.url}`;

    console.log(`✅ [${timestamp}] Graph API Response SUCCESS:`, {
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

    console.error(`❌ [${timestamp}] Graph API Response ERROR:`, {
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
 * 图操作API服务类
 */
export const graphApi = {
  /**
   * 保存图（创建或更新）
   */
  async saveGraph(request: SaveGraphRequest): Promise<ApiResponse<Graph>> {
    return graphApiClient.post('/save', request);
  },

  /**
   * 查询图列表（支持分页）
   */
  async listGraphs(request: QueryGraphRequest = {}): Promise<ApiResponse<PageResult<Graph>>> {
    return graphApiClient.post('/list', request);
  },

  /**
   * 删除图
   */
  async deleteGraph(request: DeleteGraphRequest): Promise<ApiResponse<void>> {
    return graphApiClient.post('/delete', request);
  },

  /**
   * 根据ID获取图详情
   * @param id 图ID，支持字符串或数字类型，避免大整数精度丢失
   */
  async getGraphById(id: string | number): Promise<ApiResponse<Graph>> {
    return graphApiClient.get(`/${id}`);
  },

  /**
   * 创建新图
   */
  async createGraph(graph: Omit<SaveGraphRequest, 'id'>): Promise<ApiResponse<Graph>> {
    return this.saveGraph(graph);
  },

  /**
   * 更新图
   */
  async updateGraph(graph: SaveGraphRequest & { id: number }): Promise<ApiResponse<Graph>> {
    return this.saveGraph(graph);
  },

  /**
   * 根据所有者ID查询图列表
   */
  async getGraphsByOwner(
    ownerId: number,
    page: number = 1,
    size: number = 10
  ): Promise<ApiResponse<PageResult<Graph>>> {
    return this.listGraphs({ ownerId, page, size });
  },

  /**
   * 根据状态查询图列表
   */
  async getGraphsByStatus(
    status: GraphStatus,
    page: number = 1,
    size: number = 10
  ): Promise<ApiResponse<PageResult<Graph>>> {
    return this.listGraphs({ status, page, size });
  },

  /**
   * 搜索图（按名称模糊查询）
   */
  async searchGraphs(name: string, page: number = 1, size: number = 10): Promise<ApiResponse<PageResult<Graph>>> {
    return this.listGraphs({ name, page, size });
  }
};

export default graphApi;
