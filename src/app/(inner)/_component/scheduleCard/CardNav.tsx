import { generateFcmToken } from '@/model/firebase/generateFcmToken';
import { generateThumbnail } from '@/model/youtube/thumbnail';
import { generateVideoUrl } from '@/model/youtube/url';
import { ContentsDataType } from '@/type/api/mongoDB';
import { gtagClick } from '@inner/_lib/gtag';
import reservePush from '@inner/_lib/reservePush';
import { openWindow } from '@inner/_lib/windowEvent';
import { useMutation } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { MouseEvent } from 'react';
import { FaStar } from 'react-icons/fa6';
import { HiBellAlert } from 'react-icons/hi2';
import { MdBlock, MdOpenInNew } from 'react-icons/md';
import { toast } from 'sonner';
import CopyButton from '../button/CopyButton';
import * as styles from './card.css';
import { postBlacklist } from '@inner/_action/blacklist';

type CardNavProps = {
  content: ContentsDataType;
  session: Session | null;
  onClickBlock: () => void;
};

export default function CardNav({ content, onClickBlock, session }: CardNavProps) {
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

  const mutateBlock = useMutation({
    mutationKey: ['block', content.videoId],
    mutationFn: postBlacklist,
    onSuccess: (res) => {
      if (!res.result) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        onClickBlock();
      }
    },
    onError: () => {
      toast.error('서버에러가 발생했습니다. 잠시후 다시 시도해주세요.');
    },
  });

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
    return toast.info('서비스 준비중입니다.');
  };

  const handleBlock = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!session) return toast.error('로그인 후 이용가능한 서비스입니다.');

    if (confirm('해당 채널을 블럭 하시겠습니까?')) {
      mutateBlock.mutate({
        accessToken: session.user.accessToken,
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
      <button className={styles.navButton} onClick={handleFavorite}>
        <FaStar size="1.2rem" color={false ? '#ffbb00' : '#a7a7a7'} />
      </button>
      <button className={styles.navButton} onClick={handleBlock}>
        <MdBlock size="1.2rem" />
      </button>
      <CopyButton className={styles.navButton} value={videoUrl} size="1.2rem" />
      <button className={styles.navButton} onClick={openStream}>
        <MdOpenInNew size="1.2rem" />
      </button>
    </div>
  );
}
