import { ModalBaseProps } from '@/libraries/modal/ModalController';
import Modal from '@/components/common/modal/Modal';
import { useAtom } from 'jotai';
import { multiListAtom } from '@/stores/player/multi';
import { useState } from 'react';
import * as styles from './multiListModal.css';
import { toast } from 'sonner';
import Link from 'next/link';

type ListModalProps = {
  defaultValue?: string;
} & ModalBaseProps;

const ID = 'multiListModal';

export default function ListModal({ onClose, defaultValue }: ListModalProps) {
  const [list, setList] = useAtom(multiListAtom);
  const [input, setInput] = useState(defaultValue || '');

  const pushItem = () => {
    if (input.trim() === '') {
      toast.warning('URL을 입력해주세요.');
    } else if (list.length >= 4) {
      toast.warning('4개까지만 입력가능합니다.');
    } else {
      setList((pre) => {
        const next = [...pre, input.trim()];
        localStorage.setItem('shortList', JSON.stringify(next));
        return next;
      });
      setInput(() => '');
    }
  };

  const deleteItem = (index: number) => {
    setList((pre) => {
      const next = [...pre];
      next.splice(index, 1);
      localStorage.setItem('shortList', JSON.stringify(next));
      return next;
    });
  };

  return (
    <Modal id={ID} onClose={onClose}>
      <div className={styles.wrap}>
        <div>
          <h3 className={styles.title}>URL를 입력해주세요</h3>
          <p>최대 4개의 영상까지 추가 가능하고, 영상크기는 쇼츠영상에 맞춰져있습니다.</p>
          <p>모바일 환경에서는 동시에 재생되지 않을 수 있습니다.</p>
          <Link className={styles.link} href="/multi">
            멀티뷰 페이지로 이동
          </Link>
        </div>
        <div>
          <div className={styles.inputBox}>
            <input
              className={styles.input}
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="https://www.youtube.com/watch?v=UxArjYzECJs"
            />
            <button className={styles.inputButton} onClick={pushItem}>
              추가
            </button>
          </div>
          <ul className={styles.list}>
            {list.map((url, index) => (
              <li key={index} className={styles.item}>
                <span className={styles.itemText}>{`${index + 1}. ${url}`}</span>
                <button className={styles.itemButton} onClick={() => deleteItem(index)}>
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
