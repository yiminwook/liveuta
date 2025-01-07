'use client';
import { TChannelDto } from '@/libraries/mongoDB/channels';
import IonIosSearch from '@icons/ion/IosSearch';
import TbX from '@icons/tabler/X';
import { Button, Flex, SegmentedControl, TextInput, UnstyledButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import variable from '@variable';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import css from './Nav.module.scss';

export default function Nav() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [input, setInput] = useState(searchParams.get('q') || '');
  const isDesktop = useMediaQuery(`(min-width: ${variable.breakpointSm})`);
  const t = useTranslations('channel.nav');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(() => e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const trimmedInput = input.trim();
    params.set('q', trimmedInput);
    params.set('page', '1');
    router.push(`/channel?${params.toString()}`);
  };

  function handleOrderChange(value: TChannelDto['sort']) {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    router.push(`/channel?${params.toString()}`);
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
            { label: t('nameKorLabel'), value: 'name_kor' },
            { label: t('createdAtLabel'), value: 'createdAt' },
          ]}
        />
        <Button h={40} color="third" variant="filled" onClick={() => router.push('/request')}>
          {isDesktop ? `+ ${t('linkToRequest')}` : t('linkToRequestMobile')}
        </Button>
      </Flex>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.inputBox}>
          <TextInput
            classNames={{ input: css.input }}
            value={input}
            onChange={handleInput}
            placeholder={t('channelSearchInputPlaceholder')}
          />
          <button className={css.clearButton} type="button" onClick={() => setInput('')}>
            <TbX />
          </button>
        </div>
        <UnstyledButton className={css.submit} type="submit">
          <IonIosSearch color="#fff" />
        </UnstyledButton>
      </form>
    </div>
  );
}
