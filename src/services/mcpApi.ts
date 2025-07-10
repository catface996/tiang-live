/**
 * MCP管理API服务
 */

import axios from 'axios';

// MCP服务器数据类型定义
export interface McpServer {
  id: string;
  name: string;
  description: string;
  type: 'database' | 'file' | 'api' | 'email' | 'scheduler' | 'custom';
  status: 'running' | 'stopped' | 'error' | 'starting' | 'stopping';
  version: string;
  endpoint: string;
  port: number;
  capabilities: string[];
  config: {
    [key: string]: any;
  };
  healthCheck: {
    enabled: boolean;
    interval: number;
    timeout: number;
    retries: number;
  };
  metrics: {
    uptime: number;
    requestCount: number;
    errorCount: number;
    avgResponseTime: number;
    lastHeartbeat: string;
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// MCP统计信息类型
export interface McpStatistics {
  totalServers: number;
  runningServers: number;
  stoppedServers: number;
  errorServers: number;
  totalRequests: number;
  totalErrors: number;
  avgResponseTime: number;
  serversByType: {
    [key: string]: number;
  };
  recentActivity: {
    last24h: {
      requests: number;
      errors: number;
      newServers: number;
    };
    last7d: {
      requests: number;
      errors: number;
      newServers: number;
    };
  };
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
  timestamp: string;
}

// 分页响应类型
export interface PagedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
}

// 获取服务器列表请求参数
export interface GetMcpServersRequest {
  page?: number;
  size?: number;
  search?: string;
  type?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
}

// 保存服务器请求参数
export interface SaveMcpServerRequest {
  id?: string;
  name: string;
  description: string;
  type: string;
  version?: string;
  endpoint: string;
  port: number;
  capabilities: string[];
  config: {
    [key: string]: any;
  };
  healthCheck: {
    enabled: boolean;
    interval: number;
    timeout: number;
    retries: number;
  };
}

// 创建专门的MCP API客户端
const mcpApiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1/mcp',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
mcpApiClient.interceptors.request.use(
  config => {
    // 添加认证token
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
mcpApiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('MCP API Error:', error);
    return Promise.reject(error);
  }
);

// MCP API服务
export const mcpApi = {
  /**
   * 获取MCP服务器列表
   */
  async getServers(params: GetMcpServersRequest = {}): Promise<PagedResponse<McpServer>> {
    const response = await mcpApiClient.get('/servers', { params });
    return response.data;
  },

  /**
   * 获取单个MCP服务器详情
   */
  async getServer(id: string): Promise<ApiResponse<McpServer>> {
    const response = await mcpApiClient.get(`/servers/${id}`);
    return response.data;
  },

  /**
   * 保存MCP服务器（创建/更新）
   */
  async saveServer(data: SaveMcpServerRequest): Promise<ApiResponse<McpServer>> {
    const response = await mcpApiClient.post('/servers/save', data);
    return response.data;
  },

  /**
   * 删除MCP服务器
   */
  async deleteServer(id: string): Promise<ApiResponse<void>> {
    const response = await mcpApiClient.delete(`/servers/${id}`);
    return response.data;
  },

  /**
   * 批量删除MCP服务器
   */
  async batchDeleteServers(ids: string[]): Promise<ApiResponse<{ deletedCount: number; failedIds: string[] }>> {
    const response = await mcpApiClient.delete('/servers/batch', { data: { ids } });
    return response.data;
  },

  /**
   * 启动MCP服务器
   */
  async startServer(id: string): Promise<ApiResponse<{ id: string; status: string; message: string }>> {
    const response = await mcpApiClient.post(`/servers/${id}/start`);
    return response.data;
  },

  /**
   * 停止MCP服务器
   */
  async stopServer(id: string): Promise<ApiResponse<{ id: string; status: string; message: string }>> {
    const response = await mcpApiClient.post(`/servers/${id}/stop`);
    return response.data;
  },

  /**
   * 重启MCP服务器
   */
  async restartServer(id: string): Promise<ApiResponse<{ id: string; status: string; message: string }>> {
    const response = await mcpApiClient.post(`/servers/${id}/restart`);
    return response.data;
  },

  /**
   * 健康检查
   */
  async healthCheck(id: string): Promise<ApiResponse<{
    id: string;
    status: string;
    healthy: boolean;
    responseTime: number;
    lastCheck: string;
    details: { [key: string]: string };
  }>> {
    const response = await mcpApiClient.get(`/servers/${id}/health`);
    return response.data;
  },

  /**
   * 获取MCP统计信息
   */
  async getStatistics(params: {
    timeRange?: string;
    includeMetrics?: boolean;
  } = {}): Promise<ApiResponse<McpStatistics>> {
    const response = await mcpApiClient.get('/statistics', { params });
    return response.data;
  },

  /**
   * 获取MCP服务器指标历史
   */
  async getServerMetrics(id: string, params: {
    timeRange?: string;
    interval?: string;
    metrics?: string[];
  } = {}): Promise<ApiResponse<{
    serverId: string;
    timeRange: string;
    interval: string;
    metrics: Array<{
      timestamp: string;
      requestCount: number;
      errorCount: number;
      responseTime: number;
      cpuUsage: number;
      memoryUsage: number;
    }>;
  }>> {
    const response = await mcpApiClient.get(`/servers/${id}/metrics`, { params });
    return response.data;
  },

  /**
   * 获取MCP服务器配置模板
   */
  async getConfigTemplates(type?: string): Promise<ApiResponse<Array<{
    type: string;
    name: string;
    description: string;
    template: {
      port: number;
      capabilities: string[];
      config: { [key: string]: any };
      healthCheck: { [key: string]: any };
    };
  }>>> {
    const params = type ? { type } : {};
    const response = await mcpApiClient.get('/config-templates', { params });
    return response.data;
  },

  /**
   * 验证MCP服务器配置
   */
  async validateConfig(data: SaveMcpServerRequest): Promise<ApiResponse<{
    valid: boolean;
    warnings: string[];
    errors: string[];
    suggestions: string[];
  }>> {
    const response = await mcpApiClient.post('/servers/validate-config', data);
    return response.data;
  }
};

export default mcpApi;
