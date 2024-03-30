import { global } from '@/style/globalTheme.css';
import {
  BEZIER_CURVE,
  BOX_SHADOW,
  BREAK_POINT,
  flexCenter,
  responsive,
  textLine,
} from '@/style/var';
import { style } from '@vanilla-extract/css';

export const navSection = style([
  {
    position: 'sticky',
    top: 'calc(3.5rem + env(safe-area-inset-top))',
    zIndex: 2,
    display: 'flex',
    color: global.color.second.dark,
    fontWeight: 500,
    maxWidth: BREAK_POINT.full,
    padding: '0.5rem',
    gap: '0.5rem',
    justifyContent: 'space-between',
  },
  responsive({
    md: {
      position: 'inherit',
    },
  }),
]);

export const left = style({
  display: 'flex',
  gap: '0.5rem',
});

export const favoriteButton = style([
  flexCenter,
  {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '2.5rem',
    height: '2.5rem',
    boxShadow: BOX_SHADOW,
    transition: `background-color 0.3s ${BEZIER_CURVE}`,
    ':hover': {
      backgroundColor: global.color.lightYellow,
    },
  },
]);

export const navTabBox = style([
  {
    display: 'none',
  },
  responsive({
    sm: {
      display: 'block',
    },
  }),
]);

export const right = style({
  display: 'flex',
  gap: '0.5rem',
});

export const mobileNavButton = style([
  {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: '0 0.5rem',
    height: '2.5rem',
    boxShadow: BOX_SHADOW,
    transition: `color 0.3s ${BEZIER_CURVE}, background-color 0.3s ${BEZIER_CURVE}`,
    ':hover': {
      color: '#fff',
      backgroundColor: global.color.second.dark,
    },
  },
  responsive({
    md: {
      display: 'none',
    },
  }),
]);

export const text = style([textLine('1.6rem', 1), {}]);
