'use client';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { IconNoCopyright } from '@tabler/icons-react';
import css from './Footer.module.scss';

export default function Footer() {
  const locale = useLocale();
  const { t } = useTranslations();

  return (
    <footer className={css.footer}>
      <IconNoCopyright size="1.2rem" />
      &nbsp; {t('global.footer.site')}
    </footer>
  );
}
