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
import { useEffect, useRef } from 'react';
import css from './BottomInner.module.scss';

type BottomInnerProps = {
  openDrawer: () => void;
};

export default function BottomInner({ openDrawer }: BottomInnerProps) {
  const pathname = usePathname();
  const t = useTranslations('global.bottomTab.bottomInner');
  const tabRef = useRef<HTMLDivElement>(null!);
  const topButtonRef = useRef<HTMLButtonElement>(null!);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    /** 이전 스크롤 위치 저장 */
    let prevY = 0;
    /** 이전 스크롤 위치와 현재 스크롤 위치의 차이 */
    let moveY = 0;
    /** 이동거리 누적 */
    let translateY = 0;

    const onScroll = () => {
      /** 문서 상단부터 뷰포트 상단까지의 높이 */
      const currentScrollY = window.scrollY;
      /** 현재 뷰포트의 높이 */
      const windowHeight = window.innerHeight;
      /** 전체 문서의 높이 */
      const documentHeight = document.documentElement.scrollHeight;
      /** 탭의 높이 */
      const height = tabRef.current.getBoundingClientRect().height;

      const scrolledToBottom = windowHeight + currentScrollY >= documentHeight;

      moveY = prevY - currentScrollY;
      translateY -= moveY; // -= : 스크롤을 올릴 때, translateY가 증가한다.
      prevY = currentScrollY;

      if (window.scrollY <= height) {
        // 스크롤 높이가 탭 높이보다 작을 때, 버튼을 숨긴다/
        topButtonRef.current.style.visibility = 'hidden';
      } else {
        // 스크롤 높이가 탭 높이보다 클 때, 버튼이 보이게 한다.
        topButtonRef.current.style.visibility = 'visible';
      }

      // 탭이 높이보다 더 아래로 내려가지 않도록 제한
      if (translateY > height) translateY = height;
      // 탭이 화면 위로 올라가지 않도록 제한
      if (translateY < 0) translateY = 0;
      // 스크롤이 끝까지 내려갔다면 탭이 보이게 한다.
      if (scrolledToBottom) translateY = 0;

      tabRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className={css.inner} ref={tabRef}>
      <UnstyledButton
        size="input-md"
        variant="transparent"
        className={css.topButton}
        onClick={scrollUp}
        ref={topButtonRef}
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
