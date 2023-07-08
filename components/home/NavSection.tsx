import home from '@/components/home/Home.module.scss';
import NavLink from '@/components/common/NavLink';
import { ReactNode } from 'react';

interface NavSectionProps {
  total: number;
}

const NavTapLink = ({ href, text }: { href: string; text: ReactNode }) => {
  return (
    <NavLink modifier={home['active']} href={href} shallow={true}>
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

const NavSection = ({ total }: NavSectionProps) => {
  return (
    <section className={home['nav-section']}>
      <NavTap />
      {total > 0 ? <div className={home['total']}>{`Total: ${total}`}</div> : null}
    </section>
  );
};

export default NavSection;
