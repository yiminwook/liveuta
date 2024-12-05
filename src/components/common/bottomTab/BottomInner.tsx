'use client';
import cx from 'classnames';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { CgUserlane } from 'react-icons/cg';
import { FaListOl } from 'react-icons/fa';
import { LuSettings } from 'react-icons/lu';
import { MdOutlineSchedule } from 'react-icons/md';
import { RxPinTop } from 'react-icons/rx';
import { TiHomeOutline } from 'react-icons/ti';
import * as styles from './bottomTab.css';

enum Direction {
  up = 'up',
  down = 'down',
  end = 'end',
}

export default function BottomInner() {
  const [direction, setDirection] = useState<Direction>(Direction.up);
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
        /** 문서 상단부터 뷰포트 상단까지의 높이 */
        const currentScrollY = window.scrollY;
        let direction = currentScrollY > y ? Direction.down : Direction.up;
        y = currentScrollY;

        // 스크롤이 끝까지 내려갔는지 판단
        /** 현재 뷰포트의 높이 */
        const windowHeight = window.innerHeight;
        /** 전체 문서의 높이 */
        const documentHeight = document.documentElement.scrollHeight;
        const scrolledToBottom = windowHeight + currentScrollY >= documentHeight;
        if (scrolledToBottom) direction = Direction.end;

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

  const hideBottomTab = windowY > 56 && direction === Direction.down;
  const showTobButton = windowY > 56;

  return (
    <div className={cx(styles.inner, hideBottomTab && 'hidden')}>
      <button className={cx(styles.topButton, showTobButton && 'show')} onClick={scrollUp}>
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
          <Link href="/channel">
            <div className={styles.item}>
              <CgUserlane size="1.5rem" />
              <span>채널</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/">
            <div className={cx(styles.item)}>
              <TiHomeOutline size="1.5rem" />
              <span>홈</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/schedule">
            <div className={cx(styles.item)}>
              <MdOutlineSchedule size="1.5rem" />
              <span>스케줄</span>
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
