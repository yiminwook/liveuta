'use client';
/* eslint-disable @next/next/no-html-link-for-pages */
import { useRef, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import { BiSearchAlt } from 'react-icons/bi';
import header from '@/components/layout/Header.module.scss';
import { usePathname } from 'next/navigation';
import HamburgerButton from '@/components/common/button/HamburgerButton';
import NavigationList from '@/components/layout/NavigationList';

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const pathname = usePathname();
  const gnbRef = useRef<HTMLDivElement>(null);

  const handleToggleSidebar = () => {
    setShowSidebar((pre) => !pre);
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
          <HamburgerButton className={header['hamburger']} onClick={handleToggleSidebar} />
          <a href="/" className={header['title']}>
            Live Uta
          </a>
          <div className={header['navigation']}>
            <NavigationList />
            <Link href="/search" className={header['search']}>
              <BiSearchAlt size="1.6rem" color="inherit" />
            </Link>
          </div>
        </nav>
      </div>
      <Sidebar show={showSidebar} onClose={handleToggleSidebar} />
      <div className={header['blank']} />
    </header>
  );
};

export default Header;
