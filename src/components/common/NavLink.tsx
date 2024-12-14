'use client';
import cx from 'classnames';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { MouseEvent, ReactNode } from 'react';
import css from './NavLink.module.scss';

type NavLinkProps = {
  href: string;
  classname?: string;
  children: ReactNode;
  modifier?: string;
  shallow?: boolean;
};

export default function NavLink({ href, children, classname }: NavLinkProps) {
  const pathName = usePathname();
  const isActive = pathName === href;

  const onClick = (e: MouseEvent) => {
    if (isActive) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cx(css.navLink, isActive && 'active', classname)}
    >
      {children}
    </Link>
  );
}
