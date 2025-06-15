import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Card, Spin } from 'antd';
import styled from 'styled-components';

const DiagramContainer = styled.div`
  .mermaid {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    
    svg {
      max-width: 100%;
      height: auto;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

interface MermaidDiagramProps {
  chart: string;
  title?: string;
  loading?: boolean;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ 
  chart, 
  title,
  loading = false 
}) => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [isRendering, setIsRendering] = React.useState(true);

  useEffect(() => {
    // 初始化Mermaid配置
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'Arial, sans-serif',
      fontSize: 14,
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        mirrorActors: true,
        bottomMarginAdj: 1,
        useMaxWidth: true,
        rightAngles: false,
        showSequenceNumbers: false,
      },
    });
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!mermaidRef.current || !chart) return;

      setIsRendering(true);
      
      try {
        // 清空之前的内容
        mermaidRef.current.innerHTML = '';
        
        // 生成唯一ID
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // 渲染图表
        const { svg } = await mermaid.render(id, chart);
        
        // 插入SVG
        mermaidRef.current.innerHTML = svg;
        
        setIsRendering(false);
      } catch (error) {
        console.error('Mermaid渲染错误:', error);
        mermaidRef.current.innerHTML = `
          <div style="text-align: center; color: #ff4d4f; padding: 20px;">
            <p>时序图渲染失败</p>
            <p style="font-size: 12px; color: #999;">请检查时序图语法</p>
          </div>
        `;
        setIsRendering(false);
      }
    };

    renderDiagram();
  }, [chart]);

  if (loading || isRendering) {
    return (
      <Card title={title}>
        <LoadingContainer>
          <Spin size="large" tip="正在渲染时序图..." />
        </LoadingContainer>
      </Card>
    );
  }

  return (
    <Card title={title}>
      <DiagramContainer>
        <div ref={mermaidRef} className="mermaid" />
      </DiagramContainer>
    </Card>
  );
};

export default MermaidDiagram;
