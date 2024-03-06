import { BEZIER_CURVE, responsive, zIndex } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const accountButton = style({
  width: 40,
  height: 40,
});

export const inner = style([
  zIndex.header,
  {
    margin: 0,
    paddingTop: 'env(safe-area-inset-top)',
    top: 0,
    left: 0,
    width: '100%',
    height: '3.5rem',
    position: 'fixed',
    backgroundColor: 'var(--liveuta-header-color)',
    backdropFilter: 'blur(8px)',
    transition: `background-color 0.5s ${BEZIER_CURVE}`,
    boxShadow: '0px 1px 2px 0 rgba(56, 52, 52, 0.4)',
    ':hover': {
      backgroundColor: 'var(--liveuta-header-color) !important',
    },
  },
  responsive({
    md: {
      backgroundColor: 'var(--liveuta-header-color) !important',
    },
  }),
]);
