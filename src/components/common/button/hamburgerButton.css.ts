import { BEZIER_CURVE, responsive } from '@/styles/var';
import { style } from '@vanilla-extract/css';

export const button = style([
  {
    display: 'flex',
    padding: '0.3rem',
    borderRadius: 5,
    transition: `background-color 0.8s ${BEZIER_CURVE}`,
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
  },
  responsive({
    md: {
      display: 'none',
    },
  }),
]);
