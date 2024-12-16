'use client';
import useStopPropagation from '@/hooks/useStopPropagation';
import { useAppCtx } from '@/stores/app';
import { CloseButton } from '@mantine/core';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook';
import { RemoveScroll } from 'react-remove-scroll';
import { useStore } from 'zustand';
import ExternalLinksSection from './ExternalLinksSection';
import IndexSection from './IndexSection';
import css from './Sidebar.module.scss';

export default function Sidebar() {
  const pathname = usePathname();
  const appCtx = useAppCtx();
  const isShow = useStore(appCtx, (state) => state.isShowSidebar);
  const setIsShow = useStore(appCtx, (state) => state.actions.setIsShowSidebar);

  const { enableScope, disableScope } = useHotkeysContext();
  const { stopPropagation } = useStopPropagation();

  const handleClose = () => setIsShow(false);

  useHotkeys(
    'esc',
    (e) => {
      e.stopPropagation();
      handleClose();
    },
    {
      enabled: isShow,
      scopes: ['sidebar'],
    },
  );

  useHotkeys('space', () => {}, {
    preventDefault: true,
    enabled: isShow,
    scopes: ['sidebar'],
  });

  useEffect(() => {
    if (isShow) handleClose();
  }, [pathname]);

  useEffect(() => {
    if (!isShow) return;
    //window 사이즈가 바뀌면 닫히게
    enableScope('sidebar');
    window.addEventListener('resize', handleClose);
    return () => {
      disableScope('sidebar');
      window.removeEventListener('resize', handleClose);
    };
  }, [isShow]);

  return (
    <RemoveScroll enabled={isShow} removeScrollBar={false}>
      <aside>
        <div className={classnames(css.wrap, 'mobile', { show: isShow })} onClick={handleClose}>
          <div
            className={classnames(css.inner, 'left', { moveRight: isShow })}
            onClick={stopPropagation}
          >
            <nav className={css.nav}>
              <CloseButton w={40} h={40} onClick={handleClose} />
            </nav>
            <IndexSection />
            <ExternalLinksSection />
          </div>
        </div>
      </aside>
    </RemoveScroll>
  );
}
