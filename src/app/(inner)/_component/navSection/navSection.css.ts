import { global } from '@/style/globalTheme.css';
import { BEZIER_CURVE, BOX_SHADOW, BREAK_POINT, responsive } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const navSection = style([
  {
    position: 'sticky',
    top: 'calc(3.5rem + env(safe-area-inset-top))',
    justifyContent: 'space-between',
    zIndex: 2,
    display: 'flex',
    color: global.color.second.default,
    fontWeight: 500,
    maxWidth: BREAK_POINT.full,
    padding: '0.5rem',
  },
  responsive({
    md: {
      padding: '1rem',
      position: 'inherit',
    },
  }),
]);

export const navSelectBox = style({
  position: 'relative',
  borderRadius: 5,
  backgroundColor: '#fff',
  boxShadow: BOX_SHADOW,
});

export const navButton = style({
  boxSizing: 'border-box',
  width: '7.5rem',
  height: '2.5rem',
  padding: '0.5rem 0.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: 5,
  transition: `background-color 0.2s ${BEZIER_CURVE}`,
  ':hover': {
    backgroundColor: global.color.third.default,
    color: global.color.text.light,
  },
});

export const side = style([
  {
    position: 'fixed',
    top: 'calc(env(safe-area-inset-top) + 4.5rem)',
    right: '-190%',
    width: '8rem',
    backgroundColor: '#fff',
    borderRadius: 5,
    display: 'flex',
    overflow: 'hidden',
    transition: `right 0.2s ${BEZIER_CURVE}`,
    boxShadow: BOX_SHADOW,
    selectors: {
      '&.active': {
        right: 0,
      },
    },
  },
  responsive({
    sm: {
      width: '20%',
    },
    xl: {
      width: '10%',
    },
  }),
]);

export const sideButton = style({
  padding: '0.5rem',
  transition: `background-color 0.2s ${BEZIER_CURVE}`,
  ':hover': {
    backgroundColor: global.color.third.default,
    color: global.color.text.light,
  },
});

export const sideList = style({
  width: '100%',
});

export const sideItem = style({
  padding: '0.5rem',
  cursor: 'pointer',
  transition: `background-color 0.2s ${BEZIER_CURVE}`,
  selectors: {
    '&:hover': {
      backgroundColor: global.color.third.default,
      color: global.color.text.light,
    },
    '&.active': {
      backgroundColor: global.color.text.light,
      color: global.color.third.default,
      fontWeight: 600,
      cursor: 'default',
    },
  },
});

export const total = style({
  lineHeight: '2.4rem',
  padding: '0 0.4rem',
  backgroundColor: '#fff',
  borderRadius: 5,
  boxShadow: BOX_SHADOW,
});
