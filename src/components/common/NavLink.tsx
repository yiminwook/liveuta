'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEvent, ReactNode } from 'react';
import cx from 'classnames';
import * as styles from './navLink.css';

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
      className={cx(styles.navLink, isActive && 'active', classname)}
    >
      {children}
    </Link>
  );
}
