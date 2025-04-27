import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { Breadcrumbs } from '@mantine/core';
import { useUtilsBreadcrumbContext } from './BreadcrumbContext';

export type BreadcrumbItem = {
  title: string;
  href: string;
};

export default function UtilsBreadcrumb() {
  const locale = useLocale();
  const { t } = useTranslations(locale);

  const { items } = useUtilsBreadcrumbContext();

  return (
    <div>
      <Breadcrumbs>
        <div>Liveuta</div>
        <div>{t('utils.title')}</div>
        {items.map((item) => (
          <div key={`utils-breadcrumb-${item.title}`}>{item.title}</div>
        ))}
      </Breadcrumbs>
    </div>
  );
}
