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
    queryFn: async () => {
      const data = await proxyApi.get<TResItem[]>('append-new-vchan/getAutocompleteData').json();

      // 중복 제거
      const nameSet: Set<string> = new Set();
      const urlSet: Set<string> = new Set();

      data.forEach((item) => {
        nameSet.add(item.name_kor);
        urlSet.add(item.channel_addr);
      });

      // 정렬
      const nameList = Array.from(nameSet).sort((a, b) => a.localeCompare(b));
      const urlList = Array.from(urlSet).sort((a, b) => a.localeCompare(b));

      return { nameList, urlList };
    },
  });
};

export const useSubmitChannelMutation = () => {
  return useMutation({
    mutationFn: (arg: {
      channelName: string;
      channelURL: string;
    }) => proxyApi.post('append-new-vchan/submitForm', { json: arg }).json(),
  });
};
