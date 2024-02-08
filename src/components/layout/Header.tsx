'use client';
/* eslint-disable @next/next/no-html-link-for-pages */
import { useRef, useEffect, useState, useMemo, FormEvent, useCallback } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import { BiSearchAlt } from 'react-icons/bi';
import header from '@/components/layout/Header.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import HamburgerButton from '@/components/common/button/HamburgerButton';
import NavigationList from '@/components/layout/NavigationList';
import Input from '@/components/common/Input';
import { replaceSpecialCharacters } from '@/util/regexp';
import dayjs from '@/models/dayjs';

const Header = () => {
  const pathname = usePathname();
  const route = useRouter();
  const gnbRef = useRef<HTMLDivElement>(null);

  const [showSidebar, setShowSidebar] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const openSidebar = () => {
    setShowSidebar(() => true);
  };

  const closeSidebar = () => {
    setShowSidebar(() => false);
  };

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
    setShowSidebar(() => false);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
            <Link href="/search" className={header['search-button']}>
              <BiSearchAlt size="1.6rem" color="inherit" />
            </Link>
          </div>
        </nav>
      </div>
      <Sidebar show={showSidebar} onClose={closeSidebar} />
      <div className={header['blank']} />
    </header>
  );
};

export default Header;
