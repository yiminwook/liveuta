import { getTranslations } from '@/libraries/i18n/server';
import { TLocaleCode } from '@/libraries/i18n/type';
import GoBack from './go-back';
import css from './home.module.scss';
import RequestForm from './request-form';
import WaitingList from './waiting-list';

type HomeProps = {
  locale: TLocaleCode;
};

export default async function Home({ locale }: HomeProps) {
  const { t } = await getTranslations(locale);

  return (
    <div className={css.wrap}>
      <div>
        <div className={css.requestFormHeader}>
          <GoBack />
          <p className={css.requestChannel}>{t('request.home.requestChannel')}</p>
        </div>
        <RequestForm />
      </div>
      <div>
        <div>
          <p className={css.waitingChannels}>{t('request.home.waitingList')}</p>
        </div>
        <WaitingList />
      </div>
    </div>
  );
}
