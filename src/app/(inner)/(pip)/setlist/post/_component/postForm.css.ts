import { d } from '@tanstack/react-query-devtools/build/legacy/devtools-dKCOqp9Q';
import { globalStyle, style } from '@vanilla-extract/css';

export const wrap = style({
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  textAlign: 'center',
});

export const formSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const inputBox = style({
  display: 'grid',
});

export const inputLabel = style({
  textAlign: 'left',
});

export const input = style({
  backgroundColor: 'transparent',
  padding: '0.5rem',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#ddd',
  borderRadius: '0.3rem',
  transitionProperty: 'border-color',
  transitionDuration: '100ms',
  transitionTimingFunction: 'ease-in-out',
  ':hover': {
    borderColor: '#000',
  },
  ':focus-visible': {
    borderColor: 'var(--liveuta-active-color)',
    outline: 'none',
  },
  ':active': {
    borderColor: 'var(--liveuta-active-color)',
    outline: 'none',
  },
});

export const textAreaBox = style({
  display: 'inline-flex',
  flexDirection: 'column',
  width: '100%',
});

export const textAreaHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
});

export const textAreaLabel = style({
  textAlign: 'left',
});

export const textAreaControlButton = style({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '0.3rem',
  transitionProperty: 'background-color',
  transitionDuration: '100ms',
  transitionTimingFunction: 'ease-in-out',
  ':hover': {
    backgroundColor: '#f6f6f6',
  },
  ':active': {
    backgroundColor: '#eeeeee',
  },
});

globalStyle(`${textAreaControlButton} > svg`, {
  width: '1.3rem',
  height: '1.3rem',
});

export const textAreaBody = style({
  flex: 1,
});

export const textArea = style({
  width: '100%',
  padding: '0.5rem',
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
