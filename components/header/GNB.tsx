/* eslint-disable @next/next/no-html-link-for-pages */
import { useRef, useEffect, useState, useCallback } from 'react';
import getConfig from 'next/config';
import Link from 'next/link';
import Sidebar from '@/components/header/Sidebar';
import { RiMenuAddLine } from 'react-icons/ri';
import { SiGooglesheets } from 'react-icons/si';
import gnb from '@/styles/header/GNB.module.scss';

const { publicRuntimeConfig } = getConfig();

const GNB = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const gnbRef = useRef<HTMLElement>(null);

  const toggleSidebar = () => {
    console.log(showSidebar);
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
    console.log('scroll m');
    window.addEventListener('scroll', handleScroll);
    return () => {
      console.log('scroll u');
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
              <RiMenuAddLine size={'1.2rem'} color={'inherit'} />
            </button>
          </li>
          <li className={gnb['title']}>
            <a href="/">Live Uta</a>
          </li>
          <li className={gnb['form_link']}>
            <Link href={`https://docs.google.com/spreadsheets/d/${publicRuntimeConfig.spreadsheetId ?? ''}/`}>
              <button tabIndex={-1}>
                <SiGooglesheets size={'1.2rem'} color={'inherit'} />
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
