import HorizonScrollBox from '../HorizonScrollBox';
import home from '../home.module.scss';
import NavSelectBox from './NavSelectBox';
import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import NavTab from './NavTab';

interface NavSectionProps {
  filter: keyof ScheduleAPIReturntype;
}

export default function NavSection({ filter }: NavSectionProps) {
  return (
    <section className={home['nav-section']}>
      <HorizonScrollBox className={home['nav-scroll-box']}>
        <NavTab />
        <NavSelectBox filter={filter} />
      </HorizonScrollBox>
    </section>
  );
}
