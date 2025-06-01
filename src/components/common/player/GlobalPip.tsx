'use client';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { usePlayer } from '@/stores/player';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from 'sonner';

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
  const { t } = useTranslations();
  const searchParams = useSearchParams();
  const isLive = searchParams.get('t') === 'live';
  const [isMount, setIsMount] = useState(false);

  const isHide = usePlayer((store) => store.isHide);
  const setIsHide = usePlayer((store) => store.actions.setIsHide);

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
