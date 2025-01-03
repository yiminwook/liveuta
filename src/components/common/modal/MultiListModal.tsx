import Modal from '@/components/common/modal/Modal';
import { useTransition } from '@/hooks/useTransition';
import { ModalProps } from '@/stores/modal';
import { useMultiViewStore } from '@/stores/multiView';
import classNames from 'classnames';
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
  const { modifier, onAnimationEnd, exit } = useTransition();

  const pushItem = () => {
    if (input.trim() === '') {
      toast.warning('URL을 입력해주세요.');
    } else if (multiViewStore.list.length >= 4) {
      toast.warning('4개까지만 입력가능합니다.');
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
      title="URL를 입력해주세요"
    >
      <div className={css.wrap}>
        <div>
          <p>최대 4개의 영상까지 추가 가능하고, 영상크기는 쇼츠영상에 맞춰져있습니다.</p>
          <p>모바일 환경에서는 동시에 재생되지 않을 수 있습니다.</p>
          <Link className={css.link} href="/multi">
            멀티뷰 페이지로 이동
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
              추가
            </button>
          </div>
          <ul className={css.list}>
            {multiViewStore.list.map((url, index) => (
              <li key={index} className={css.item}>
                <span className={css.itemText}>{`${index + 1}. ${url}`}</span>
                <button className={css.itemBtn} onClick={() => deleteItem(index)}>
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
