import React, { useEffect } from 'react';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { setPageTitle } from '../../../utils';

const { Title, Paragraph } = Typography;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const InspectionTasks: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setPageTitle(t('tasks.inspection.title'));
  }, [t]);

  return (
    <div style={{ padding: '24px' }}>
      <PageHeader>
        <Title level={2}>{t('tasks.inspection.title')}</Title>
        <Paragraph>{t('tasks.inspection.subtitle')}</Paragraph>
      </PageHeader>
      
      <Card>
        <p>{t('common.loading')}</p>
      </Card>
    </div>
  );
};

export default InspectionTasks;
