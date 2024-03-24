'use client';
import Link from 'next/link';
import { FaListOl } from 'react-icons/fa';
import * as styles from './bottomTab.css';
import { MdSavedSearch } from 'react-icons/md';
import { CgUserlane } from 'react-icons/cg';
import { LuSettings } from 'react-icons/lu';
import { RxPinTop } from 'react-icons/rx';
import { useEffect, useMemo, useRef } from 'react';

export default function BottomInner() {
  const innerRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = useMemo(() => {
    let timer: NodeJS.Timeout | null = null;
    return () => {
      if (timer) clearTimeout(timer);
      if (!innerRef.current) return;
      innerRef.current.classList.add('hidden');
      timer = setTimeout(() => {
        innerRef.current?.classList.remove('hidden');
      }, 300);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.inner} ref={innerRef}>
      <button className={styles.topButton} onClick={scrollUp}>
        <RxPinTop size="28px" color="inherit" />
      </button>
      <ul className={styles.list}>
        <li>
          <Link href="/setlist">
            <div className={styles.item}>
              <FaListOl size="1.25rem" />
              <span>세트리</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/channels">
            <div className={styles.item}>
              <CgUserlane size="1.5rem" />
              <span>채널</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="search">
            <div className={styles.item}>
              <MdSavedSearch size="1.5rem" />
              <span>검색</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="setting">
            <div className={styles.item}>
              <LuSettings size="1.5rem" />
              <span>설정</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
