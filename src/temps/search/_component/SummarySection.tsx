import search from './search.module.scss';
import { useSearchQuery } from '@/components/search/getSearch';

export default function SummarySection() {
  const searchQuery = useSearchQuery();

  return (
    <>
      {searchQuery !== '' ? (
        <section className={search['result']}>
          <div>
            <p>{`"${searchQuery}" 검색결과`}</p>
          </div>
        </section>
      ) : null}
    </>
  );
}
