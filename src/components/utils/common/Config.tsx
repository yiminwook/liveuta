import Show from '@/components/common/utils/Show';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import css from './Config.module.scss';

type UtilsConfigRootProps = {
  children: ReactNode;
  className?: string;
};

function UtilsConfigRoot({ children, className }: UtilsConfigRootProps) {
  return <section className={clsx(css.configRoot, className)}>{children}</section>;
}

type UtilsConfigItemProps = {
  children: ReactNode;
  className?: string;
};

function UtilsConfigItem({ children, className }: UtilsConfigItemProps) {
  return <div className={clsx(css.configItem, className)}>{children}</div>;
}

type UtilsConfigItemHeaderProps = {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

function UtilsConfigItemHeader({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: UtilsConfigItemHeaderProps) {
  return (
    <div className={clsx(css.configItemHeader, className)}>
      <h3 className={clsx(css.configItemTitle, titleClassName)}>{title}</h3>
      <Show when={description !== undefined}>
        <p className={clsx(css.configItemDescription, descriptionClassName)}>{description}</p>
      </Show>
    </div>
  );
}

type UtilsConfigItemContentsProps = {
  children: ReactNode;
  className?: string;
};

function UtilsConfigItemContents({ children, className }: UtilsConfigItemContentsProps) {
  return <div className={className}>{children}</div>;
}

export { UtilsConfigRoot, UtilsConfigItem, UtilsConfigItemHeader, UtilsConfigItemContents };
