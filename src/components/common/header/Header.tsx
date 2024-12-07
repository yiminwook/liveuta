/* eslint-disable @next/next/no-img-element */
'use client';
import HamburgerButton from '@/components/common/button/HamburgerButton';
import { accountSidebarAtom, sidebarAtom } from '@/stores/common';
import { global } from '@/styles/globalTheme.css';
import { Avatar, Text } from '@mantine/core';
import variable from '@variable';
import { useSetAtom } from 'jotai';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import DesktopNav from './DesktopNav';
import css from './Header.module.scss';

type HeaderProps = {
  session: Session | null;
};

export default function Header({ session }: HeaderProps) {
  const gnbRef = useRef<HTMLDivElement>(null);

  const setShowSidebar = useSetAtom(sidebarAtom);
  const setShowAccountSidebar = useSetAtom(accountSidebarAtom);

  const openAccountSidebar = () => setShowAccountSidebar(true);

  const openSidebar = () => setShowSidebar(true);

  const handleScroll = useMemo(() => {
    let timer: NodeJS.Timeout | null = null;
    return () => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        const current = gnbRef.current;
        if (!current) return;
        window.scrollY > 0
          ? (current.style.backgroundColor = 'transparent')
          : (current.style.backgroundColor = global.color.fourth[50]);
      }, 300);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <header>
      <div className={css.inner} ref={gnbRef}>
        <nav className={css.nav}>
          <HamburgerButton onClick={openSidebar} />
          <Text
            component="a"
            href="/"
            className={css.title}
            variant="gradient"
            gradient={{
              from: variable.firstColorDarken,
              to: variable.secondColorLighter,
              deg: 45,
            }}
          >
            Live Uta
          </Text>
          <div className={css.right}>
            <DesktopNav />
            {session ? (
              <button className={css.accountBtn} onClick={openAccountSidebar}>
                <Avatar
                  src={session.user.image}
                  w={40}
                  h={40}
                  radius="xl"
                  alt="유저 이미지"
                  name={session.user.email}
                />
              </button>
            ) : (
              <Link href="/login" className={css.loginBtn}>
                로그인
              </Link>
            )}
          </div>
        </nav>
      </div>
      <div className={css.blank} />
    </header>
  );
}
