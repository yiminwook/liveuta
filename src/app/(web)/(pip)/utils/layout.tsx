'use client';
import Background from '@/components/common/background/Background';
import UtilsBreadcrumb from '@/components/utils/common/Breadcrumb';
import { UtilsBreadcrumbProvider } from '@/components/utils/common/BreadcrumbContext';
import UtilsSidebar from '@/components/utils/common/Sidebar';
import type { PropsWithChildren } from 'react';
import css from './layout.module.scss';

export default function UtilsLayout({ children }: PropsWithChildren) {
  return (
    <Background>
      <UtilsBreadcrumbProvider>
        <div className={css.utilsLayoutRoot}>
          <UtilsSidebar />
          <div>
            <div className={css.utilsHeader}>
              <UtilsBreadcrumb />
            </div>
            {children}
          </div>
        </div>
      </UtilsBreadcrumbProvider>
    </Background>
  );
}
