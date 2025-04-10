'use client';
import Background from '@/components/common/background/Background';
import UtilsBreadcrumb from '@/components/utils/common/Breadcrumb';
import { UtilsBreadcrumbProvider } from '@/components/utils/common/BreadcrumbContext';
import { UtilsLinksProvider } from '@/components/utils/common/Links';
import UtilsMobileDrawer from '@/components/utils/common/MobileDrawer';
import { MobileDrawerProvider } from '@/components/utils/common/MobileDrawerContext';
import UtilsSidebar from '@/components/utils/common/Sidebar';
import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';
import css from './layout.module.scss';

const UtilsHeader = dynamic(() => import('@/components/utils/common/Header'), { ssr: false });

export default function UtilsLayout({ children }: PropsWithChildren) {
  return (
    <Background>
      <UtilsLinksProvider>
        <MobileDrawerProvider>
          <UtilsBreadcrumbProvider>
            <div className={css.utilsLayoutRoot}>
              <UtilsSidebar />
              <UtilsMobileDrawer />
              <div>
                <UtilsHeader />
                {children}
              </div>
            </div>
          </UtilsBreadcrumbProvider>
        </MobileDrawerProvider>
      </UtilsLinksProvider>
    </Background>
  );
}
