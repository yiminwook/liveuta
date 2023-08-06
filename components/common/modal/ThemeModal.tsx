'use client';

import Modal from '@/components/layout/modal/Modal';
import { useTheme } from '@/configs/ThemeProvider';
import { MouseEvent } from 'react';
import themeModal from '@/components/common/modal/ThemeModal.module.scss';

interface ThemeModalButtonProps {
  primaryColor: string;
  secondaryColor: string;
}

const ThemeModalButton = ({ primaryColor, secondaryColor }: ThemeModalButtonProps) => {
  return (
    <div className={themeModal['theme-modal-button']}>
      <div className={themeModal['primary']} style={{ backgroundColor: primaryColor }}>
        <div className={themeModal['secondary']} style={{ backgroundColor: secondaryColor }}></div>
      </div>
    </div>
  );
};

interface ThemeModalProps {
  onClose: (e: MouseEvent) => void;
}

const ThemeModal = ({ onClose }: ThemeModalProps) => {
  const { setTheme } = useTheme();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const button = target.closest('button');
    const selectedTheme = button?.dataset.theme || 'theme1';
    setTheme(selectedTheme);
  };

  return (
    <Modal onClose={onClose}>
      <div className={themeModal['wrap']}>
        <h2>테마를 선택 해주세요</h2>
        <div className={themeModal['button-area']} onClick={handleClick}>
          <button data-theme="theme1">
            <ThemeModalButton primaryColor="#ffc1cc" secondaryColor="#ed4463" />
          </button>
          <button data-theme="theme2">
            <ThemeModalButton primaryColor="#c9f5d9" secondaryColor="#1fb25f" />
          </button>
          <button data-theme="theme3">
            <ThemeModalButton primaryColor="#dbf0f9" secondaryColor="#ffc0cb" />
          </button>
          <button data-theme="theme4">
            <ThemeModalButton primaryColor="#152238" secondaryColor="#ffd700" />
          </button>
          <button data-theme="theme5">
            <ThemeModalButton primaryColor="#010b13" secondaryColor="#cc2444" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ThemeModal;
