import { BEZIER_CURVE, responsive, zIndex } from '@/style/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const wrap = style([
  zIndex.sidebar,
  {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    visibility: 'hidden',
    width: '100%',
    color: 'var(--liveuta-default-text-color)',
    transition: 'all 0.3s linear',
    selectors: {
      '&.show': {
        visibility: 'visible',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
      },
      '&.mobile': {
        ...responsive({
          md: {
            display: 'none !important',
          },
        }),
      },
    },
  },
]);

export const inner = style({
  position: 'absolute',
  backgroundColor: 'var(--liveuta-sidebar-color)',
  width: '18rem',
  top: 0,
  bottom: 0,
  paddingTop: 'env(safe-area-inset-top)',
  paddingBottom: 'env(safe-area-inset-bottom)',
  transition: `transform 0.3s cubic-bezier(0.8, 0.05, 0.2, 0.95)`,
  selectors: {
    '&.left': {
      left: '-18rem',
    },
    '&.right': {
      right: '-18rem',
    },
    '&.moveRight': {
      transform: 'translateX(18rem)',
    },
    '&.moveLeft': {
      transform: 'translateX(-18rem)',
    },
  },
});

export const nav = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.5rem 1rem 0 1rem',
  alignItems: 'center',
  color: '#fff',
});

export const logoutButtonBox = style({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
});

export const accountImageBox = style({
  width: 40,
  height: 40,
  borderRadius: '50%',
  overflow: 'hidden',
});

export const logoutButton = style({
  color: 'black',
  fontWeight: 600,
  fontSize: '1rem',
});

globalStyle(`${inner} section`, {
  padding: '3rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

globalStyle(`${inner} h2`, {
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.5rem',
  fontWeight: 600,
});

globalStyle(`${inner} ul`, {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
});

globalStyle(`${inner} ul li a:hover:not(.active)`, {
  transition: `color 0.05s ${BEZIER_CURVE}`,
  color: 'var(--liveuta-hover-color)',
});
