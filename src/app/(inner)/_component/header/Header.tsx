'use client';
import dayjs from '@/model/dayjs';
import { replaceSpecialCharacters } from '@inner/_lib/regexp';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import HamburgerButton from '../button/HamburgerButton';
import NavigationList from '../header/NavigationList';
import Input from '../input/Input';
import header from './header.module.scss';
import { useSidebarAtom } from '@inner/_lib/atom';
import { Session } from '@/type/api/session';

interface HeaderProps {
  session: Session | null;
}
export default function Header({ session }: HeaderProps) {
  const pathname = usePathname();
  const route = useRouter();
  const gnbRef = useRef<HTMLDivElement>(null);

  const [, setShow] = useSidebarAtom();
  const [inputValue, setInputValue] = useState('');

  const openSidebar = () => setShow(true);

  const handleScroll = useMemo(() => {
    let timer: NodeJS.Timeout | null = null;
    return () => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        const current = gnbRef.current;
        if (!current) return;
        window.scrollY > 0 ? (current.style.opacity = '0') : (current.style.opacity = '1');
      }, 300);
    };
  }, []);

  const handleSearch = (_: FormEvent, inputVale: string) => {
    const value = inputVale.trim();
    if (value === '') return;
    gtag('event', 'search', { channelName: value, time: dayjs().format('YYYY-MM-DD HH:mm:ss') });
    route.push(`/search?query=${value}`);
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | string) => {
    const value = typeof e === 'string' ? e : e.target.value;
    const replacedValue = replaceSpecialCharacters(value);
    setInputValue(() => replacedValue);
  }, []);

  const handleReset = useCallback(() => {
    setInputValue(() => '');
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header>
      <div className={header['inner']} ref={gnbRef}>
        <nav>
          <HamburgerButton className={header['hamburger']} onClick={openSidebar} />
          <Link href="/" className={header['title']}>
            Live Uta
          </Link>
          <div className={header['navigation']}>
            {pathname !== '/search' ? (
              <Input
                className={header['search-input']}
                onSubmit={handleSearch}
                placeholder="채널명으로 검색"
                value={inputValue}
                onChange={handleChange}
                onReset={handleReset}
              />
            ) : null}
            <NavigationList />
            <Link href="/sessionout" className={header['search-button']}>
              {'로그아웃'}
            </Link>
            <Link href="/login" className={header['search-button']}>
              {session ? session.name : '로그인'}
            </Link>
          </div>
        </nav>
      </div>
      <div className={header['blank']} />
    </header>
  );
}
