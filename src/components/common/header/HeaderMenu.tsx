import { Link } from '@/libraries/i18n';
import { useLocale, usePathname } from '@/libraries/i18n/client';
import { Menu, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import css from './HeaderMenu.module.scss';

type HeaderMenuProps = {
  title: string;
  links: { href: string; text: string }[];
  isExternal: boolean;
};

export default function HeaderMenu({ title, links, isExternal }: HeaderMenuProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const [opened, setOpened] = useState(false);

  return (
    <Menu trigger="hover" opened={opened} onChange={setOpened} offset={15}>
      <Menu.Target>
        <UnstyledButton className={css.trigger}>{title}</UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown className={css.dropdown}>
        {links.map((link) =>
          isExternal ? (
            <Menu.Item
              key={`headerMenu-external-${link.text}`}
              component="a"
              href={link.href}
              className={css.dropdownItem}
            >
              {link.text}
            </Menu.Item>
          ) : (
            <Menu.Item
              key={`headerMenu-internal-${link.text}`}
              component={Link}
              data-current={pathname === link.href}
              locale={locale}
              href={link.href}
              className={css.dropdownItem}
            >
              {link.text}
            </Menu.Item>
          ),
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
