'use client';
import { CSSProperties, ReactNode, useEffect } from 'react';
import modal from './modal.module.scss';
import CloseButton from '../button/CloseButton';
import useStopPropagation from '@/hook/useStopPropagation';
import { RemoveScroll } from 'react-remove-scroll';
import Backdrop from '../Backdrop';
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook';

interface ModalProps {
  id: string;
  children: ReactNode;
  style?: CSSProperties;
  onClose: () => void;
}

const Modal = ({ id, children, style, onClose }: ModalProps) => {
  const { stopPropagation } = useStopPropagation();
  const { enableScope, disableScope } = useHotkeysContext();

  useHotkeys(
    'esc',
    (e) => {
      e.stopPropagation();
      onClose();
    },
    {
      scopes: id,
    },
  );

  useHotkeys('space', (e) => {}, {
    preventDefault: true,
    scopes: id,
  });

  useEffect(() => {
    enableScope(id);
    return () => disableScope(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RemoveScroll removeScrollBar={false}>
      <Backdrop activeParticles={true} />
      <div className={modal['container']} onClick={onClose}>
        <div className={modal['modal']} style={style} onClick={stopPropagation}>
          <CloseButton className={modal['close-button']} onClick={onClose} />
          <div className={modal['inner']}>{children}</div>
        </div>
      </div>
    </RemoveScroll>
  );
};

export default Modal;
