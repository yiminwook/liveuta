import { AntDesignDragOutlined } from '@/icons';
import { IconX } from '@tabler/icons-react';
import classNames from 'classnames';
import { MouseEventHandler, Ref, TouchEventHandler } from 'react';
import css from './Grid.module.scss';

type DragHandleProps = {
  className?: string;
  ref?: Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  onMouseUp?: MouseEventHandler<HTMLDivElement>;
  onTouchEnd?: TouchEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
};

export function DragHandle({ className, style, ref, children, ...props }: DragHandleProps) {
  return (
    <span {...props} className={classNames(className, css.drag)} style={{ ...style }} ref={ref}>
      <AntDesignDragOutlined width={20} height={20} />
      {children}
    </span>
  );
}

export function RemoveHandle({ onClick }: { onClick: () => void }) {
  return (
    <span className={classNames(css.remove)} onClick={onClick}>
      <IconX color="#fff" size={20} />
    </span>
  );
}
