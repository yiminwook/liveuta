import clsx from 'clsx';
import { MouseEventHandler, Ref, TouchEventHandler } from 'react';
import { Layout } from 'react-grid-layout';
import css from './grid.module.scss';
import { DragHandle, RemoveHandle } from './grid-item-handler';
import GridPlayer from './grid-player';

type Props = {
  className?: string;
  ref?: Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  onMouseUp?: MouseEventHandler<HTMLDivElement>;
  onTouchEnd?: TouchEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
  url: string;
  onRemove: () => void;
  layout: Layout;
};

export default function GridLayoutItem({
  className,
  style,
  ref,
  url,
  children,
  onRemove,
  layout,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={clsx(className, css.box)}
      ref={ref}
      style={{ ...style }}
      data-grid={layout}
    >
      <GridPlayer url={url} />
      <DragHandle />
      <RemoveHandle onClick={onRemove} />
      {children}
    </div>
  );
}
