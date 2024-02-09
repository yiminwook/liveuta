import { ReactNode } from 'react';
import { MdOutlineExplore } from 'react-icons/md';
import NavLink from '../NavLink';
import sidebar from './sidebar.module.scss';

const IndexLink = ({ href, text }: { href: string; text: ReactNode }) => {
  return (
    <NavLink modifier={sidebar['active']} href={href}>
      {text}
    </NavLink>
  );
};

export const IndexLinkList = () => {
  return (
    <ul>
      <IndexLink href="/" text="홈" />
      <IndexLink href="/search" text="검색" />
      <IndexLink href="/channels" text="채널조회" />
      <IndexLink href="/request" text="채널요청" />
      <IndexLink href="/settings" text="설정" />
    </ul>
  );
};

const IndexSection = () => {
  return (
    <section>
      <h2>
        <MdOutlineExplore size={'1rem'} color="inherit" />
        &nbsp;목차
      </h2>
      <IndexLinkList />
    </section>
  );
};

export default IndexSection;
