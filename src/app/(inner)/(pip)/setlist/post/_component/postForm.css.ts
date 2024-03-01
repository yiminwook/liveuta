import { style } from '@vanilla-extract/css';

export const wrap = style({
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  textAlign: 'center',
});

export const inputBox = style({
  backgroundColor: '#fff',
  display: 'inline-flex',
  width: '22rem',
});

export const input = style({
  flex: 1,
  backgroundColor: 'transparent',
  padding: '0.5rem',
});

export const textAreaBox = style({
  display: 'inline-flex',
  width: '22rem',
  backgroundColor: '#fff',
});

export const textArea = style({
  flex: 1,
  padding: '0.5rem',
  height: '20rem',
});

export const buttonBox = style({
  display: 'flex',
});

export const button = style({
  backgroundColor: '#fff',
  color: '#000',
  padding: '0.5rem',
  width: '5rem',
  cursor: 'pointer',
  margin: '0 auto',
  fontWeight: 500,
});
