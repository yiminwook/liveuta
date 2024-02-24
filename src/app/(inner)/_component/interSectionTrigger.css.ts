import { flexCenter } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style([
  flexCenter,
  {
    width: '100%',
  },
]);

export const inner = style({
  padding: '1rem',
});

export const loading = style({
  width: '2rem',
  height: '2rem',
  backgroundColor: '#fff',
});
