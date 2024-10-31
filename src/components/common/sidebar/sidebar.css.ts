import { global } from '@/styles/globalTheme.css';
import { BEZIER_CURVE, fixedMaxSize, responsive, zIndex } from '@/styles/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const wrap = style([
  zIndex.sidebar,
  fixedMaxSize,
  {
    visibility: 'hidden',
    color: global.color.text.default,
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
  backgroundColor: global.color.first.light,
  width: '18rem',
  top: 0,
  height: '100%',
  overflowY: 'auto',
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
});

export const logoutButtonBox = style({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.5rem',
});

export const logoutButton = style({
  fontWeight: 600,
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem',
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
  color: global.color.text.light,
});
