import home from '@/components/home/Home.module.scss';
import NavLink from '@/components/common/NavLink';
import React, { ReactNode, memo } from 'react';
import HorizonScrollBox from '@/components/common/HorizonScrollBox';
import NavSelectBox from '@/components/home/NavSelectBox';
import { SheetAPIReturntype } from '@/types/inSheet';

const NavTapLink = ({ href, text }: { href: string; text: ReactNode }) => {
  return (
    <NavLink modifier={home['active']} href={href} shallow={false}>
      {text}
    </NavLink>
  );
};

const NavTap = () => {
  return (
    <ul className={home['nav-tab']}>
      <NavTapLink href="/" text="예정" />
      <NavTapLink href="/live" text="라이브" />
      <NavTapLink href="/daily" text="24시" />
      <NavTapLink href="/all" text="전체" />
    </ul>
  );
};

interface NavSectionProps {
  filter: keyof SheetAPIReturntype;
}

const NavSection = ({ filter }: NavSectionProps) => {
  return (
    <section className={home['nav-section']}>
      <HorizonScrollBox className={home['nav-scroll-box']}>
        <NavTap />
        {// <NavSelectBox filter={filter} />}
      </HorizonScrollBox>
    </section>
  );
};

export default memo(NavSection);
