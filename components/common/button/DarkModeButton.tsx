'use client';
import { useDarkModeStorage } from '@/hooks/useLocalStorage';
import { darkModeStorage } from '@/models/darkModeLocalStorage';
import { memo } from 'react';
import ToggleButton from '@/components/common/button/ToggleButton';

interface DarkModeButtonProps {
  className?: string;
}

const DarkModeButton = ({ className }: DarkModeButtonProps) => {
  const { isDarkMode, mutateDarkMode } = useDarkModeStorage();

  const handleDarkMode = async () => {
    darkModeStorage.toggleDarkMode();
    mutateDarkMode();
  };

  return <ToggleButton toggled={isDarkMode} onChange={handleDarkMode} alt="다크모드 온오프 버튼" />;
};

export default memo(DarkModeButton);
