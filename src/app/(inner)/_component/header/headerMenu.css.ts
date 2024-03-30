import { global } from '@/style/globalTheme.css';
import { openMenu } from '@/style/keyframe.css';
import { BEZIER_CURVE, BOX_SHADOW } from '@/style/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const root = style({});

export const trigger = style({
  width: '7.5rem',
  height: '3.5rem',
  fontWeight: 600,
  fontSize: '1.05rem',
  ':focus': {
    outline: 'none',
  },
});

export const content = style({
  animation: `${openMenu} 0.3s ease-out`,
  backgroundColor: global.color.fourth[95],
  width: '8.5rem',
  display: 'none',
  padding: '0.25rem 0',
  borderRadius: 5,
  boxShadow: BOX_SHADOW,
  ':focus': {
    outline: 'none',
  },
});

globalStyle(`${root}:hover ${content}`, {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const item = style({
  color: global.color.text.default,
  fontWeight: 500,
  padding: '0.25rem 0.5rem',
  transition: `background-color 0.3s ${BEZIER_CURVE}`,
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: global.color.fourth.default,
    },
    '&.active': {
      color: global.color.text.active,
    },
  },
});
