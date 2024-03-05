'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as styles from './searchForm.css';

interface SearchFormProps {
  searchParams: {
    query: string;
    page: number;
  };
}

export default function SearchForm({ searchParams }: SearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.query);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    router.push(`/setlist?query=${trimmedQuery}`);
  };

  return (
    <form className={styles.wrap} onSubmit={handleSearch}>
      <div className={styles.inputBox}>
        <input className={styles.input} type="text" value={query} onChange={handleQuery} />
        <button className={styles.button}>검색</button>
      </div>
    </form>
  );
}
