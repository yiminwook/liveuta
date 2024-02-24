import { BEZIER_CURVE } from '@/style/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const closeButton = style({
  width: '2.5rem',
  height: '2.5rem',
  padding: '0.5rem',
  display: 'flex',
  borderRadius: 5,
  transition: `background-color 0.2s ${BEZIER_CURVE}`,
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
});

globalStyle(`${closeButton} > svg > path`, {
  stroke: 'inherit',
});
