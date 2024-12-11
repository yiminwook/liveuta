'use client';
import { TextInput } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { useTransitionRouter } from 'next-view-transitions';
import { useState } from 'react';
import css from './SearchForm.module.scss';

interface SearchFormProps {
  searchParams: {
    query: string;
    page: number;
  };
}

export default function SearchForm({ searchParams }: SearchFormProps) {
  const queryClient = useQueryClient();
  const router = useTransitionRouter();
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
    <form className={css.wrap} onSubmit={handleSearch}>
      <TextInput
        className={css.input}
        value={query}
        onChange={handleQuery}
        placeholder="세트리 검색"
      />
      <button className={css.submit} type="submit">
        검색
      </button>
    </form>
  );
}
