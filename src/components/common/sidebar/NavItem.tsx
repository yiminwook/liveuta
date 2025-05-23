import { usePathname } from '@/libraries/i18n/client';
import TbChevronLeft from '@icons/tabler/ChevronLeft';
import TbChevronRight from '@icons/tabler/ChevronRight';
import { NavLink } from '@mantine/core';
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
      leftSection={
        direction === 'ltr' && (
          <TbChevronLeft
            width="0.8rem"
            height="0.8rem"
            stroke="1.5px"
            className="mantine-rotate-ltr"
          />
        )
      }
      rightSection={
        direction === 'rtl' && (
          <TbChevronRight
            width="0.8rem"
            height="0.8rem"
            stroke="1.5px"
            className="mantine-rotate-rtl"
          />
        )
      }
    >
      {children}
    </NavLink>
  );
}
