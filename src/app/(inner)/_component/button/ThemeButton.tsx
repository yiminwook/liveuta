'use client';

import { useState } from 'react';
import themeButton from './themeButton.module.scss';
import ThemeModal from '../modal/ThemeModal';
import { RiBrushLine } from 'react-icons/ri';
import cx from 'classnames';

interface ThemeButtonProps {
  className?: string;
  size?: string;
}

export default function ThemeButton({ className, size = '1.5rem' }: ThemeButtonProps) {
  const [showThemeModal, setShowThemeModal] = useState(false);

  const openThemeModal = () => setShowThemeModal(true);
  const closeThemeModal = () => setShowThemeModal(false);

  return (
    <>
      <button onClick={openThemeModal} className={cx(themeButton['wrap'], className)}>
        <RiBrushLine color="inherit" size={size} />
      </button>
      {showThemeModal ? <ThemeModal onClose={closeThemeModal} /> : null}
    </>
  );
}
