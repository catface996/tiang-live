import React from 'react';
import { Modal, Descriptions, Tag, Space, Rate, Typography, Card, Row, Col, Button } from 'antd';
import { StarOutlined, CopyOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store';

const { Text } = Typography;

// 完美适配暗色主题的详情Modal样式
const StyledModal = styled(Modal)<{ $isDark: boolean }>`
  .ant-modal-content {
    background: ${props => (props.$isDark ? '#1f1f1f' : '#ffffff')};
    border: ${props => (props.$isDark ? '1px solid #303030' : '1px solid #d9d9d9')};
  }

  .ant-modal-header {
    background: ${props => (props.$isDark ? '#1f1f1f' : '#ffffff')};
    border-bottom: ${props => (props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0')};

    .ant-modal-title {
      color: ${props => (props.$isDark ? '#ffffff' : '#000000')};
    }
  }

  .ant-modal-body {
    background: ${props => (props.$isDark ? '#1f1f1f' : '#ffffff')};
    padding: 24px;
  }

  .ant-modal-footer {
    background: ${props => (props.$isDark ? '#1f1f1f' : '#ffffff')};
    border-top: ${props => (props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0')};
  }
`;

// 完美适配暗色主题的Descriptions样式
const StyledDescriptions = styled(Descriptions)<{ $isDark: boolean }>`
  &.ant-descriptions-bordered {
    .ant-descriptions-item-label {
      background: ${props => (props.$isDark ? '#262626' : '#fafafa')};
      color: ${props => (props.$isDark ? '#ffffff' : '#000000d9')};
      border-color: ${props => (props.$isDark ? '#303030' : '#f0f0f0')};
    }

    .ant-descriptions-item-content {
      background: ${props => (props.$isDark ? '#1f1f1f' : '#ffffff')};
      color: ${props => (props.$isDark ? '#ffffff' : '#000000d9')};
      border-color: ${props => (props.$isDark ? '#303030' : '#f0f0f0')};
    }

    .ant-descriptions-view {
      border-color: ${props => (props.$isDark ? '#303030' : '#f0f0f0')};
    }
  }
`;

// 完美适配暗色主题的Card样式
const StyledCard = styled(Card)<{ $isDark: boolean }>`
  background: ${props => (props.$isDark ? '#1f1f1f' : '#ffffff')};
  border-color: ${props => (props.$isDark ? '#303030' : '#d9d9d9')};

  .ant-card-head {
    background: ${props => (props.$isDark ? '#262626' : '#fafafa')};
    border-bottom-color: ${props => (props.$isDark ? '#303030' : '#f0f0f0')};

    .ant-card-head-title {
      color: ${props => (props.$isDark ? '#ffffff' : '#000000d9')};
    }
  }

  .ant-card-body {
    background: ${props => (props.$isDark ? '#1f1f1f' : '#ffffff')};
    color: ${props => (props.$isDark ? '#ffffff' : '#000000d9')};
  }
`;

// 完美适配暗色主题的PromptContent样式
const PromptContent = styled.div<{ $isDark: boolean }>`
  background: ${props => (props.$isDark ? '#0d1117' : '#f6f8fa')};
  border: ${props => (props.$isDark ? '1px solid #30363d' : '1px solid #e1e4e8')};
  border-radius: 6px;
  padding: 16px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'SF Mono', 'Consolas', 'Liberation Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  max-height: 300px;
  overflow-y: auto;
  color: ${props => (props.$isDark ? '#e6edf3' : '#24292f')};

  /* 滚动条样式 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => (props.$isDark ? '#161b22' : '#f1f3f4')};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => (props.$isDark ? '#484f58' : '#c1c1c1')};
    border-radius: 4px;

    &:hover {
      background: ${props => (props.$isDark ? '#656c76' : '#a8a8a8')};
    }
  }

  /* 代码高亮效果 */
  .variable {
    color: ${props => (props.$isDark ? '#79c0ff' : '#0969da')};
    font-weight: 600;
  }

  .keyword {
    color: ${props => (props.$isDark ? '#ff7b72' : '#cf222e')};
    font-weight: 600;
  }
`;

interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  content: string;
  difficulty: string;
  language: string;
  rating: number;
  usageCount: number;
  version: string;
  isPublic: boolean;
  isFavorite: boolean;
  createdBy: string;
  createdAt: string;
  lastUsed: string;
  variables: string[];
  tags: string[];
}

interface PromptDetailModalProps {
  visible: boolean;
  selectedPrompt: PromptTemplate | null;
  onCancel: () => void;
  onCopyPrompt: (prompt: PromptTemplate) => void;
  categoryMap: any;
  difficultyMap: any;
  getCategoryKey: (category: string) => string;
}

