import { global } from '@/style/globalTheme.css';
import { BEZIER_CURVE, BOX_SHADOW, flexCenter } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style([
  flexCenter,
  {
    position: 'relative',
    height: 'calc(100dvh - 3.5rem - 5rem - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
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
  boxSizing: 'border-box',
  top: '0.75rem',
  right: '0.75rem',
  fontSize: '1.1rem',
  padding: '0.2rem 0.6rem',
  borderRadius: 100,
  color: '#fff',
  backgroundColor: global.color.third.default,
  border: `2px solid #fff`,
  boxShadow: BOX_SHADOW,
  transition: `background-color 0.8s ${BEZIER_CURVE}`,
  ':hover': {
    backgroundColor: global.color.first.darken,
  },
});
