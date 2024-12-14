import { RxHamburgerMenu } from 'react-icons/rx';
import css from './HamburgerBtn.module.scss';

type HamburgerBtnProps = {
  onClick: () => void;
  size?: string;
};

export default function HamburgerBtn({ onClick }: HamburgerBtnProps) {
  return (
    <button className={css.button} onClick={onClick}>
      <RxHamburgerMenu size="2rem" color="inherit" />
    </button>
  );
}
