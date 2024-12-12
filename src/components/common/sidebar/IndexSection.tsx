import { Link } from 'next-view-transitions';
import { ReactNode } from 'react';
import { MdOutlineExplore } from 'react-icons/md';
import NavLink from '../NavLink';
import css from './Sidebar.module.scss';

function IndexLink({ href, text }: { href: string; text: ReactNode }) {
  return (
    <li>
      <NavLink href={href}>{text}</NavLink>
    </li>
  );
}

const links = [
  { href: '/', text: '홈' },
  { href: '/schedule', text: '스케줄' },
  { href: '/multi', text: '멀티뷰' },
  { href: '/channel', text: '채널' },
  { href: '/setlist', text: '세트리' },
  { href: '/setting', text: '설정' },
  { href: '/dev', text: '개발' },
];

export function IndexLinkList() {
  return (
    <ul>
      <IndexLink href="/" text="홈" />
      <IndexLink href="/schedule" text="스케줄" />
      <IndexLink href="/multi" text="멀티뷰" />
      <IndexLink href="/channel" text="채널" />
      <IndexLink href="/setlist" text="세트리" />
      <IndexLink href="/setting" text="설정" />
      <IndexLink href="/dev" text="개발" />
    </ul>
  );
}

export default function IndexSection() {
  return (
    <section>
      <h2>
        <MdOutlineExplore size={'1rem'} color="inherit" />
        &nbsp;목차
      </h2>
      <ul className={css.links}>
        {links.map((link, i) => (
          <li key={`sidebar-link-${i}`}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
