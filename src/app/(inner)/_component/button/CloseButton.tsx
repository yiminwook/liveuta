import { MouseEvent } from 'react';
import { GrClose } from 'react-icons/gr';
import closeButton from './closeButton.module.scss';
import cx from 'classnames';

interface CloseButtonProps {
  className?: string;
  onClick: (e: MouseEvent) => void;
  size?: string;
}

export default function CloseButton({
  className = '',
  onClick,
  size = '1.5rem',
}: CloseButtonProps) {
  return (
    <button className={cx(closeButton['wrap'], className)} onClick={onClick}>
      <span className="blind">닫기</span>
      <GrClose size={size} color="inherit" />
    </button>
  );
}
