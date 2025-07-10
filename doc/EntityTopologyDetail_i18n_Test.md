# EntityTopologyDetail 国际化测试文档

## 测试概述

本文档用于验证 EntityTopologyDetail 页面的国际化功能是否完整，确保在中英文环境下都能正确显示。

## 测试范围

### 1. 页面基础元素

#### 面包屑导航

- **中文**: 首页 > 测试工具 > 实体拓扑 > [拓扑名称]
- **英文**: Home > Test Tools > Entity Topology > [Topology Name]

#### 加载和空状态

- **中文**: "加载中..." / "拓扑数据不存在"
- **英文**: "Loading..." / "Topology data does not exist"

### 2. Modal 对话框

#### 删除实体确认对话框

- **标题**
  - 中文: "确认删除实体"
  - 英文: "Confirm Delete Entity"
- **内容**
  - 中文: "确定要删除实体 \"[实体名称]\" 吗？"
  - 英文: "Are you sure you want to delete entity \"[Entity Name]\"?"
- **警告文本**
  - 中文: "删除后将同时移除 [数量] 个相关的依赖关系。"
  - 英文: "Deleting will also remove [count] related dependencies."
- **按钮**
  - 中文: "确定删除" / "取消"
  - 英文: "Confirm Delete" / "Cancel"

#### 删除依赖关系确认对话框

- **标题**
  - 中文: "确认删除依赖关系"
  - 英文: "Confirm Delete Dependency"
- **内容**
  - 中文: "确定要删除以下依赖关系吗？"
  - 英文: "Are you sure you want to delete the following dependency?"
- **关系类型**
  - 中文: "关系类型: [类型]"
  - 英文: "Relationship Type: [Type]"

#### 选择实体对话框

- **标题**
  - 中文: "选择实体"
  - 英文: "Select Entities"
- **描述**
  - 中文: "从下列可用实体中选择要添加到拓扑图的实体。"
  - 英文: "Select entities from the available list to add to the topology diagram."
- **统计信息**
  - 中文: "共有 [总数] 个可用实体，已选择 [已选] 个。"
  - 英文: "Total [total] available entities, [selected] selected."
- **按钮**
  - 中文: "全选" / "清空" / "确定添加 ([数量])"
  - 英文: "Select All" / "Clear All" / "Confirm Add ([count])"
- **表格列标题**
  - 中文: "实体名称" / "类型" / "状态" / "描述"
  - 英文: "Entity Name" / "Type" / "Status" / "Description"

#### 创建依赖关系对话框

- **标题**
  - 中文: "创建依赖关系"
  - 英文: "Create Dependency"
- **表单标签**
  - 中文: "源实体" / "目标实体" / "关系类型"
  - 英文: "Source Entity" / "Target Entity" / "Relationship Type"
- **占位符**
  - 中文: "请选择源实体" / "请选择目标实体"
  - 英文: "Please select source entity" / "Please select target entity"
- **交换按钮**
  - 中文: "交换" (提示: "交换源实体和目标实体")
  - 英文: "Swap" (tooltip: "Swap source and target entities")
- **关系类型选项**
  - 中文: "依赖于" / "连接到" / "使用" / "路由到" / "存储在" / "读取自" / "写入到" / "监控" / "备份"
  - 英文: "Depends On" / "Connects To" / "Uses" / "Routes To" / "Stores In" / "Reads From" / "Writes To" / "Monitors" / "Backs Up"

#### Agent绑定对话框

- **标题**
  - 中文: "绑定Agent"
  - 英文: "Bind Agents"
- **描述**
  - 中文: "为实体绑定AI Agent来提供智能化管理和监控能力。"
  - 英文: "Bind AI Agents to entities to provide intelligent management and monitoring capabilities."
- **统计信息**
  - 中文: "共有 [总数] 个可用Agent，已选择 [已选] 个。"
  - 英文: "Total [total] available agents, [selected] selected."
- **表格列标题**
  - 中文: "Agent名称" / "类型" / "状态" / "能力" / "描述"
  - 英文: "Agent Name" / "Type" / "Status" / "Capabilities" / "Description"
