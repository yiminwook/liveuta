/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';
import { Link } from '@/libraries/i18n';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { useApp } from '@/stores/app';
import { Avatar, Skeleton } from '@mantine/core';
import { Search } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { useCmdActions } from '../command/Context';
import DesktopNav from './DesktopNav';
import css from './header.module.scss';

type HeaderProps = {
  locale: TLocaleCode;
};

export default function Header({ locale }: HeaderProps) {
  const { data: session, status } = useSession();
  const gnbRef = useRef<HTMLDivElement>(null);
  const actions = useApp((state) => state.actions);
  const { t } = useTranslations();
  const { setCmdOpen } = useCmdActions();

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
          <Link locale={locale} href="/" className={css.title}>
            Live Uta
          </Link>
          <div className={css.right}>
            <button onClick={() => setCmdOpen(true)} className={css.searchBtn}>
              <Search size="0.85rem" />
              <span>{t('global.header.search')}</span>
              <div className={css.cmdShortcut}>⌘+K</div>
            </button>
            <DesktopNav />
            {status === 'loading' && <Skeleton height={40} circle />}
            {status === 'unauthenticated' && (
              <Link locale={locale} href="/login" className={css.loginBtn}>
                {t('global.header.login')}
              </Link>
            )}
            {status === 'authenticated' && (
              <button className={css.accountBtn} onClick={openAccountSidebar}>
                <Avatar
                  src={session.user.image}
                  w={40}
                  h={40}
                  radius="xl"
                  alt={t('global.header.userAvatarAlt')}
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
