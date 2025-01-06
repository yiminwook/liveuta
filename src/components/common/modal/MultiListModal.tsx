import Modal from '@/components/common/modal/Modal';
import { useTransition } from '@/hooks/useTransition';
import { ModalProps } from '@/stores/modal';
import { useMultiViewStore } from '@/stores/multiView';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import css from './MultiListModal.module.scss';

type ListModalProps = {
  defaultValue?: string;
};

const ID = 'multiListModal';

export default function ListModal({ onClose, defaultValue }: ModalProps<ListModalProps>) {
  const multiViewStore = useMultiViewStore();
  const [input, setInput] = useState(defaultValue || '');
  const t = useTranslations('global.modal.multiListModal');
  const { modifier, onAnimationEnd, exit } = useTransition();

  const pushItem = () => {
    if (input.trim() === '') {
      toast.warning(t('noURLWarning'));
    } else if (multiViewStore.list.length >= 4) {
      toast.warning(t('max4Warning'));
    } else {
      multiViewStore.actions.add(input);
      setInput(() => '');
    }
  };

  const deleteItem = (index: number) => {
    multiViewStore.actions.removeByIdx(index);
  };

  const onCloseWithExit = () => {
    exit(() => onClose());
  };

  return (
    <Modal
      id={ID}
      className={classNames(modifier)}
      onClose={onCloseWithExit}
      onAnimationEnd={onAnimationEnd}
      width={750}
      title={t('modalTitle')}
    >
      <div className={css.wrap}>
        <div>
          <p>{t('description1')}</p>
          <p>{t('description2')}</p>
          <Link className={css.link} href="/multi">
            {t('linkToMultiView')}
          </Link>
        </div>
        <div>
          <div className={css.inputBox}>
            <input
              className={css.input}
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="https://www.youtube.com/watch?v=UxArjYzECJs"
            />
            <button className={css.inputBtn} onClick={pushItem}>
              {t('add')}
            </button>
          </div>
          <ul className={css.list}>
            {multiViewStore.list.map((url, index) => (
              <li key={index} className={css.item}>
                <span className={css.itemText}>{`${index + 1}. ${url}`}</span>
                <button className={css.itemBtn} onClick={() => deleteItem(index)}>
                  {t('remove')}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
