import { RxHamburgerMenu } from 'react-icons/rx';

interface HamburgerButtonProps {
  className: string;
  onClick: () => void;
  size?: string;
}

export default function HamburgerButton({
  className,
  size = '2rem',
  onClick,
}: HamburgerButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      <RxHamburgerMenu size={size} color="inherit" />
    </button>
  );
}
