import { useTransition } from '@/hooks/useTransition';
import { useTranslations } from '@/libraries/i18n/client';
import { ModalProps } from '@/stores/modal';
import { Button } from '@mantine/core';
import classNames from 'classnames';
import Modal from './Modal';
import css from './Modal.module.scss';

type AletModalProp = {
  title?: string;
  message: string;
};

const ALERT_MODAL_ID = 'alertModal';

export default function AlertModal({
  title = 'Alert',
  message,
  onClose,
}: ModalProps<AletModalProp>) {
  const { t } = useTranslations();
  const { modifier, onAnimationEnd, exit } = useTransition();

  const onCloseWithExit = () => {
    exit(() => onClose());
  };
  return (
    <Modal
      id={ALERT_MODAL_ID}
      title={title}
      className={classNames(modifier)}
      onClose={onCloseWithExit}
      onAnimationEnd={onAnimationEnd}
      closeOnClickOutside={false}
    >
      <div className={css.content}>{message}</div>
      <div className={css.btnBox}>
        <Button onClick={onCloseWithExit}>{t('global.modal.alertModal.confirm')}</Button>
      </div>
    </Modal>
  );
}
