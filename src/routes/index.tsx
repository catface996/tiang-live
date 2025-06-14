import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import {
  Dashboard,
  PlaneManagement,
  EntityManagement,
  RelationshipGraph,
  SequenceManagement,
  AIAgentManagement,
} from '../pages';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="planes" element={<PlaneManagement />} />
        <Route path="entities" element={<EntityManagement />} />
        <Route path="relationships" element={<RelationshipGraph />} />
        <Route path="sequences" element={<SequenceManagement />} />
        <Route path="ai-agents" element={<AIAgentManagement />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
