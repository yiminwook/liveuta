import { FaWindowClose } from 'react-icons/fa';
import mobileNav from '@/styles/header/sidebar.module.scss';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div>
      <input type="checkBox" id="mobile_nav" className={mobileNav['check-box']} />
      <div className={mobileNav['container']}>
        <div className={mobileNav['sidebar']}>
          <ul>
            <li>
              <Link href="https://gall.dcinside.com/mini/board/lists?id=vuta">갤러리로</Link>
            </li>
            <li>channel sheet</li>
            <li>전체방송</li>
          </ul>
          <label htmlFor="mobile_nav" className={mobileNav['close']}>
            <FaWindowClose size={'2rem'} color="inherit" />
          </label>
        </div>
        <label htmlFor="mobile_nav" className={mobileNav['back-drop']} />
      </div>
    </div>
  );
};

export default Sidebar;
