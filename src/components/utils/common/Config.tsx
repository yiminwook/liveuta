import Show from '@/components/common/utils/Show';
import cx from 'classnames';
import type { ReactNode } from 'react';
import css from './Config.module.scss';

type UtilsConfigRootProps = {
  children: ReactNode;
  className?: string;
};

function UtilsConfigRoot({ children, className }: UtilsConfigRootProps) {
  return <section className={cx(css.configRoot, className)}>{children}</section>;
}

type UtilsConfigItemProps = {
  children: ReactNode;
  className?: string;
};

function UtilsConfigItem({ children, className }: UtilsConfigItemProps) {
  return <div className={cx(css.configItem, className)}>{children}</div>;
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
    <div className={cx(css.configItemHeader, className)}>
      <h3 className={cx(css.configItemTitle, titleClassName)}>{title}</h3>
      <Show when={description !== undefined}>
        <p className={cx(css.configItemDescription, descriptionClassName)}>{description}</p>
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
