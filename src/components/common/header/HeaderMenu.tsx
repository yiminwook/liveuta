import { Menu, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next-nprogress-bar';
import { useTransitionRouter } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import css from './HeaderMenu.module.scss';

type HeaderMenuProps = {
  title: string;
  links: { href: string; text: string }[];
  onSelect: (value: string) => void;
};

export default function HeaderMenu({ title, links }: HeaderMenuProps) {
  const pathname = usePathname();
  const router = useRouter(useTransitionRouter);

  return (
    <Menu trigger="hover">
      <Menu.Target>
        <UnstyledButton className={css.trigger}>{title}</UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown className={css.dropdown}>
        {links.map((link) => (
          <Menu.Item
            key={`headerMenu-${link.text}`}
            data-current={pathname === link.href}
            onClick={() => router.push(link.href)}
            className={css.dropdownItem}
          >
            {link.text}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
