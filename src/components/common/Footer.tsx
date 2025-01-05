import { useTranslations } from 'next-intl';
import TbNoCopyright from '~icons/tabler/no-copyright.jsx';
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
