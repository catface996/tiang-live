/**
 * AI智能体管理API服务
 * 基于后端 AIAgentController 实现
 */

import { apiClient } from './api';

// 基础请求类型
export interface BaseRequest {
  userId?: string;
  timestamp?: string;
}

// 分页请求基类
export interface BasePageRequest extends BaseRequest {
  page?: number;
  size?: number;
}

// 查询AI智能体请求
export interface QueryAIAgentRequest extends BasePageRequest {
  search?: string;                    // 搜索关键词(名称、描述)
  type?: 'chat' | 'task' | 'analysis' | 'monitoring'; // 智能体类型筛选
  status?: 'active' | 'inactive' | 'training';        // 智能体状态筛选
  tags?: string[];                    // 标签筛选
}

// 提示词配置
export interface PromptsConfigRequest {
  system: string;                     // 系统提示词
  templates: string[];                // 使用的模板ID列表
  variables: Record<string, string>;  // 模板变量
}

// 运行设置配置
export interface SettingsConfigRequest {
  autoStart: boolean;                 // 自动启动
  maxConcurrency: number;             // 最大并发数
  timeout: number;                    // 超时时间(秒)
  retryCount: number;                 // 重试次数
  logLevel: 'debug' | 'info' | 'warn' | 'error'; // 日志级别
}

// 保存AI智能体请求
export interface SaveAIAgentRequest extends BaseRequest {
  id?: string;                        // 智能体ID，更新时必填，创建时不填
  name: string;                       // 智能体名称
  description: string;                // 智能体描述
  type: 'chat' | 'task' | 'analysis' | 'monitoring'; // 智能体类型
  status?: 'active' | 'inactive' | 'training';       // 智能体状态
  modelId: string;                    // 模型ID
  prompts: PromptsConfigRequest;      // 提示词配置
  mcpServers?: string[];              // MCP服务器ID列表
  capabilities?: string[];            // 能力列表
  settings?: SettingsConfigRequest;   // 运行设置
  tags?: string[];                    // 标签列表
}

// 获取AI智能体详情请求
export interface GetAIAgentDetailRequest extends BaseRequest {
  id: string;                         // 智能体ID
}

// 删除AI智能体请求
export interface DeleteAIAgentRequest extends BaseRequest {
  id: string;                         // 智能体ID
}

// 模型响应
export interface ModelResponse {
  id: string;
  name: string;
  provider: string;
  modelType: string;
  version: string;
  description?: string;
}

// 提示词配置响应
export interface PromptsConfigResponse {
  system: string;
  templates: string[];
  variables: Record<string, string>;
}

// MCP服务器响应
export interface McpServerResponse {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  endpoint: string;
  port: number;
}

// 运行设置响应
export interface SettingsConfigResponse {
  autoStart: boolean;
  maxConcurrency: number;
  timeout: number;
  retryCount: number;
  logLevel: string;
}

// 运行时统计响应
export interface RuntimeStatsResponse {
  cpu: number;                        // CPU使用率(%)
  memory: number;                     // 内存使用量(MB)
  tasks: number;                      // 已处理任务数
  successRate: number;                // 成功率(%)
  lastActive: string;                 // 最后活跃时间
  uptime: number;                     // 运行时长(秒)
}

// AI智能体响应
export interface AIAgentResponse {
  id: string;                         // 智能体ID
  name: string;                       // 智能体名称
  description: string;                // 智能体描述
  type: string;                       // 智能体类型
  status: string;                     // 智能体状态
  model: ModelResponse;               // 模型配置
  prompts: PromptsConfigResponse;     // 提示词配置
  mcpServers: McpServerResponse[];    // MCP服务器列表
  settings: SettingsConfigResponse;   // 运行设置
  tags: string[];                     // 标签列表
  runtime?: RuntimeStatsResponse;     // 运行时统计
  createdBy: string;                  // 创建者
  updatedBy?: string;                 // 更新者
  createdAt: string;                  // 创建时间
  updatedAt: string;                  // 更新时间
}

// 删除AI智能体响应
export interface DeleteAIAgentResponse {
  id: string;                         // 被删除的智能体ID
  name: string;                       // 被删除的智能体名称
  deletedAt: string;                  // 删除时间
}

// 分页响应
export interface PageResponse<T> {
  data: T[];                          // 数据列表
  page: number;                       // 当前页码
  size: number;                       // 每页大小
  total: number;                      // 总记录数
  totalPages: number;                 // 总页数
  hasNext: boolean;                   // 是否有下一页
  hasPrevious: boolean;               // 是否有上一页
}

// 统计概览响应
export interface AIAgentStatisticsResponse {
  totalAgents: number;                // 智能体总数
  activeAgents: number;               // 活跃智能体数
  inactiveAgents: number;             // 非活跃智能体数
  trainingAgents: number;             // 训练中智能体数
  
