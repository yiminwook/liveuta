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
    router.push(`/setlist?query=${searchParams.query}&page=${page}`);
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
      <div>
        <div>페이지네이션 테스트중</div>
        <button onClick={() => handlePage(2)}>2페이지</button>
      </div>
    </div>
  );
}
