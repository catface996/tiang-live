# EntityScan页面统计卡片样式统一化

## 问题描述

EntityScan.tsx页面中的统计卡片使用了自定义的`StatItem`、`StatValue`、`StatLabel`组件，与其他页面（如Dashboard）使用的标准Antd `Statistic`组件样式不一致。

## 解决方案

### 1. 组件统一

**之前**: 使用自定义styled-components

```tsx
<StatItem $isDark={isDark}>
  <StatValue color="#1890ff">{value}</StatValue>
  <StatLabel $isDark={isDark}>{label}</StatLabel>
</StatItem>
```

**现在**: 使用标准Antd组件

```tsx
<Card className="stats-card-primary">
  <Statistic title={title} value={value} prefix={<DatabaseOutlined />} />
</Card>
```

### 2. 样式统一

- 创建了专门的CSS文件：`src/styles/entity-scan.css`
- 使用与Dashboard页面相同的样式结构和类名
- 添加了高优先级覆盖样式确保生效

### 3. 图标映射

- **Total Data Sources**: `DatabaseOutlined` (蓝色 #1890ff)
- **Connected Sources**: `LinkOutlined` (绿色 #52c41a)
- **Total Entities**: `AppstoreOutlined` (紫色 #722ed1)
- **Selected Entities**: `CheckCircleOutlined` (橙色 #faad14)
- **Completed Scans**: `PlayCircleOutlined` (青色 #13c2c2)
- **Running Scans**: `UserOutlined` (红色 #ff4d4f)

## 修改文件

### EntityScan.tsx

1. **导入更新**:
   - 添加`Statistic`组件导入
   - 添加所需图标导入
   - 导入新的CSS文件

2. **组件移除**:
   - 移除`StatItem`、`StatValue`、`StatLabel`自定义组件

3. **渲染更新**:
   - 替换统计部分为标准Card+Statistic组合
   - 添加`entity-scan-page`类名到根容器

### entity-scan.css (新建)

- 完整的统计卡片样式定义
- 6种颜色主题：primary、success、purple、warning、info、error
- 高优先级覆盖样式确保生效
- 与Dashboard页面保持一致的样式结构

## 验证结果

✅ **统计卡片样式完全统一**

- 使用标准Antd Statistic组件
- 颜色方案与其他页面一致
- 布局和间距统一
- 图标显示正确
- 响应式设计正常

✅ **功能保持不变**

- 统计数据正确显示
- 国际化支持正常
- 主题切换正常

## 技术细节

- 使用CSS类选择器确保样式优先级
- 保持16px的卡片内边距
- 支持明暗主题切换
- 禁用过渡动画避免闪烁

现在EntityScan页面的统计卡片与Dashboard等其他页面完全一致，提供了统一的用户体验！
