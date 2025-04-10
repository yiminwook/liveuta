'use client';
import { usePlayerCtx } from '@/stores/player';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useStore } from 'zustand';

const DndPip = dynamic(() => import('./DndComponents').then((mod) => mod.DndPip), {
  ssr: false,
});

export default function Pip() {
  const searchParams = useSearchParams();
  const isLive = searchParams.get('t') === 'live';
  const playerCtx = usePlayerCtx();
  const [isMount, setIsMount] = useState(false);
  const isHide = useStore(playerCtx, (store) => store.isHide);
  const setIsHide = useStore(playerCtx, (store) => store.actions.setIsHide);
  const hidePip = () => setIsHide(true);

  useEffect(() => {
    if (isMount) return;
    setIsMount(() => true);
  }, [isMount]);

  if (!isMount || isMobile || isLive || isHide) return null;

  return <DndPip isShowHideButton={true} onClickHide={hidePip} />;
}
