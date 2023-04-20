import { ReactNode } from 'react';
import home from '@/styles/Home.module.scss';

interface NavSectionProps {
  value: ReactNode;
  buttonFunc: () => void;
  total: number;
}

const NavSection = ({ value, buttonFunc, total }: NavSectionProps) => {
  return (
    <section className={home['nav-section']}>
      <button onClick={buttonFunc}>필터: {value}</button>
      <div>{`Total: ${total}`}</div>
    </section>
  );
};

export default NavSection;
