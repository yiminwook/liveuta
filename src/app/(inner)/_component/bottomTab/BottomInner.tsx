'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { CgUserlane } from 'react-icons/cg';
import { FaListOl } from 'react-icons/fa';
import { LuSettings } from 'react-icons/lu';
import { MdSavedSearch } from 'react-icons/md';
import { RxPinTop } from 'react-icons/rx';
import { TiHomeOutline } from 'react-icons/ti';
import * as styles from './bottomTab.css';
import cx from 'classnames';

export default function BottomInner() {
  const innerRef = useRef<HTMLDivElement>(null);
  const topButtonRef = useRef<HTMLButtonElement>(null);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = useMemo(() => {
    let timer: NodeJS.Timeout | null = null;
    return () => {
      if (timer) clearTimeout(timer);
      innerRef.current?.classList.add('hidden');

      if (document.documentElement.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButtonRef.current?.classList.add('show');
      } else {
        topButtonRef.current?.classList.remove('show');
      }

      timer = setTimeout(() => {
        innerRef.current?.classList.remove('hidden');
      }, 150);
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
    <div className={styles.inner} ref={innerRef}>
      <button className={styles.topButton} onClick={scrollUp} ref={topButtonRef}>
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
