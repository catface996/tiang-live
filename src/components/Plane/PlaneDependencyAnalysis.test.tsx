import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';
import { store } from '../../store';
import { lightTheme, darkTheme } from '../../styles/theme';
import PlaneDependencyAnalysis from './PlaneDependencyAnalysis';
import type { PlaneDefinition, PlaneRelationship } from '../../types';

// Mock data
const mockPlanes: PlaneDefinition[] = [
  {
    id: 'plane-1',
    displayName: '基础设施平面',
    level: 1,
    dependencies: [],
    description: '基础设施层'
  },
  {
    id: 'plane-2', 
    displayName: '平台服务平面',
    level: 2,
    dependencies: ['plane-1'],
    description: '平台服务层'
  },
  {
    id: 'plane-3',
    displayName: '业务系统平面',
    level: 3,
    dependencies: ['plane-1', 'plane-2'],
    description: '业务系统层'
  }
];

const mockRelationships: PlaneRelationship[] = [
  {
    id: 'rel-1',
    sourceId: 'plane-2',
    targetId: 'plane-1',
    type: 'dependency'
  },
  {
    id: 'rel-2',
    sourceId: 'plane-3',
    targetId: 'plane-1',
    type: 'dependency'
  },
  {
    id: 'rel-3',
    sourceId: 'plane-3',
    targetId: 'plane-2',
    type: 'dependency'
  }
];

const TestWrapper: React.FC<{ 
  children: React.ReactNode; 
  theme?: 'light' | 'dark' 
}> = ({ children, theme = 'light' }) => {
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider>
          <ThemeProvider theme={currentTheme}>
            {children}
          </ThemeProvider>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe('PlaneDependencyAnalysis', () => {
  it('renders correctly in light theme', () => {
    render(
      <TestWrapper theme="light">
        <PlaneDependencyAnalysis 
          planes={mockPlanes} 
          relationships={mockRelationships} 
        />
      </TestWrapper>
    );
    
    expect(screen.getByText('平面依赖复杂度分析')).toBeInTheDocument();
    expect(screen.getByText('基础设施平面')).toBeInTheDocument();
    expect(screen.getByText('平台服务平面')).toBeInTheDocument();
    expect(screen.getByText('业务系统平面')).toBeInTheDocument();
  });

  it('renders correctly in dark theme', () => {
    render(
      <TestWrapper theme="dark">
        <PlaneDependencyAnalysis 
          planes={mockPlanes} 
          relationships={mockRelationships} 
        />
      </TestWrapper>
    );
    
    expect(screen.getByText('平面依赖复杂度分析')).toBeInTheDocument();
    expect(screen.getByText('基础设施平面')).toBeInTheDocument();
  });

  it('calculates complexity scores correctly', () => {
    render(
      <TestWrapper>
        <PlaneDependencyAnalysis 
          planes={mockPlanes} 
          relationships={mockRelationships} 
        />
      </TestWrapper>
    );
    
    // 业务系统平面应该有最高的复杂度分数 (2个依赖 * 2 + 0个被依赖 = 4)
    // 基础设施平面应该有被依赖分数 (0个依赖 * 2 + 2个被依赖 = 2)
    expect(screen.getByText('4')).toBeInTheDocument(); // 业务系统平面复杂度
    expect(screen.getByText('2')).toBeInTheDocument(); // 基础设施平面复杂度
  });

  it('displays risk levels correctly', () => {
    render(
      <TestWrapper>
        <PlaneDependencyAnalysis 
          planes={mockPlanes} 
          relationships={mockRelationships} 
        />
      </TestWrapper>
    );
    
    // 应该显示风险等级标签
    expect(screen.getByText('低风险')).toBeInTheDocument();
    expect(screen.getByText('中等风险')).toBeInTheDocument();
  });
});
