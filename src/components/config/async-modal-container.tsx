'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PORTAL_ID } from '@/constants';
import { useModalStore } from '@/stores/modal';

export default function AsyncModalContainer() {
  const store = useModalStore();
  const pathname = usePathname(); // 반드시 next/navigation을 사용

  useEffect(() => {
    return () => {
      store.actions.closeAll();
    };
  }, [pathname]);

  return (
    <div id={PORTAL_ID}>
      {store.modals.map((modalInfo) => (
        <modalInfo.Component key={modalInfo.key} {...modalInfo.props} />
      ))}
    </div>
  );
}
