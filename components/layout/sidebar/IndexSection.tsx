import NavLink from '@/components/common/NavLink';
import { MdOutlineExplore } from 'react-icons/md';
import sidebar from '@/components/layout/sidebar/Sidebar.module.scss';
import React, { ReactNode } from 'react';

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
      <IndexLink href="/sheet/request" text="채널요청" />
      <IndexLink href="/short" text="단축링크 생성" />
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
