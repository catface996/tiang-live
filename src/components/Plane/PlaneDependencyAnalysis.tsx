import React from 'react';
import { Card, Table, Tag, Typography, Space, Tooltip, theme } from 'antd';
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
import { useAppSelector } from '../../store';

const { Title, Text } = Typography;
const { useToken } = theme;

// 样式化的平面标签
const PlaneTag = styled.div<{ $planeId: string; $isDark: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  background: ${props => props.$isDark 
    ? `${getPrimaryColorById(props.$planeId)}20` 
    : getLightColorById(props.$planeId)
  };
  border: 1px solid ${props => getPrimaryColorById(props.$planeId)};
  margin-right: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.$isDark 
      ? `${getPrimaryColorById(props.$planeId)}30` 
      : `${getPrimaryColorById(props.$planeId)}15`
    };
  }
`;

// 样式化的统计概览容器
const StatsOverview = styled.div<{ $isDark: boolean }>`
  margin-bottom: 16px;
  padding: 16px;
  background: ${props => props.$isDark ? '#1f1f1f' : '#fafafa'};
  border: 1px solid ${props => props.$isDark ? '#303030' : '#f0f0f0'};
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.$isDark ? '#434343' : '#d9d9d9'};
    box-shadow: ${props => props.$isDark 
      ? '0 2px 8px rgba(255, 255, 255, 0.05)' 
      : '0 2px 8px rgba(0, 0, 0, 0.06)'
    };
  }
`;

// 样式化的表格容器
const StyledTableContainer = styled.div<{ $isDark: boolean }>`
  .ant-table-tbody > tr.high-risk-row {
    background-color: ${props => props.$isDark ? '#2a1215' : '#fff2f0'} !important;
    border-left: 3px solid #ff4d4f;
  }
  
  .ant-table-tbody > tr.medium-risk-row {
    background-color: ${props => props.$isDark ? '#2b2611' : '#fffbe6'} !important;
    border-left: 3px solid #faad14;
  }
  
  .ant-table-tbody > tr.low-risk-row {
    border-left: 3px solid #52c41a;
  }
  
  .ant-table-tbody > tr.high-risk-row:hover > td,
  .ant-table-tbody > tr.medium-risk-row:hover > td {
    background-color: inherit !important;
  }
  
  .ant-table-thead > tr > th {
    background: ${props => props.$isDark ? '#1f1f1f' : '#fafafa'} !important;
    border-bottom: 1px solid ${props => props.$isDark ? '#303030' : '#f0f0f0'} !important;
    color: ${props => props.$isDark ? '#ffffff' : 'rgba(0, 0, 0, 0.85)'} !important;
  }
  
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid ${props => props.$isDark ? '#303030' : '#f0f0f0'} !important;
  }
  
  .ant-table-tbody > tr:hover > td {
    background: ${props => props.$isDark ? '#262626' : '#fafafa'} !important;
  }
