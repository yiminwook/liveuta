import { global } from '@/style/globalTheme.css';
import { BEZIER_CURVE, BOX_SHADOW, responsive } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const navSection = style([
  {
    position: 'sticky',
    top: '3.5rem',
    zIndex: 2,
    display: 'flex',
    color: global.color.first.default,
    fontWeight: 500,
    padding: '0.5rem',
  },
  responsive({
    md: {
      padding: '1rem',
      position: 'inherit',
    },
  }),
]);

export const navScrollBox = style({
  width: '100%',

  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const navInner = style({
  display: 'flex',
  justifyContent: 'space-between',
  minWidth: '18.75rem',
});

export const navSelectBox = style({
  position: 'relative',
  borderRadius: 5,
  backgroundColor: '#fff',
  boxShadow: BOX_SHADOW,
});

export const navButton = style({
  width: '7.5rem',
  height: '2.4rem',
  padding: '0.5rem 0.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: 5,
  transition: `background-color 0.2s ${BEZIER_CURVE}`,
  ':hover': {
    backgroundColor: global.color.first.light,
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
    backgroundColor: global.color.first.dark,
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
      backgroundColor: global.color.first.dark,
      color: global.color.text.light,
    },
    '&.active': {
      color: global.color.first.darken,
      fontWeight: 600,
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
