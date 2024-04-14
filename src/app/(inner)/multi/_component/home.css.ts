import { responsive } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style([
  {
    display: 'flex',
    height: 'calc(100dvh - 3.5rem - env(safe-area-inset-top))',
    position: 'relative',
    flexDirection: 'column',
  },
  responsive({
    sm: {
      flexDirection: 'row',
    },
  }),
]);

export const playerBox = style([
  {
    flex: 1,
    height: '100%',
  },
]);
