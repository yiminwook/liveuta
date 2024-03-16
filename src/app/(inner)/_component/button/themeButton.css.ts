import { global } from '@/style/globalTheme.css';
import { BEZIER_CURVE } from '@/style/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const button = style({
  width: '2.5rem',
  height: '2.5rem',
  padding: '0.5rem',
  borderRadius: 5,
  backgroundColor: global.color.third.default,
  color: global.color.third.default,
  transition: `background-color 0.2s ${BEZIER_CURVE}`,
  ':hover': {
    backgroundColor: global.color.third.light,
  },
});

globalStyle(`${button} > svg `, {
  width: '100%',
  height: '100%',
});
