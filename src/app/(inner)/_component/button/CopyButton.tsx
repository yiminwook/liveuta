'use client';
import { clipText } from '@inner/_lib/windowEvent';
import { CSSProperties, MouseEvent } from 'react';
import { FaCopy } from 'react-icons/fa';
import { gtagClick } from '@inner/_lib/gtag';
import cx from 'classnames';
import { toast } from 'sonner';

interface CopyButtonProps {
  value: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
}

/** value 복사할 값 */
export default function CopyButton({ value, size = '2rem', className, style }: CopyButtonProps) {
  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    clipText(value);
    gtagClick({
      target: 'copyButton',
      content: 'copyButton',
      detail: value,
      action: 'copy',
    });
    toast.success('복사되었습니다.');
  };

  return (
    <button className={cx(className)} onClick={onClick} style={style}>
      <FaCopy size={size} color="inherit" />
    </button>
  );
}
