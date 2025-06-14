import React from 'react';
import { Card, Table, Tag, Typography, Space, Tooltip } from 'antd';
import { 
  NodeIndexOutlined, 
  BranchesOutlined, 
  ExclamationCircleOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons';
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
      title: '平面',
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
      title: '依赖数量',
      dataIndex: 'dependencyCount',
      key: 'dependencyCount',
      render: (count: number, record: DependencyAnalysisData) => {
        const dependencyNames = record.dependencies.map(depId => {
          const plane = planes.find(p => p.id === depId);
          return plane?.displayName || depId;
        }).join(', ');
        
        return (
          <Tooltip title={`依赖平面: ${dependencyNames || '无'}`}>
            <Tag color={count > 2 ? 'orange' : count > 0 ? 'blue' : 'default'}>
              {count}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: '被依赖数量',
      dataIndex: 'dependentCount',
      key: 'dependentCount',
      render: (count: number, record: DependencyAnalysisData) => {
        const dependentNames = record.dependents.map(depId => {
          const plane = planes.find(p => p.id === depId);
          return plane?.displayName || depId;
        }).join(', ');
        
        return (
          <Tooltip title={`被依赖平面: ${dependentNames || '无'}`}>
            <Tag color={count > 2 ? 'red' : count > 0 ? 'green' : 'default'}>
              {count}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: '复杂度分数',
      dataIndex: 'complexityScore',
      key: 'complexityScore',
      render: (score: number) => (
        <Text strong style={{ color: score >= 8 ? '#ff4d4f' : score >= 4 ? '#faad14' : '#52c41a' }}>
          {score}
        </Text>
      ),
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      render: (riskLevel: string) => (
        <Tag 
          color={getRiskColor(riskLevel)} 
          icon={getRiskIcon(riskLevel)}
        >
          {riskLevel === 'high' ? '高风险' : riskLevel === 'medium' ? '中风险' : '低风险'}
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
          <span>平面依赖复杂度分析</span>
        </Space>
      }
      style={{ marginTop: 24 }}
    >
      {/* 统计概览 */}
      <div style={{ marginBottom: 16, padding: '16px', background: '#fafafa', borderRadius: '6px' }}>
        <Space size="large">
          <div>
            <Text type="secondary">总复杂度: </Text>
            <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>{totalComplexity}</Text>
          </div>
          <div>
            <Text type="secondary">高风险平面: </Text>
            <Text strong style={{ fontSize: '16px', color: '#ff4d4f' }}>{highRiskCount}</Text>
          </div>
          <div>
            <Text type="secondary">中风险平面: </Text>
            <Text strong style={{ fontSize: '16px', color: '#faad14' }}>{mediumRiskCount}</Text>
          </div>
          <div>
            <Text type="secondary">最大依赖数: </Text>
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
          * 复杂度分数 = 依赖数量 × 2 + 被依赖数量 | 
          高风险(≥8分) 中风险(4-7分) 低风险(&lt;4分)
        </Text>
      </div>
    </Card>
  );
};

export default PlaneDependencyAnalysis;
