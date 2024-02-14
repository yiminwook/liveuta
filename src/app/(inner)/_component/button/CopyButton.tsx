'use client';
import { clipText } from '@inner/_lib/windowEvent';
import { CSSProperties, MouseEvent } from 'react';
import { FaCopy } from 'react-icons/fa';
import useToast from '@/hook/useToast';
import { gtagClick } from '@inner/_lib/gtag';
import cx from 'classnames';
import * as styles from './copyButton.css';

interface CopyButtonProps {
  value: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
}

/** value 복사할 값 */
export default function CopyButton({ value, size = '2rem', className, style }: CopyButtonProps) {
  const toast = useToast();

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    clipText(value);
    gtagClick({
      target: 'copyButton',
      content: 'copyButton',
      detail: value,
      action: 'copy',
    });
    toast.success({ text: '복사되었습니다.' });
  };

  return (
    <button className={cx(styles.button, className)} onClick={onClick} style={style}>
      <FaCopy size={size} color="inherit" />
    </button>
  );
}
