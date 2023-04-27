import home from '@/styles/home/Home.module.scss';
import NavLink from '@/components/common/NavLink';

interface NavSectionProps {
  total: number;
}

const NavSection = ({ total }: NavSectionProps) => {
  return (
    <section className={home['nav-section']}>
      <NavTap />
      {total > 0 ? <div className={home['total']}>{`Total: ${total}`}</div> : null}
    </section>
  );
};

export default NavSection;

const NavTap = () => {
  return (
    <ul className={home['nav-tab']}>
      <NavLink modifier={home['active']} href="/">
        예정
      </NavLink>
      <NavLink modifier={home['active']} href="/live">
        라이브
      </NavLink>
      <NavLink modifier={home['active']} href="/daily">
        24시
      </NavLink>
      <NavLink modifier={home['active']} href="/all">
        전체
      </NavLink>
    </ul>
  );
};
