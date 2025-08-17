import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { Button } from '@mantine/core';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import { ComponentProps } from 'react';
import css from './MoreButton.module.scss';

type MoreButtonProps<C> = ComponentProps<typeof Button<C>> & {
  locale: TLocaleCode;
};

export default function MoreButton<C = 'button'>({
  className,
  rightSection = <ArrowRight />,
  variant = 'transparent',
  locale,
  ...props
}: MoreButtonProps<C>) {
  const { t } = useTranslations();

  return (
    <Button<any>
      {...props}
      locale={locale}
      className={clsx(css.button, className)}
      variant={variant}
      rightSection={rightSection}
    >
      {t('global.moreButton.more')}
    </Button>
  );
}
