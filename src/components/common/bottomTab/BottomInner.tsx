import GgUserlane from '@icons/gg/Userlane';
import IonIosMore from '@icons/ion/IosMore';
import MsScheduleOutlineRounded from '@icons/material-symbols/ScheduleOutlineRounded';
import RxPinTop from '@icons/radix-icons/PinTop';
import TbHome from '@icons/tabler/Home';
import TbList from '@icons/tabler/List';
import { UnstyledButton } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const [isMoving, setIsMoving] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('global.bottomTab.bottomInner');

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let prevY = 0;

    const onScroll = () => {
      if (timer) return;
      setIsMoving(() => true);
      timer = setTimeout(() => {
        /** 문서 상단부터 뷰포트 상단까지의 높이 */
        const currentScrollY = window.scrollY;
        let direction = currentScrollY > prevY ? Direction.down : Direction.up;
        prevY = currentScrollY;

        // 스크롤이 끝까지 내려갔는지 판단
        /** 현재 뷰포트의 높이 */
        const windowHeight = window.innerHeight;
        /** 전체 문서의 높이 */
        const documentHeight = document.documentElement.scrollHeight;
        const scrolledToBottom = windowHeight + currentScrollY >= documentHeight;
        if (scrolledToBottom) direction = Direction.end;

        setDirection(() => direction);
        setWindowY(() => currentScrollY);
        setIsMoving(() => false);
        timer = null;
      }, 1000);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      // 페이지 이동시 초기화
      setDirection(() => Direction.up);
      setWindowY(() => 0);
      setIsMoving(() => false);
    };
  }, [pathname]);

  const hideBottomTab = windowY > 56 && isMoving;
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
        <RxPinTop width="2rem" height="2rem" />
      </UnstyledButton>
      <ul className={css.list}>
        <li>
          <UnstyledButton
            component={Link}
            href="/setlist"
            className={css.item}
            data-current={pathname === '/setlist'}
          >
            <TbList />
            <span>{t('setlist')}</span>
          </UnstyledButton>
        </li>
        <li>
          <UnstyledButton
            component={Link}
            href="/channel"
            className={css.item}
            data-current={pathname === '/channel'}
          >
            <GgUserlane />
            <span>{t('channel')}</span>
          </UnstyledButton>
        </li>
        <li>
          <UnstyledButton
            component={Link}
            href="/"
            className={css.item}
            data-current={pathname === '/'}
          >
            <TbHome />
            <span>{t('home')}</span>
          </UnstyledButton>
        </li>
        <li>
          <UnstyledButton
            component={Link}
            href="/schedule"
            className={css.item}
            data-current={pathname === '/schedule'}
          >
            <MsScheduleOutlineRounded />
            <span>{t('schedule')}</span>
          </UnstyledButton>
        </li>
        <li>
          <UnstyledButton className={css.item} onClick={openDrawer}>
            <IonIosMore width="1.5rem" height="1.5rem" />
            <span>{t('more')}</span>
          </UnstyledButton>
        </li>
      </ul>
    </div>
  );
}
