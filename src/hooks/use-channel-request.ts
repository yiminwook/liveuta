import { clientApi, proxyApi } from '@/apis/fetcher';
import { CHANNEL_COUNT_TAG, WAITING_TAG } from '@/constants/revalidate-tag';
import { TGetRegisteredChannelCountRes } from '@api/v1/channel/count/route';
import { TGetChannelRes } from '@api/v1/channel/route';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

export const useChannelCountSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: [CHANNEL_COUNT_TAG],
    queryFn: () =>
      clientApi
        .get<TGetRegisteredChannelCountRes>('v1/channel/count')
        .json()
        .then((json) => json.data),
  });
};

export const useWaitingListSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: [WAITING_TAG],
    queryFn: () =>
      clientApi
        .get<TGetChannelRes>('v1/channel/waiting')
        .json()
        .then((json) => json.data),
  });
};

export const useSubmitChannelMutation = () => {
  return useMutation({
    mutationFn: (
      arg: {
        url: string;
        nameKor: string;
        channelId: string;
        handle: string;
      }[],
    ) => proxyApi.post('append-new-vchan/submitBatch', { json: { channels: arg } }).json(),
  });
};

type ValidatedChannel =
  | {
      url: string;
      channelId: string;
      handle: string;
      existingName: string;
      channelTitle: string;
      error: null;
    }
  | {
      url: string;
      channelId: null;
      handle: null;
      existingName: undefined;
      channelTitle: null;
      error: string;
    };

export const useValidateChannelsMutation = () => {
  return useMutation({
    mutationFn: (urls: string[]) =>
      proxyApi
        .post('append-new-vchan/checkDuplicatesBatch', { json: { urls } })
        .json<{ results: ValidatedChannel[] }>(),
  });
};
