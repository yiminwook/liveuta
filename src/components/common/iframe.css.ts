import { global } from '@/styles/globalTheme.css';
import { BEZIER_CURVE, BOX_SHADOW, flexCenter } from '@/styles/var';
import { style } from '@vanilla-extract/css';

export const wrap = style([
  flexCenter,
  {
    position: 'relative',
    height: 'calc(100dvh - 7.5rem - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
    textAlign: 'center',
  },
]);

export const inner = style({
  width: '100%',
  height: '100%',
});

export const iframe = style({
  width: '100%',
  height: '100%',
  backgroundColor: global.color.backdrop,
  boxShadow: BOX_SHADOW,
});

export const openButton = style({
  position: 'absolute',
  top: '0.75rem',
  right: '0.75rem',
  fontSize: '1.1rem',
  padding: '0.2rem 0.6rem',
  borderRadius: 100,
  color: '#fff',
  backgroundColor: global.color.third.default,
  border: `2px solid #fff`,
  boxShadow: BOX_SHADOW,
  letterSpacing: 1,
  transition: `background-color 0.8s ${BEZIER_CURVE}`,
  ':hover': {
    backgroundColor: global.color.first.darken,
  },
});
