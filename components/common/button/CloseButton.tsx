import { MouseEvent } from 'react';
import { GrClose } from 'react-icons/gr';
import closeButton from '@/components/common/button/CloseButton.module.scss';
import { cx } from '@/utils';

interface CloseButtonProps {
  className?: string;
  onClose: (e: MouseEvent) => void;
  size?: string;
}

const CloseButton = ({ className = '', onClose, size = '1.5rem' }: CloseButtonProps) => {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClose(e);
  };

  return (
    <button className={cx(closeButton['wrap'], className)} onClick={onClick}>
      <span className="blind">닫기</span>
      <GrClose size={size} color="inherit" />
    </button>
  );
};

export default CloseButton;
