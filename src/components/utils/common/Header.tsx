'use client';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import UtilsBreadcrumb from './Breadcrumb';
import css from './Header.module.scss';
import { useMobileDrawerContext } from './MobileDrawerContext';

export default function UtilsHeader() {
  const t = useTranslations('utils.header');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = useMemo(() => windowWidth < 480, [windowWidth]);
  const { isOpen: isMobileSidebarOpen, setIsOpen: setMobileSidebarOpen } = useMobileDrawerContext();

  const toggleSidebar = useCallback(
    () => setMobileSidebarOpen(!isMobileSidebarOpen),
    [isMobileSidebarOpen],
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={css.wrap}>
      <div className={css.mobileSidebarToggleWrap} data-mobile={isMobile}>
        <Tooltip label={isMobileSidebarOpen ? t('closeMobileSidebar') : t('openMobileSidebar')}>
          <ActionIcon onClick={toggleSidebar} variant="ghost">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
            </svg>
          </ActionIcon>
        </Tooltip>
      </div>
      <UtilsBreadcrumb />
    </div>
  );
}
