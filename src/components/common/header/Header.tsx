/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';
import { useSetAppStore } from '@/stores/app';
import { Avatar } from '@mantine/core';
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
  const actions = useSetAppStore();

  const openAccountSidebar = () => actions.setIsShowAcctSidebar(true);

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
          : (current.style.backgroundColor = 'var(--liveuta-fourth-50)');
      }, 300);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  return (
    <header className={css.header}>
      <div className={css.inner} ref={gnbRef}>
        <nav className={css.nav}>
          <Link href="/" className={css.title}>
            Live Uta
          </Link>
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
    </header>
  );
}
