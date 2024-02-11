import { ReactNode, memo } from 'react';
import HorizonScrollBox from '../HorizonScrollBox';
import NavLink from '../NavLink';
import home from '../home.module.scss';
import NavSelectBox from './NavSelectBox';
//import { SheetAPIReturntype } from '@/types/inSheet';
import { MongoDBAPIReturntype } from '@/type/api/mongoDB';

function NavTapLink({ href, text }: { href: string; text: ReactNode }) {
  return (
    <NavLink modifier={home['active']} href={href} shallow={false}>
      {text}
    </NavLink>
  );
}

function NavTap() {
  return (
    <ul className={home['nav-tab']}>
      <NavTapLink href="/" text="예정" />
      <NavTapLink href="/live" text="라이브" />
      <NavTapLink href="/daily" text="24시" />
      <NavTapLink href="/all" text="전체" />
    </ul>
  );
}

interface NavSectionProps {
  filter: keyof MongoDBAPIReturntype;
}

export default function NavSection({ filter }: NavSectionProps) {
  return (
    <section className={home['nav-section']}>
      <HorizonScrollBox className={home['nav-scroll-box']}>
        <NavTap />
        dev mongoDB 사용중
        <NavSelectBox filter={filter} />
      </HorizonScrollBox>
    </section>
  );
}
