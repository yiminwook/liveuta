import { NavLink } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemProps = {
  label: string;
  href: string;
  children?: React.ReactNode;
  direction: 'rtl' | 'ltr';
};

export default function NavItem({ label, href, direction, children }: NavItemProps) {
  const pathname = usePathname();

  return (
    <NavLink
      component={Link}
      href={href}
      label={label}
      active={pathname === href}
      leftSection={
        direction === 'ltr' && (
          <IconChevronLeft size="0.8rem" stroke={1.5} className="mantine-rotate-ltr" />
        )
      }
      rightSection={
        direction === 'rtl' && (
          <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
        )
      }
    >
      {children}
    </NavLink>
  );
}
