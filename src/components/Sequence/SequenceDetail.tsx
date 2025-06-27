/**
 * 时序详情组件
 * 用于在模态框中展示时序的详细信息
 */
import React from 'react';
import { Descriptions, Tag, Space, Typography } from 'antd';
import { 
  UserOutlined,
  ApiOutlined,
  DatabaseOutlined,
  CloudOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import SequenceDiagram from '../SequenceDiagram';
import styled from 'styled-components';

const { Text } = Typography;

// 时间格式化工具函数
const formatDuration = (duration: string, t: any): string => {
  if (!duration) return '';
  
  const match = duration.match(/^(\d+)-(\d+)$/);
  if (!match) return duration;
  
  const [, min, max] = match;
  const minNum = parseInt(min);
  const maxNum = parseInt(max);
  
  if (minNum >= 1000) {
    const minSec = minNum / 1000;
    const maxSec = maxNum / 1000;
    const minSecStr = minSec % 1 === 0 ? minSec.toString() : minSec.toFixed(1);
    const maxSecStr = maxSec % 1 === 0 ? maxSec.toString() : maxSec.toFixed(1);
    return `${minSecStr}-${maxSecStr} ${t('sequences:units.seconds')}`;
  } else {
    return `${min}-${max} ${t('sequences:units.milliseconds')}`;
  }
};

const DetailContainer = styled.div`
  background-color: var(--bg-container);
  color: var(--text-primary);
  
  /* 图表容器样式 */
  .sequence-diagram-container {
    background-color: var(--bg-container);
    border: 1px solid var(--border-light);
    border-radius: 8px;
    padding: 16px;
    margin-top: 16px;
  }
`;

interface SequenceData {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  participants: string[];
  steps: number;
  duration: string;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  mermaidChart: string;
}

interface SequenceDetailProps {
  sequence: SequenceData;
}

const SequenceDetail: React.FC<SequenceDetailProps> = ({ sequence }) => {
  const { t } = useTranslation(['sequences', 'common']);

  const sequenceTypeMap = {
    authentication: { name: t('sequences:types.authentication'), color: 'blue', icon: <UserOutlined /> },
    business: { name: t('sequences:types.business'), color: 'green', icon: <ApiOutlined /> },
    monitoring: { name: t('sequences:types.monitoring'), color: 'orange', icon: <ClockCircleOutlined /> },
    data: { name: t('sequences:types.data'), color: 'purple', icon: <DatabaseOutlined /> },
    gateway: { name: t('sequences:types.gateway'), color: 'cyan', icon: <CloudOutlined /> },
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'green', text: t('sequences:statuses.active') },
      inactive: { color: 'red', text: t('sequences:statuses.inactive') },
      draft: { color: 'orange', text: t('sequences:statuses.draft') },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return config ? <Tag color={config.color}>{config.text}</Tag> : <Tag>{status}</Tag>;
  };

  const typeConfig = sequenceTypeMap[sequence.type as keyof typeof sequenceTypeMap];

  return (
    <DetailContainer>
      {/* 基本信息 */}
      <Descriptions 
        bordered 
        column={2} 
        style={{ marginBottom: 24 }}
        size="middle"
      >
        <Descriptions.Item label={t('sequences:sequenceName')} span={2}>
          <Text strong>{sequence.name}</Text>
        </Descriptions.Item>
        
        <Descriptions.Item label={t('sequences:sequenceType')}>
          <Tag 
            color={typeConfig?.color}
            icon={typeConfig?.icon}
          >
            {typeConfig?.name}
          </Tag>
        </Descriptions.Item>
        
        <Descriptions.Item label={t('sequences:sequenceStatus')}>
          {getStatusTag(sequence.status)}
        </Descriptions.Item>
        
        <Descriptions.Item label={t('sequences:stepCount')}>
          <Text>{sequence.steps} {t('sequences:steps')}</Text>
        </Descriptions.Item>
        
        <Descriptions.Item label={t('sequences:executionDuration')}>
          <Text>{formatDuration(sequence.duration, t)}</Text>
        </Descriptions.Item>
        
        <Descriptions.Item label={t('sequences:createdBy')}>
          <Text>{sequence.createdBy}</Text>
        </Descriptions.Item>
        
        <Descriptions.Item label={t('sequences:createdAt')}>
          <Text>{sequence.createdAt}</Text>
        </Descriptions.Item>
        
        <Descriptions.Item label={t('sequences:participants')} span={2}>
          <Space wrap>
            {sequence.participants.map((participant, index) => (
              <Tag key={index} icon={<UserOutlined />}>
                {participant}
              </Tag>
            ))}
          </Space>
        </Descriptions.Item>
        
        <Descriptions.Item label={t('sequences:lastModified')} span={2}>
          <Text>{sequence.lastModified}</Text>
        </Descriptions.Item>
        
        <Descriptions.Item label={t('sequences:sequenceDescription')} span={2}>
          <Text>{sequence.description}</Text>
        </Descriptions.Item>
      </Descriptions>

      {/* 时序图 */}
      <div className="sequence-diagram-container">
        <SequenceDiagram 
          chart={sequence.mermaidChart}
          title={t('sequences:sequenceDiagram')}
        />
      </div>
    </DetailContainer>
  );
};

export default SequenceDetail;
