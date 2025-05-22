import { proxyApi } from '@/apis/fetcher';
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

type TResItem = {
  channel_addr: string;
  name_kor: string;
};

export const useWaitingListSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: ['waitingList'],
    queryFn: () => proxyApi.get<TResItem[]>('append-new-vchan/getWaitingChannels').json(),
  });
};

export const useAutoCompleteQuery = () => {
  return useQuery({
    queryKey: ['autoComplete'],
    queryFn: () => proxyApi.get<TResItem[]>('append-new-vchan/getAutocompleteData').json(),
  });
};

export const useSumitChannelMutation = () => {
  return useMutation({
    mutationFn: (arg: {
      channelName: string;
      channelURL: string;
    }) => proxyApi.post('append-new-vchan/submitForm', { json: arg }).json(),
  });
};
