// 简化的 API 服务，避免 axios 类型问题

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

class SimpleApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('auth_token');
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      }
    };

    try {
      const response = await fetch(`${this.baseURL}${url}`, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const apiError: ApiError = {
          code: response.status.toString(),
          message: errorData.message || response.statusText || '请求失败',
          details: errorData,
          timestamp: new Date().toISOString()
        };
        throw apiError;
      }

      const data = await response.json();
      return data.data !== undefined ? data.data : data;
    } catch (error) {
      if (error instanceof Error && !(error as any).code) {
        const apiError: ApiError = {
          code: 'NETWORK_ERROR',
          message: error.message || '网络请求失败',
          details: error,
          timestamp: new Date().toISOString()
        };
        throw apiError;
      }
      throw error;
    }
  }

  async get<T = any>(url: string, params?: Record<string, any>): Promise<T> {
    const searchParams = params ? new URLSearchParams(params).toString() : '';
    const fullUrl = searchParams ? `${url}?${searchParams}` : url;
    return this.request<T>(fullUrl, { method: 'GET' });
  }

  async post<T = any>(url: string, data?: any): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async put<T = any>(url: string, data?: any): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async patch<T = any>(url: string, data?: any): Promise<T> {
    return this.request<T>(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async delete<T = any>(url: string): Promise<T> {
    return this.request<T>(url, { method: 'DELETE' });
  }
}

export const apiClient = new SimpleApiClient();

// 基础 API 服务类
export class BaseApiService {
  protected baseURL: string;
  protected client: SimpleApiClient;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.client = apiClient;
  }

  protected async get<T = any>(url: string, config?: { params?: any }): Promise<T> {
    return this.client.get<T>(`${this.baseURL}${url}`, config?.params);
  }

  protected async post<T = any>(url: string, data?: any): Promise<T> {
    return this.client.post<T>(`${this.baseURL}${url}`, data);
  }

  protected async put<T = any>(url: string, data?: any): Promise<T> {
    return this.client.put<T>(`${this.baseURL}${url}`, data);
  }

  protected async patch<T = any>(url: string, data?: any): Promise<T> {
    return this.client.patch<T>(`${this.baseURL}${url}`, data);
  }

  protected async delete<T = any>(url: string): Promise<T> {
    return this.client.delete<T>(`${this.baseURL}${url}`);
  }
}
