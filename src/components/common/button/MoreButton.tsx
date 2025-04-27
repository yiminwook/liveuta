import { Link } from '@/libraries/i18n';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import IonArrowRightC from '@icons/ion/ArrowRightC';
import { Button, ButtonProps } from '@mantine/core';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import css from './MoreButton.module.scss';

type MoreButtonProps<C> = ComponentProps<typeof Button<C>>;

export default function MoreButton<C = 'button'>({
  className,
  rightSection = <IonArrowRightC />,
  variant = 'transparent',
  ...props
}: MoreButtonProps<C>) {
  const { t } = useTranslations();

  return (
    <Button<any>
      {...props}
      className={classNames(css.button, className)}
      variant={variant}
      rightSection={rightSection}
    >
      {t('global.moreButton.more')}
    </Button>
  );
}
