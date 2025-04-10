'use client';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import UtilsBreadcrumb from './Breadcrumb';
import css from './Header.module.scss';
import { useMobileDrawerContext } from './MobileDrawerContext';

export default function UtilsHeader() {
  const t = useTranslations('utils.header');
  const isMobile = useMediaQuery('(max-width: 480px)');
  const { isOpen: isMobileSidebarOpen, setIsOpen: setMobileSidebarOpen } = useMobileDrawerContext();

  const toggleSidebar = useCallback(
    () => setMobileSidebarOpen(!isMobileSidebarOpen),
    [isMobileSidebarOpen],
  );

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
