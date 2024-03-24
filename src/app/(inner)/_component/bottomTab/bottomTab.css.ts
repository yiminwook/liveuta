import { global } from '@/style/globalTheme.css';
import {
  BEZIER_CURVE,
  BOX_SHADOW,
  flexCenter,
  responsive,
  zIndex,
  absoluteCenter,
} from '@/style/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const wrap = style([
  {
    height: 'calc(4rem + env(safe-area-inset-bottom))',
    display: 'block',
  },
  responsive({
    md: {
      height: 0,
    },
  }),
]);

export const inner = style([
  zIndex.header,
  {
    position: 'fixed',
    bottom: 0,
    height: 'calc(4rem + env(safe-area-inset-bottom))',
    width: '100dvw',
    fontSize: '0.75rem',
    backgroundColor: global.color.first.darken,
    color: '#fff',
    visibility: 'visible',
    willChange: 'visibility, opacity',
    opacity: 1,
    transition: `visibility 0.3s ${BEZIER_CURVE}, opacity 0.3s ${BEZIER_CURVE}`,
    selectors: {
      '&.hidden': {
        visibility: 'hidden',
        opacity: 0,
      },
    },
  },
  responsive({
    md: {
      height: 0,
    },
  }),
]);

export const topButton = style([
  flexCenter,
  {
    position: 'absolute',
    top: -65,
    right: 30,
    width: 40,
    height: 40,
    color: global.color.text.default,
    backgroundColor: global.color.fourth[95],
    borderRadius: 5,
    boxShadow: BOX_SHADOW,
    visibility: 'hidden',
    selectors: {
      '&.show': {
        visibility: 'visible',
      },
    },
  },
  responsive({
    xl: {
      top: -100,
      right: 100,
      width: 50,
      height: 50,
    },
  }),
]);

export const list = style([
  {
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
    alignItems: 'center',
    height: '4rem',
    overflow: 'hidden',
  },
  responsive({
    md: {
      display: 'none',
    },
  }),
]);

export const item = style([
  flexCenter,
  {
    flexDirection: 'column',
    transition: `color 0.3s ${BEZIER_CURVE}`,
    ':hover': {
      color: global.color.third.lighter,
    },
  },
]);

export const home = style({
  position: 'relative',
  '::before': {
    ...absoluteCenter,
    content: '',
    width: '3.5rem',
    height: '3.5rem',
    backgroundColor: global.color.first.light,
    borderRadius: '100%',
    zIndex: -1,
  },
});
