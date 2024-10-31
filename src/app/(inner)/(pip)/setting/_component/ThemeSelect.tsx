'use client';
import { ThemeType } from '@/type';
import { gtagClick } from '@inner/_lib/gtag';
import { MouseEvent } from 'react';
import useTheme from '@/hook/useTheme';
import * as styles from './themeSelect.css';

type ThemeModalButtonProps = {
  primaryColor: string;
  secondaryColor: string;
};

function ThemeModalButton({ primaryColor, secondaryColor }: ThemeModalButtonProps) {
  return (
    <div className={styles.themeModalButton}>
      <div className={styles.primary} style={{ backgroundColor: primaryColor }}>
        <div className={styles.secondary} style={{ backgroundColor: secondaryColor }}></div>
      </div>
    </div>
  );
}

export default function ThemeSelect() {
  const { setTheme } = useTheme();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const button = target.closest('button');
    const selectedTheme = button?.dataset.theme as ThemeType | undefined;
    if (selectedTheme === undefined) return;

    gtagClick({
      target: 'themeSelect',
      content: selectedTheme,
      detail: selectedTheme,
      action: 'themeChange',
    });

    setTheme(selectedTheme);
  };

  return (
    <div className={styles.wrap}>
      <label className={styles.label}>테마선택</label>
      <div className={styles.content} onClick={handleClick}>
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
  );
}
