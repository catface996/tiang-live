# Entity Scan 国际化实现

## 概述

`ScanDetail.tsx` 组件已完成国际化改造，支持中英文双语切换。

## 国际化文件结构

```
src/i18n/locales/
├── zh/
│   └── entityScan.json     # 中文语言包
└── en/
    └── entityScan.json     # 英文语言包
```

## 新增的国际化键值

### scanDetail 部分

- `scanDetail.breadcrumb.back` - 返回按钮文本
- `scanDetail.actions.*` - 操作按钮文本（刷新、开始扫描、暂停、停止、导出实体）
- `scanDetail.scanStatus.*` - 扫描状态相关文本
- `scanDetail.statistics.*` - 统计数据标题
- `scanDetail.filters.*` - 筛选器选项文本
- `scanDetail.entityCard.*` - 实体卡片显示文本
- `scanDetail.entityDetail.*` - 实体详情弹窗文本
- `scanDetail.entityTypes.*` - 实体类型名称
- `scanDetail.messages.*` - 提示消息文本

## 使用方式

组件使用 `useTranslation` Hook 来获取翻译函数：

```typescript
const { t } = useTranslation(['entityScan', 'common']);

// 使用示例
t('entityScan:scanDetail.actions.refresh'); // 刷新
t('entityScan:scanDetail.messages.scanCompleted'); // 扫描完成！
```

## 特殊处理

1. **实体类型配置**: 动态获取实体类型的显示名称
2. **扫描状态配置**: 根据状态动态显示对应的文本
3. **消息提示**: 所有 `message.*` 调用都使用国际化文本
4. **模拟数据**: 保留中文模拟数据，实际项目中会被后端API替换

## 测试

创建了基础的测试文件 `ScanDetail.test.tsx` 来验证国际化功能。

## 注意事项

1. 所有用户可见的文本都已国际化
2. 遵循项目的国际化规范，使用分散的语言文件
3. 支持参数插值，如导出成功消息中的数量参数
4. 保持了原有的功能和样式不变
