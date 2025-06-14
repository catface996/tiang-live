import axios from 'axios';

// 本地类型定义
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  timestamp: string;
}

interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// 创建 axios 实例
const createApiInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 添加认证token等
      const token = localStorage.getItem('auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      // 如果响应数据有 data 字段，直接返回 data，否则返回整个响应数据
      return response.data?.data !== undefined ? response.data : response.data;
    },
    (error) => {
      const apiError: ApiError = {
        code: error.response?.status?.toString() || 'UNKNOWN',
        message: error.response?.data?.message || error.message || '请求失败',
        details: error.response?.data,
        timestamp: new Date().toISOString(),
      };
      return Promise.reject(apiError);
    }
  );

  return instance;
};

// API 实例
export const apiClient = createApiInstance();

// 基础 API 服务类
export class BaseApiService {
  protected baseURL: string;
  protected client: ReturnType<typeof createApiInstance>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.client = apiClient;
  }

  protected async get<T = any>(url: string, config?: any): Promise<T> {
    const response = await this.client.get(`${this.baseURL}${url}`, config);
    return response;
  }

  protected async post<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.post(`${this.baseURL}${url}`, data, config);
    return response;
  }

  protected async put<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.put(`${this.baseURL}${url}`, data, config);
    return response;
  }

  protected async patch<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.patch(`${this.baseURL}${url}`, data, config);
    return response;
  }

  protected async delete<T = any>(url: string, config?: any): Promise<T> {
    const response = await this.client.delete(`${this.baseURL}${url}`, config);
    return response;
  }
}
