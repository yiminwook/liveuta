'use client';
import Categories from '@/components/common/featured/Categories';
import FeaturedVtubers from '@/components/common/featured/FeaturedVtubers';
import { Session } from 'next-auth';
import css from './page.module.scss';

type Props = {
  session: Session | null;
};

export default function Client({ session }: Props) {
  return (
    <section className={css.featuredContainer}>
      {/* <Tabs.Root
        lazyMount
        unmountOnExit
        value={selected}
        onValueChange={(e) => setSelected(e.value as 'categories' | 'vtubers')}
      >
        <Tabs.List className={styles.tabs}>
          <Tabs.Trigger
            value="categories"
            className={styles.tab}
            data-selected={selected === 'categories'}
          >
            <span>카테고리</span>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="vtubers"
            className={styles.tab}
            data-selected={selected === 'vtubers'}
          >
            <span>버튜버 특집</span>
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root> */}
      <div className={css.featured} data-show={true}>
        <div>
          <div>select</div>
        </div>
        <Categories session={session} />
        <FeaturedVtubers />
      </div>
    </section>
  );
}