`;

// 样式化的风险说明
const RiskExplanation = styled.div<{ $isDark: boolean }>`
  margin-top: 16px;
  padding: 12px;
  background: ${props => props.$isDark ? '#0f1419' : '#f6f8fa'};
  border: 1px solid ${props => props.$isDark ? '#21262d' : '#d1d9e0'};
  border-radius: 6px;
  font-size: 12px;
  color: ${props => props.$isDark ? '#8b949e' : '#656d76'};
  
  .risk-item {
    display: inline-block;
    margin-right: 16px;
    
    &:last-child {
      margin-right: 0;
    }
  }
  
  .risk-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    
    &.low { background-color: #52c41a; }
    &.medium { background-color: #faad14; }
    &.high { background-color: #ff4d4f; }
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
  const { currentTheme } = useAppSelector((state) => state.theme);
  const { token } = useToken();
  const isDark = currentTheme === 'dark';
  
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
      case 'high': return isDark ? '#ff7875' : '#ff4d4f';
      case 'medium': return isDark ? '#ffc53d' : '#faad14';
      case 'low': return isDark ? '#73d13d' : '#52c41a';
      default: return isDark ? '#595959' : '#d9d9d9';
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

  const getComplexityScoreColor = (score: number) => {
    if (score >= 8) return isDark ? '#ff7875' : '#ff4d4f';
    if (score >= 4) return isDark ? '#ffc53d' : '#faad14';
    return isDark ? '#73d13d' : '#52c41a';
  };

  const columns = [
    {
      title: t('planes.dependency.columns.planeName'),
      dataIndex: 'planeName',
      key: 'planeName',
      render: (text: string, record: DependencyAnalysisData) => (
        <Space>
          <PlaneTag $planeId={record.planeId} $isDark={isDark}>
            <Text strong style={{ color: getPrimaryColorById(record.planeId) }}>
              L{record.level}
            </Text>
          </PlaneTag>
          <Text style={{ color: isDark ? '#ffffff' : 'rgba(0, 0, 0, 0.85)' }}>
            {text}
          </Text>
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
        
        const tagColor = count > 2 ? (isDark ? '#d89614' : 'orange') : 
                        count > 0 ? (isDark ? '#177ddc' : 'blue') : 
                        (isDark ? '#434343' : 'default');
        
        return (
          <Tooltip title={`${t('planes.dependency.tooltips.dependencyPlanes')}: ${dependencyNames || t('planes.dependency.tooltips.none')}`}>
            <Tag color={tagColor}>
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
        
        const tagColor = count > 2 ? (isDark ? '#d32029' : 'red') : 
                        count > 0 ? (isDark ? '#49aa19' : 'green') : 
                        (isDark ? '#434343' : 'default');
        
        return (
          <Tooltip title={`${t('planes.dependency.tooltips.dependentPlanes')}: ${dependentNames || t('planes.dependency.tooltips.none')}`}>
            <Tag color={tagColor}>
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
        <Text strong style={{ color: getComplexityScoreColor(score) }}>
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
          style={{ 
            color: isDark ? '#000000' : '#ffffff',
            fontWeight: 'bold'
          }}
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
          <BranchesOutlined style={{ color: isDark ? '#ffffff' : 'rgba(0, 0, 0, 0.85)' }} />
          <span style={{ color: isDark ? '#ffffff' : 'rgba(0, 0, 0, 0.85)' }}>
            {t('planes.dependency.title')}
          </span>
        </Space>
      }
      style={{ 
        marginTop: 24,
        background: isDark ? '#141414' : '#ffffff',
        borderColor: isDark ? '#303030' : '#d9d9d9'
      }}
    >
      {/* 统计概览 */}
      <StatsOverview $isDark={isDark}>
        <Space size="large" wrap>
          <div>
            <Text type="secondary" style={{ color: isDark ? '#8c8c8c' : '#595959' }}>
              {t('planes.dependency.stats.totalComplexity')}: 
            </Text>
            <Text strong style={{ 
              fontSize: '16px', 
              color: isDark ? '#40a9ff' : '#1890ff',
              marginLeft: '4px'
            }}>
              {totalComplexity}
            </Text>
          </div>
          <div>
            <Text type="secondary" style={{ color: isDark ? '#8c8c8c' : '#595959' }}>
              {t('planes.dependency.stats.highRiskPlanes')}: 
            </Text>
            <Text strong style={{ 
              fontSize: '16px', 
              color: isDark ? '#ff7875' : '#ff4d4f',
              marginLeft: '4px'
            }}>
              {highRiskCount}
            </Text>
          </div>
          <div>
            <Text type="secondary" style={{ color: isDark ? '#8c8c8c' : '#595959' }}>
              {t('planes.dependency.stats.mediumRiskPlanes')}: 
            </Text>
            <Text strong style={{ 
              fontSize: '16px', 
              color: isDark ? '#ffc53d' : '#faad14',
              marginLeft: '4px'
            }}>
              {mediumRiskCount}
            </Text>
          </div>
          <div>
            <Text type="secondary" style={{ color: isDark ? '#8c8c8c' : '#595959' }}>
              {t('planes.dependency.stats.maxDependencies')}: 
            </Text>
            <Text strong style={{ 
              fontSize: '16px', 
              color: isDark ? '#b37feb' : '#722ed1',
              marginLeft: '4px'
            }}>
              {maxDependencies}
            </Text>
          </div>
        </Space>
      </StatsOverview>

      {/* 详细分析表格 */}
      <StyledTableContainer $isDark={isDark}>
        <Table
          dataSource={analysisData}
          columns={columns}
          rowKey="planeId"
          pagination={false}
          size="small"
          rowClassName={(record) => {
            if (record.riskLevel === 'high') return 'high-risk-row';
            if (record.riskLevel === 'medium') return 'medium-risk-row';
            return 'low-risk-row';
          }}
          style={{
            background: isDark ? '#141414' : '#ffffff'
          }}
        />
      </StyledTableContainer>

      {/* 风险说明 */}
      <RiskExplanation $isDark={isDark}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px', color: isDark ? '#ffffff' : '#000000' }}>
          {t('planes.dependency.riskExplanation.title')}:
        </div>
        <div>
          <span className="risk-item">
            <span className="risk-dot low"></span>
            {t('planes.dependency.riskExplanation.low')}
          </span>
          <span className="risk-item">
            <span className="risk-dot medium"></span>
            {t('planes.dependency.riskExplanation.medium')}
          </span>
          <span className="risk-item">
            <span className="risk-dot high"></span>
            {t('planes.dependency.riskExplanation.high')}
          </span>
        </div>
      </RiskExplanation>
    </Card>
  );
};

export default PlaneDependencyAnalysis;
