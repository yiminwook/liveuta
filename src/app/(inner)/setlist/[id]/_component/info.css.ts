import { textOneLine } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style({});

export const title = style([
  textOneLine,
  {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    fontWeight: 500,
  },
]);

export const nav = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '1rem',
  padding: '0.5rem 0',
});
