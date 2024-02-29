import { style } from '@vanilla-extract/css';

export const inner = style({
  padding: '0.5rem',
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 500,
});

export const utaToolsLink = style({
  color: '#5DADEC',
  fontWeight: 500,
  fontSize: '1.25rem',
});

export const backLink = style({
  color: 'rgba(100, 100, 100, 1)',
  fontWeight: 500,
  fontSize: '1rem',
  textAlign: 'right',
});

export const formBox = style({
  padding: '0.5rem',
  backgroundColor: 'rgba(255, 255, 255, 0.35)',
  display: 'block',
  margin: '0 auto',
  width: 'min-content',
});

export const desc = style({
  width: '22rem',
  margin: '0 auto',
  fontSize: '1.2rem',
  lineHeight: '1.5rem',
});
