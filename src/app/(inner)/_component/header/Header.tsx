/* eslint-disable @next/next/no-img-element */
'use client';
import dayjs from '@/model/dayjs';
import { accountSidebarAtom, sidebarAtom } from '@inner/_lib/atom';
import { gtag } from '@inner/_lib/gtag';
import { useSetAtom } from 'jotai';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { toast } from 'sonner';
import Avatar from '../Avatar';
import HamburgerButton from '../button/HamburgerButton';
import NavigationList from '../header/NavigationList';
import SearchInput from '../input/SearchInput';
import * as styles from './header.css';
import { isMobile } from 'react-device-detect';
import { global } from '@/style/globalTheme.css';

type HeaderProps = {
  session: Session | null;
};
export default function Header({ session }: HeaderProps) {
  const route = useRouter();
  const gnbRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue === '') return toast.warning('검색어를 입력해주세요.');
    gtag('event', 'search', {
      channelName: trimmedValue,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    route.push(`/search?query=${trimmedValue}`);
  };

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
            {pathname !== '/search' && (
              <div className={styles.searchBox}>
                <SearchInput onSearch={handleSearch} placeHolder="채널명으로 검색" />
              </div>
            )}
            <NavigationList />
            {session ? (
              <button className={styles.accountButton} onClick={openAccountSidebar}>
                <Avatar
                  src={session.user.image}
                  email={session.user.email}
                  size={40}
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
