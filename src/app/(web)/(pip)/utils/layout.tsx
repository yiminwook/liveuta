'use client';
import Background from '@/components/common/background/Background';
import UtilsBreadcrumb from '@/components/utils/common/Breadcrumb';
import { UtilsBreadcrumbProvider } from '@/components/utils/common/BreadcrumbContext';
import UtilsHeader from '@/components/utils/common/Header';
import { UtilsLinksProvider } from '@/components/utils/common/Links';
import UtilsMobileDrawer from '@/components/utils/common/MobileDrawer';
import { MobileDrawerProvider } from '@/components/utils/common/MobileDrawerContext';
import UtilsSidebar from '@/components/utils/common/Sidebar';
import type { PropsWithChildren } from 'react';
import css from './layout.module.scss';

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
