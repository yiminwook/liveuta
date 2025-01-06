import RxHamburgerMenu from '@icons/radix-icons/HamburgerMenu';
import classNames from 'classnames';
import css from './HamburgerBtn.module.scss';

type HamburgerBtnProps = {
  onClick: () => void;
  size?: string;
  className?: string;
};

export default function HamburgerBtn({ className, onClick }: HamburgerBtnProps) {
  return (
    <button className={classNames(css.button, className)} onClick={onClick}>
      <RxHamburgerMenu width="2rem" height="2rem" color="inherit" />
    </button>
  );
}
