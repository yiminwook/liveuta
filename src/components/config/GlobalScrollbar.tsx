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
  }, []);
  return null;
}
