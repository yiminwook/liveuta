import { textLine } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style({});

export const title = style([
  textLine('1.6rem', 1),
  {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    fontWeight: 500,
  },
]);

export const nav = style({
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  padding: '0.5rem 0.25rem',
});

export const backButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontWeight: 500,
});

export const navRight = style({
  display: 'flex',
  gap: '0.5rem',
});

export const navItem = style({
  padding: '0.25rem 0.5rem',
  display: 'inline-flex',
  height: '100%',
  alignItems: 'center',
  gap: '0.5rem',
  backgroundColor: '#fff',
  fontWeight: 600,
  borderRadius: 5,
  verticalAlign: 'middle',
});

export const youtubeButton = style({});

export const listLink = style({});
