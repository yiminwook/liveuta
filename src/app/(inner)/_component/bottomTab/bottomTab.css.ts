import { global } from '@/style/globalTheme.css';
import { BEZIER_CURVE, BOX_SHADOW, flexCenter, responsive, zIndex } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style([
  {
    height: '4rem',
    display: 'block',
  },
  responsive({
    md: {
      display: 'none',
    },
  }),
]);

export const inner = style([
  zIndex.header,
  {
    position: 'fixed',
    bottom: 'calc(0px - env(safe-area-inset-bottom))',
    height: '4rem',
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
]);

export const topButton = style([
  flexCenter,
  {
    position: 'absolute',
    top: -63,
    right: 21,
    width: 42,
    height: 42,
    color: global.color.text.default,
    backgroundColor: global.color.fourth[95],
    borderRadius: 5,
    boxShadow: BOX_SHADOW,
  },
]);

export const list = style({
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  textAlign: 'center',
  alignItems: 'center',
  height: '100%',
  overflow: 'hidden',
});

export const item = style({
  display: 'flex',
  flexDirection: 'column',
});
