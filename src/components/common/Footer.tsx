import TbNoCopyright from '~icons/tabler/no-copyright.jsx';
import css from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <TbNoCopyright width="1.2rem" height="1.2rem" />
      &nbsp; This site is a Non-profit V-tuber Fan site
    </footer>
  );
}
