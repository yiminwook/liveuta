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
  alignItems: 'center',
  gap: '1rem',
  padding: '0.5rem 0',
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
});

export const youtubeButton = style({});

export const listLink = style({});
