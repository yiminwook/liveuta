import classNames from 'classnames';
import { Menu } from 'lucide-react';
import css from './HamburgerBtn.module.scss';

type HamburgerBtnProps = {
  onClick: () => void;
  size?: string;
  className?: string;
};

export default function HamburgerBtn({ className, onClick }: HamburgerBtnProps) {
  return (
    <button className={classNames(css.button, className)} onClick={onClick}>
      <Menu size="2rem" color="inherit" />
    </button>
  );
}
