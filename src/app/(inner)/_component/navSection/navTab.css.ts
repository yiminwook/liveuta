import { global } from '@/style/globalTheme.css';
import { BOX_SHADOW } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  display: 'flex',
  overflow: 'hidden',
  borderRadius: 5,
  boxShadow: BOX_SHADOW,
});

export const link = style({
  position: 'relative',
  backgroundColor: '#fff',
  flex: 1,
  width: '3.5rem',
  padding: '0.25rem 0',
  textAlign: 'center',
  transition: 'background-color 0.2s linear',
  cursor: 'pointer',
  ':hover': {
    color: global.color.second.darken,
  },
  selectors: {
    '&:focus-visible': {
      outlineOffset: -4,
    },
    '&[data-disabled]': {
      cursor: 'default',
      backgroundColor: global.color.third.default,
      color: global.color.fourth.default,
    },
  },
});
