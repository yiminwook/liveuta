import { CSSProperties, MouseEvent, ReactNode } from 'react';
import modal from '@/styles/layout/Modal.module.scss';
import { FaWindowClose } from 'react-icons/fa';
import useStopPropagation from '@/hooks/useStopPropagation';

interface ModalProps {
  children: ReactNode;
  style?: CSSProperties;
  onClose: (e: MouseEvent) => void;
}
const Modal = ({ children, style, onClose }: ModalProps) => {
  const { stopPropagation } = useStopPropagation();
  return (
    <div className={modal['container']} onClick={onClose}>
      <div className={modal['modal']} style={style} onClick={stopPropagation}>
        <button className={modal['close']} onClick={onClose}>
          <FaWindowClose color={'inherit'} size={'2rem'} />
        </button>
        <div className={modal['inner']}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
