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
        <Anchor href="/">Liveuta</Anchor>
        <Anchor href="/utils">{t('title')}</Anchor>
        {items.map((item) => (
          <Anchor href={item.href} key={`utils-breadcrumb-${item.title}`}>
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>
    </div>
  );
}
