import { Menu, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import For from '../utils/For';
import Show from '../utils/Show';
import css from './HeaderMenu.module.scss';

type HeaderMenuProps = {
  title: string;
  links: { href: string; text: string; subRoutes?: { href: string; text: string }[] }[];
  onSelect: (value: string) => void;
};

export default function HeaderMenu({ title, links }: HeaderMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  return (
    <Menu trigger="hover" opened={opened} onChange={setOpened} offset={15}>
      <Menu.Target>
        <UnstyledButton className={css.trigger}>{title}</UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown className={css.dropdown}>
        {links.map((link) => {
          if (link.subRoutes === undefined) {
            return (
              <Menu.Item
                key={`headerMenu-${link.text}`}
                data-current={pathname === link.href}
                onClick={() => router.push(link.href)}
                className={css.dropdownItem}
              >
                {link.text}
              </Menu.Item>
            );
          } else {
            return (
              <Menu.Item
                key={`headerMenu-${link.text}`}
                data-current={pathname.startsWith(link.href)}
                className={css.dropdownItem}
              >
                <Menu trigger="hover" offset={20} arrowOffset={15} withArrow position="right-start">
                  <Menu.Target>
                    <div>{link.text}</div>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <For each={link.subRoutes}>
                      {(subRoute) => (
                        <Menu.Item
                          key={`headerMenu-${link.text}-${subRoute.text}`}
                          data-current={pathname === `${link.href}${subRoute.href}`}
                          onClick={() => router.push(`${link.href}${subRoute.href}`)}
                          className={css.dropdownItem}
                        >
                          {subRoute.text}
                        </Menu.Item>
                      )}
                    </For>
                  </Menu.Dropdown>
                </Menu>
              </Menu.Item>
            );
          }
        })}
      </Menu.Dropdown>
    </Menu>
  );
}
