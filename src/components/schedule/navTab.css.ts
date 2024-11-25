import { global } from '@/styles/globalTheme.css';
import { BOX_SHADOW, flexCenter } from '@/styles/var';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  display: 'flex',
  overflow: 'hidden',
  borderRadius: 5,
  boxShadow: BOX_SHADOW,
  height: '2.5rem',
});

export const link = style([
  flexCenter,
  {
    position: 'relative',
    backgroundColor: '#fff',
    flex: 1,
    width: '3.5rem',
    transition: 'background-color 0.2s linear',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: global.color.second.default,
      color: '#fff',
    },
    selectors: {
      '&:focus-visible': {
        outlineOffset: -4,
      },
      '&[data-disabled]': {
        cursor: 'default',
        backgroundColor: global.color.third.default,
        color: '#fff',
      },
    },
  },
]);
