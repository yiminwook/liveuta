'use client';
import { Ban, Star } from 'lucide-react';
import useCachedData from '@/hooks/use-cached-data';
import { useTranslations } from '@/libraries/i18n/client';
import { useSession } from '@/stores/session';
import Background from '../common/background/Background';
import Blacklist from './Blacklist';
import css from './Home.module.scss';
import Whitelist from './Whitelist';

export default function Home() {
  const { t } = useTranslations();

  const session = useSession((state) => state.session);
  if (!session) throw new Error('not provided authorized user');

  const { whiteListMap, channelMap, blackListMap } = useCachedData({
    session,
  });

  return (
    <Background>
      <div className={css.wrap}>
        <section className={css.section}>
          <h2 className={css.sectionTitle}>
            <Star size="1.2rem" color="#ffbb00" fill="#ffbb00" />
            <b>{t('my.favorite.title')}</b>
          </h2>
          <Whitelist session={session} whiteList={whiteListMap} channelList={channelMap} />
        </section>
        <section className={css.section}>
          <h2 className={css.sectionTitle}>
            <Ban size="1.2rem" color="#ED2939" />
            <b>{t('my.blacklist.title')}</b>
          </h2>
          <Blacklist session={session} blacklist={blackListMap} channelList={channelMap} />
        </section>
      </div>
    </Background>
  );
}
