import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavLink } from '@mantine/core';
import TbChevronLeft from '~icons/tabler/chevron-left.jsx';
import TbChevronRight from '~icons/tabler/chevron-right.jsx';

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
