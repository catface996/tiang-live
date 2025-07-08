# 提示词模板前后端接口对比分析

## 概述

本文档分析了前端 `PromptTemplates.tsx` 中使用的mock数据与后端 `PromptsTemplateController.java` 接口的匹配度，并提出改进建议。

## 前端Mock数据结构分析

### PromptTemplate 接口定义

```typescript
interface PromptTemplate {
  id: string;                    // 模板ID
  name: string;                  // 模板名称
  category: string;              // 分类（字符串）
  description: string;           // 描述
  content: string;               // 模板内容
  variables: string[];           // 变量列表（字符串数组）
  tags: string[];               // 标签列表
  language: string;              // 语言
  difficulty: 'beginner' | 'intermediate' | 'advanced';  // 难度级别
  rating: number;                // 评分
  usageCount: number;            // 使用次数
  isPublic: boolean;             // 是否公开
  isFavorite: boolean;           // 是否收藏
  createdBy: string;             // 创建人
  createdAt: string;             // 创建时间（字符串格式）
  lastModified: string;          // 最后修改时间
  lastUsed: string;              // 最后使用时间
  version: string;               // 版本号
}
```

### 前端使用的分类

```typescript
const categoryMap = {
  开发工具: { color: 'blue', icon: <CodeOutlined /> },
  运维工具: { color: 'green', icon: <ThunderboltOutlined /> },
  产品管理: { color: 'orange', icon: <BulbOutlined /> },
  文档工具: { color: 'purple', icon: <FileTextOutlined /> },
  客服助手: { color: 'cyan', icon: <MessageOutlined /> },
  数据分析: { color: 'red', icon: <SafetyCertificateOutlined /> }
};
```

## 后端接口结构分析

### API 端点

| 方法 | 路径 | 功能 | 对应前端需求 |
|------|------|------|-------------|
| POST | `/api/prompts-template/save` | 保存模板 | ✅ 创建/编辑 |
| POST | `/api/prompts-template/list` | 查询列表 | ✅ 列表展示 |
| POST | `/api/prompts-template/delete` | 删除模板 | ✅ 删除功能 |
| GET | `/api/prompts-template/{id}` | 获取详情 | ✅ 详情查看 |
| PUT | `/api/prompts-template/{id}/status` | 更新状态 | ❌ 前端未使用 |
| POST | `/api/prompts-template/{id}/copy` | 复制模板 | ❌ 前端未实现 |

### SavePromptsTemplateRequest 结构

```java
public class SavePromptsTemplateRequest {
    private String id;                              // ✅ 匹配
    private String name;                            // ✅ 匹配
    private String description;                     // ✅ 匹配
    private String content;                         // ✅ 匹配
    private TemplateType type;                      // ❌ 前端缺失
    private TemplateCategory category;              // ⚠️ 类型不匹配
    private List<String> tags;                      // ✅ 匹配
    private Map<String, Object> variables;          // ⚠️ 类型不匹配
    private TemplateStatus status;                  // ❌ 前端缺失
    private String version;                         // ✅ 匹配
    private String createdBy;                       // ✅ 匹配
    private String updatedBy;                       // ❌ 前端缺失
}
```

### PromptsTemplateResponse 结构

```java
public class PromptsTemplateResponse {
    private String id;                              // ✅ 匹配
    private String name;                            // ✅ 匹配
    private String description;                     // ✅ 匹配
    private String content;                         // ✅ 匹配
    private TemplateType type;                      // ❌ 前端缺失
    private String typeName;                        // ❌ 前端缺失
    private TemplateCategory category;              // ⚠️ 类型不匹配
    private String categoryName;                    // ❌ 前端缺失
    private List<String> tags;                      // ✅ 匹配
    private Map<String, Object> variables;          // ⚠️ 类型不匹配
    private TemplateStatus status;                  // ❌ 前端缺失
    private String statusName;                      // ❌ 前端缺失
    private String version;                         // ✅ 匹配
    private String createdBy;                       // ✅ 匹配
    private String updatedBy;                       // ❌ 前端缺失
    private LocalDateTime createdAt;                // ⚠️ 类型不匹配
    private LocalDateTime updatedAt;                // ⚠️ 类型不匹配
}
```

### 后端枚举定义

```java
// 模板类型
public enum TemplateType {
    SYSTEM_PROMPT,      // 系统提示词
    USER_PROMPT,        // 用户提示词
    ASSISTANT_PROMPT,   // 助手提示词
    FUNCTION_PROMPT,    // 函数调用提示词
    CHAIN_PROMPT,       // 链式提示词
    CUSTOM              // 自定义
}

// 模板分类
public enum TemplateCategory {
    GENERAL,            // 通用
    CODING,             // 编程
    ANALYSIS,           // 分析
    WRITING,            // 写作
    TRANSLATION,        // 翻译
    SUMMARIZATION,      // 摘要
    QA,                 // 问答
    CREATIVE,           // 创意
    BUSINESS,           // 商务
    EDUCATION,          // 教育
    OTHER               // 其他
}

// 模板状态
public enum TemplateStatus {
    ACTIVE,     // 激活
    INACTIVE,   // 停用
    DRAFT,      // 草稿
    ARCHIVED    // 归档
}
```

## 兼容性分析

### ✅ 完全匹配的字段

| 字段 | 前端类型 | 后端类型 | 说明 |
|------|----------|----------|------|
| id | string | String | 模板ID |
| name | string | String | 模板名称 |
| description | string | String | 描述 |
| content | string | String | 模板内容 |
| tags | string[] | List\<String\> | 标签列表 |
| version | string | String | 版本号 |
| createdBy | string | String | 创建人 |

