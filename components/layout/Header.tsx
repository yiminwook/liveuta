/* eslint-disable @next/next/no-html-link-for-pages */
import { useRef, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import { RxColumnSpacing, RxHamburgerMenu } from 'react-icons/rx';
import { BiSearchAlt } from 'react-icons/bi';
import header from '@/styles/layout/Header.module.scss';
import { useRouter } from 'next/router';

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const gnbRef = useRef<HTMLElement>(null);

  const toggleSidebar = () => {
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
  }, [router]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header>
      <nav className={header['nav']} ref={gnbRef}>
        <ul>
          <li className={header['sidebar']}>
            <button onClick={toggleSidebar}>
              <RxHamburgerMenu size={'2rem'} color={'inherit'} />
            </button>
          </li>
          <li className={header['title']}>
            <a href="/">Live Uta</a>
          </li>
          <li className={header['search']}>
            <Link href="/search">
              <button tabIndex={-1}>
                <BiSearchAlt size={'1.6rem'} color={'inherit'} />
              </button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={header['blank']} />
      <Sidebar show={showSidebar} onClose={toggleSidebar} />
    </header>
  );
};

export default Header;
