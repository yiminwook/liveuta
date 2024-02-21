import { flexCenter } from '@/style/var.css';
import { style } from '@vanilla-extract/css';

export const wrap = style([
  flexCenter,
  {
    width: '100%',
  },
]);

export const inner = style({});

export const loading = style({
  width: '2rem',
  height: '2rem',
  backgroundColor: '#fff',
});
