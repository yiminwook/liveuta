'use client';
import { TextInput, UnstyledButton } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { TbX } from 'react-icons/tb';
import css from './SearchForm.module.scss';

interface SearchFormProps {
  searchParams: {
    query: string;
    page: number;
    sort: 'broadcast' | 'create';
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
      const params = new URLSearchParams();
      params.set('query', trimmedQuery);
      params.set('page', '1');
      params.set('sort', searchParams.sort);
      router.push(`/setlist?${params.toString()}`);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSearch}>
      <div className={css.wrap}>
        <div className={css.inputBox}>
          <TextInput
            classNames={{ input: css.input }}
            value={query}
            onChange={handleQuery}
            placeholder="세트리스트로 검색"
          />
          <button className={css.clearButton} type="button" onClick={() => setQuery('')}>
            <TbX />
          </button>
        </div>
        <UnstyledButton className={css.submit} type="submit">
          <IoSearch color="#fff" size="1.75rem" />
        </UnstyledButton>
      </div>
    </form>
  );
}
