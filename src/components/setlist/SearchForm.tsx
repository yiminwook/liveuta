'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as styles from './searchForm.css';
import { useQueryClient } from '@tanstack/react-query';

interface SearchFormProps {
  searchParams: {
    query: string;
    page: number;
  };
}

export default function SearchForm({ searchParams }: SearchFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.query);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery === searchParams.query) {
      queryClient.invalidateQueries({ queryKey: ['searchSetlist', searchParams] });
    } else {
      router.push(`/setlist?query=${trimmedQuery}`);
    }
  };

  return (
    <form className={styles.wrap} onSubmit={handleSearch}>
      <div className={styles.inputBox}>
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={handleQuery}
          placeholder="세트리로 검색"
        />
        <button className={styles.button}>검색</button>
      </div>
    </form>
  );
}
