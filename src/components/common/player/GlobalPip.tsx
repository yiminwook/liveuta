'use client';
import { usePlayerCtx } from '@/stores/player';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from 'sonner';
import { useStore } from 'zustand';

const DraggablePlayer = dynamic(
  () => import('./DndComponents').then((mod) => mod.DraggablePlayer),
  {
    ssr: false,
  },
);

export default function GlobalPip() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const isLive = searchParams.get('t') === 'live';
  const [isMount, setIsMount] = useState(false);

  const playerCtx = usePlayerCtx();
  const isHide = useStore(playerCtx, (store) => store.isHide);
  const setIsHide = useStore(playerCtx, (store) => store.actions.setIsHide);

  const hidePip = () => setIsHide(true);

  useHotkeys(
    'esc',
    () => {
      toast.info(`${t('global.player.title')} ${t('global.player.hide')}`);
      hidePip();
    },
    { enabled: !isHide, scopes: ['*'] },
  );

  useEffect(() => {
    if (isMount) return;
    setIsMount(() => true);
  }, [isMount]);

  if (!isMount || isMobile || isLive || isHide) return null;

  return <DraggablePlayer mode="pip" isShowHideButton={true} onClickHide={hidePip} />;
}
