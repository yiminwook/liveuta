'use client';
import Link from 'next/link';
import * as styles from './navTab.css';
import { usePathname } from 'next/navigation';
import cx from 'classnames';

const NAV_LINKS = [
  { herf: '/', text: '예정' },
  { herf: '/live', text: '라이브' },
  { herf: '/daily', text: '24시' },
  { herf: '/all', text: '전체' },
];

export default function NavTab() {
  const pathName = usePathname();
  return (
    <ul className={styles.wrap}>
      {NAV_LINKS.map((link) => {
        const isActive = pathName === link.herf;
        return (
          <li className={styles.list} key={`navtap_${link.herf}`}>
            <Link className={cx(styles.link, isActive && 'active')} href={link.herf}>
              {link.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
