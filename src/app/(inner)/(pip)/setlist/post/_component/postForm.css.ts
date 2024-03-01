import { style } from '@vanilla-extract/css';

export const wrap = style({
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  textAlign: 'center',
});

export const inputBox = style({
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
  width: '100%',
});

export const textArea = style({
  flex: 1,
  padding: '0.5rem',
  height: '20rem',
  borderRadius: '0.3rem',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#ddd',
  transitionProperty: 'border-color',
  transitionDuration: '100ms',
  transitionTimingFunction: 'ease-in-out',
  ':hover': {
    borderColor: '#000',
  },
  ':focus-visible': {
    borderColor: 'var(--liveuta-active-color)',
  },
  ':active': {
    borderColor: 'var(--liveuta-active-color)',
  },
});

export const buttonBox = style({
  display: 'flex',
});

export const button = style({
  backgroundColor: 'var(--liveuta-default-color)',
  color: '#fff',
  borderRadius: '0.3rem',
  padding: '0.5rem',
  width: '5rem',
  cursor: 'pointer',
  margin: '0 auto',
  fontWeight: 500,
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  transitionProperty: 'background-color, box-shadow, translate',
  transitionDuration: '100ms',
  transitionTimingFunction: 'ease-in-out',
  ':hover': {
    backgroundColor: 'var(--liveuta-hover-color)',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    translate: '0 -2px',
  },
  ':focus-visible': {
    backgroundColor: 'var(--liveuta-active-color)',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  ':active': {
    backgroundColor: 'var(--liveuta-active-color)',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    translate: '0 -2px',
  },
});
