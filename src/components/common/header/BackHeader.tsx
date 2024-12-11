import { ROUTES } from '@/constants';
import { Anchor, Breadcrumbs, Menu, UnstyledButton } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import variable from '@variable';
import { useTransitionRouter } from 'next-view-transitions';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import css from './BackHeader.module.scss';

export default function BackHeader() {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const pathArr = pathname.split('/').filter((item) => item !== '');

  const home = { text: 'home', href: '/' };

  const items = pathArr.map((item, index) => {
    const href = '/' + pathArr.slice(0, index + 1).join('/');
    return { text: item, href: href };
  });

  const navigateBack = () => {
    const url = items.length > 1 ? items[items.length - 1].href : '/';
    router.push(url);
  };

  return (
    <header className={css.wrap}>
      <UnstyledButton mr={16} className={css.backBtn} onClick={navigateBack}>
        <IconArrowNarrowLeft size="2rem" color={variable.thirdColorDefault} />
        <span>돌아가기</span>
      </UnstyledButton>
      <Breadcrumbs separatorMargin="md" color={variable.thirdColorDefault}>
        <Link href={home.href} className={css.breadcrumbItem}>
          {home.text}
        </Link>
        <Menu trigger="hover" closeDelay={100}>
          <Menu.Target>
            <UnstyledButton className={css.breadcrumbItem}>{items[0].text}</UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            {ROUTES.map((link) => (
              <Menu.Item
                component={Link}
                href={link.href}
                key={link.href}
                className={css.breadcrumbMenuItem}
                data-current={link.href === items[0].href}
              >
                {link.text}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
        {items[1] && (
          <Menu trigger="hover" closeDelay={100}>
            <Menu.Target>
              <UnstyledButton className={css.breadcrumbItem}>{items[1].text}</UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              {ROUTES.find((item) => item.href === items[0].href)?.subRoutes?.map((subRoute) => (
                <Menu.Item
                  component="a"
                  href={`${subRoute.href}`}
                  key={subRoute.href}
                  className={css.breadcrumbMenuItem}
                  data-current={subRoute.href === items[1].href}
                >
                  {subRoute.text}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        )}
      </Breadcrumbs>
    </header>
  );
}
