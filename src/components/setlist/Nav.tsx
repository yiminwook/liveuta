'use client';
import { Link } from '@/libraries/i18n';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { Button, SegmentedControl } from '@mantine/core';
import { Session } from 'next-auth';
import { useRouter } from 'next-nprogress-bar';
import css from './Nav.module.scss';
import PostDrawer from './PostDrawer';
import SearchForm from './SearchForm';

type OrderType = 'broadcast' | 'create';

type SearchFormProps = {
  searchParams: {
    query: string;
    page: number;
    sort: 'broadcast' | 'create';
  };
  session: Session | null;
};

export default function Nav({ searchParams, session }: SearchFormProps) {
  const router = useRouter();
  const { t, i18n } = useTranslations();
  const locale = i18n.language as TLocaleCode;

  function handleOrderChange(value: OrderType) {
    const query = new URLSearchParams();
    query.set('query', searchParams.query);
    query.set('page', searchParams.page.toString());
    query.set('sort', value);
    router.push(`/${locale}/setlist?${query.toString()}`);
  }

  return (
    <div className={css.wrap}>
      <div className={css.left}>
        <SegmentedControl
          value={searchParams.sort}
          onChange={(value) => handleOrderChange(value as OrderType)}
          data={[
            { label: t('setlist.nav.sortBroadcast'), value: 'broadcast' },
            { label: t('setlist.nav.sortCreate'), value: 'create' },
          ]}
        />
        <div className={css.setlist}>
          <PostDrawer session={session} />
          <Button
            className={css.createLink}
            variant="gradient"
            component={Link}
            href="/setlist/create"
            locale={locale}
          >
            {t('setlist.nav.createNew')}
          </Button>
        </div>
      </div>
      <SearchForm searchParams={searchParams} />
    </div>
  );
}
