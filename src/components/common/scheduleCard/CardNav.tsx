import useMutateWhitelist from '@/hooks/useDeleteWhitelist';
import useModalStore from '@/hooks/useModalStore';
import usePostBlacklist from '@/hooks/usePostBlacklist';
import usePostWhitelist from '@/hooks/usePostWhitelist';
import { generateFcmToken } from '@/libraries/firebase/generateFcmToken';
import { generateThumbnail } from '@/libraries/youtube/thumbnail';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { ContentsDataType } from '@/types/api/mongoDB';
import ListModal from '@/components/common/modal/MultiListModal';
import { whitelistAtom } from '@/stores/schedule';
import { gtagClick } from '@/utils/gtag';
import reservePush from '@/utils/reservePush';
import { openWindow } from '@/utils/windowEvent';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Session } from 'next-auth';
import { MouseEvent } from 'react';
import { FaPlus, FaStar } from 'react-icons/fa6';
import { HiBellAlert } from 'react-icons/hi2';
import { MdBlock, MdOpenInNew } from 'react-icons/md';
import { toast } from 'sonner';
import CopyButton from '@/components/common/button/CopyButton';
import * as styles from './card.css';

type CardNavProps = {
  content: ContentsDataType;
  session: Session | null;
};

export default function CardNav({ content, session }: CardNavProps) {
  const [whitelist] = useAtom(whitelistAtom);
  const modalStore = useModalStore();

  const mutatePush = useMutation({
    mutationKey: ['push', content.videoId],
    mutationFn: reservePush,
    onSuccess: (response) => {
      gtagClick({
        target: 'sheduleAlarm',
        content: content.channelName,
        detail: content.title,
        action: 'alamReserve',
      });

      toast.success(response.data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const mutateBlock = usePostBlacklist();
  const mutatePostFavorite = usePostWhitelist();
  const mutateDeleteFavorite = useMutateWhitelist();

  const handleReserve = async (e: MouseEvent<HTMLButtonElement>) => {
    const token = await generateFcmToken();

    if (token === undefined) {
      throw new Error('토큰을 가져오는데 실패했습니다.');
    }

    mutatePush.mutate({
      title: '스케쥴 알림',
      body: `곧 ${content.channelName}의 방송이 시작됩니다.`,
      token,
      timestamp: content.timestamp.toString(),
      imageUrl: thumbnailUrl,
      link: videoUrl,
    });
  };

  const handleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    if (!session) return toast.error('로그인 후 이용가능한 서비스입니다.');

    if (!isFavorite && confirm('즐겨찾기에 추가하시겠습니까?')) {
      mutatePostFavorite.mutate({
        session,
        channelId: content.channelId,
      });
    } else if (isFavorite && confirm('즐겨찾기에서 제거하시겠습니까?')) {
      mutateDeleteFavorite.mutate({
        session,
        channelId: content.channelId,
      });
    }
  };

  const handleBlock = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!session) return toast.error('로그인 후 이용가능한 서비스입니다.');

    if (confirm('해당 채널을 블럭 하시겠습니까?')) {
      mutateBlock.mutate({
        session,
        channelId: content.channelId,
      });
    }
  };

  const openStream = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    gtagClick({
      target: 'scheduleCard',
      content: content.channelName,
      detail: content.title,
      action: 'openWindow',
    });

    openWindow(videoUrl);
  };

  const open = async (url: string) => {
    await modalStore.push(ListModal, {
      props: {
        defaultValue: url,
      },
    });
  };

  const isFavorite = whitelist.has(content.channelId);
  const videoUrl = generateVideoUrl(content.videoId);
  const thumbnailUrl = generateThumbnail(content.videoId, 'mqdefault');

  return (
    <div className={styles.nav}>
      {content.isStream === 'NULL' && (
        <button
          className={styles.navButton}
          onClick={handleReserve}
          disabled={mutatePush.isPending}
        >
          <HiBellAlert color="inherit" size="1.2rem" />
        </button>
      )}
      <button className={styles.navButton} onClick={() => open(videoUrl)}>
        <FaPlus size="1.2rem" />
      </button>
      <button
        className={styles.navButton}
        onClick={handleFavorite}
        disabled={mutatePostFavorite.isPending || mutateDeleteFavorite.isPending}
      >
        <FaStar size="1.2rem" color={isFavorite ? '#ffbb00' : '#a7a7a7'} />
      </button>
      <button className={styles.navButton} onClick={handleBlock} disabled={mutateBlock.isPending}>
        <MdBlock size="1.2rem" />
      </button>
      <CopyButton className={styles.navButton} value={videoUrl} size="1.2rem" />
      <button className={styles.navButton} onClick={openStream}>
        <MdOpenInNew size="1.2rem" />
      </button>
    </div>
  );
}
