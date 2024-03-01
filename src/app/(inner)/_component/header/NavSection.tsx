import HorizonScrollBox from '../HorizonScrollBox';
import home from '../home.module.scss';
import NavSelectBox from './NavSelectBox';
import NavTab from './NavTab';

export default function NavSection() {
  return (
    <section className={home['nav-section']}>
      <HorizonScrollBox className={home['nav-scroll-box']}>
        <NavTab />
        <NavSelectBox />
      </HorizonScrollBox>
    </section>
  );
}
