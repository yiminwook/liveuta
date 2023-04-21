/* eslint-disable @next/next/no-html-link-for-pages */
import { useRef, useEffect } from 'react';
import getConfig from 'next/config';
import Link from 'next/link';
import Sidebar from './sidebar';
import { RiMenuAddLine } from 'react-icons/ri';
import { SiGooglesheets } from 'react-icons/si';
import gnb from '@/styles/header/GNB.module.scss';

const { publicRuntimeConfig } = getConfig();

const GNB = () => {
  const gnbRef = useRef<HTMLElement>(null);
  const handleScroll = () => {
    const current = gnbRef.current;
    if (current) {
      if (window.scrollY > 0) {
        current.style.opacity = '0';
      } else {
        current.style.opacity = '1';
      }
    }
  };

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
          <li className={gnb['mobile-nav']}>
            <label htmlFor="mobile_nav" tabIndex={0}>
              <RiMenuAddLine size={'1.2rem'} color={'inherit'} />
            </label>
          </li>
          <li className={gnb['title']}>
            <a href="/">Live Uta</a>
          </li>
          <li className={gnb['form_link']}>
            <Link href={`https://docs.google.com/spreadsheets/d/${publicRuntimeConfig.spreadsheetId ?? ''}/`}>
              <SiGooglesheets size={'1.2rem'} color={'inherit'} />
            </Link>
          </li>
        </ul>
      </nav>
      <div className={gnb['blank']} />
      <Sidebar />
    </header>
  );
};

export default GNB;
