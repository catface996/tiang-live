# AI运维系统前端

基于React + TypeScript + Antd的通用平面化AI运维系统前端应用。

## 技术栈

- **React 19** - 前端框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Antd 5.26** - UI组件库
- **Redux Toolkit** - 状态管理
- **React Router v6** - 路由管理
- **Styled Components** - CSS-in-JS
- **Axios** - HTTP客户端

## 项目结构

```
src/
├── components/          # 通用组件
├── pages/              # 页面组件
├── layouts/            # 布局组件
├── store/              # Redux状态管理
├── services/           # API服务
├── hooks/              # 自定义Hooks
├── utils/              # 工具函数
├── types/              # TypeScript类型定义
├── styles/             # 样式文件
└── routes/             # 路由配置
```

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 代码检查

```bash
pnpm lint
```

### 类型检查

```bash
pnpm type-check
```

## 功能模块

- **仪表盘** - 系统概览和统计信息
- **平面管理** - 平面定义和实例管理
- **实体管理** - 实体类型和实例管理
- **关系图谱** - 实体关系可视化
- **时序管理** - 业务时序定义和执行
- **AI智能体** - AI Agent管理和监控

## 环境配置

### 开发环境
- API地址: `http://localhost:8080/api/v1`

### 生产环境
- API地址: `https://api.ai-ops.com/api/v1`

## 开发规范

### 组件开发
- 使用函数式组件和Hooks
- 组件名使用PascalCase
- 文件名与组件名保持一致

### 样式开发
- 优先使用Antd组件样式
- 自定义样式使用Styled Components
- 遵循主题配置，保持设计一致性

### 状态管理
- 使用Redux Toolkit进行状态管理
- 按功能模块拆分Slice
- 使用类型化的Hooks

### API调用
- 统一使用封装的API服务
- 错误处理统一在拦截器中处理
- 使用TypeScript类型定义

## 部署

### 构建
```bash
pnpm build
```

### 预览
```bash
pnpm preview
```

构建产物在 `dist` 目录中，可以部署到任何静态文件服务器。
