'use client';
import NavItem from '@/components/common/sidebar/NavItem';
import { Link } from '@/libraries/i18n';
import { AppShell, Burger, Button, Flex, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import varialble from '@variable';
import { MouseEvent } from 'react';
import css from './layout.module.scss';

type Props = {
  children: React.ReactNode;
};

export default function Client({ children }: Props) {
  const [opened, { toggle, close }] = useDisclosure();

  const onClickSidebarNav = (e: MouseEvent<HTMLDivElement>) => {
    // event delegation
    const target = e.target as HTMLElement;
    const achor = target.closest('a');
    if (achor) close();
  };

  return (
    <AppShell
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header classNames={{ header: css.header }}>
        <Flex align="center" h="100%" px="sm" justify="space-between">
          <Flex align="center">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" mr="sm" />
            <Link locale="ko" href="/admin">
              <Title component="h1" size="1.25rem" c={varialble.thirdColorDefault}>
                LU Admin
              </Title>
            </Link>
          </Flex>
          <Flex>
            <Button component={Link} locale="ko" href="/" size="xs">
              나가기
            </Button>
          </Flex>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="xs" onClick={onClickSidebarNav}>
        <NavItem direction="rtl" href="/admin" label="관리자 홈" />
        <NavItem direction="rtl" href="/admin/revalidate" label="캐시검증" />
        <NavItem direction="rtl" href="/admin/metadata" label="메타데이터" />
        <NavItem direction="rtl" href="/admin/member" label="멤버관리" />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
