import { Link } from '@/libraries/i18n';
import { getTranslations } from '@/libraries/i18n/server';
import { TLocaleCode } from '@/libraries/i18n/type';

type Props = {
  params: Promise<{ locale: TLocaleCode }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const locale = params.locale;

  const { t } = await getTranslations(locale);

  return (
    <div>
      <Link locale={locale} href={'/logout'}>
        {t('error.errorPage.link')}
      </Link>
    </div>
  );
}
