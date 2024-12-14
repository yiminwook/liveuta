import classNames from 'classnames';
import { RxHamburgerMenu } from 'react-icons/rx';
import css from './HamburgerBtn.module.scss';

type HamburgerBtnProps = {
  onClick: () => void;
  size?: string;
  className?: string;
};

export default function HamburgerBtn({ className, onClick }: HamburgerBtnProps) {
  return (
    <button className={classNames(css.button, className)} onClick={onClick}>
      <RxHamburgerMenu size="2rem" color="inherit" />
    </button>
  );
}
