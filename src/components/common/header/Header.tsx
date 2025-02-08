/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';
import { useSetAppStore } from '@/stores/app';
import { Avatar, Skeleton } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import DesktopNav from './DesktopNav';
import css from './Header.module.scss';

type HeaderProps = {};

export default function Header({}: HeaderProps) {
  const { data: session, status } = useSession();
  const gnbRef = useRef<HTMLDivElement>(null);
  const actions = useSetAppStore();
  const t = useTranslations('global.header');

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
            {status === 'loading' && <Skeleton height={40} circle />}
            {status === 'unauthenticated' && (
              <Link href="/login" className={css.loginBtn}>
                {t('login')}
              </Link>
            )}
            {status === 'authenticated' && (
              <button className={css.accountBtn} onClick={openAccountSidebar}>
                <Avatar
                  src={session.user.image}
                  w={40}
                  h={40}
                  radius="xl"
                  alt={t('userAvatarAlt')}
                  name={session.user.email}
                />
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