const PromptDetailModal: React.FC<PromptDetailModalProps> = ({
  visible,
  selectedPrompt,
  onCancel,
  onCopyPrompt,
  categoryMap,
  difficultyMap,
  getCategoryKey
}) => {
  const { t } = useTranslation(['prompts', 'common']);
  const { currentTheme } = useAppSelector(state => state.theme);
  const isDark = currentTheme === 'dark';

  // 处理内容高亮显示
  const highlightContent = (content: string) => {
    if (!content) return content;

    // 高亮变量 {{variable}}
    let highlighted = content.replace(/\{\{([^}]+)\}\}/g, '<span class="variable">{{$1}}</span>');

    // 高亮关键词
    const keywords = ['请', '帮助', '分析', '总结', '生成', '创建', '优化', '改进'];
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'g');
      highlighted = highlighted.replace(regex, '<span class="keyword">$1</span>');
    });

    return highlighted;
  };

  return (
    <StyledModal
      $isDark={isDark}
      title={selectedPrompt?.name}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
      style={{ top: 20 }}
      destroyOnHidden
    >
      {selectedPrompt && (
        <div>
          {/* 基本信息 */}
          <StyledDescriptions $isDark={isDark} bordered column={2} style={{ marginBottom: 24 }}>
            <Descriptions.Item label={t('prompts:detail.templateName')} span={2}>
              {selectedPrompt.name}
            </Descriptions.Item>
            <Descriptions.Item label={t('prompts:detail.category')}>
              <Tag
                color={categoryMap[selectedPrompt.category as keyof typeof categoryMap]?.color}
                icon={categoryMap[selectedPrompt.category as keyof typeof categoryMap]?.icon}
              >
                {t(`prompts:categories.${getCategoryKey(selectedPrompt.category)}`)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label={t('prompts:detail.difficulty')}>
              <Tag color={difficultyMap[selectedPrompt.difficulty]?.color}>
                {t(`prompts:difficulty.${selectedPrompt.difficulty}`)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label={t('prompts:detail.rating')}>
              <Space>
                <Rate disabled value={selectedPrompt.rating} allowHalf />
                <Text style={{ color: isDark ? '#ffffff' : '#000000d9' }}>{selectedPrompt.rating}</Text>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={t('prompts:detail.usageCount')}>
              {selectedPrompt.usageCount}
              {t('common:unit.times')}
            </Descriptions.Item>
            <Descriptions.Item label={t('prompts:detail.language')}>{selectedPrompt.language}</Descriptions.Item>
            <Descriptions.Item label={t('prompts:detail.version')}>{selectedPrompt.version}</Descriptions.Item>
            <Descriptions.Item label={t('prompts:detail.status')}>
              <Space>
                {selectedPrompt.isPublic && <Tag color="blue">{t('prompts:status.public')}</Tag>}
                {selectedPrompt.isFavorite && (
                  <Tag color="gold" icon={<StarOutlined />}>
                    {t('prompts:status.favorite')}
                  </Tag>
                )}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={t('prompts:detail.creator')}>{selectedPrompt.createdBy}</Descriptions.Item>
            <Descriptions.Item label={t('prompts:detail.createdAt')}>{selectedPrompt.createdAt}</Descriptions.Item>
            <Descriptions.Item label={t('prompts:detail.lastUsed')}>{selectedPrompt.lastUsed}</Descriptions.Item>
            <Descriptions.Item label={t('prompts:detail.description')} span={2}>
              {selectedPrompt.description}
            </Descriptions.Item>
          </StyledDescriptions>

          {/* 提示词内容 */}
          <StyledCard $isDark={isDark} title={t('prompts:detail.content')} style={{ marginBottom: 16 }}>
            <PromptContent
              $isDark={isDark}
              dangerouslySetInnerHTML={{
                __html: highlightContent(selectedPrompt.content)
              }}
            />
            <div style={{ marginTop: 12, textAlign: 'right' }}>
              <Button
                icon={<CopyOutlined />}
                onClick={() => onCopyPrompt(selectedPrompt)}
                style={{
                  color: isDark ? '#ffffff' : '#000000d9',
                  borderColor: isDark ? '#303030' : '#d9d9d9',
                  background: isDark ? '#262626' : '#ffffff'
                }}
              >
                {t('prompts:actions.copy')}
              </Button>
            </div>
          </StyledCard>

          {/* 变量和标签 */}
          <Row gutter={16}>
            <Col span={12}>
              <StyledCard $isDark={isDark} title={t('prompts:detail.variablesList')} size="small">
                {selectedPrompt.variables.length > 0 ? (
                  <Space wrap>
                    {selectedPrompt.variables.map(variable => (
                      <Tag key={variable} color="blue">
                        {`{${variable}}`}
                      </Tag>
                    ))}
                  </Space>
                ) : (
                  <Text type="secondary" style={{ color: isDark ? '#8c8c8c' : '#00000073' }}>
                    {t('prompts:detail.noVariables')}
                  </Text>
                )}
              </StyledCard>
            </Col>
            <Col span={12}>
              <StyledCard $isDark={isDark} title={t('prompts:detail.tags')} size="small">
                <Space wrap>
                  {selectedPrompt.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Space>
              </StyledCard>
            </Col>
          </Row>
        </div>
      )}
    </StyledModal>
  );
};

export default PromptDetailModal;
