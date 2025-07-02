# TopologyGraph 通用拓扑图组件

基于 D3.js 的通用拓扑图组件，支持多平面、多层级的实体关系可视化。

## 功能特性

- 🎯 **多平面支持** - 支持按平面分层显示实体
- 🔗 **关系可视化** - 支持多种关系类型的连线展示
- 🎨 **交互式操作** - 支持缩放、拖拽、悬停高亮等交互
- 📊 **自定义样式** - 支持自定义节点颜色、大小、连线样式
- 🎛️ **控制面板** - 内置缩放、重置等控制功能
- 📖 **图例显示** - 自动生成平面、节点、关系类型图例

## 接口定义

### TopologyGraphProps

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| planes | TopologyPlane[] | 是 | - | 平面列表 |
| nodes | TopologyNode[] | 是 | - | 实体节点列表 |
| links | TopologyLink[] | 是 | - | 实体关系列表 |
| width | number | 否 | 容器宽度 | 图表宽度 |
| height | number | 否 | 800 | 图表高度 |
| loading | boolean | 否 | false | 加载状态 |
| error | string \| null | 否 | null | 错误信息 |
| onNodeClick | (node: TopologyNode) => void | 否 | - | 节点点击回调 |
| onNodeHover | (node: TopologyNode \| null) => void | 否 | - | 节点悬停回调 |
| showLegend | boolean | 否 | true | 是否显示图例 |
| showControls | boolean | 否 | true | 是否显示控制面板 |
| className | string | 否 | - | CSS类名 |
| style | React.CSSProperties | 否 | - | 内联样式 |

### TopologyPlane

```typescript
interface TopologyPlane {
  id: string;           // 平面唯一标识
  name: string;         // 平面名称
  level: number;        // 平面层级（1-5）
  color: string;        // 平面背景色
  borderColor: string;  // 平面边框色
  description: string;  // 平面描述
}
```

### TopologyNode

```typescript
interface TopologyNode extends d3.SimulationNodeDatum {
  id: string;           // 节点唯一标识
  name: string;         // 节点名称
  type: string;         // 节点类型
  level: number;        // 节点层级（1-5）
  plane: string;        // 所属平面ID
  description: string;  // 节点描述
  status: string;       // 节点状态
  [key: string]: any;   // 其他自定义属性
}
```

### TopologyLink

```typescript
interface TopologyLink extends d3.SimulationLinkDatum<TopologyNode> {
  source: string | TopologyNode;  // 源节点ID或对象
  target: string | TopologyNode;  // 目标节点ID或对象
  type: string;                   // 关系类型
  strength: number;               // 关系强度（0-1）
}
```

## 使用示例

### 基础用法

```tsx
import React from 'react';
import TopologyGraph, { TopologyPlane, TopologyNode, TopologyLink } from '@/components/TopologyGraph';

const MyComponent: React.FC = () => {
  const planes: TopologyPlane[] = [
    {
      id: "business_plane",
      name: "业务平面",
      level: 1,
      color: "#e6f7ff",
      borderColor: "#1890ff",
      description: "业务层面的实体"
    },
    {
      id: "application_plane",
      name: "应用平面",
      level: 2,
      color: "#fff7e6",
      borderColor: "#faad14",
      description: "应用层面的实体"
    }
  ];

  const nodes: TopologyNode[] = [
    {
      id: "node1",
      name: "用户服务",
      type: "service",
      level: 1,
      plane: "business_plane",
      description: "用户管理服务",
      status: "active"
    },
    {
      id: "node2",
      name: "订单服务",
      type: "service",
      level: 2,
      plane: "application_plane",
      description: "订单处理服务",
      status: "running"
    }
  ];

  const links: TopologyLink[] = [
    {
      source: "node1",
      target: "node2",
      type: "depends_on",
      strength: 0.8
    }
  ];

  const handleNodeClick = (node: TopologyNode) => {
    console.log('节点被点击:', node);
  };

  return (
    <TopologyGraph
      planes={planes}
      nodes={nodes}
      links={links}
      onNodeClick={handleNodeClick}
    />
  );
};
```

### 高级用法

```tsx
import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import TopologyGraph, { TopologyPlane, TopologyNode, TopologyLink } from '@/components/TopologyGraph';

const AdvancedExample: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<{
    planes: TopologyPlane[];
    nodes: TopologyNode[];
    links: TopologyLink[];
  }>({ planes: [], nodes: [], links: [] });

  useEffect(() => {
    // 模拟数据加载
    const loadData = async () => {
      try {
        setLoading(true);
        // 这里应该是实际的API调用
        const data = await fetchTopologyData();
        setGraphData(data);
        setError(null);
      } catch (err) {
        setError('加载数据失败');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleNodeClick = (node: TopologyNode) => {
    // 处理节点点击事件
    console.log('节点详情:', node);
  };

  const handleNodeHover = (node: TopologyNode | null) => {
    // 处理节点悬停事件
    if (node) {
      console.log('悬停在节点:', node.name);
    }
  };

  return (
    <Card title="系统拓扑图">
      <TopologyGraph
        planes={graphData.planes}
        nodes={graphData.nodes}
        links={graphData.links}
        loading={loading}
        error={error}
        height={600}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        showLegend={true}
        showControls={true}
        style={{ border: '1px solid #d9d9d9' }}
      />
    </Card>
  );
};

// 模拟API调用
const fetchTopologyData = async () => {
  // 实际项目中这里应该是真实的API调用
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        planes: [/* 平面数据 */],
        nodes: [/* 节点数据 */],
        links: [/* 关系数据 */]
      });
    }, 1000);
  });
};
```

## 样式自定义

组件使用 CSS 变量来支持主题定制：

```css
:root {
  --border-color: #d9d9d9;
  --background-color: #ffffff;
  --card-bg: #ffffff;
  --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --text-color: #000000;
  --text-secondary: #666666;
}
```

## 注意事项

1. **数据格式**: 确保传入的数据格式符合接口定义
2. **性能优化**: 大量节点时建议启用虚拟化或分页
3. **响应式**: 组件会自动适应容器大小变化
4. **国际化**: 组件内置了基础的国际化支持
5. **浏览器兼容**: 需要支持 D3.js 的现代浏览器

## 扩展开发

如需扩展功能，可以：

1. 继承 `TopologyGraph` 组件
2. 自定义节点渲染逻辑
3. 添加新的交互行为
4. 扩展数据接口定义
