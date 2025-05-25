'use client';

import { clientApi } from '@/apis/fetcher';
import { useDebounce } from '@/hooks/use-debounce';
import { Spinner180Ring } from '@/icons';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { TChannelDocument } from '@/libraries/mongodb/type';
import { TextInput, UnstyledButton } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import For from '../common/utils/For';
import Show from '../common/utils/Show';
import css from './channel-search.module.scss';

export default function ChannelSearch() {
  const locale = useLocale();
  const { t } = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [input, setInput] = useState(searchParams.get('q') || '');
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(() => e.target.value);
  };
  const debouncedInput = useDebounce(input, 300);
  const [showAutocomplete, setShowAutocomplete] = useState(true);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Pick<TChannelDocument, 'channel_id' | 'name_kor'>[]>([]);

  const wrapRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const trimmedInput = input.trim();
    params.set('q', trimmedInput);
    params.set('page', '1');
    router.push(`/${locale}/channel?${params.toString()}`);
  };

  useEffect(() => {
    function handleClickInside(event: MouseEvent) {
      if (wrapRef.current && wrapRef.current.contains(event.target as Node)) {
        setShowAutocomplete(true);
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
    }

    document.addEventListener('click', handleClickInside);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickInside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (debouncedInput === '') {
      setOptions([]);
    } else {
      setLoading(true);
      clientApi
        .get<{ data: Pick<TChannelDocument, 'channel_id' | 'name_kor'>[] }>(
          `v1/channel/search/${debouncedInput}`,
        )
        .json()
        .then(({ data }) => {
          setOptions(data);
        })
        .catch((e) => {
          console.error('Error fetching channel search options:', e);
        })
        .finally(() => setLoading(false));
    }
  }, [debouncedInput]);

  return (
    <div className={css.wrap} ref={wrapRef}>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.inputBox}>
          <TextInput
            classNames={{ input: css.input }}
            value={input}
            onChange={handleInput}
            placeholder={t('channel.nav.channelSearchInputPlaceholder')}
          />
          <button
            className={css.clearButton}
            type="button"
            onClick={() => {
              setInput('');
              setOptions([]);
            }}
          >
            <IconX />
          </button>
        </div>
        <UnstyledButton className={css.submit} type="submit">
          <IconSearch color="#fff" />
        </UnstyledButton>
      </form>
      <Show when={loading}>
        <div className={css.loading}>
          <Spinner180Ring />
        </div>
      </Show>
      <Show when={showAutocomplete && options.length > 0}>
        <ul className={css.autocomplete}>
          <For each={options}>
            {(option, index) => (
              <li
                key={`channel-search-autocomplete-${index}`}
                className={css.autocompleteItem}
                onClick={() => router.push(`/${locale}/channel/${option.channel_id}`)}
              >
                {option.name_kor}
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}
