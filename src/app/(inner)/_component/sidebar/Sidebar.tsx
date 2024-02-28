'use client';
import { useEffect } from 'react';
import ExternalLinksSection from './ExternalLinksSection';
import IndexSection from './IndexSection';
import CloseButton from '../button/CloseButton';
import ThemeButton from '../button/ThemeButton';
import useStopPropagation from '@/hook/useStopPropagation';
import { useSidebarAtom } from '@inner/_lib/atom';
import { usePathname } from 'next/navigation';
import { RemoveScroll } from 'react-remove-scroll';
import * as styles from './sidebar.css';
import cx from 'classnames';

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
