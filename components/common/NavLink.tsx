'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEvent, ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  modifier?: string;
  shallow?: boolean;
}

const NavLink = ({ href, children, modifier = '', shallow = false }: NavLinkProps) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  const onClick = (e: MouseEvent) => {
    if (isActive) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={isActive ? ['active', modifier].join(' ') : ''}
        shallow={shallow}
        prefetch={false}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
