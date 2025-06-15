import React, { useEffect } from 'react';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { setPageTitle } from '../../utils';

const { Title, Paragraph } = Typography;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const EntityManagement: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setPageTitle(t('entities.title'));
  }, [t]);

  return (
    <div style={{ padding: '24px' }}>
      <PageHeader>
        <Title level={2}>{t('entities.title')}</Title>
        <Paragraph>{t('entities.subtitle')}</Paragraph>
      </PageHeader>
      
      <Card>
        <p>{t('common.loading')}</p>
      </Card>
    </div>
  );
};

export default EntityManagement;
