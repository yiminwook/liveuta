'use client';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { usePlayerCtx } from '@/stores/player';
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

type Props = {
  locale: TLocaleCode;
};

export default function GlobalPip({ locale }: Props) {
  const { t } = useTranslations(locale);
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

  return (
    <DraggablePlayer mode="pip" isShowHideButton={true} onClickHide={hidePip} locale={locale} />
  );
}
