/* eslint-disable @next/next/no-img-element */
'use client';
import { global } from '@/style/globalTheme.css';
import { accountSidebarAtom, sidebarAtom } from '@inner/_lib/atom/common';
import { useSetAtom } from 'jotai';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import Avatar from '../Avatar';
import HamburgerButton from '../button/HamburgerButton';
import DesktopNav from './DesktopNav';
import * as styles from './header.css';

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
          ? (current.style.backgroundColor = global.color.backdrop)
          : (current.style.backgroundColor = global.color.first[50]);
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
      <div className={styles.inner} ref={gnbRef}>
        <nav className={styles.nav}>
          <HamburgerButton onClick={openSidebar} />
          <Link href="/" className={styles.title}>
            Live Uta
          </Link>
          <div className={styles.right}>
            <DesktopNav />
            {session ? (
              <button className={styles.accountButton} onClick={openAccountSidebar}>
                <Avatar
                  src={session.user.image}
                  email={session.user.email}
                  size={'40px'}
                  alt="유저 이미지"
                />
              </button>
            ) : (
              <Link href="/login" className={styles.loginButton}>
                로그인
              </Link>
            )}
          </div>
        </nav>
      </div>
      <div className={styles.blank} />
    </header>
  );
}
