'use client';
import { TextInput, UnstyledButton } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import IonSearch from '~icons/ion/search.jsx';
import TbX from '~icons/tabler/x.jsx';
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
  const t = useTranslations('setlist.searchForm');

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
            placeholder={t('searchInputPlaceholder')}
          />
          <button className={css.clearButton} type="button" onClick={() => setQuery('')}>
            <TbX />
          </button>
        </div>
        <UnstyledButton className={css.submit} type="submit">
          <IonSearch color="#fff" width="1.75rem" height="1.75rem" />
        </UnstyledButton>
      </div>
    </form>
  );
}
