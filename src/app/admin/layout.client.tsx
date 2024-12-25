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
      <AppShell.Navbar p="xs">
        <AppShellNavItem href="/admin" label="관리자 홈" />
        <AppShellNavItem href="/admin/revalidate" label="캐시검증" />
        <AppShellNavItem href="/admin/metadata" label="메타데이터" />
        <AppShellNavItem href="/admin/member" label="멤버관리" />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

type AppShellNavItemProps = {
  label: string;
  href: string;
  children?: React.ReactNode;
};

function AppShellNavItem({ label, href, children }: AppShellNavItemProps) {
  const pathname = usePathname();
  return (
    <NavLink
      component={Link}
      href={href}
      label={label}
      active={pathname === href}
      rightSection={<IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />}
    >
      {children}
    </NavLink>
  );
}
