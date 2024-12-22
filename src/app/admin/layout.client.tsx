'use client';
import { AppShell, Burger, Button, Flex, NavLink, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';
import varialble from '@variable';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function Client({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex align="center" h="100%" px="sm" justify="space-between">
          <Flex align="center">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" mr="sm" />
            <Title component="h1" size="1.25rem" c={varialble.thirdColorDefault}>
              LU Admin
            </Title>
          </Flex>
          <Flex>
            <Button component={Link} href="/" size="xs">
              나가기
            </Button>
          </Flex>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          component={Link}
          href="/admin"
          label="관리자 홈"
          active={pathname === '/admin'}
          rightSection={
            <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
          }
        />
        <NavLink
          component={Link}
          href="/admin/metadata"
          label="메타데이터"
          active={pathname === '/admin/metadata'}
          rightSection={
            <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
          }
        />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
