# 统计卡片样式统一化

## 问题描述

EntityScan页面中的统计卡片样式与其他页面（如Dashboard）的统计卡片样式不一致。

## 解决方案

### 1. 统一类名规范

- **之前**: 使用 `entity-stats-*` 类名
- **现在**: 使用标准的 `stats-card-*` 类名

### 2. 统一组件使用

- **之前**: 使用自定义的 `StatsCard` styled-component
- **现在**: 使用标准的 `Card` 组件

### 3. 统一样式定义

采用与Dashboard页面相同的样式结构：

```css
.entity-scan-detail-page {
  .stats-card-primary {
    /* 蓝色 */
  }
  .stats-card-success {
    /* 绿色 */
  }
  .stats-card-purple {
    /* 紫色 */
  }
  .stats-card-warning {
    /* 橙色 */
  }
}
```

### 4. 颜色映射

- **Found Entities**: `stats-card-primary` (蓝色 #1890ff)
- **Selected**: `stats-card-success` (绿色 #52c41a)
- **Data Tables**: `stats-card-warning` (橙色 #faad14)
- **Views**: `stats-card-purple` (紫色 #722ed1)

## 修改文件

### ScanDetail.tsx

- 移除自定义 `StatsCard` 组件
- 更新统计卡片使用标准 `Card` 组件
- 更新类名为标准命名

### entity-scan-detail.css

- 添加标准统计卡片样式
- 保持与Dashboard页面一致的样式结构
- 添加高优先级覆盖样式确保生效

## 验证结果

- ✅ 统计卡片样式与其他页面保持一致
- ✅ 颜色显示正确
- ✅ 布局和间距统一
- ✅ 响应式设计正常

## 注意事项

- 保留了原有的 `entity-stats-*` 样式作为备用
- 使用高优先级CSS选择器确保样式覆盖
- 保持了16px的卡片内边距设置
