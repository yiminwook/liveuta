import { Link } from '@/libraries/i18n';
import { useTranslations } from '@/libraries/i18n/client';
import { usePathname } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import GgUserlane from '@icons/gg/Userlane';
import IonIosMore from '@icons/ion/IosMore';
import MsScheduleOutlineRounded from '@icons/material-symbols/ScheduleOutlineRounded';
import RxPinTop from '@icons/radix-icons/PinTop';
import TbHome from '@icons/tabler/Home';
import TbList from '@icons/tabler/List';
import { UnstyledButton } from '@mantine/core';
import { useEffect, useRef } from 'react';
import css from './BottomInner.module.scss';

type BottomInnerProps = {
  openDrawer: () => void;
  locale: TLocaleCode;
};

export default function BottomInner({ openDrawer, locale }: BottomInnerProps) {
  const pathname = usePathname();
  const { t } = useTranslations();
  const tabRef = useRef<HTMLDivElement>(null!);
  const topButtonRef = useRef<HTMLButtonElement>(null!);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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
      const rawScrollY = window.scrollY;
      /**  모바일에서 상단 바운스 때문에 scrollY가 음수가 되었다면 0으로 보정 */
      const currentScrollY = rawScrollY < 0 ? 0 : rawScrollY;
      /** 현재 뷰포트의 높이 */
      const windowHeight = window.innerHeight;
      /** 전체 문서의 높이 */
      const documentHeight = document.documentElement.scrollHeight;
      /** 탭의 높이 */
      const tabHeight = tabRef.current.getBoundingClientRect().height;

      const scrolledToBottom = windowHeight + currentScrollY >= documentHeight;

      moveY = prevY - currentScrollY;
      translateY -= moveY; // -= : 스크롤을 올릴 때, translateY가 증가한다.
      prevY = currentScrollY;

      if (window.scrollY <= tabHeight) {
        // 스크롤 높이가 탭 높이보다 작을 때, 버튼을 숨긴다
        topButtonRef.current.style.visibility = 'hidden';
        // 모바일 브라우저 상단(URL부분)이 내려오면서 아래로 스크롤되어 translateY가 0보다 커지는걸 방지
        translateY = 0;
      } else {
        // 스크롤 높이가 탭 높이보다 클 때, 버튼이 보이게 한다.
        topButtonRef.current.style.visibility = 'visible';
      }

      // 탭이 높이보다 더 아래로 내려가지 않도록 제한
      if (translateY > tabHeight) translateY = tabHeight;
      // 탭이 화면 위로 올라가지 않도록 제한
      if (translateY < 0) translateY = 0;
      // 스크롤이 끝까지 내려갔다면 탭이 보이게 한다.
      if (scrolledToBottom) translateY = 0;

      // 탭내려가는거 방지, UX가 생각보다 불편함.
      // tabRef.current.style.transform = `translateY(${translateY}px)`;
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
            locale={locale}
            href="/setlist"
            className={css.item}
            data-current={pathname === '/setlist'}
          >
            <TbList />
            <span>{t('global.bottomTab.bottomInner.setlist')}</span>
          </UnstyledButton>
        </li>
        <li>
          <UnstyledButton
            component={Link}
            locale={locale}
            href="/channel"
            className={css.item}
            data-current={pathname === '/channel'}
          >
            <GgUserlane />
            <span>{t('global.bottomTab.bottomInner.channel')}</span>
          </UnstyledButton>
        </li>
        <li>
          <UnstyledButton
            component={Link}
            locale={locale}
            href="/"
            className={css.item}
            data-current={pathname === '/'}
          >
            <TbHome />
            <span>{t('global.bottomTab.bottomInner.home')}</span>
          </UnstyledButton>
        </li>
        <li>
          <UnstyledButton
            component={Link}
            locale={locale}
            href="/schedule"
            className={css.item}
            data-current={pathname === '/schedule'}
          >
            <MsScheduleOutlineRounded />
            <span>{t('global.bottomTab.bottomInner.schedule')}</span>
          </UnstyledButton>
        </li>
        <li>
          <UnstyledButton className={css.item} onClick={openDrawer}>
            <IonIosMore width="1.5rem" height="1.5rem" />
            <span>{t('global.bottomTab.bottomInner.more')}</span>
          </UnstyledButton>
        </li>
      </ul>
    </div>
  );
}
