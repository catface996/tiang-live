import React from 'react';
import { Dropdown, Button, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { languageConfig, type SupportedLanguage } from '../../i18n';
import type { MenuProps } from 'antd';

const LanguageButton = styled(Button)`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  color: var(--text-color);
  padding: 4px 8px;
  height: auto;
  
  &:hover {
    background: var(--menu-item-hover-bg);
    color: var(--primary-color);
  }
  
  &:focus {
    background: var(--menu-item-hover-bg);
    color: var(--primary-color);
  }
  
  .anticon {
    font-size: 16px;
  }
`;

const LanguageText = styled.span`
  margin-left: 6px;
  font-size: 14px;
  font-weight: 400;
`;

const LanguageItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0;
  min-width: 120px;
`;

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n, t } = useTranslation();
  
  const currentLanguage = i18n.language as SupportedLanguage;
  const currentLangConfig = languageConfig[currentLanguage] || languageConfig['zh-CN'];

  const handleLanguageChange = (language: SupportedLanguage) => {
    i18n.changeLanguage(language);
  };

  const menuItems: MenuProps['items'] = Object.entries(languageConfig).map(([code, config]) => ({
    key: code,
    label: (
      <LanguageItem>
        <span>{config.nativeName}</span>
      </LanguageItem>
    ),
    onClick: () => handleLanguageChange(code as SupportedLanguage),
  }));

  return (
    <Dropdown
      menu={{ items: menuItems }}
      placement="bottomRight"
      trigger={['click']}
      className={className}
    >
      <LanguageButton>
        <Space size={4}>
          <GlobalOutlined />
          <LanguageText>{currentLangConfig.nativeName}</LanguageText>
        </Space>
      </LanguageButton>
    </Dropdown>
  );
};

export default LanguageSwitcher;
