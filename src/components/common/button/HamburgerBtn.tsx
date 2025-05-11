import { IconMenu2 } from '@tabler/icons-react';
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
      <IconMenu2 size="2rem" color="inherit" />
    </button>
  );
}
