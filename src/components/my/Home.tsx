'use client';
import useCachedData from '@/hooks/useCachedData';
import FasStar from '@icons/fa-solid/Star';
import MdiBlock from '@icons/mdi/Block';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Background from '../common/background/Background';
import Blacklist from './Blacklist';
import css from './Home.module.scss';
import Whitelist from './Whitelist';

type HomeProps = {};

export default function Home({}: HomeProps) {
  const session = useSession().data!;
  const { whiteListMap, channelMap, blackListMap } = useCachedData({ session });
  const t = useTranslations();

  return (
    <Background>
      <div className={css.wrap}>
        <section className={css.section}>
          <h2 className={css.sectionTitle}>
            <FasStar width="1.2rem" height="1.2rem" color="#ffbb00" />
            <b>{t('my.favorite.title')}</b>
          </h2>
          <Whitelist session={session} whiteList={whiteListMap} channelList={channelMap} />
        </section>
        <section className={css.section}>
          <h2 className={css.sectionTitle}>
            <MdiBlock width="1.2rem" height="1.2rem" color="#ED2939" />
            <b>{t('my.blacklist.title')}</b>
          </h2>
          <Blacklist session={session} blacklist={blackListMap} channelList={channelMap} />
        </section>
      </div>
    </Background>
  );
}
