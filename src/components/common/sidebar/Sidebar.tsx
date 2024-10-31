'use client';
import useStopPropagation from '@/hooks/useStopPropagation';
import { sidebarAtom } from '@/stores/common';
import cx from 'classnames';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook';
import { RemoveScroll } from 'react-remove-scroll';
import CloseButton from '../button/CloseButton';
import ExternalLinksSection from './ExternalLinksSection';
import IndexSection from './IndexSection';
import * as styles from './sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();
  const [show, setShow] = useAtom(sidebarAtom);
  const { enableScope, disableScope } = useHotkeysContext();
  const { stopPropagation } = useStopPropagation();

  const handleClose = () => setShow(() => false);

  useHotkeys(
    'esc',
    (e) => {
      e.stopPropagation();
      handleClose();
    },
    {
      enabled: show,
      scopes: ['sidebar'],
    },
  );

  useHotkeys('space', (e) => {}, {
    preventDefault: true,
    enabled: show,
    scopes: ['sidebar'],
  });

  useEffect(() => {
    if (show) handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!show) return;
    //window 사이즈가 바뀌면 닫히게
    enableScope('sidebar');
    window.addEventListener('resize', handleClose);
    return () => {
      disableScope('sidebar');
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
            </nav>
            <IndexSection />
            <ExternalLinksSection />
          </div>
        </div>
      </aside>
    </RemoveScroll>
  );
}
