# 翻译Key更新说明

## 问题描述

时序详情页面中使用了 `common:status`、`common:type`、`common:description` 等翻译key，与common命名空间中的key发生冲突，导致返回对象而不是字符串。

## 解决方案

将时序相关的翻译key重命名为更具体的命名，避免与common命名空间冲突。

## 需要添加的新翻译Key

### sequences 命名空间需要添加的key：

```json
{
  "sequenceStatus": "状态",
  "sequenceType": "类型",
  "sequenceDescription": "描述",
  "statusFilter": "状态筛选"
}
```

### 英文翻译 (en-US)：

```json
{
  "sequenceStatus": "Status",
  "sequenceType": "Type",
  "sequenceDescription": "Description",
  "statusFilter": "Status Filter"
}
```

## 修改的文件

1. `src/components/Sequence/SequenceDetail.tsx`
   - `common:status` → `sequences:sequenceStatus`
   - `common:type` → `sequences:sequenceType`
   - `common:description` → `sequences:sequenceDescription`

2. `src/pages/Sequence/SequenceManagement.tsx`
   - `common:status` → `sequences:statusFilter`

## 注意事项

- 这些新的翻译key需要在对应的翻译文件中添加
- 建议在所有语言的翻译文件中都添加这些key
- 修改后需要重新启动开发服务器以确保翻译生效
