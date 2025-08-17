import { useTransition } from '@/hooks/use-transition';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { ModalProps } from '@/stores/modal';
import { Button } from '@mantine/core';
import clsx from 'clsx';
import Modal from './Modal';
import css from './Modal.module.scss';

type ErrorModalProp = {
  title?: string;
  error: Error;
  locale: TLocaleCode;
};

const ERROR_MODAL_ID = 'errorModal';

export default function ErrorModal({
  title = 'Confirm',
  error,
  locale,
  onClose,
}: ModalProps<ErrorModalProp>) {
  const { t } = useTranslations();
  const { modifier, onAnimationEnd, exit } = useTransition();

  const onCloseWithExit = () => {
    exit(() => onClose());
  };
  return (
    <Modal
      id={ERROR_MODAL_ID}
      title={title}
      className={clsx(modifier)}
      onClose={onCloseWithExit}
      onAnimationEnd={onAnimationEnd}
      closeOnClickOutside={false}
    >
      <div className={css.content}>{error.message}</div>
      <div className={css.btnBox}>
        <Button onClick={onCloseWithExit}>{t('global.modal.errorModal.confirm')}</Button>
      </div>
    </Modal>
  );
}
