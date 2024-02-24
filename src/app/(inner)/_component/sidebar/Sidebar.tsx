'use client';
import { useEffect } from 'react';
import ExternalLinksSection from './ExternalLinksSection';
import IndexSection from './IndexSection';
import sidebar from './sidebar.module.scss';
import CloseButton from '../button/CloseButton';
import ThemeButton from '../button/ThemeButton';
import useStopPropagation from '@/hook/useStopPropagation';
import { useSidebarAtom } from '@inner/_lib/atom';
import { usePathname } from 'next/navigation';
import { RemoveScroll } from 'react-remove-scroll';

export default function Sidebar() {
  const pathname = usePathname();
  const { stopPropagation } = useStopPropagation();
  const [show, setShow] = useSidebarAtom();

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (show) setShow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!show) return;
    //window 사이즈가 바뀌면 닫히게
    window.addEventListener('resize', handleClose);
    return () => {
      window.removeEventListener('resize', handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <RemoveScroll enabled={show} removeScrollBar={false}>
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
              <CloseButton onClick={handleClose} />
              <ThemeButton />
            </nav>
            <IndexSection />
            <ExternalLinksSection />
          </div>
        </div>
      </aside>
    </RemoveScroll>
  );
}
