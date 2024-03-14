import { TbNoCopyright } from 'react-icons/tb';
import * as style from '../layout.css';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <TbNoCopyright size="1.2rem" />
      &nbsp; This site is a Non-profit V-tuber Fan site
    </footer>
  );
}
