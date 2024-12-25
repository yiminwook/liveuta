import { useTransition } from '@/hooks/useTransition';
import { ModalProps } from '@/stores/modal';
import { Button } from '@mantine/core';
import classNames from 'classnames';
import Modal from './Modal';
import css from './Modal.module.scss';

type ConfirmModalProp = {
  title?: string;
  message: string;
};

const CONFIRM_MODAL_ID = 'confirmModal';

export default function ConfirmModal({
  title = 'Confirm',
  message,
  onClose,
  onSuccess,
}: ModalProps<ConfirmModalProp>) {
  const { modifier, onAnimationEnd, exit } = useTransition();

  const onCloseWithExit = () => {
    exit(() => onClose());
  };

  const onSuccessWithExit = () => {
    exit(() => onSuccess(true));
  };

  return (
    <Modal
      id={CONFIRM_MODAL_ID}
      title={title}
      className={classNames(modifier)}
      onClose={onCloseWithExit}
      onAnimationEnd={onAnimationEnd}
      closeOnClickOutside={false}
    >
      <div className={css.content}>{message}</div>
      <div className={css.btnBox}>
        <Button variant="light" onClick={onCloseWithExit}>
          취소
        </Button>
        <Button onClick={onSuccessWithExit}>확인</Button>
      </div>
    </Modal>
  );
}
