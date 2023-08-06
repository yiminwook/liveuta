'use client';

import { memo, useState } from 'react';
import themeButton from '@/components/common/button/ThemeButton.module.scss';
import ThemeModal from '@/components/common/modal/ThemeModal';
import { RiBrushLine } from 'react-icons/ri';
import { combineClassName } from '@/utils/combineClassName';

interface ThemeButtonProps {
  className?: string;
  size?: string;
}

const ThemeButton = ({ className = '', size = '1.5rem' }: ThemeButtonProps) => {
  const [showThemeModal, setShowThemeModal] = useState(false);

  const openThemeModal = () => setShowThemeModal(true);
  const closeThemeModal = () => setShowThemeModal(false);

  return (
    <>
      <button onClick={openThemeModal} className={combineClassName(themeButton['wrap'], className)}>
        <RiBrushLine color="inherit" size={size} />
      </button>
      {showThemeModal ? <ThemeModal onClose={closeThemeModal} /> : null}
    </>
  );
};

export default memo(ThemeButton);
