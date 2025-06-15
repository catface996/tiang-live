import React from 'react';
import { Card, Table, Tag, Typography, Space, Tooltip } from 'antd';
import { 
  NodeIndexOutlined, 
  BranchesOutlined, 
  ExclamationCircleOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import type { PlaneDefinition, PlaneRelationship } from '../../types';
import { getPrimaryColorById, getLightColorById } from '../../utils/planeColors';

const { Title, Text } = Typography;

// 样式化的平面标签
const PlaneTag = styled.div<{ $planeId: string }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  background: ${props => getLightColorById(props.$planeId)};
  border: 1px solid ${props => getPrimaryColorById(props.$planeId)};
  margin-right: 8px;
`;

// 样式化的表格容器
const StyledTableContainer = styled.div`
  .ant-table-tbody > tr.high-risk-row {
    background-color: #fff2f0 !important;
  }
  
  .ant-table-tbody > tr.medium-risk-row {
    background-color: #fffbe6 !important;
  }
  
  .ant-table-tbody > tr.high-risk-row:hover > td,
  .ant-table-tbody > tr.medium-risk-row:hover > td {
    background-color: inherit !important;
  }
`;

interface PlaneDependencyAnalysisProps {
  planes: PlaneDefinition[];
  relationships: PlaneRelationship[];
}

interface DependencyAnalysisData {
  planeId: string;
  planeName: string;
  level: number;
  dependencyCount: number;
  dependentCount: number;
  complexityScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  dependencies: string[];
  dependents: string[];
}

const PlaneDependencyAnalysis: React.FC<PlaneDependencyAnalysisProps> = ({
  planes,
  relationships
}) => {
  const { t } = useTranslation();
  
  // 分析每个平面的依赖复杂度
  const analyzeComplexity = (): DependencyAnalysisData[] => {
    return planes.map(plane => {
      const dependencies = plane.dependencies || [];
      const dependents = planes.filter(p => 
        p.dependencies && p.dependencies.includes(plane.id)
      ).map(p => p.id);
      
      const dependencyCount = dependencies.length;
      const dependentCount = dependents.length;
      
      // 计算复杂度分数
      const complexityScore = dependencyCount * 2 + dependentCount;
      
      // 评估风险等级
      let riskLevel: 'low' | 'medium' | 'high' = 'low';
      if (complexityScore >= 8) riskLevel = 'high';
      else if (complexityScore >= 4) riskLevel = 'medium';
      
      return {
        planeId: plane.id,
        planeName: plane.displayName,
        level: plane.level,
        dependencyCount,
        dependentCount,
        complexityScore,
        riskLevel,
        dependencies,
        dependents,
      };
    });
  };

  const analysisData = analyzeComplexity();

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return '#ff4d4f';
      case 'medium': return '#faad14';
      case 'low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return <ExclamationCircleOutlined />;
      case 'medium': return <ExclamationCircleOutlined />;
      case 'low': return <CheckCircleOutlined />;
      default: return <NodeIndexOutlined />;
    }
  };

  const columns = [
    {
      title: t('planes.dependency.columns.planeName'),
      dataIndex: 'planeName',
      key: 'planeName',
      render: (text: string, record: DependencyAnalysisData) => (
        <Space>
          <PlaneTag $planeId={record.planeId}>
            <Text strong style={{ color: getPrimaryColorById(record.planeId) }}>
              L{record.level}
            </Text>
          </PlaneTag>
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: t('planes.dependency.columns.dependencyCount'),
      dataIndex: 'dependencyCount',
      key: 'dependencyCount',
      render: (count: number, record: DependencyAnalysisData) => {
        const dependencyNames = record.dependencies.map(depId => {
          const plane = planes.find(p => p.id === depId);
          return plane?.displayName || depId;
        }).join(', ');
        
        return (
          <Tooltip title={`${t('planes.dependency.tooltips.dependencyPlanes')}: ${dependencyNames || t('planes.dependency.tooltips.none')}`}>
            <Tag color={count > 2 ? 'orange' : count > 0 ? 'blue' : 'default'}>
              {count}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: t('planes.dependency.columns.dependentCount'),
      dataIndex: 'dependentCount',
      key: 'dependentCount',
      render: (count: number, record: DependencyAnalysisData) => {
        const dependentNames = record.dependents.map(depId => {
          const plane = planes.find(p => p.id === depId);
          return plane?.displayName || depId;
        }).join(', ');
        
        return (
          <Tooltip title={`${t('planes.dependency.tooltips.dependentPlanes')}: ${dependentNames || t('planes.dependency.tooltips.none')}`}>
            <Tag color={count > 2 ? 'red' : count > 0 ? 'green' : 'default'}>
              {count}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: t('planes.dependency.columns.complexityScore'),
      dataIndex: 'complexityScore',
      key: 'complexityScore',
      render: (score: number) => (
        <Text strong style={{ color: score >= 8 ? '#ff4d4f' : score >= 4 ? '#faad14' : '#52c41a' }}>
          {score}
        </Text>
      ),
    },
    {
      title: t('planes.dependency.columns.riskLevel'),
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      render: (riskLevel: string) => (
        <Tag 
          color={getRiskColor(riskLevel)} 
          icon={getRiskIcon(riskLevel)}
        >
          {t(`planes.dependency.riskLevels.${riskLevel}`)}
        </Tag>
      ),
    },
  ];

  // 统计信息
  const totalComplexity = analysisData.reduce((sum, item) => sum + item.complexityScore, 0);
  const highRiskCount = analysisData.filter(item => item.riskLevel === 'high').length;
  const mediumRiskCount = analysisData.filter(item => item.riskLevel === 'medium').length;
  const maxDependencies = Math.max(...analysisData.map(item => item.dependencyCount));

  return (
    <Card 
      title={
        <Space>
          <BranchesOutlined />
          <span>{t('planes.dependency.title')}</span>
        </Space>
      }
      style={{ marginTop: 24 }}
    >
      {/* 统计概览 */}
      <div style={{ marginBottom: 16, padding: '16px', background: '#fafafa', borderRadius: '6px' }}>
        <Space size="large">
          <div>
            <Text type="secondary">{t('planes.dependency.stats.totalComplexity')}: </Text>
            <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>{totalComplexity}</Text>
          </div>
          <div>
            <Text type="secondary">{t('planes.dependency.stats.highRiskPlanes')}: </Text>
            <Text strong style={{ fontSize: '16px', color: '#ff4d4f' }}>{highRiskCount}</Text>
          </div>
          <div>
            <Text type="secondary">{t('planes.dependency.stats.mediumRiskPlanes')}: </Text>
            <Text strong style={{ fontSize: '16px', color: '#faad14' }}>{mediumRiskCount}</Text>
          </div>
          <div>
            <Text type="secondary">{t('planes.dependency.stats.maxDependencies')}: </Text>
            <Text strong style={{ fontSize: '16px', color: '#722ed1' }}>{maxDependencies}</Text>
          </div>
        </Space>
      </div>

      {/* 详细分析表格 */}
      <StyledTableContainer>
        <Table
          dataSource={analysisData}
          columns={columns}
          rowKey="planeId"
          pagination={false}
          size="small"
          rowClassName={(record) => {
            if (record.riskLevel === 'high') return 'high-risk-row';
            if (record.riskLevel === 'medium') return 'medium-risk-row';
            return '';
          }}
        />
      </StyledTableContainer>

      {/* 风险说明 */}
      <div style={{ marginTop: 16, fontSize: '12px', color: '#8c8c8c' }}>
        <Text type="secondary">
          * {t('planes.dependency.riskExplanation.title')}: {t('planes.dependency.riskExplanation.low')} | {t('planes.dependency.riskExplanation.medium')} | {t('planes.dependency.riskExplanation.high')}
        </Text>
      </div>
    </Card>
  );
};

export default PlaneDependencyAnalysis;
