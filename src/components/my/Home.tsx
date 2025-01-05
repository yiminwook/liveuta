'use client';
import useCachedData from '@/hooks/useCachedData';
import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import FasStar from '~icons/fa-solid/star.jsx';
import MdiBlock from '~icons/mdi/block.jsx';
import Background from '../common/background/Background';
import css from './Home.module.scss';
import ListPlaceholder from './ListPlaceholder';

const Blacklist = dynamic(() => import('./Blacklist'), {
  ssr: false,
  loading: () => <ListPlaceholder />,
});
const Whitelist = dynamic(() => import('./Whitelist'), {
  ssr: false,
  loading: () => <ListPlaceholder />,
});

type HomeProps = {
  session: Session;
};

export default function Home({ session }: HomeProps) {
  const { whiteList, channelList, blackList } = useCachedData({ session });
  const t = useTranslations('my');

  return (
    <Background>
      <div className={css.wrap}>
        <section className={css.section}>
          <h2 className={css.sectionTitle}>
            <FasStar width="1.2rem" height="1.2rem" color="#ffbb00" />
            <b>{t('favorite.title')}</b>
          </h2>
          <Whitelist session={session} whiteList={whiteList} channelList={channelList} />
        </section>
        <section className={css.section}>
          <h2 className={css.sectionTitle}>
            <MdiBlock width="1.2rem" height="1.2rem" />
            <b>{t('blacklist.title')}</b>
          </h2>
          <Blacklist session={session} blacklist={blackList} channelList={channelList} />
        </section>
      </div>
    </Background>
  );
}
