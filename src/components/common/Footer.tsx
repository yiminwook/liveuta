'use client';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import TbNoCopyright from '@icons/tabler/NoCopyright';
import css from './Footer.module.scss';

export default function Footer() {
  const locale = useLocale();
  const { t } = useTranslations(locale);

  return (
    <footer className={css.footer}>
      <TbNoCopyright width="1.2rem" height="1.2rem" />
      &nbsp; {t('global.footer.site')}
    </footer>
  );
}
