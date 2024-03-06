/* eslint-disable @next/next/no-img-element */
'use client';
import dayjs from '@/model/dayjs';
import { BREAK_POINT } from '@/style/var';
import { accountSidebarAtom, sidebarAtom } from '@inner/_lib/atom';
import { gtag } from '@inner/_lib/gtag';
import { replaceSpecialCharacters } from '@inner/_lib/regexp';
import cx from 'classnames';
import { useAtom } from 'jotai';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import Avatar from '../Avatar';
import HamburgerButton from '../button/HamburgerButton';
import NavigationList from '../header/NavigationList';
import * as styles from './header.css';
import header from './header.module.scss';
import { toast } from 'sonner';
import { IoMdMusicalNote } from 'react-icons/io';
import SearchInput from '../input/SearchInput';

const TRANSPARENT_PATH = ['/', '/live', '/daily', '/all'];

type HeaderProps = {
  session: Session | null;
};
export default function Header({ session }: HeaderProps) {
  const route = useRouter();
  const gnbRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const [, setShowSidebar] = useAtom(sidebarAtom);
  const isMobile = useMediaQuery({ query: `(max-width: ${BREAK_POINT.md}px)` });
  const [, setShowAccountSidebar] = useAtom(accountSidebarAtom);
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
          ? (current.style.backgroundColor = '#ffffff34')
          : (current.style.backgroundColor = 'var(--liveuta-header-color)');
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
    if (isMobile || !TRANSPARENT_PATH.includes(pathname)) return;
    // 모바일이 아니고 TRANSPARENT_PATH 경로일때만 스크롤 이벤트를 등록한다.
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, pathname]);

  return (
    <header>
      <div className={cx(header['inner'], styles.inner, isMobile && 'mobile')} ref={gnbRef}>
        <nav>
          <HamburgerButton onClick={openSidebar} />
          <Link href="/" className={styles.title}>
            Live Uta
          </Link>
          <div className={styles.nav}>
            {pathname !== '/search' && (
              <div className={styles.searchBox}>
                <SearchInput onSearch={handleSearch} placeHolder="채널명으로 검색" />
              </div>
            )}
            <NavigationList session={session} />
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
