'use client';
import home from '@/components/home/Home.module.scss';
import NavLink from '@/components/common/NavLink';
import React, { ReactNode } from 'react';
import HorizonScrollBox from '@/components/common/HorizonScrollBox';
import NavSelectBox from '@/components/home/NavSelectBox';

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
  select: string;
}

const NavSection = ({ select }: NavSectionProps) => {
  return (
    <section className={home['nav-section']}>
      <HorizonScrollBox className={home['nav-scroll-box']}>
        <NavTap />
        <NavSelectBox select={select} />
      </HorizonScrollBox>
    </section>
  );
};

export default NavSection;
