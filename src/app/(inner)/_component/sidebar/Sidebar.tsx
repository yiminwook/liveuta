'use client';
import useStopPropagation from '@/hook/useStopPropagation';
import { sidebarAtom } from '@inner/_lib/atom';
import cx from 'classnames';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import CloseButton from '../button/CloseButton';
import ThemeButton from '../button/ThemeButton';
import ExternalLinksSection from './ExternalLinksSection';
import IndexSection from './IndexSection';
import * as styles from './sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();
  const { stopPropagation } = useStopPropagation();
  const [show, setShow] = useAtom(sidebarAtom);

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
        <div className={cx(styles.wrap, 'mobile', show && 'show')} onClick={handleClose}>
          <div className={cx(styles.inner, 'left', show && 'moveRight')} onClick={stopPropagation}>
            <nav className={styles.nav}>
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
