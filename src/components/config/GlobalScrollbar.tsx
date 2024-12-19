'use client';

import { OverlayScrollbars } from 'overlayscrollbars';
import { useEffect } from 'react';

type GlobalScrollbarProps = {
  disable?: boolean;
};

export default function GlobalScrollbar({ disable = false }: GlobalScrollbarProps) {
  useEffect(() => {
    OverlayScrollbars(
      {
        target: document.body,
        cancel: {
          nativeScrollbarsOverlaid: disable,
        },
      },
      {
        scrollbars: {
          autoHide: 'leave',
          autoHideSuspend: true,
        },
      },
    );

    const drawerObserver = new MutationObserver(() => {
      const shouldLock = document.body.getAttribute('data-scroll-locked');
      if (typeof shouldLock === 'string' && shouldLock === '1') {
        document.body.classList.add('overflow-hidden');
        document.documentElement.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
        document.documentElement.classList.remove('overflow-hidden');
      }
    });

    drawerObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-scroll-locked'],
    });
  }, []);
  return null;
}
