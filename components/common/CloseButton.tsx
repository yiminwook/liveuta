import { MouseEvent } from 'react';
import { FaWindowClose } from 'react-icons/fa';

interface CloseButtonProps {
  className: string;
  onClose: () => void;
  size?: string;
}

const CloseButton = ({ className, onClose, size = '2rem' }: CloseButtonProps) => {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <button className={className} onClick={onClick}>
      <span className="blind">닫기</span>
      <FaWindowClose size={size} color="inherit" />
    </button>
  );
};

export default CloseButton;
