/* eslint-disable @next/next/no-html-link-for-pages */
import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BiSearchAlt } from 'react-icons/bi';
import gnb from '@/styles/header/GNB.module.scss';
import { useRouter } from 'next/router';

const GNB = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const gnbRef = useRef<HTMLElement>(null);

  const toggleSidebar = () => {
    setShowSidebar((pre) => !pre);
  };

  const handleScroll = useCallback(() => {
    const current = gnbRef.current;
    if (current) {
      if (window.scrollY > 0) {
        current.style.opacity = '0';
      } else {
        current.style.opacity = '1';
      }
    }
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
      <nav className={gnb['nav']} ref={gnbRef}>
        <ul>
          <li className={gnb['sidebar']}>
            <button onClick={toggleSidebar}>
              <RxHamburgerMenu size={'2rem'} color={'inherit'} />
            </button>
          </li>
          <li className={gnb['title']}>
            <a href="/">Live Uta</a>
          </li>
          <li className={gnb['search']}>
            <Link href="/search">
              <button tabIndex={-1}>
                <BiSearchAlt size={'1.6rem'} color={'inherit'} />
              </button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={gnb['blank']} />
      <Sidebar show={showSidebar} onClose={toggleSidebar} />
    </header>
  );
};

export default GNB;
