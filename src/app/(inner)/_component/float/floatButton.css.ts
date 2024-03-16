import { BEZIER_CURVE, flexCenter, preventUserSelect, responsive, zIndex } from '@/style/var';
import { style } from '@vanilla-extract/css';
import { global } from '@/style/globalTheme.css';
import { loading } from '@/style/keyframe.css';

export const floatNav = style([
  zIndex.float,
  {
    position: 'fixed',
    right: 24,
    bottom: 'calc(env(safe-area-inset-bottom) + 24px)',
    width: 240,
    height: 240,
  },
  responsive({
    sm: {},
  }),
]);

export const floatNavInner = style({
  background: '#fff',
  width: 240,
  height: 240,
  borderRadius: 15,
  overflow: 'hidden',
});

export const floatList = style({
  padding: 16,
});

export const scrollUpButton = style({
  position: 'absolute',
  bottom: 15,
  right: 15,
  cursor: 'pointer',
  color: global.color.first.dark,
});

export const toggleButton = style([
  zIndex.float,
  flexCenter,
  preventUserSelect,
  {
    boxShadow: '0px 1px 2px 0 rgba(56, 52, 52, 0.75)',
    position: 'fixed',
    bottom: 'calc(env(safe-area-inset-bottom) + 24px)',
    width: 52,
    height: 52,
    padding: 2,
    color: global.color.text.light,
    backgroundColor: global.color.second.default,
    borderRadius: '100%',
    border: 'none',
    visibility: 'visible',
    opacity: 1,
    transition: `all 0.2s ${BEZIER_CURVE}`,
    selectors: {
      '&.left': {
        left: 24,
      },
      '&.right': {
        right: 24,
      },
      '&.hide': {
        visibility: 'hidden',
        opacity: 0,
      },
      '&.hover:hover': {
        backgroundColor: global.color.second.light,
      },
    },
  },
]);

export const networkSvg = style({
  position: 'absolute',
});

export const loadingSvg = style({
  position: 'absolute',
  transform: 'rotate(-90deg)',
  animation: `${loading} 1.5s 0.5s infinite linear`,
});
