import { Anchor, Breadcrumbs } from '@mantine/core';
import { useTranslations } from 'next-intl';

type BreadcrumbProps = {
  items: { title: string; href: string }[];
};

export default function UtilsBreadcrumb({ items }: BreadcrumbProps) {
  const t = useTranslations('utils');

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
