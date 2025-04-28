'use client';
import { SETLISTS_TAG } from '@/constants/revalidateTag';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import IonSearch from '@icons/ion/IosSearch';
import TbX from '@icons/tabler/X';
import { TextInput, UnstyledButton } from '@mantine/core';
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
