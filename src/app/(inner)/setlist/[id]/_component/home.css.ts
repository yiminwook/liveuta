import { responsive } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const inner = style([
  {
    display: 'flex',
    flexDirection: 'column',
  },
  responsive({
    md: {
      flexDirection: 'row',
    },
  }),
]);

export const left = style([
  {
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    backgroundColor: 'var(--liveuta-bg-color)',
  },
  responsive({
    md: {},
  }),
]);

export const playerWrap = style({});

export const infoWrap = style({
  padding: '0.5rem',
  fontSize: '1.1rem',
  lineHeight: 1.5,
});

export const right = style({
  boxSizing: 'border-box',
  padding: '0.5rem',
  flex: 1,
  minHeight: 'calc(100dvh - 3.5rem - 5rem)',
  backgroundColor: '#fff',
  fontSize: '1.1rem',
  lineHeight: 1.5,
});