  typeDistribution: {                 // 类型分布
    chat: number;
    task: number;
    analysis: number;
    monitoring: number;
  };
  
  totalTasks: number;                 // 总任务数
  avgSuccessRate: number;             // 平均成功率
  totalUptime: number;                // 总运行时长(秒)
  totalCpuUsage: number;              // 总CPU使用率
  totalMemoryUsage: number;           // 总内存使用量(MB)
  
  last24h: {                          // 24小时内统计
    newAgents: number;
    completedTasks: number;
    errors: number;
  };
  
  popularModels: Array<{              // 热门模型
    provider: string;
    modelName: string;
    count: number;
  }>;
  
  popularMcpServers: Array<{          // 热门MCP服务器
    serverId: string;
    serverName: string;
    count: number;
  }>;
}

// API响应基础结构
export interface ApiResult<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
  timestamp: string;
}

/**
 * AI智能体API服务类
 */
export class AIAgentApi {
  
  /**
   * 获取AI智能体列表（支持分页）
   */
  static async getAIAgentList(params: QueryAIAgentRequest): Promise<ApiResult<PageResponse<AIAgentResponse>>> {
    console.log('🚀 API请求: POST /backend/aiAgent/list', {
      baseURL: apiClient.defaults.baseURL,
      fullURL: `${apiClient.defaults.baseURL}/backend/aiAgent/list`,
      data: params
    });

    try {
      const response = await apiClient.post<ApiResult<PageResponse<AIAgentResponse>>>('/backend/aiAgent/list', params);
      
      console.log('✅ API响应: POST /backend/aiAgent/list', {
        status: response.status,
        data: response.data
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ API请求失败: POST /backend/aiAgent/list', error);
      throw error;
    }
  }

  /**
   * 获取AI智能体详情
   */
  static async getAIAgentDetail(params: GetAIAgentDetailRequest): Promise<ApiResult<AIAgentResponse>> {
    console.log('🚀 API请求: POST /backend/aiAgent/detail', {
      baseURL: apiClient.defaults.baseURL,
      fullURL: `${apiClient.defaults.baseURL}/backend/aiAgent/detail`,
      data: params
    });

    try {
      const response = await apiClient.post<ApiResult<AIAgentResponse>>('/backend/aiAgent/detail', params);
      
      console.log('✅ API响应: POST /backend/aiAgent/detail', {
        status: response.status,
        data: response.data
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ API请求失败: POST /backend/aiAgent/detail', error);
      throw error;
    }
  }

  /**
   * 保存AI智能体（创建/更新）
   */
  static async saveAIAgent(params: SaveAIAgentRequest): Promise<ApiResult<AIAgentResponse>> {
    console.log('🚀 API请求: POST /backend/aiAgent/save', {
      baseURL: apiClient.defaults.baseURL,
      fullURL: `${apiClient.defaults.baseURL}/backend/aiAgent/save`,
      data: params
    });

    try {
      const response = await apiClient.post<ApiResult<AIAgentResponse>>('/backend/aiAgent/save', params);
      
      console.log('✅ API响应: POST /backend/aiAgent/save', {
        status: response.status,
        data: response.data
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ API请求失败: POST /backend/aiAgent/save', error);
      throw error;
    }
  }

  /**
   * 删除AI智能体
   */
  static async deleteAIAgent(params: DeleteAIAgentRequest): Promise<ApiResult<DeleteAIAgentResponse>> {
    console.log('🚀 API请求: POST /backend/aiAgent/delete', {
      baseURL: apiClient.defaults.baseURL,
      fullURL: `${apiClient.defaults.baseURL}/backend/aiAgent/delete`,
      data: params
    });

    try {
      const response = await apiClient.post<ApiResult<DeleteAIAgentResponse>>('/backend/aiAgent/delete', params);
      
      console.log('✅ API响应: POST /backend/aiAgent/delete', {
        status: response.status,
        data: response.data
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ API请求失败: POST /backend/aiAgent/delete', error);
      throw error;
    }
  }

  /**
   * 获取AI智能体统计概览
   */
  static async getAIAgentStatistics(params: BaseRequest = {}): Promise<ApiResult<AIAgentStatisticsResponse>> {
    console.log('🚀 API请求: POST /backend/aiAgent/overview', {
      baseURL: apiClient.defaults.baseURL,
      fullURL: `${apiClient.defaults.baseURL}/backend/aiAgent/overview`,
      data: params
    });

    try {
      const response = await apiClient.post<ApiResult<AIAgentStatisticsResponse>>('/backend/aiAgent/overview', params);
      
      console.log('✅ API响应: POST /backend/aiAgent/overview', {
        status: response.status,
        data: response.data
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ API请求失败: POST /backend/aiAgent/overview', error);
      throw error;
    }
  }
}

// 默认导出
export default AIAgentApi;
