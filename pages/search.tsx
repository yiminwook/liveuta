import Loading from '@/components/common/Loading';
import ChannelSection from '@/components/search/ChannelSection';
import ContentSection from '@/components/search/ContentSection';
import SearchSection from '@/components/search/SearchSection';
import search from '@/styles/search/Search.module.scss';
import useSearch from '@/hooks/useSearch';
import { useRouter } from 'next/router';

interface SearchPageProps {}

const SearchPage = ({}: SearchPageProps) => {
  const {
    query: { query },
  } = useRouter();

  const nameQuery = query?.toString() ?? '';
  const { data = { contents: [], channels: [] }, isLoading } = useSearch(nameQuery);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className={search['main']}>
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
    </main>
  );
};

export default SearchPage;
