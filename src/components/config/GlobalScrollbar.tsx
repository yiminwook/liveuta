'use client';

import { OverlayScrollbars } from 'overlayscrollbars';
import { useEffect } from 'react';

export default function GlobalScrollbar() {
  useEffect(() => {
    OverlayScrollbars(document.body, {
      scrollbars: {
        autoHide: 'scroll',
      },
    });
  }, []);
  return null;
}
