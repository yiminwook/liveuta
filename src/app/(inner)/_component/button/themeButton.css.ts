import { BEZIER_CURVE } from '@/style/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const button = style({
  width: '2.5rem',
  height: '2.5rem',
  padding: '0.5rem',
  borderRadius: 5,
  transition: `background-color 0.2s ${BEZIER_CURVE}`,
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
});

globalStyle(`${button} > svg `, {
  width: '100%',
  height: '100%',
});
