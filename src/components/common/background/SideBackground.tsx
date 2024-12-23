import classNames from 'classnames';
import { CSSProperties } from 'react';
import css from './Background.module.scss';

type SideBackgroundProps = {
  side: 'left' | 'right';
  width?: CSSProperties['width'];
};

/** 모바일에서는 display:none; */
export default function SideBackground({ side, width = '10vw' }: SideBackgroundProps) {
  return <div className={classNames(css.sideBg, side)} style={{ width }} />;
}
