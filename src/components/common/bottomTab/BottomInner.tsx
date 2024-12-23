import { UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { CgUserlane } from 'react-icons/cg';
import { FaListOl } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';
import { MdOutlineSchedule } from 'react-icons/md';
import { RxPinTop } from 'react-icons/rx';
import { TiHomeOutline } from 'react-icons/ti';
import css from './BottomInner.module.scss';

enum Direction {
  up = 'up',
  down = 'down',
  end = 'end',
}

type BottomInnerProps = {
  openDrawer: () => void;
};

export default function BottomInner({ openDrawer }: BottomInnerProps) {
  const [direction, setDirection] = useState<Direction>(Direction.up);
  const [windowY, setWindowY] = useState(0);
  const pathname = usePathname();

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
  }, []);

  const hideBottomTab = windowY > 56 && direction === Direction.down;
  const showTobButton = windowY > 56;

  return (
    <div className={css.inner} data-hidden={hideBottomTab}>
      <UnstyledButton
        size="input-md"
        variant="transparent"
        className={css.topButton}
        data-show={showTobButton}
        onClick={scrollUp}
      >
        <RxPinTop size="2em" />
      </UnstyledButton>
      <ul className={css.list}>
        <li>
          <UnstyledButton
            component={Link}
            href="/setlist"
            className={css.item}
            data-current={pathname === '/setlist'}
          >
            <FaListOl size="1.25rem" />
            <span>세트리</span>
          </UnstyledButton>
        </li>
        <li>
          <UnstyledButton
            component={Link}
            href="/channel"
            className={css.item}
            data-current={pathname === '/channel'}
          >
            <CgUserlane size="1.5rem" />
            <span>채널</span>
          </UnstyledButton>
        </li>
        <li>
          <UnstyledButton
            component={Link}
            href="/"
            className={css.item}
            data-current={pathname === '/'}
          >
            <TiHomeOutline size="1.5rem" />
            <span>홈</span>
          </UnstyledButton>
        </li>
        <li>
          <UnstyledButton
            component={Link}
            href="/schedule"
            className={css.item}
            data-current={pathname === '/schedule'}
          >
            <MdOutlineSchedule size="1.5rem" />
            <span>스케줄</span>
          </UnstyledButton>
        </li>
        <li>
          <UnstyledButton className={css.item} onClick={openDrawer}>
            <IoIosMore size="1.5rem" />
            <span>더보기</span>
          </UnstyledButton>
        </li>
      </ul>
    </div>
  );
}
