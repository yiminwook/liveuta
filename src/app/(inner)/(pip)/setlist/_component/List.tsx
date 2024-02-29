'use client';
import { Setlist } from '@/model/oracleDB/setlist/service';
import Loading from '@inner/loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Table from './Table';
import { useRouter } from 'next/navigation';
import * as styles from './list.css';

interface ListProps {
  searchParams: {
    query?: string;
    page?: number;
  };
}

export default function List({ searchParams }: ListProps) {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['searchSetlist', searchParams],
    queryFn: async () => {
      const result = await axios.get<{
        maxPage: number;
        list: Setlist[];
      }>(`/api/search/setlist?query=${searchParams.query || ''}&page=${searchParams.page || 1}`);
      return result.data;
    },
  });

  const handlePage = (page: number) => {
    router.push(`/setlist?query=${searchParams.query || ''}&page=${page || 1}`);
  };

  if (isLoading) return <Loading />;
  console.log('data', data);

  if (!data) {
    return (
      <div>
        <h2 className={styles.title}>조회 리스트</h2>
        <div>검색 결과가 없습니다.</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className={styles.title}>조회 리스트</h2>
      <Table data={data.list} />
      <div className={styles.pagenationBox}>
        {Array.from({ length: data.maxPage }, (_, i) => i + 1).map((page) => (
          <button
            key={`setlist_pagenation_button_${page}`}
            className={styles.pagenationButton}
            onClick={() => handlePage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
