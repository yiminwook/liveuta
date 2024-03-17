import { style } from '@vanilla-extract/css';
import { BREAK_POINT, absoluteCenter, fixedMaxSize, flexCenter, zIndex } from '@/style/var';
import { global } from '@/style/globalTheme.css';

export const wrap = style([
  flexCenter,
  zIndex.toast,
  fixedMaxSize,
  {
    fontSize: '2rem',
  },
]);

export const inner = style([
  absoluteCenter,
  {
    color: global.color.first.light,
    textAlign: 'center',
    width: '75%',
    aspectRatio: '1/1',
    maxWidth: BREAK_POINT.sm,
  },
]);

export const image = style({
  objectFit: 'cover',
});
