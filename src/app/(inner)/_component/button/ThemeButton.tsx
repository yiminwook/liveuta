'use client';
import useModalStore from '@/hook/useModalStore';
import cx from 'classnames';
import { RiBrushLine } from 'react-icons/ri';
import ThemeModal from '../../../../../temp/ThemeModal';
import * as styles from './themeButton.css';

type ThemeButtonProps = {
  className?: string;
  size?: string;
};

export default function ThemeButton({ className, size = '1.5rem' }: ThemeButtonProps) {
  const modalStore = useModalStore();

  const openThemeModal = async () => {
    await modalStore.push(ThemeModal);
  };

  return (
    <button onClick={openThemeModal} className={cx(styles.button, className)}>
      <RiBrushLine color="inherit" size={size} />
    </button>
  );
}
