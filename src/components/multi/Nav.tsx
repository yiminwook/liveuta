'use client';
import ListModal from '@/components/common/modal/MultiListModal';
import { createModal } from '@/libraries/modal/modals';
import { FaPlus } from 'react-icons/fa6';
import css from './Nav.module.scss';

export default function Nav() {
  const open = () => {
    createModal('default', {
      title: 'URL을 입력해주세요',
      size: 'xl',
      innerProps: {
        children: <ListModal />,
      },
    });
  };

  return (
    <button className={css.wrap} onClick={open}>
      <FaPlus size="1.5rem" />
    </button>
  );
}
