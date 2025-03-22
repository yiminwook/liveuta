import { generateFcmToken } from '@/libraries/firebase/generateFcmToken';
import { generateThumbnail } from '@/libraries/youtube/thumbnail';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { TChannelData, TContentData } from '@/types/api/mongoDB';
import { gtagClick } from '@/utils/gtag';
import { PushData } from '@api/push/route';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export type TReservePushArgs = {
  title: string;
  body: string;
  token: string;
  timestamp: string;
  imageUrl: string;
  link: string;
  channelName: string;
};

const useReservePush = () => {
  const t = useTranslations();
  const mutatePush = useMutation({
    mutationFn: async (arg: TReservePushArgs) => {
      const data: PushData = {
        title: arg.title,
        body: arg.body,
        token: arg.token,
        timestamp: arg.timestamp,
        imageUrl: arg.imageUrl,
        link: arg.link,
      };

      const response = await axios<{ message: string }>({
        method: 'POST',
        url: '/api/v1/reserve/push',
        data,
      });

      return {
        message: response.data.message,
        channelName: arg.channelName,
        title: arg.title,
      };
    },
    onSuccess: (response) => {
      gtagClick({
        target: 'sheduleAlarm',
        content: response.channelName,
        detail: response.title,
        action: 'alamReserve',
      });

      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const reservePush = async (content: TContentData, channel: TChannelData | undefined) => {
    if (mutatePush.isPending) return;
    const token = await generateFcmToken();

    if (token === undefined) {
      throw new Error(t('hooks.useReservePush.tokenError'));
    }

    mutatePush.mutate({
      title: t('hooks.useReservePush.title'),
      body: `${t('hooks.useReservePush.body', { channelName: channel?.name_kor || '' })}`,
      token,
      timestamp: content.timestamp.toString(),
      imageUrl: generateThumbnail(content.videoId, 'mqdefault'),
      link: generateVideoUrl(content.videoId),
      channelName: channel?.name_kor || '',
    });
  };

  return { reservePush, mutatePush };
};

export default useReservePush;
