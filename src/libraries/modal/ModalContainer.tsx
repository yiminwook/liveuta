import { PORTAL_ID } from '@/constants';
import useModalStore from '@/hooks/useModalStore';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ModalContainer() {
  const modalStore = useModalStore();
  const isEmpty = modalStore.length === 0;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (containerRef.current) return;
    //modal-root가 없으면 body에 modal-root를 만들어준다.
    // const modalBox = document.createElement('div');
    // modalBox.id = MODAL_ID;
    // document.body.appendChild(modalBox);
    const portal = document.getElementById(PORTAL_ID) as HTMLDivElement;
    containerRef.current = portal;

    return () => modalStore.clear();
  }, []);

  useEffect(() => {
    modalStore.clear();
  }, [pathname]);

  if (isEmpty || !containerRef.current) return null;

  return createPortal(
    <>
      {modalStore.all.map((modalInfo) => (
        <modalInfo.Component key={modalInfo.key} {...modalInfo.props} />
      ))}
    </>,
    containerRef.current,
  );
}
