import React from 'react';
import { Button, Tooltip } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleTheme } from '../../store/slices/themeSlice';
import { useTranslation } from 'react-i18next';

interface ThemeToggleProps {
  style?: React.CSSProperties;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ style }) => {
  const { t } = useTranslation(['theme', 'common']);
  const dispatch = useAppDispatch();
  const { currentTheme } = useAppSelector((state) => state.theme);
  
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Tooltip title={currentTheme === 'light' ? t('theme:switchToDark') : t('theme:switchToLight')}>
      <Button
        type="text"
        icon={currentTheme === 'light' ? <BulbOutlined /> : <BulbFilled />}
        onClick={handleToggleTheme}
        style={style}
        aria-label={t('theme:toggle')}
      />
    </Tooltip>
  );
};

export default ThemeToggle;
