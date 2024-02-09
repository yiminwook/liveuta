'use client';
import { useEffect } from 'react';
import ExternalLinksSection from './ExternalLinksSection';
import IndexSection from './IndexSection';
import sidebar from './sidebar.module.scss';
import CloseButton from '../button/CloseButton';
import ThemeButton from '../button/ThemeButton';
import useStopPropagation from '@/hook/useStopPropagation';

interface SidebarProps {
  show: boolean;
  onClose: () => void;
}

function Sidebar({ show, onClose }: SidebarProps) {
  const { stopPropagation } = useStopPropagation();

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    //window 사이즈가 바뀌면 닫히게
    window.addEventListener('resize', handleClose);

    return () => {
      window.removeEventListener('resize', handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside>
      <div
        className={[sidebar['container'], show ? sidebar['show'] : ''].join(' ')}
        onClick={handleClose}
      >
        <div
          className={[sidebar['sidebar'], show ? sidebar['show'] : ''].join(' ')}
          onClick={stopPropagation}
        >
          <nav>
            <CloseButton onClick={onClose} />
            <ThemeButton />
          </nav>
          <IndexSection />
          <ExternalLinksSection />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
