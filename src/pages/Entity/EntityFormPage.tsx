import React from 'react';
import { useParams } from 'react-router-dom';
import EntityForm from './EntityForm';

const EntityFormPage: React.FC = () => {
  const { id } = useParams();
  const mode = id ? 'edit' : 'create';
  
  return <EntityForm mode={mode} />;
};

export default EntityFormPage;