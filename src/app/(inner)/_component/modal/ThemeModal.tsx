'use client';
import Modal from './Modal';
import { MouseEvent } from 'react';
import themeModal from './themeModal.module.scss';
import useTheme from '@/hook/useTheme';
import { ThemeType } from '@/type';
import { gtagClick } from '@inner/_lib/gtag';
import portal from '@/model/portal';

interface ThemeModalButtonProps {
  primaryColor: string;
  secondaryColor: string;
}

function ThemeModalButton({ primaryColor, secondaryColor }: ThemeModalButtonProps) {
  return (
    <div className={themeModal['theme-modal-button']}>
      <div className={themeModal['primary']} style={{ backgroundColor: primaryColor }}>
        <div className={themeModal['secondary']} style={{ backgroundColor: secondaryColor }}></div>
      </div>
    </div>
  );
}

interface ThemeModalProps {
  onClose: () => void;
}

export default portal('themeModal', function ThemeModal({ onClose }: ThemeModalProps) {
  const { setTheme } = useTheme();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const button = target.closest('button');
    const selectedTheme = button?.dataset.theme as ThemeType | undefined;
    if (selectedTheme === undefined) return;

    gtagClick({
      target: 'themeModal',
      content: selectedTheme,
      detail: selectedTheme,
      action: 'themeChange',
    });

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
            <ThemeModalButton primaryColor="#c9f5d9" secondaryColor="#fada28" />
          </button>
          <button data-theme="theme3">
            {/* <ThemeModalButton primaryColor="#dbf0f9" secondaryColor="#ffc0cb" /> */}
            <ThemeModalButton primaryColor="#dbf0f9" secondaryColor="#f8570c" />
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
});
