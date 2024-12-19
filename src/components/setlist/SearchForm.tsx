'use client';
import { Button } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import cx from 'classnames';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import { TbSearch, TbX } from 'react-icons/tb';
import css from './SearchForm.module.scss';

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
    <form className={css.wrap} onSubmit={handleSearch}>
      <div className={css.inputBox}>
        <input
          className={css.input}
          value={query}
          onChange={handleQuery}
          placeholder="세트리 검색"
        />
        <div className={cx(css.icon, css.searchIcon)}>
          <TbSearch />
        </div>
        <button
          className={cx(css.icon, css.clearButton)}
          type="button"
          onClick={() => setQuery('')}
        >
          <TbX className={css.clearIcon} />
        </button>
      </div>
      <Button className={css.submit} size="compact-md">
        검색
      </Button>
    </form>
  );
}
