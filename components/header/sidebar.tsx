import { FaWindowClose } from 'react-icons/fa';
import mobileNav from '@/styles/header/Sidebar.module.scss';
import getConfig from 'next/config';
import { MouseEvent } from 'react';
import useStopPropagation from '@/hooks/UseStopPropagation';
import NavLink from '@/components/common/NavLink';

const {
  publicRuntimeConfig: { CHANNELS_SHEET_ID },
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
            <NavLink href="/">Home</NavLink>
            <NavLink href="https://gall.dcinside.com/mini/board/lists?id=vuta">갤러리로</NavLink>
            <NavLink href="/channels">Channels</NavLink>
            <NavLink href={`https://docs.google.com/spreadsheets/d/${CHANNELS_SHEET_ID ?? ''}/`}>Channel_ID</NavLink>
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
