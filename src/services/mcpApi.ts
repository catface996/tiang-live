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
  search?: string;
  type?: string;
  status?: string;
  page?: number;
  pageSize?: number;
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
  baseURL: 'http://localhost:8080/api/mcp',
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
    const response = await mcpApiClient.get('/list', { params });
    return response.data;
  },

  /**
   * 获取单个MCP服务器详情
   */
  async getServer(id: string): Promise<ApiResponse<McpServer>> {
    const response = await mcpApiClient.get(`/detail/${id}`);
    return response.data;
  },

  /**
   * 保存MCP服务器（创建/更新）
   */
  async saveServer(data: SaveMcpServerRequest): Promise<ApiResponse<McpServer>> {
    const response = await mcpApiClient.post('/save', data);
    return response.data;
  },

  /**
   * 删除MCP服务器
   */
  async deleteServer(id: string): Promise<ApiResponse<void>> {
    const response = await mcpApiClient.delete(`/delete/${id}`);
    return response.data;
  },

  /**
   * 获取MCP统计信息
   */
  async getStatistics(): Promise<ApiResponse<McpStatistics>> {
    const response = await mcpApiClient.get('/stats/overview');
    return response.data;
  },

  // 以下方法暂时保留，但会返回模拟数据或错误，因为后端接口已移除
  
  /**
   * 批量删除MCP服务器（暂不支持）
   */
  async batchDeleteServers(ids: string[]): Promise<ApiResponse<{ deletedCount: number; failedIds: string[] }>> {
    // 后端接口已移除，使用单个删除的方式实现
    const results = await Promise.allSettled(
      ids.map(id => this.deleteServer(id))
    );
    
    const deletedCount = results.filter(r => r.status === 'fulfilled').length;
    const failedIds = ids.filter((_, index) => results[index].status === 'rejected');
    
    return {
      success: true,
      code: 'SUCCESS',
      message: '批量删除完成',
      data: { deletedCount, failedIds },
      timestamp: new Date().toISOString()
    };
  },

  /**
   * 启动MCP服务器（暂不支持）
   */
  async startServer(id: string): Promise<ApiResponse<{ id: string; status: string; message: string }>> {
    console.warn('启动服务器功能暂不支持，后端接口已移除');
    return {
      success: false,
      code: 'NOT_SUPPORTED',
      message: '启动服务器功能暂不支持',
      data: { id, status: 'unknown', message: '功能暂不可用' },
      timestamp: new Date().toISOString()
    };
  },

  /**
   * 停止MCP服务器（暂不支持）
   */
  async stopServer(id: string): Promise<ApiResponse<{ id: string; status: string; message: string }>> {
    console.warn('停止服务器功能暂不支持，后端接口已移除');
    return {
      success: false,
      code: 'NOT_SUPPORTED',
      message: '停止服务器功能暂不支持',
      data: { id, status: 'unknown', message: '功能暂不可用' },
      timestamp: new Date().toISOString()
    };
  },

  /**
   * 重启MCP服务器（暂不支持）
   */
  async restartServer(id: string): Promise<ApiResponse<{ id: string; status: string; message: string }>> {
    console.warn('重启服务器功能暂不支持，后端接口已移除');
    return {
      success: false,
      code: 'NOT_SUPPORTED',
      message: '重启服务器功能暂不支持',
      data: { id, status: 'unknown', message: '功能暂不可用' },
      timestamp: new Date().toISOString()
    };
  },

  /**
   * 健康检查（暂不支持）
   */
  async healthCheck(id: string): Promise<ApiResponse<{
    id: string;
    status: string;
    healthy: boolean;
    responseTime: number;
    lastCheck: string;
    details: { [key: string]: string };
  }>> {
    console.warn('健康检查功能暂不支持，后端接口已移除');
    return {
      success: false,
      code: 'NOT_SUPPORTED',
      message: '健康检查功能暂不支持',
      data: {
        id,
        status: 'unknown',
        healthy: false,
        responseTime: 0,
        lastCheck: new Date().toISOString(),
        details: { message: '功能暂不可用' }
      },
      timestamp: new Date().toISOString()
    };
  },

  /**
   * 获取MCP服务器指标历史（暂不支持）
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
    console.warn('获取服务器指标功能暂不支持，后端接口已移除');
    return {
      success: false,
      code: 'NOT_SUPPORTED',
      message: '获取服务器指标功能暂不支持',
      data: {
        serverId: id,
        timeRange: params.timeRange || '24h',
        interval: params.interval || '1h',
        metrics: []
      },
      timestamp: new Date().toISOString()
    };
  },

  /**
   * 获取MCP服务器配置模板（暂不支持）
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
    console.warn('获取配置模板功能暂不支持，后端接口已移除');
    return {
      success: false,
      code: 'NOT_SUPPORTED',
      message: '获取配置模板功能暂不支持',
      data: [],
      timestamp: new Date().toISOString()
    };
  },

  /**
   * 验证MCP服务器配置（暂不支持）
   */
  async validateConfig(data: SaveMcpServerRequest): Promise<ApiResponse<{
    valid: boolean;
    warnings: string[];
    errors: string[];
    suggestions: string[];
  }>> {
    console.warn('验证配置功能暂不支持，后端接口已移除');
    return {
      success: false,
      code: 'NOT_SUPPORTED',
      message: '验证配置功能暂不支持',
      data: {
        valid: false,
        warnings: [],
        errors: ['功能暂不可用'],
        suggestions: []
      },
      timestamp: new Date().toISOString()
    };
  }
};

export default mcpApi;
