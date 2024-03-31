import { CSSProperties, ReactNode, useEffect } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import Backdrop from '../Backdrop';
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook';
import { Dialog, DialogOpenChangeDetails } from '@ark-ui/react';
import { GrClose } from 'react-icons/gr';
import * as styles from './modal.css';
import OutsideClickHandler from 'react-outside-click-handler';

interface ModalProps {
  id: string;
  title?: string;
  children: ReactNode;
  style?: CSSProperties;
  onClose: (e?: any) => void;
}

const Modal = ({ id, children, title, onClose }: ModalProps) => {
  const { enableScope, disableScope, enabledScopes } = useHotkeysContext();

  useHotkeys('esc', onClose, {
    enabled: enabledScopes.at(-1) === id,
    preventDefault: true,
    scopes: [id],
  });

  useHotkeys('space', (e) => {}, {
    preventDefault: true,
    scopes: [id],
  });

  useEffect(() => {
    enableScope(id);
    return () => disableScope(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = ({ open }: DialogOpenChangeDetails) => {
    if (!open) onClose(open);
  };

  return (
    <RemoveScroll removeScrollBar={false}>
      <Dialog.Root
        id={id}
        open={true}
        onOpenChange={handleClose}
        unmountOnExit={true}
        preventScroll={false}
        closeOnInteractOutside={false}
        closeOnEscapeKeyDown={false}
      >
        <Backdrop activeParticles={false} />
        <OutsideClickHandler onOutsideClick={onClose}>
          <Dialog.Positioner className={styles.position}>
            <Dialog.Content className={styles.content}>
              {title && <Dialog.Title className={styles.title}>{title}</Dialog.Title>}
              <Dialog.Description className={styles.desc}>{children}</Dialog.Description>
              <Dialog.CloseTrigger className={styles.closeTrigger} onClick={onClose}>
                <GrClose size="1.5rem" color="inherit" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </OutsideClickHandler>
      </Dialog.Root>
    </RemoveScroll>
  );
};

export default Modal;
