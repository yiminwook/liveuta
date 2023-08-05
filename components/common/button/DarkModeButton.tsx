'use client';

import { memo } from 'react';
import ToggleButton from '@/components/common/button/ToggleButton';
import darkModeButton from '@/components/common/button/DarkModeButton.module.scss';
import { useTheme } from '@/components/layout/ThemeProvider';

const DarkModeButton = () => {
  const { currentTheme, setTheme } = useTheme();

  const handleDarkMode = () => {
    currentTheme === 'theme1' ? setTheme('theme2') : setTheme('theme1');
  };

  return (
    <ToggleButton
      className={darkModeButton['darkModeButton']}
      toggled={currentTheme === 'theme1'}
      onChange={handleDarkMode}
      alt="다크모드 온오프 버튼"
    />
  );
};

export default memo(DarkModeButton);
