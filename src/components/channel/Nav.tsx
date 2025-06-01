'use client';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { TChannelDto } from '@/libraries/mongodb/channels';
import { Button, Flex, SegmentedControl, TextInput, UnstyledButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import variable from '@variable';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import css from './Nav.module.scss';

export default function Nav() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [input, setInput] = useState(searchParams.get('q') || '');
  const isDesktop = useMediaQuery(`(min-width: ${variable.breakpointSm})`);
  const locale = useLocale();
  const { t } = useTranslations();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(() => e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const trimmedInput = input.trim();
    params.set('q', trimmedInput);
    params.set('page', '1');
    router.push(`/${locale}/channel?${params.toString()}`);
  };

  function handleOrderChange(value: TChannelDto['sort']) {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    router.push(`/${locale}/channel?${params.toString()}`);
  }

  return (
    <div className={css.wrap}>
      <Flex align="center">
        <SegmentedControl
          h={40}
          mr={14}
          value={searchParams.get('sort') || 'name_kor'}
          onChange={(value) => handleOrderChange(value as TChannelDto['sort'])}
          data={[
            { label: t('channel.nav.nameKorLabel'), value: 'name_kor' },
            { label: t('channel.nav.createdAtLabel'), value: 'createdAt' },
          ]}
        />
        <Button
          h={40}
          color="third"
          variant="filled"
          onClick={() => router.push(`/${locale}/request`)}
        >
          {isDesktop ? `+ ${t('channel.nav.linkToRequest')}` : t('channel.nav.linkToRequestMobile')}
        </Button>
      </Flex>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.inputBox}>
          <TextInput
            classNames={{ input: css.input }}
            value={input}
            onChange={handleInput}
            placeholder={t('channel.nav.channelSearchInputPlaceholder')}
          />
          <button className={css.clearButton} type="button" onClick={() => setInput('')}>
            <X />
          </button>
        </div>
        <UnstyledButton className={css.submit} type="submit">
          <Search color="#fff" />
        </UnstyledButton>
      </form>
    </div>
  );
}
