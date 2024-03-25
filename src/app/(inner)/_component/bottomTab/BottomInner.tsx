'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { CgUserlane } from 'react-icons/cg';
import { FaListOl } from 'react-icons/fa';
import { LuSettings } from 'react-icons/lu';
import { MdSavedSearch } from 'react-icons/md';
import { RxPinTop } from 'react-icons/rx';
import { TiHomeOutline } from 'react-icons/ti';
import * as styles from './bottomTab.css';
import cx from 'classnames';

export default function BottomInner() {
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [windowY, setWindowY] = useState(0);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = useMemo(() => {
    let timer: NodeJS.Timeout | null = null;
    let y = 0;
    return () => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        const currentScrollY = window.scrollY;
        const direction = currentScrollY > y ? 'down' : 'up';
        y = currentScrollY;
        setDirection(() => direction);
        setWindowY(() => currentScrollY);
      }, 300);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx(styles.inner, direction === 'down' && 'hidden')}>
      <button className={cx(styles.topButton, windowY > 100 && 'show')} onClick={scrollUp}>
        <RxPinTop size="30px" color="inherit" />
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
          <Link href="/">
            <div className={cx(styles.home, styles.item)}>
              <TiHomeOutline size="1.5rem" />
              <span>홈</span>
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
