import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import {
  Dashboard,
  PlaneManagement,
  EntityManagement,
  SequenceManagement,
  IndustrySolutionManagement,
  TaskCollectionManagement,
  ReportManagement,
  ReportDetail,
  TagManagement,
  AIAssistant,
  AIAgentManagement,
  InspectionTasks,
  HookTasks,
  ModelManagement,
  PromptTemplates,
  EntityScan,
} from '../pages';
import PlaneCreateEdit from '../pages/Plane/PlaneCreateEdit';
import AIAgentForm from '../pages/AIAgent/AIAgentForm';
import AgentDetail from '../pages/AIAgent/AgentDetail';
import ScanDetail from '../pages/SystemSettings/EntityScan/ScanDetail';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="planes" element={<PlaneManagement />} />
        <Route path="planes/create" element={<PlaneCreateEdit />} />
        <Route path="planes/edit/:id" element={<PlaneCreateEdit />} />
        <Route path="entities" element={<EntityManagement />} />
        <Route path="sequences" element={<SequenceManagement />} />
        <Route path="industry-solutions" element={<IndustrySolutionManagement />} />
        <Route path="task-management/task-collections" element={<TaskCollectionManagement />} />
        <Route path="task-management/inspection-tasks" element={<InspectionTasks />} />
        <Route path="task-management/hook-tasks" element={<HookTasks />} />
        <Route path="reports" element={<ReportManagement />} />
        <Route path="reports/:id" element={<ReportDetail />} />
        <Route path="ai-assistant" element={<AIAssistant />} />
        <Route path="ai-agents" element={<AIAgentManagement />} />
        <Route path="ai-agents/create" element={<AIAgentForm />} />
        <Route path="ai-agents/edit/:id" element={<AIAgentForm />} />
        <Route path="ai-agents/detail/:id" element={<AgentDetail />} />
        <Route path="system-settings/model-management" element={<ModelManagement />} />
        <Route path="system-settings/prompt-templates" element={<PromptTemplates />} />
        <Route path="system-settings/tag-management" element={<TagManagement />} />
        <Route path="system-settings/entity-scan" element={<EntityScan />} />
        <Route path="system-settings/entity-scan/:dataSourceId" element={<ScanDetail />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
