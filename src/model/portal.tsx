'use client';
import { PORTAL_ID } from '@/const';
import React, { memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const portal = <T extends object>(position: string, Component: React.FC<T>) => {
  let wrap: HTMLDivElement | null = null;
  const provider = document.getElementById(PORTAL_ID) as HTMLDivElement;

  return memo(function Portal(props: T) {
    const [_load, setLoad] = useState(false);

    useEffect(() => {
      const el = document.createElement('div');
      el.setAttribute('id', position);

      if (!document.getElementById(position)) {
        // 'current' ID를 가진 요소가 없을 경우에만 추가
        provider.appendChild(el);
        wrap = el;
        setLoad(() => true);

        return () => {
          if (wrap) {
            provider.removeChild(wrap);
            wrap = null;
          }
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!provider || !wrap) return null;

    return createPortal(<Component {...props} />, wrap);
  });
};

export default portal;
