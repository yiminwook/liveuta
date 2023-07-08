'use client';
import { useDarkModeStorage } from '@/hooks/useLocalStorage';
import { darkModeStorage } from '@/models/darkModeLocalStorage';
import DarkModeToggle from 'react-dark-mode-toggle';

interface DarkModeButtonProps {
  className?: string;
}

const DarkModeButton = ({ className }: DarkModeButtonProps) => {
  const { isDarkMode, mutateDarkMode } = useDarkModeStorage();

  const onChange = async () => {
    darkModeStorage.toggleDarkMode();
    mutateDarkMode();
  };

  return <DarkModeToggle className={className} onChange={onChange} checked={isDarkMode} size={50} />;
};

export default DarkModeButton;
