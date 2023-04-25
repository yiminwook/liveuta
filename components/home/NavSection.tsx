import home from '@/styles/home/Home.module.scss';

interface NavSectionProps {
  value: 0 | 1 | 2;
  buttonFunc: () => void;
  total: number;
}

const NavSection = ({ value, buttonFunc, total }: NavSectionProps) => {
  let string: string;

  switch (value) {
    case 0:
      string = '예정';
      break;
    case 1:
      string = '라이브';
      break;
    case 2:
      string = '전체';
      break;
    default:
      string = '예정';
  }

  return (
    <section className={home['nav-section']}>
      <button onClick={buttonFunc}>{string}</button>
      <div>{`Total: ${total}`}</div>
    </section>
  );
};

export default NavSection;
