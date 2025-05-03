import { clientApi } from '@/apis/fetcher';
import { generateFcmToken } from '@/libraries/firebase/generateFcmToken';
import { useTranslations } from '@/libraries/i18n/client';
import { generateThumbnail } from '@/libraries/youtube/url';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { TChannelDocumentWithoutId, TParsedClientContent } from '@/types/api/mongoDB';
import { gtagClick } from '@/utils/gtag';
import { PushData } from '@api/push/route';
import { useMutation } from '@tanstack/react-query';
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
  const { t } = useTranslations();

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

      const json = await clientApi
        .post<{ message: string }>('v1/reserve/push', {
          json: data,
        })
        .json();

      return {
        message: json.message,
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

  const reservePush = async (
    content: TParsedClientContent,
    channel: TChannelDocumentWithoutId | undefined,
  ) => {
    if (mutatePush.isPending) return;
    const token = await generateFcmToken();

    if (token === undefined) {
      throw new Error(t('hooks.useReservePush.tokenError'));
    }

    mutatePush.mutate({
      title: t('hooks.useReservePush.title'),
      body: `${t('hooks.useReservePush.body', { channelName: channel?.name_kor || '' })}`,
      token,
      timestamp: content.utcTime.toString(),
      imageUrl: generateThumbnail(content.videoId, 'mqdefault'),
      link: generateVideoUrl(content.videoId),
      channelName: channel?.name_kor || '',
    });
  };

  return { reservePush, mutatePush };
};

export default useReservePush;
