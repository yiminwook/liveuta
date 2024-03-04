import { style } from '@vanilla-extract/css';

export const wrap = style([
  {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: -1,
    backgroundColor: 'var(--liveuta-backdrop-color)',
  },
]);
