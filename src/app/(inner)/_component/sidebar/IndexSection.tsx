import { ReactNode } from 'react';
import { MdOutlineExplore } from 'react-icons/md';
import NavLink from '../NavLink';

function IndexLink({ href, text }: { href: string; text: ReactNode }) {
  return (
    <li>
      <NavLink href={href}>{text}</NavLink>
    </li>
  );
}

export function IndexLinkList() {
  return (
    <ul>
      <IndexLink href="/" text="홈" />
      <IndexLink href="/search" text="검색" />
      <IndexLink href="/channels" text="채널조회" />
      <IndexLink href="/request" text="채널요청" />
      <IndexLink href="/setlist" text="세트리" />
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
      <IndexLinkList />
    </section>
  );
}
