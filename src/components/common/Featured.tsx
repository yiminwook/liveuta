import { Session } from 'next-auth';

import Categories from './featured/Categories';

import * as styles from './featured.css';

type FeaturedProps = {
  session: Session | null;
  filter: string;
};

export default function Featured({ session, filter }: FeaturedProps) {
  return (
    <section className={styles.featured}>
      <Categories session={session} filter={filter} />
      <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>인기 브이튜바</div>
    </section>
  );
}
