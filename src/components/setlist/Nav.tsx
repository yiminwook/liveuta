'use client';
import { useRouter } from '@bprogress/next';
import { Button, SegmentedControl } from '@mantine/core';
import { User } from 'firebase/auth';
import { Link } from '@/libraries/i18n';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
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
  user: User | null;
};

export default function Nav({ searchParams, user }: SearchFormProps) {
  const router = useRouter();
  const locale = useLocale();
  const { t } = useTranslations();

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
          <PostDrawer user={user} />
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
