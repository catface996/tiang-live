# 风险项统计功能

## 🎯 功能目标
在诊断报告概览中增加"风险项个数"统计，帮助用户快速识别需要关注的问题。

## 📊 风险项定义

### 风险项包含以下类型：

#### 1. 异常健康指标
- **Critical状态指标**：健康状态为`critical`的指标
- **Warning状态指标**：健康状态为`warning`的指标

#### 2. 失败的诊断动作
- **Error状态动作**：执行状态为`error`的动作
- **Failed状态动作**：执行状态为`failed`的动作

#### 3. 高风险等级
- **High风险等级**：整体风险评估为`high`
- **Critical风险等级**：整体风险评估为`critical`

## 🔧 技术实现

### 风险项计算函数
```typescript
const calculateRiskItems = (report: any) => {
  let riskCount = 0;
  
  // 1. 统计健康状态异常的指标
  report.actions.forEach((action: any) => {
    if (action.metrics) {
      action.metrics.forEach((metric: any) => {
        if (metric.health === 'critical' || metric.health === 'warning') {
          riskCount++;
        }
      });
    }
  });
  
  // 2. 统计失败的动作
  const failedActions = report.actions.filter((action: any) => 
    action.status === 'error' || action.status === 'failed'
  );
  riskCount += failedActions.length;
  
  // 3. 如果整体风险等级为high或critical，额外增加风险项
  if (report.analysis.riskLevel === 'high' || report.analysis.riskLevel === 'critical') {
    riskCount += 1;
  }
  
  return riskCount;
};
```

### 显示逻辑
```typescript
<span style={{ 
  fontSize: 12, 
  color: calculateRiskItems(report) > 0 ? '#ff4d4f' : '#666' 
}}>
  风险: {calculateRiskItems(report)}项
</span>
```

## 🎨 视觉效果

### 概览信息显示
```
86/100
动作: 1项
建议: 1条
风险: 7项  ← 新增的风险项统计
```

### 颜色方案
- **无风险** (0项)：灰色 `#666`
- **有风险** (>0项)：红色 `#ff4d4f`

## 📈 实际案例

### 库存系统 (system_004) - 高风险节点
**风险项统计**：
- ✅ CPU使用率92.5% (critical) → 1项
- ✅ 内存使用率87.3% (critical) → 1项  
- ✅ 数据库连接池2个 (critical) → 1项
- ✅ 同步延迟125秒 (critical) → 1项
- ✅ 健康检查失败 (error) → 1项
- ✅ 数据同步检查失败 (error) → 1项
- ✅ 整体风险等级 (critical) → 1项
- **总计**：7个风险项

**显示效果**：
```
22/100
动作: 2项
建议: 3条
风险: 7项 (红色显示)
```

### Redis缓存 (middleware_002) - 健康节点
**风险项统计**：
- ✅ 缓存命中率94.2% (healthy) → 0项
- ✅ 内存使用率67.8% (healthy) → 0项
- ✅ 连接数245个 (healthy) → 0项
- ✅ 缓存监控成功 (success) → 0项
- ✅ 整体风险等级 (low) → 0项
- **总计**：0个风险项

**显示效果**：
```
90/100
动作: 1项
建议: 1条
风险: 0项 (灰色显示)
```

## 🎯 功能价值

### 1. 快速风险识别
- ✅ 一眼看出节点的风险程度
- ✅ 优先处理高风险节点
- ✅ 提升运维效率

### 2. 量化风险评估
- ✅ 具体的风险项数量
- ✅ 便于风险对比和排序
- ✅ 支持风险趋势分析

### 3. 直观的视觉反馈
- ✅ 红色标识高风险节点
- ✅ 灰色标识正常节点
- ✅ 符合用户直觉

## 📊 风险项分布预期

### 按节点类型统计
| 节点类型 | 预期风险项范围 | 说明 |
|----------|----------------|------|
| 业务场景 | 0-3项 | 业务指标异常 |
| 业务链路 | 0-5项 | 链路性能问题 |
| 业务系统 | 0-8项 | 系统资源和功能异常 |
| 中间件 | 0-4项 | 中间件性能问题 |
| 基础设施 | 0-6项 | 基础设施资源问题 |

### 风险等级对应
| 风险项数量 | 风险等级 | 处理优先级 |
|------------|----------|------------|
| 0项 | 无风险 | 正常监控 |
| 1-2项 | 低风险 | 关注观察 |
| 3-5项 | 中等风险 | 及时处理 |
| 6+项 | 高风险 | 立即处理 |

## ✅ 验证清单

### 功能验证
- [ ] 清理缓存并重启服务器
- [ ] 查看诊断报告概览信息
- [ ] 确认显示格式：`风险: X项`

### 数据验证
- [ ] 库存系统显示7个风险项（红色）
- [ ] Redis缓存显示0个风险项（灰色）
- [ ] 其他节点风险项数量合理

### 视觉验证
- [ ] 有风险的节点显示红色文字
- [ ] 无风险的节点显示灰色文字
- [ ] 布局整齐，信息清晰

现在用户可以在概览中快速看到每个节点的风险项数量，更好地进行风险管理！🎉
