'use client';
import { SETLISTS_TAG } from '@/constants/revalidate-tag';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { TextInput, UnstyledButton } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import css from './SearchForm.module.scss';

interface SearchFormProps {
  searchParams: {
    query: string;
    page: number;
    sort: 'broadcast' | 'create';
  };
}

export default function SearchForm({ searchParams }: SearchFormProps) {
  const locale = useLocale();
  const { t } = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [query, setQuery] = useState(searchParams.query);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery === searchParams.query) {
      queryClient.invalidateQueries({ queryKey: [SETLISTS_TAG, searchParams] });
    } else {
      const params = new URLSearchParams();
      params.set('query', trimmedQuery);
      params.set('page', '1');
      params.set('sort', searchParams.sort);
      router.push(`/${locale}/setlist?${params.toString()}`);
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
            placeholder={t('setlist.searchForm.searchInputPlaceholder')}
          />
          <button className={css.clearButton} type="button" onClick={() => setQuery('')}>
            <IconX />
          </button>
        </div>
        <UnstyledButton className={css.submit} type="submit">
          <IconSearch color="#fff" size="1.75rem" />
        </UnstyledButton>
      </div>
    </form>
  );
}
