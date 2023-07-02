import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  modifier?: string;
}

const NavLink = ({ href, children, modifier = '' }: NavLinkProps) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  const onClick = (e: MouseEvent) => {
    if (isActive) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <li>
      <Link href={href} onClick={onClick} className={isActive ? ['active', modifier].join(' ') : ''}>
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
