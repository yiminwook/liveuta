import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function Page() {
  const t = await getTranslations('error.errorPage');

  return (
    <div>
      <Link href={'/logout'}>{t('link')}</Link>
    </div>
  );
}
