import {
  BEZIER_CURVE,
  boxShadow,
  flexCenter,
  preventUserSelect,
  responsive,
  zIndex,
} from '@/style/var.css';
import { style } from '@vanilla-extract/css';
import { global } from '@/style/globalTheme.css';
import { loading } from '@/style/keyframe.css';

export const floatNav = style([
  {
    position: 'fixed',
    right: 24,
    bottom: 24,
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
  color: 'var(--liveuta-hover-color)',
});

export const toggleButton = style([
  zIndex.float,
  flexCenter,
  preventUserSelect,
  boxShadow,
  {
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
