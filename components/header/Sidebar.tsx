import { FaWindowClose } from 'react-icons/fa';
import mobileNav from '@/styles/header/Sidebar.module.scss';
import getConfig from 'next/config';
import { MouseEvent } from 'react';
import useStopPropagation from '@/hooks/UseStopPropagation';
import NavLink from '@/components/common/NavLink';
import { RxLink2 } from 'react-icons/rx';
import { MdOutlineExplore } from 'react-icons/md';

const {
  publicRuntimeConfig: { CONTENTS_SHEET_ID, CHANNELS_SHEET_ID },
} = getConfig();

interface SidebarProps {
  show: boolean;
  onClose: () => void;
}

const Sidebar = ({ show, onClose }: SidebarProps) => {
  const { stopPropagation } = useStopPropagation();
  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div>
      <div className={[mobileNav['container'], show ? mobileNav['show'] : ''].join(' ')} onClick={onClick}>
        <div className={[mobileNav['sidebar'], show ? mobileNav['show'] : ''].join(' ')} onClick={stopPropagation}>
          <ul>
            <li>
              <h1>
                <MdOutlineExplore size={'1rem'} color="inherit" />
                &nbsp;페이지
              </h1>
            </li>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/channels">Channels</NavLink>
            <NavLink href="/channels">Search</NavLink>
          </ul>
          <ul>
            <li>
              <h1>
                <RxLink2 size={'1rem'} color="inherit" />
                &nbsp;외부링크
              </h1>
            </li>
            <NavLink href="https://gall.dcinside.com/mini/board/lists?id=vuta">갤러리로</NavLink>
            <NavLink href="https://www.piku.co.kr/w/6js7eW">아이도루 월드컵</NavLink>
            <NavLink href={`https://docs.google.com/spreadsheets/d/${CONTENTS_SHEET_ID ?? ''}/`}>스케쥴 시트</NavLink>
            <NavLink href={`https://docs.google.com/spreadsheets/d/${CHANNELS_SHEET_ID ?? ''}/`}>채널 시트</NavLink>
          </ul>
          <button className={mobileNav['close']} onClick={onClose}>
            <FaWindowClose size={'2rem'} color="inherit" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
