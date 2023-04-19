/* eslint-disable @next/next/no-html-link-for-pages */
import { useRef, useEffect } from 'react';
import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';
import gnb from '@/styles/GNB.module.scss';

const { publicRuntimeConfig } = getConfig();

const GNB = () => {
  const gnbRef = useRef<HTMLUListElement>(null);
  const handleScroll = () => {
    const current = gnbRef.current;
    if (current) {
      if (window.scrollY > 0) {
        current.style.top = '-3.5rem';
      } else {
        current.style.top = '0rem';
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
    <nav>
      <ul className={gnb['nav']} ref={gnbRef}>
        <ol className={gnb['internet_link']}>
          <Link href="https://gall.dcinside.com/mini/board/lists?id=vuta">
            <Image src="/nav_internet.png" width={40} height={40} alt="internet_icon" unoptimized />
          </Link>
        </ol>
        <ol className={gnb['title']}>
          <a href="/">Live Uta</a>
        </ol>
        <ol className={gnb['form_link']}>
          <Link href={`https://docs.google.com/spreadsheets/d/${publicRuntimeConfig.spreadsheetId ?? ''}/`}>Form</Link>
        </ol>
      </ul>
      <div className={gnb['blank']} />
    </nav>
  );
};

export default GNB;
