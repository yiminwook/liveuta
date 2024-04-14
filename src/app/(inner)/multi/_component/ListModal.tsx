import { ModalBaseProps } from '@/model/modal/ModalController';
import Modal from '@inner/_component/modal/Modal';
import { useAtom } from 'jotai';
import { listAtom } from '../_lib/atom';
import { useState } from 'react';
import * as styles from './listModal.css';
import { toast } from 'sonner';

type ListModalProps = {} & ModalBaseProps;

const ID = 'ListModal';

export default function ListModal({ onClose }: ListModalProps) {
  const [list, setList] = useAtom(listAtom);
  const [input, setInput] = useState('');

  const pushItem = () => {
    if (input.trim() === '') {
      toast.warning('URL을 입력해주세요.');
    } else if (list.length >= 3) {
      toast.warning('3개까지만 입력가능합니다.');
    } else {
      setList((pre) => {
        const next = [...pre, input];
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
      return next;
    });
  };

  return (
    <Modal id={ID} onClose={onClose}>
      <div className={styles.wrap}>
        <div>
          <h3>Short List를 입력해주세요</h3>
          <p>최대 3개의 영상까지 추가 가능하고, 영상크기는 쇼츠영상에 맞춰져있습니다.</p>
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
