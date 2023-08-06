'use client';

import { memo, useState } from 'react';
// import ToggleButton from '@/components/common/button/ToggleButton';
// import themeButton from '@/components/common/button/ThemeButton.module.scss';
import ThemeModal from '@/components/common/modal/ThemeModal';
import { RiBrushLine } from 'react-icons/ri';

const DarkModeButton = () => {
  const [showThemeModal, setShowThemeModal] = useState(false);

  const openThemeModal = () => setShowThemeModal(true);
  const closeThemeModal = () => setShowThemeModal(false);

  return (
    <>
      <button onClick={openThemeModal}>
        <RiBrushLine color="inherit" size="1.5rem" />
      </button>
      {showThemeModal ? <ThemeModal onClose={closeThemeModal} /> : null}
    </>
  );
};

export default memo(DarkModeButton);
