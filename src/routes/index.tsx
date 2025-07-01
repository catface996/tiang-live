import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import MainLayout from '../layouts/MainLayout';

// 使用懒加载优化代码分割
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const PlaneManagement = React.lazy(() => import('../pages/Plane'));
const EntityManagement = React.lazy(() => import('../pages/Entity'));
const SequenceManagement = React.lazy(() => import('../pages/Sequence'));
const IndustrySolutionManagement = React.lazy(() => import('../pages/IndustrySolution'));
const TaskCollectionManagement = React.lazy(() => import('../pages/TaskCollection'));
const TaskCollectionRunDetail = React.lazy(() => import('../pages/TaskCollection/TaskCollectionRunDetail'));
const TaskExecutionHistory = React.lazy(() => import('../pages/TaskCollection/TaskExecutionHistory'));
const ReportManagement = React.lazy(() => import('../pages/Report'));
const ReportDetail = React.lazy(() => import('../pages/Report/ReportDetail'));
const TagManagement = React.lazy(() => import('../pages/SystemSettings/TagManagement'));
const AIAssistant = React.lazy(() => import('../pages/AIAssistant'));
const AIAgentManagement = React.lazy(() => import('../pages/AIAgent/AIAgentManagement'));
const InspectionTasks = React.lazy(() => import('../pages/TaskManagement/InspectionTasks'));
const HookTasks = React.lazy(() => import('../pages/TaskManagement/HookTasks'));
const ModelManagement = React.lazy(() => import('../pages/SystemSettings/ModelManagement'));
const PromptTemplates = React.lazy(() => import('../pages/SystemSettings/PromptTemplates'));
const EntityScan = React.lazy(() => import('../pages/SystemSettings/EntityScan'));
const TestTools = React.lazy(() => import('../pages/TestTools'));
const EntityTopology = React.lazy(() => import('../pages/TestTools/EntityTopology'));

// 子页面组件
const PlaneCreateEdit = React.lazy(() => import('../pages/Plane/PlaneCreateEdit'));
const EntityFormPage = React.lazy(() => import('../pages/Entity/EntityFormPage'));
const AIAgentForm = React.lazy(() => import('../pages/AIAgent/AIAgentForm'));
const AgentDetail = React.lazy(() => import('../pages/AIAgent/AgentDetail'));
const ScanDetail = React.lazy(() => import('../pages/SystemSettings/EntityScan/ScanDetail'));

// 加载中组件
const PageLoading: React.FC = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px' 
  }}>
    <Spin size="large" />
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={
          <Suspense fallback={<PageLoading />}>
            <Dashboard />
          </Suspense>
        } />
        <Route path="planes" element={
          <Suspense fallback={<PageLoading />}>
            <PlaneManagement />
          </Suspense>
        } />
        <Route path="planes/create" element={
          <Suspense fallback={<PageLoading />}>
            <PlaneCreateEdit />
          </Suspense>
        } />
        <Route path="planes/edit/:id" element={
          <Suspense fallback={<PageLoading />}>
            <PlaneCreateEdit />
          </Suspense>
        } />
        <Route path="entities" element={
          <Suspense fallback={<PageLoading />}>
            <EntityManagement />
          </Suspense>
        } />
        <Route path="entities/create" element={
          <Suspense fallback={<PageLoading />}>
            <EntityFormPage />
          </Suspense>
        } />
        <Route path="entities/edit/:id" element={
          <Suspense fallback={<PageLoading />}>
            <EntityFormPage />
          </Suspense>
        } />
        <Route path="sequences" element={
          <Suspense fallback={<PageLoading />}>
            <SequenceManagement />
          </Suspense>
        } />
        <Route path="industry-solutions" element={
          <Suspense fallback={<PageLoading />}>
            <IndustrySolutionManagement />
          </Suspense>
        } />
        <Route path="task-management/task-collections" element={
          <Suspense fallback={<PageLoading />}>
            <TaskCollectionManagement />
          </Suspense>
        } />
        <Route path="task-management/task-collections/run/:runId" element={
          <Suspense fallback={<PageLoading />}>
            <TaskCollectionRunDetail />
          </Suspense>
        } />
        <Route path="task-management/task-collections/history/:taskId" element={
          <Suspense fallback={<PageLoading />}>
            <TaskExecutionHistory />
          </Suspense>
        } />
        <Route path="task-management/task-collections/history" element={
          <Suspense fallback={<PageLoading />}>
            <TaskExecutionHistory />
          </Suspense>
        } />
        <Route path="task-management/inspection-tasks" element={
          <Suspense fallback={<PageLoading />}>
            <InspectionTasks />
          </Suspense>
        } />
        <Route path="task-management/hook-tasks" element={
          <Suspense fallback={<PageLoading />}>
            <HookTasks />
          </Suspense>
        } />
        <Route path="reports" element={
          <Suspense fallback={<PageLoading />}>
            <ReportManagement />
          </Suspense>
        } />
        <Route path="reports/:id" element={
          <Suspense fallback={<PageLoading />}>
            <ReportDetail />
          </Suspense>
        } />
        <Route path="ai-assistant" element={
          <Suspense fallback={<PageLoading />}>
            <AIAssistant />
          </Suspense>
        } />
        <Route path="ai-agents" element={
          <Suspense fallback={<PageLoading />}>
            <AIAgentManagement />
          </Suspense>
        } />
        <Route path="ai-agents/create" element={
          <Suspense fallback={<PageLoading />}>
            <AIAgentForm />
          </Suspense>
        } />
        <Route path="ai-agents/edit/:id" element={
          <Suspense fallback={<PageLoading />}>
            <AIAgentForm />
          </Suspense>
        } />
        <Route path="ai-agents/detail/:id" element={
          <Suspense fallback={<PageLoading />}>
            <AgentDetail />
          </Suspense>
        } />
        <Route path="system-settings/model-management" element={
          <Suspense fallback={<PageLoading />}>
            <ModelManagement />
          </Suspense>
        } />
        <Route path="system-settings/prompt-templates" element={
          <Suspense fallback={<PageLoading />}>
            <PromptTemplates />
          </Suspense>
        } />
        <Route path="system-settings/tag-management" element={
          <Suspense fallback={<PageLoading />}>
            <TagManagement />
          </Suspense>
        } />
        <Route path="system-settings/entity-scan" element={
          <Suspense fallback={<PageLoading />}>
            <EntityScan />
          </Suspense>
        } />
        <Route path="system-settings/entity-scan/:dataSourceId" element={
          <Suspense fallback={<PageLoading />}>
            <ScanDetail />
          </Suspense>
        } />
        <Route path="test-tools" element={
          <Suspense fallback={<PageLoading />}>
            <TestTools />
          </Suspense>
        } />
        <Route path="test-tools/entity-topology" element={
          <Suspense fallback={<PageLoading />}>
            <EntityTopology />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
