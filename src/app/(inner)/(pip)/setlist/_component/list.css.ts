import { style } from '@vanilla-extract/css';

export const wrap = style({});

export const title = style({
  fontSize: '1.25rem',
  marginBottom: '0.5rem',
});

export const pagenationBox = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '0.5rem',
  padding: '1rem 0',
});

export const pagenationButton = style({
  padding: '0.5rem',
  fontWeight: 500,
});
