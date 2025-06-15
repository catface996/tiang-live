import React, { useEffect } from 'react';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { setPageTitle } from '../../utils';

const { Title, Paragraph } = Typography;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const TaskCollectionManagement: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setPageTitle(t('tasks.collections.title'));
  }, [t]);

  return (
    <div style={{ padding: '24px' }}>
      <PageHeader>
        <Title level={2}>{t('tasks.collections.title')}</Title>
        <Paragraph>{t('tasks.collections.subtitle')}</Paragraph>
      </PageHeader>
      
      <Card>
        <p>{t('common.loading')}</p>
      </Card>
    </div>
  );
};

export default TaskCollectionManagement;
