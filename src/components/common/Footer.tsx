import TbNoCopyright from '@icons/tabler/NoCopyright';
import { useTranslations } from 'next-intl';
import css from './Footer.module.scss';

export default function Footer() {
  const t = useTranslations('global.footer');

  return (
    <footer className={css.footer}>
      <TbNoCopyright width="1.2rem" height="1.2rem" />
      &nbsp; {t('site')}
    </footer>
  );
}
