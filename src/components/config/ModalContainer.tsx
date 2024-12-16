'use client';
import { PORTAL_ID } from '@/constants';
import { useModalStore } from '@/stores/modal';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ModalContainer() {
  const store = useModalStore();
  const pathname = usePathname();

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