- **状态标签**
  - 中文: "运行中" / "警告" / "错误" / "停用"
  - 英文: "Running" / "Warning" / "Error" / "Inactive"

### 3. 消息提示

#### 成功消息

- **删除实体**
  - 中文: "成功删除实体 \"[实体名称]\""
  - 英文: "Successfully deleted entity \"[Entity Name]\""
- **删除依赖关系**
  - 中文: "成功删除依赖关系 \"[源] → [目标]\""
  - 英文: "Successfully deleted dependency \"[Source] → [Target]\""
- **创建依赖关系**
  - 中文: "成功创建依赖关系：[源] → [目标]"
  - 英文: "Successfully created dependency: [Source] → [Target]"
- **添加实体**
  - 中文: "成功添加 [数量] 个实体到拓扑图"
  - 英文: "Successfully added [count] entities to topology"
- **绑定Agent**
  - 中文: "成功绑定 [数量] 个Agent到 [实体名称]"
  - 英文: "Successfully bound [count] agents to [Entity Name]"

#### 错误/警告消息

- **加载失败**
  - 中文: "加载拓扑数据失败"
  - 英文: "Failed to load topology data"
- **最少实体要求**
  - 中文: "至少需要2个实体才能建立依赖关系"
  - 英文: "At least 2 entities are required to establish dependency"
- **选择实体**
  - 中文: "请选择源实体和目标实体"
  - 英文: "Please select source and target entities"
- **实体相同**
  - 中文: "源实体和目标实体不能相同"
  - 英文: "Source and target entities cannot be the same"
- **依赖关系已存在**
  - 中文: "该依赖关系已存在"
  - 英文: "This dependency already exists"

### 4. 状态标签

#### 实体状态

- **中文**: "活跃" / "非活跃" / "警告" / "错误"
- **英文**: "Active" / "Inactive" / "Warning" / "Error"

#### Agent状态

- **中文**: "运行中" / "警告" / "错误" / "停用"
- **英文**: "Running" / "Warning" / "Error" / "Inactive"

### 5. 分页文本

- **中文**: "第 [开始]-[结束] 条，共 [总数] 条"
- **英文**: "[start]-[end] of [total] items"

## 测试步骤

### 1. 环境切换测试

1. 在中文环境下访问页面，验证所有文本显示为中文
2. 切换到英文环境，验证所有文本显示为英文
3. 确认切换过程中没有文本显示异常

### 2. 功能操作测试

1. **删除操作**: 触发删除实体和依赖关系的确认对话框
2. **添加操作**: 打开选择实体和创建依赖关系的对话框
3. **Agent绑定**: 打开Agent绑定对话框
4. **消息提示**: 执行各种操作，观察成功/错误消息
5. **表格操作**: 验证表格列标题、分页文本、状态标签

### 3. 参数化文本测试

1. 验证包含动态参数的文本正确显示（如实体名称、数量等）
2. 确认参数在不同语言环境下正确插值
3. 测试边界情况（如数量为0、1、多个的情况）

## 预期结果

- ✅ 所有用户界面文本都应该根据当前语言环境正确显示
- ✅ 动态参数应该正确插值到翻译文本中
- ✅ 语言切换应该实时生效，无需刷新页面
- ✅ 不应该出现任何硬编码的中文或英文文本
- ✅ 所有Modal、消息、按钮、标签都应该完全国际化

## 问题排查

如果发现仍有中文文本在英文环境下显示，请检查：

1. **语言包完整性**: 确认对应的翻译键存在于英文语言包中
2. **组件使用**: 确认组件中使用了 `t()` 函数而不是硬编码文本
3. **参数传递**: 确认动态参数正确传递给翻译函数
4. **默认值**: 确认翻译函数有适当的默认值处理

## 维护建议

1. **新增文本**: 添加新的用户界面文本时，同时更新中英文语言包
2. **测试覆盖**: 每次修改后都要在两种语言环境下测试
3. **命名规范**: 保持翻译键的命名规范和结构一致性
4. **文档更新**: 及时更新本测试文档以反映最新的功能变化

---

**测试完成日期**: 2025-07-03  
**测试状态**: ✅ 通过  
**备注**: EntityTopologyDetail页面已完成完整的国际化，支持中英文双语切换
