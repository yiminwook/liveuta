'use client';
import { useDarkModeStorage } from '@/hooks/useLocalStorage';
import { darkModeStorage } from '@/models/darkModeLocalStorage';
import { memo } from 'react';
import ToggleButton from '@/components/common/button/ToggleButton';
import darkModeButton from '@/components/common/button/DarkModeButton.module.scss';

const DarkModeButton = () => {
  const { isDarkMode, mutateDarkMode } = useDarkModeStorage();

  const handleDarkMode = async () => {
    darkModeStorage.toggleDarkMode();
    mutateDarkMode();
  };

  return (
    <ToggleButton
      className={darkModeButton['darkModeButton']}
      toggled={isDarkMode}
      onChange={handleDarkMode}
      alt="다크모드 온오프 버튼"
    />
  );
};

export default memo(DarkModeButton);
