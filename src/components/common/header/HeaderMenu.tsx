import { Menu, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './HeaderMenu.module.scss';

type HeaderMenuProps = {
  title: string;
  links: { href: string; text: string }[];
  onSelect: (value: string) => void;
};

export default function HeaderMenu({ title, links, onSelect }: HeaderMenuProps) {
  const pathname = usePathname();
  return (
    <Menu trigger="hover">
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
