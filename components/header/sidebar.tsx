import { FaWindowClose } from 'react-icons/fa';
import mobileNav from '@/styles/header/sidebar.module.scss';
import Link from 'next/link';
import getConfig from 'next/config';
import React, { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import useStopPropagation from '@/hooks/useStopPropagation';
import { useRouter } from 'next/router';
import NavLink from '../common/navLink';

const { publicRuntimeConfig } = getConfig();

interface SidebarProps {
  show: boolean;
  onClose: () => void;
}

const Sidebar = ({ show, onClose }: SidebarProps) => {
  const { stopPropagation } = useStopPropagation();
  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    console.log(e.target);
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
            <NavLink href={`https://docs.google.com/spreadsheets/d/${publicRuntimeConfig.channelsheetId ?? ''}/`}>
              Channel_ID
            </NavLink>
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
