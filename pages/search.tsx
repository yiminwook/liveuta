import Loading from '@/components/common/Loading';
import ChannelSection from '@/components/search/ChannelSection';
import ContentSection from '@/components/search/ContentSection';
import SearchSection from '@/components/search/SearchSection';
import { ContentsDataType } from '@/models/sheet/InSheet';
import { ChannelsDataType } from '@/models/youtube/InChannel';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { SearchResponseType } from './api/search';

interface SearchProps {}

const Search = ({}: SearchProps) => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [contents, setContents] = useState<ContentsDataType[]>([]);
  const [channels, setChannels] = useState<ChannelsDataType[]>([]);

  const searchChannelName = async (name: string) => {
    try {
      setisLoading(() => true);
      const query = encodeURIComponent(name);
      const response: AxiosResponse<SearchResponseType> = await axios.get(`/api/search?name=${query}`);
      const data = response.data;
      setContents(() => data.contents);
      setChannels(() => data.channels);
      setisLoading(() => false);
    } catch (error) {
      console.error(error);
      toast.error('통신에러');
      setisLoading(() => false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <SearchSection />
      <ContentSection contents={contents} />
      <ChannelSection channels={channels} />
    </main>
  );
};

export default Search;
