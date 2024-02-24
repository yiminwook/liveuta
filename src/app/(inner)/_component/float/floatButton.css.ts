import { BEZIER_CURVE, flexCenter, preventUserSelect, responsive, zIndex } from '@/style/var.css';
import { style } from '@vanilla-extract/css';
import { global } from '@/style/globalTheme.css';
import { loading } from '@/style/keyframe.css';

export const floatBackdrop = style([
  {
    zIndex: zIndex.float.zIndex - 1,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100dvw',
    height: '100dvh',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    transition: `visibility 0.2s ${BEZIER_CURVE}`,
    visibility: 'hidden',
    selectors: {
      '&.show': {
        visibility: 'visible',
      },
    },
  },
]);

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
  boxShadow: '0px 1px 2px 0 rgba(56, 52, 52, 0.8)',
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
  color: 'var(--liveuta-hover-color)',
});

export const toggleButton = style([
  zIndex.float,
  flexCenter,
  preventUserSelect,
  {
    boxShadow: '0px 1px 2px 0 rgba(56, 52, 52, 1)',
    position: 'fixed',
    bottom: 'calc(env(safe-area-inset-bottom) + 24px)',
    width: 52,
    height: 52,
    padding: 2,
    color: global.color.lightFont,
    backgroundColor: 'var(--liveuta-hover-color)',
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
        color: 'var(--liveuta-hover-color)',
        backgroundColor: global.color.lightFont,
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
