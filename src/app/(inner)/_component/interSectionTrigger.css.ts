import { flexCenter } from '@/style/var.css';
import { style } from '@vanilla-extract/css';

export const wrap = style([
  flexCenter,
  {
    height: '1.5rem',
    width: '100%',
  },
]);

export const inner = style({});
