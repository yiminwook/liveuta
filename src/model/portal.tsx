'use client';
import React, { memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const portal = <T extends object>(position: string, Component: React.FC<T>) => {
  return memo(function Portal(props: T) {
    const [wrap, setWrap] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
      const el = document.createElement('div');
      el.setAttribute('id', position);

      if (!document.getElementById(position)) {
        // 'current' ID를 가진 요소가 없을 경우에만 추가
        document.body.appendChild(el);
        setWrap(() => el);

        return () => {
          if (wrap) {
            document.body.removeChild(wrap);
            setWrap(() => null);
          }
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!wrap) return null;

    return createPortal(<Component {...props} />, wrap);
  });
};

export default portal;
