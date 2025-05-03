import { useTransition } from '@/hooks/use-transition';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { ModalProps } from '@/stores/modal';
import { Button } from '@mantine/core';
import classNames from 'classnames';
import Modal from './Modal';
import css from './Modal.module.scss';

type ConfirmModalProp = {
  title?: string;
  message: string;
  locale: TLocaleCode;
};

const CONFIRM_MODAL_ID = 'confirmModal';

export default function ConfirmModal({
  title = 'Confirm',
  message,
  locale,
  onClose,
  onSuccess,
}: ModalProps<ConfirmModalProp>) {
  const { t } = useTranslations();
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
          {t('global.modal.confirmModal.cancel')}
        </Button>
        <Button onClick={onSuccessWithExit}>{t('global.modal.confirmModal.confirm')}</Button>
      </div>
    </Modal>
  );
}
