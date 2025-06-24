# 平面依赖复杂度分析卡片主题优化

## 优化概述

对平面管理页面中的"平面依赖复杂度分析"卡片进行了全面的主题适配优化，使其在亮色和暗色主题模式下都能提供良好的视觉体验。

## 主要优化内容

### 1. 主题感知能力
- 引入 `useTheme` Hook 获取当前主题状态
- 使用 Antd 的 `useToken` Hook 获取主题令牌
- 根据主题动态调整所有颜色和样式

### 2. 样式组件优化

#### PlaneTag 组件
```typescript
const PlaneTag = styled.div<{ $planeId: string; $isDark: boolean }>`
  background: ${props => props.$isDark 
    ? `${getPrimaryColorById(props.$planeId)}20` 
    : getLightColorById(props.$planeId)
  };
  // 添加悬停效果和过渡动画
  transition: all 0.2s ease;
  &:hover {
    background: ${props => props.$isDark 
      ? `${getPrimaryColorById(props.$planeId)}30` 
      : `${getPrimaryColorById(props.$planeId)}15`
    };
  }
`;
```

#### 统计概览容器
```typescript
const StatsOverview = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#1f1f1f' : '#fafafa'};
  border: 1px solid ${props => props.$isDark ? '#303030' : '#f0f0f0'};
  // 添加悬停效果和阴影
  &:hover {
    border-color: ${props => props.$isDark ? '#434343' : '#d9d9d9'};
    box-shadow: ${props => props.$isDark 
      ? '0 2px 8px rgba(255, 255, 255, 0.05)' 
      : '0 2px 8px rgba(0, 0, 0, 0.06)'
    };
  }
`;
```

#### 表格样式优化
```typescript
const StyledTableContainer = styled.div<{ $isDark: boolean }>`
  .ant-table-tbody > tr.high-risk-row {
    background-color: ${props => props.$isDark ? '#2a1215' : '#fff2f0'} !important;
    border-left: 3px solid #ff4d4f;
  }
  
  .ant-table-tbody > tr.medium-risk-row {
    background-color: ${props => props.$isDark ? '#2b2611' : '#fffbe6'} !important;
    border-left: 3px solid #faad14;
  }
  
  .ant-table-thead > tr > th {
    background: ${props => props.$isDark ? '#1f1f1f' : '#fafafa'} !important;
    color: ${props => props.$isDark ? '#ffffff' : 'rgba(0, 0, 0, 0.85)'} !important;
  }
`;
```

### 3. 颜色系统优化

#### 风险等级颜色
- **亮色主题**: 使用标准的 Antd 颜色
- **暗色主题**: 使用更亮的颜色变体以提高对比度

```typescript
const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'high': return isDark ? '#ff7875' : '#ff4d4f';
    case 'medium': return isDark ? '#ffc53d' : '#faad14';
    case 'low': return isDark ? '#73d13d' : '#52c41a';
    default: return isDark ? '#595959' : '#d9d9d9';
  }
};
```

#### 标签颜色适配
- 根据主题动态调整 Tag 组件的颜色
- 确保在暗色背景下的可读性

### 4. 交互体验优化

#### 悬停效果
- 为统计概览容器添加悬停阴影效果
- 为平面标签添加悬停背景变化
- 表格行悬停效果适配主题

#### 过渡动画
- 所有颜色变化添加 `transition` 过渡效果
- 提供流畅的主题切换体验

### 5. 风险说明优化

#### 新的风险说明组件
```typescript
const RiskExplanation = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#0f1419' : '#f6f8fa'};
  border: 1px solid ${props => props.$isDark ? '#21262d' : '#d1d9e0'};
  
  .risk-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    
    &.low { background-color: #52c41a; }
    &.medium { background-color: #faad14; }
    &.high { background-color: #ff4d4f; }
  }
`;
```

## 主题适配特性

### 亮色主题特性
- 使用白色背景和深色文字
- 浅色的统计概览背景 (#fafafa)
- 标准的 Antd 颜色系统
- 轻微的阴影效果

### 暗色主题特性
- 使用深色背景和白色文字
- 深灰色的统计概览背景 (#1f1f1f)
- 更亮的颜色变体以提高对比度
- 适配暗色的边框和分割线

## 兼容性保证

### 向后兼容
- 保持原有的 API 接口不变
- 保持原有的功能逻辑不变
- 仅优化视觉呈现效果

### 响应式设计
- 统计信息使用 `Space` 组件的 `wrap` 属性
- 确保在小屏幕设备上的良好显示

## 测试覆盖

### 单元测试
- 创建了完整的测试文件 `PlaneDependencyAnalysis.test.tsx`
- 覆盖亮色和暗色主题的渲染测试
- 验证复杂度计算和风险等级显示

### 视觉测试
- 在不同主题下的视觉一致性
- 颜色对比度符合无障碍标准
- 交互状态的视觉反馈

## 使用方式

组件会自动根据当前主题状态进行样式调整，无需额外配置：

```tsx
<PlaneDependencyAnalysis
  planes={planes}
  relationships={relationships}
/>
```

## 性能优化

### 样式计算优化
- 使用 `styled-components` 的条件样式
- 避免不必要的重新渲染
- 合理使用 `useMemo` 和 `useCallback`

### 主题切换性能
- 利用 CSS 过渡动画提供流畅的切换体验
- 避免主题切换时的闪烁问题

## 总结

通过这次优化，平面依赖复杂度分析卡片现在能够：

1. **完美适配**亮色和暗色两种主题模式
2. **提供一致**的用户体验和视觉效果
3. **保持良好**的可读性和对比度
4. **支持流畅**的主题切换动画
5. **遵循无障碍**设计标准

这些改进使得组件在不同主题下都能提供专业、美观、易用的界面体验。
