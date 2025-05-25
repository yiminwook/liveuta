'use client';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { TChannelDto } from '@/libraries/mongodb/channels';
import { Button, Flex, SegmentedControl } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import variable from '@variable';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import css from './Nav.module.scss';
import ChannelSearch from './channel-search';

export default function Nav() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isDesktop = useMediaQuery(`(min-width: ${variable.breakpointSm})`);
  const locale = useLocale();
  const { t } = useTranslations();

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
      <ChannelSearch />
    </div>
  );
}
