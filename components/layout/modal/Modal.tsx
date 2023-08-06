import { CSSProperties, MouseEvent, ReactNode } from 'react';
import modal from '@/components/layout/modal/Modal.module.scss';
import { FaWindowClose } from 'react-icons/fa';
import useStopPropagation from '@/hooks/useStopPropagation';
import ModalPortal from '@/components/layout/modal/ModalPortal';

interface ModalProps {
  children: ReactNode;
  style?: CSSProperties;
  onClose: (e: MouseEvent) => void;
}

const Modal = ({ children, style, onClose }: ModalProps) => {
  const { stopPropagation } = useStopPropagation();
  return (
    <ModalPortal>
      <div className={modal['container']} onClick={onClose}>
        <div className={modal['modal']} style={style} onClick={stopPropagation}>
          <button className={modal['close']} onClick={onClose}>
            <FaWindowClose color={'inherit'} size={'2rem'} />
          </button>
          <div className={modal['inner']}>{children}</div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
