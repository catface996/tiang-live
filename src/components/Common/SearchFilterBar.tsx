import React from 'react';
import { Row, Col, Input, Select, Button, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Search } = Input;
const { Option } = Select;

interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  
  // 过滤器配置
  filters?: {
    key: string;
    value: string;
    onChange: (value: string) => void;
    options: FilterOption[];
    placeholder?: string;
    width?: number;
  }[];
  
  // 操作按钮
  showRefresh?: boolean;
  onRefresh?: () => void;
  
  // 额外的操作按钮
  extraActions?: React.ReactNode;
  
  // 样式配置
  className?: string;
  style?: React.CSSProperties;
}

const FilterBar = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background: var(--card-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  
  .ant-input-search {
    .ant-input {
      background: var(--input-bg);
      border-color: var(--border-color);
      color: var(--text-color);
      
      &:hover {
        border-color: var(--primary-color);
      }
      
      &:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px var(--primary-color-fade);
      }
      
      &::placeholder {
        color: var(--text-secondary);
      }
    }
    
    .ant-input-search-button {
      background: transparent !important;
      border-color: var(--border-color) !important;
      color: var(--text-color) !important;
      
      &:hover {
        background: var(--button-hover-bg) !important;
        border-color: var(--primary-color) !important;
        color: var(--primary-color) !important;
      }
      
      .anticon {
        color: var(--text-color) !important;
      }
      
      &:hover .anticon {
        color: var(--primary-color) !important;
      }
    }
  }
  
  .ant-select {
    .ant-select-selector {
      background: var(--input-bg) !important;
      border-color: var(--border-color) !important;
      color: var(--text-color) !important;
      
      &:hover {
        border-color: var(--primary-color) !important;
      }
    }
    
    &.ant-select-focused .ant-select-selector {
      border-color: var(--primary-color) !important;
      box-shadow: 0 0 0 2px var(--primary-color-fade) !important;
    }
    
    .ant-select-selection-placeholder {
      color: var(--text-secondary) !important;
    }
    
    .ant-select-arrow {
      color: var(--text-secondary);
    }
  }
  
  .ant-btn {
    background: var(--button-bg);
    border-color: var(--border-color);
    color: var(--text-color);
    
    &:hover {
      background: var(--button-hover-bg);
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
  }
`;

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = '搜索...',
  filters = [],
  showRefresh = true,
  onRefresh,
  extraActions,
  className,
  style
}) => {
  return (
    <FilterBar className={className} style={style}>
      <Row gutter={16} align="middle">
        {/* 搜索框 */}
        <Col flex="auto">
          <Search
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            style={{ width: '100%' }}
            allowClear
            enterButton={<SearchOutlined />}
          />
        </Col>
        
        {/* 过滤器 */}
        {filters.map((filter) => (
          <Col key={filter.key}>
            <Select
              value={filter.value}
              onChange={filter.onChange}
              style={{ width: filter.width || 120 }}
              placeholder={filter.placeholder}
            >
              {filter.options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
        ))}
        
        {/* 操作按钮 */}
        <Col>
          <Space>
            {showRefresh && (
              <Button 
                icon={<ReloadOutlined />} 
                onClick={onRefresh}
                title="刷新"
              />
            )}
            {extraActions}
          </Space>
        </Col>
      </Row>
    </FilterBar>
  );
};

export default SearchFilterBar;
