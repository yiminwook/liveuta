import { NavLink } from '@mantine/core';
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
          <IconTbChevronLeft width="0.8rem" stroke={1.5} className="mantine-rotate-ltr" />
        )
      }
      rightSection={
        direction === 'rtl' && (
          <IconTbChevronRight width="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
        )
      }
    >
      {children}
    </NavLink>
  );
}
