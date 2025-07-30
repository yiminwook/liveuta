import { clientApi, proxyApi } from '@/apis/fetcher';
import { CHANNEL_COUNT_TAG, WAITING_TAG } from '@/constants/revalidate-tag';
import { TCheckDuplicatesBatchResult } from '@/types/api/proxy';
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
        nameKor: string;
        channelId: string;
        handle: string;
      }[],
    ) =>
      proxyApi
        .post<{
          inserted: number;
        }>('append-new-vchan/submitBatch', { json: { channels: arg } })
        .json(),
  });
};

export const useValidateChannelsMutation = () => {
  return useMutation({
    mutationFn: (urls: string[]) =>
      proxyApi
        .post<{
          results: TCheckDuplicatesBatchResult[];
        }>('append-new-vchan/checkDuplicatesBatch', {
          json: { urls },
        })
        .json()
        .then((json) => json.results),
  });
};
