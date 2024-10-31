import { RxHamburgerMenu } from 'react-icons/rx';
import * as styles from './hamburgerButton.css';

interface HamburgerButtonProps {
  onClick: () => void;
  size?: string;
}

export default function HamburgerButton({ onClick }: HamburgerButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      <RxHamburgerMenu size="2rem" color="inherit" />
    </button>
  );
}
