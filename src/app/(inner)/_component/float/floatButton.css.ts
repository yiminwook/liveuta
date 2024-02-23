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
    right: '24px',
    bottom: '24px',
    width: '240px',
    height: '240px',
  },
  responsive({
    sm: {},
  }),
]);

export const floatNavInner = style({
  background: '#fff',
  width: '240px',
  height: '240px',
  borderRadius: '15px',
  overflow: 'hidden',
});

export const floatList = style({
  padding: '1rem',
});

export const scrollUpButton = style({
  position: 'absolute',
  bottom: '15px',
  right: '15px',
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
    bottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)',
    width: '3.25rem',
    height: '3.25rem',
    padding: '0.125rem',
    color: global.color.lightFont,
    backgroundColor: 'var(--liveuta-hover-color)',
    borderRadius: '100%',
    border: 'none',
    visibility: 'visible',
    opacity: 1,
    transition: `all 0.2s ${BEZIER_CURVE}`,
    selectors: {
      '&.left': {
        left: '1.5rem',
      },
      '&.right': {
        right: '1.5rem',
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
