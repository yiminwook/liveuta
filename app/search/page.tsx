'use client';
import Loading from '@/components/common/Loading';
import ChannelSection from '@/components/search/ChannelSection';
import ContentSection from '@/components/search/ContentSection';
import SearchSection from '@/components/search/SearchSection';
import search from '@/components/search/Search.module.scss';
import useSearch from '@/hooks/useSearch';
import { useSearchParams } from 'next/navigation';

interface SearchPageProps {}

const SearchPage = ({}: SearchPageProps) => {
  const searchParams = useSearchParams();
  const nameQuery = searchParams?.get('query') ?? '';
  const { data = { contents: [], channels: [] }, isLoading } = useSearch(nameQuery);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SearchSection />
      {nameQuery !== '' ? (
        <section className={search['result']}>
          <div>
            <p>{`"${nameQuery}" 검색결과`}</p>
          </div>
        </section>
      ) : null}
      <ContentSection contents={data.contents} />
      <ChannelSection channels={data.channels} />
    </>
  );
};

export default SearchPage;
