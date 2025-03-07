import { useTransition } from '@/hooks/useTransition';
import { ModalProps } from '@/stores/modal';
import { Button } from '@mantine/core';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Modal from './Modal';
import css from './Modal.module.scss';

type ErrorModalProp = {
  title?: string;
  error: Error;
};

const ERROR_MODAL_ID = 'errorModal';

export default function ErrorModal({
  title = 'Confirm',
  error,
  onClose,
}: ModalProps<ErrorModalProp>) {
  const t = useTranslations('global.modal.errorModal');
  const { modifier, onAnimationEnd, exit } = useTransition();

  const onCloseWithExit = () => {
    exit(() => onClose());
  };
  return (
    <Modal
      id={ERROR_MODAL_ID}
      title={title}
      className={classNames(modifier)}
      onClose={onCloseWithExit}
      onAnimationEnd={onAnimationEnd}
      closeOnClickOutside={false}
    >
      <div className={css.content}>{error.message}</div>
      <div className={css.btnBox}>
        <Button onClick={onCloseWithExit}>{t('confirm')}</Button>
      </div>
    </Modal>
  );
}
