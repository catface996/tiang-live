import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import {
  Dashboard,
  PlaneManagement,
  EntityManagement,
  SequenceManagement,
  ReportManagement,
  TagManagement,
  AIAgentManagement,
} from '../pages';
import PlaneCreateEdit from '../pages/Plane/PlaneCreateEdit';

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
        <Route path="reports" element={<ReportManagement />} />
        <Route path="tags" element={<TagManagement />} />
        <Route path="ai-agents" element={<AIAgentManagement />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
