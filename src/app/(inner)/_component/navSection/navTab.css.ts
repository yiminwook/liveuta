import { global } from '@/style/globalTheme.css';
import { BOX_SHADOW } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  display: 'flex',
  justifyContent: 'space-around',
  width: '13rem',
  overflow: 'hidden',
  borderRadius: 5,
  boxShadow: BOX_SHADOW,
});

export const list = style({
  width: '100%',
});

export const link = style({
  display: 'inline-block',
  backgroundColor: '#fff',
  width: '100%',
  lineHeight: 2.4,
  textAlign: 'center',
  transition: 'background-color 0.2s linear',
  ':hover': {
    backgroundColor: global.color.text.light,
    color: '#fff',
  },
  selectors: {
    '&:focus-visible': {
      outlineOffset: -4,
    },
    '&.active': {
      backgroundColor: global.color.text.light,
      color: global.color.text.default,
    },
  },
});
