'use client';
import { TablerNoCopyrightOff } from '@/icons';
import { useTranslations } from '@/libraries/i18n/client';
import css from './Footer.module.scss';

export default function Footer() {
  const { t } = useTranslations();

  return (
    <footer className={css.footer}>
      <TablerNoCopyrightOff width="1.2rem" height="1.2rem" />
      &nbsp; {t('global.footer.site')}
    </footer>
  );
}
