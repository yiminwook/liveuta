import { responsive } from '@/style/var';
import { globalStyle, style } from '@vanilla-extract/css';

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
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    backgroundColor: 'var(--liveuta-bg-color)',
  },
  responsive({
    md: {},
  }),
]);

globalStyle(`${left} > img`, {
  position: 'absolute',
  bottom: 0,
  right: 0,
  display: 'none',
  transform: 'translate(-10%, 40%)',
  ...responsive({
    md: {
      transform: 'translate(0%, 0%)',
    },
    sm: {
      display: 'block',
    },
  }),
});

export const playerWrap = style({
  position: 'relative',
});

export const infoWrap = style({
  position: 'relative',
  padding: '0.5rem',
  fontSize: '1.1rem',
  lineHeight: 1.5,
});

export const right = style({
  position: 'relative',
  boxSizing: 'border-box',
  padding: '0.5rem',
  flex: 1,
  minHeight: 'calc(100dvh - 3.5rem - 5rem)',
  backgroundColor: '#fff',
});
