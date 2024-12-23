import { TbNoCopyright } from 'react-icons/tb';
import css from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <TbNoCopyright size="1.2rem" />
      &nbsp; This site is a Non-profit V-tuber Fan site
    </footer>
  );
}
