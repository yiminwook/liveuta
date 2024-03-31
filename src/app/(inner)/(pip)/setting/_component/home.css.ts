import { global } from '@/style/globalTheme.css';
import { BEZIER_CURVE } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  padding: '1rem',
});

export const linkBox = style({
  padding: '0.5rem',
});

export const customLink = style({
  transition: `color 0.3s ${BEZIER_CURVE}`,
  ':hover': {
    color: global.color.text.active,
  },
});
