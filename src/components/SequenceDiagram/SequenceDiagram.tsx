import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Card, Spin } from 'antd';
import styled from 'styled-components';

const SequenceDiagramContainer = styled.div`
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

interface SequenceDiagramProps {
  chart: string;
  title?: string;
  loading?: boolean;
}

const SequenceDiagram: React.FC<SequenceDiagramProps> = ({ 
  chart, 
  title,
  loading = false 
}) => {
  const sequenceDiagramRef = useRef<HTMLDivElement>(null);
  const [isRendering, setIsRendering] = React.useState(false);

  useEffect(() => {
    // 初始化Mermaid配置，专门针对时序图优化
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
    const renderSequenceDiagram = async () => {
      // 如果没有图表内容，直接返回不渲染
      if (!chart || !chart.trim()) {
        console.log('时序图: 没有图表内容');
        setIsRendering(false);
        return;
      }

      // 如果DOM元素还没准备好，等待下一次渲染
      if (!sequenceDiagramRef.current) {
        console.log('时序图: DOM元素未准备好');
        setIsRendering(false);
        return;
      }

      console.log('时序图: 开始渲染', chart.substring(0, 50) + '...');
      setIsRendering(true);
      
      try {
        // 清空之前的内容
        sequenceDiagramRef.current.innerHTML = '';
        
        // 生成唯一ID
        const id = `sequence-diagram-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // 渲染时序图
        console.log('时序图: 调用mermaid.render');
        const { svg } = await mermaid.render(id, chart);
        console.log('时序图: 渲染成功');
        
        // 插入SVG
        if (sequenceDiagramRef.current) {
          sequenceDiagramRef.current.innerHTML = svg;
        }
        
        setIsRendering(false);
      } catch (error) {
        console.error('时序图渲染错误:', error);
        if (sequenceDiagramRef.current) {
          sequenceDiagramRef.current.innerHTML = `
            <div style="text-align: center; color: #ff4d4f; padding: 20px;">
              <p>时序图渲染失败</p>
              <p style="font-size: 12px; color: #999;">请检查时序图语法</p>
              <details style="margin-top: 10px; text-align: left;">
                <summary style="cursor: pointer;">错误详情</summary>
                <pre style="font-size: 10px; color: #666; margin-top: 5px;">${error}</pre>
              </details>
            </div>
          `;
        }
        setIsRendering(false);
      }
    };

    // 添加延迟确保DOM已经准备好
    const timer = setTimeout(() => {
      renderSequenceDiagram();
    }, 100);

    return () => clearTimeout(timer);
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
      <SequenceDiagramContainer>
        <div ref={sequenceDiagramRef} className="mermaid" />
      </SequenceDiagramContainer>
    </Card>
  );
};

export default SequenceDiagram;