### ⚠️ 部分匹配/需要转换的字段

| 字段 | 前端类型 | 后端类型 | 问题 | 建议 |
|------|----------|----------|------|------|
| category | string | TemplateCategory | 前端使用中文字符串，后端使用枚举 | 需要映射转换 |
| variables | string[] | Map\<String, Object\> | 数据结构不同 | 前端需要调整为对象格式 |
| createdAt | string | LocalDateTime | 时间格式不同 | 后端序列化为字符串 |
| lastModified | string | LocalDateTime | 对应updatedAt字段 | 字段名映射 |

## 问题总结

### 🔴 严重问题

1. **模板类型缺失**: 后端要求必填的 `type` 字段，前端完全没有
2. **分类映射不匹配**: 前端使用中文分类，后端使用英文枚举
3. **变量结构不同**: 前端是字符串数组，后端是键值对对象

### 🟡 中等问题

1. **状态管理缺失**: 前端没有模板状态概念
2. **时间格式不统一**: 前端字符串，后端LocalDateTime
3. **功能字段缺失**: rating、usageCount、difficulty等展示字段

### 🟢 轻微问题

1. **字段名不一致**: lastModified vs updatedAt
2. **审计字段缺失**: updatedBy字段

## 解决方案建议

### 1. 后端接口调整

#### 1.1 扩展分类枚举

```java
public enum TemplateCategory {
    GENERAL,            // 通用
    CODING,             // 编程 -> 开发工具
    ANALYSIS,           // 分析 -> 数据分析
    WRITING,            // 写作 -> 文档工具
    OPERATIONS,         // 运维 -> 运维工具
    PRODUCT_MANAGEMENT, // 产品管理
    CUSTOMER_SERVICE,   // 客服助手
    // ... 其他
}
```

#### 1.2 添加分类映射方法

```java
public String getCategoryDisplayName() {
    Map<TemplateCategory, String> categoryNames = Map.of(
        TemplateCategory.CODING, "开发工具",
        TemplateCategory.OPERATIONS, "运维工具",
        TemplateCategory.PRODUCT_MANAGEMENT, "产品管理",
        TemplateCategory.WRITING, "文档工具",
        TemplateCategory.CUSTOMER_SERVICE, "客服助手",
        TemplateCategory.ANALYSIS, "数据分析"
    );
    return categoryNames.getOrDefault(this.category, "其他");
}
```

### 2. 前端接口调整

#### 2.1 更新PromptTemplate接口

```typescript
interface PromptTemplate {
  id: string;
  name: string;
  category: string;                    // 保持中文显示
  categoryCode?: string;               // 新增：后端枚举值
  description: string;
  content: string;
  type?: string;                       // 新增：模板类型
  variables: { [key: string]: any };   // 修改：改为对象格式
  tags: string[];
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  usageCount: number;
  isPublic: boolean;
  isFavorite: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;                   // 修改：统一字段名
  lastUsed: string;
  version: string;
}
```

#### 2.2 添加类型映射

```typescript
const templateTypeMap = {
  SYSTEM_PROMPT: '系统提示词',
  USER_PROMPT: '用户提示词',
  ASSISTANT_PROMPT: '助手提示词',
  FUNCTION_PROMPT: '函数调用提示词',
  CHAIN_PROMPT: '链式提示词',
  CUSTOM: '自定义'
};
```

### 3. 数据转换层

#### 3.1 前端数据转换工具

```typescript
// 前端到后端的数据转换
export const convertToBackendFormat = (frontendData: PromptTemplate) => {
  return {
    id: frontendData.id,
    name: frontendData.name,
    description: frontendData.description,
    content: frontendData.content,
    type: frontendData.type || 'CUSTOM',
    category: getCategoryCode(frontendData.category),
    tags: frontendData.tags,
    variables: convertVariablesToMap(frontendData.variables),
    version: frontendData.version,
    createdBy: frontendData.createdBy
  };
};

// 后端到前端的数据转换
export const convertToFrontendFormat = (backendData: any) => {
  return {
    id: backendData.id,
    name: backendData.name,
    category: backendData.categoryName || getCategoryName(backendData.category),
    description: backendData.description,
    content: backendData.content,
    type: backendData.type,
    variables: convertMapToVariables(backendData.variables),
    tags: backendData.tags || [],
    language: backendData.language || 'zh-CN',
    difficulty: backendData.difficulty || 'intermediate',
    rating: backendData.rating || 0,
    usageCount: backendData.usageCount || 0,
    isPublic: backendData.isPublic || false,
    isFavorite: backendData.isFavorite || false,
    createdBy: backendData.createdBy,
    createdAt: formatDateTime(backendData.createdAt),
    updatedAt: formatDateTime(backendData.updatedAt),
    lastUsed: formatDateTime(backendData.lastUsed),
    version: backendData.version
  };
};
```

## 实施优先级

### 高优先级（必须修复）

1. ✅ 添加模板类型字段和处理逻辑
2. ✅ 修复分类映射问题
3. ✅ 调整变量数据结构

### 中优先级（建议修复）

1. 🔄 统一时间格式处理
2. 🔄 完善字段映射关系

### 低优先级（可选）

1. 📋 完善审计字段
2. 📋 添加复制功能
3. 📋 优化查询条件

## 结论

后端接口基本满足前端的核心需求，但存在一些关键的不匹配问题需要解决：

1. **数据结构不匹配**: 主要是分类、变量、时间格式等字段
2. **类型字段缺失**: 后端必填的模板类型字段前端需要添加
3. **枚举映射**: 需要建立前后端枚举值的映射关系

建议优先解决高优先级问题，确保基本功能正常运行，然后逐步完善其他功能。
