'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const portal = <T extends object>(position: string, Component: React.FC<T>) => {
  let wrap: HTMLDivElement | null = null;

  return function Portal(props: T) {
    const [_load, setLoad] = useState(false);

    useEffect(() => {
      const el = document.createElement('div');
      el.setAttribute('id', position);

      if (!document.getElementById(position)) {
        // 'current' ID를 가진 요소가 없을 경우에만 추가
        document.body.appendChild(el);
        wrap = el;
        setLoad(() => true);

        return () => {
          console.log('unmount');
          console.log('wrap', wrap);
          if (wrap) {
            document.body.removeChild(wrap);
            wrap = null;
          }
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!wrap) return null;

    return createPortal(<Component {...props} />, wrap);
  };
};

export default portal;
