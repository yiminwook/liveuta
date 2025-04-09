import { Anchor, Breadcrumbs } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useUtilsBreadcrumbContext } from './BreadcrumbContext';

export type BreadcrumbItem = {
  title: string;
  href: string;
};

export default function UtilsBreadcrumb() {
  const t = useTranslations('utils');

  const { items } = useUtilsBreadcrumbContext();

  return (
    <div>
      <Breadcrumbs>
        <div>Liveuta</div>
        <div>{t('title')}</div>
        {items.map((item) => (
          <div key={`utils-breadcrumb-${item.title}`}>{item.title}</div>
        ))}
      </Breadcrumbs>
    </div>
  );
}
