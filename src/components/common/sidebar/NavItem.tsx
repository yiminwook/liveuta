import { usePathname } from '@/libraries/i18n/client';
import { NavLink } from '@mantine/core';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NextLink from 'next/link';

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
      component={NextLink}
      href={href}
      label={label}
      active={pathname === href}
      leftSection={direction === 'ltr' && <ChevronLeft size="0.85rem" />}
      rightSection={direction === 'rtl' && <ChevronRight size="0.85rem" />}
    >
      {children}
    </NavLink>
  );
}
