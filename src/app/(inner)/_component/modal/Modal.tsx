import { CSSProperties, ReactNode, useEffect } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import Backdrop from '../Backdrop';
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook';
import { Dialog, DialogOpenChangeDetails } from '@ark-ui/react';
import { GrClose } from 'react-icons/gr';
import * as styles from './modal.css';

interface ModalProps {
  id: string;
  title?: string;
  children: ReactNode;
  style?: CSSProperties;
  onClose: () => void;
}

const Modal = ({ id, children, title, onClose }: ModalProps) => {
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

  const handleClose = ({ open }: DialogOpenChangeDetails) => {
    if (!open) onClose();
  };

  return (
    <RemoveScroll removeScrollBar={false}>
      <Dialog.Root
        id={id}
        open={true}
        onOpenChange={handleClose}
        unmountOnExit={true}
        preventScroll={false}
        closeOnInteractOutside={true}
      >
        <Backdrop activeParticles={false} />
        <Dialog.Positioner className={styles.position}>
          <Dialog.Content className={styles.content}>
            {title && <Dialog.Title className={styles.title}>{title}</Dialog.Title>}
            <Dialog.Description className={styles.desc}>{children}</Dialog.Description>
            <Dialog.CloseTrigger className={styles.closeTrigger} onClick={onClose}>
              <GrClose size="1.5rem" color="inherit" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </RemoveScroll>
  );
};

export default Modal;
