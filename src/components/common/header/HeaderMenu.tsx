import { usePathname } from 'next/navigation';
import css from './HeaderMenu.module.scss';
import { Menu, UnstyledButton } from '@mantine/core';
import Link from 'next/link';

type HeaderMenuProps = {
  title: string;
  links: { href: string; text: string }[];
  onSelect: (value: string) => void;
};

export default function HeaderMenu({ title, links, onSelect }: HeaderMenuProps) {
  const pathname = usePathname();
  return (
    <Menu
      trigger="hover"
      transitionProps={{
        transition: {
          out: { opacity: 0, transform: 'translateY(-4px)' },
          in: { opacity: 1, transform: 'translateY(0px)' },
          transitionProperty: 'opacity, transform',
        },
        timingFunction: 'ease-out',
        duration: 300,
      }}
    >
      <Menu.Target>
        <UnstyledButton className={css.trigger}>{title}</UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown className={css.dropdown}>
        {links.map((link) => (
          <Menu.Item
            component={Link}
            href={link.href}
            key={`headerMenu-${link.text}`}
            data-current={pathname === link.href}
          >
            {link.text}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
