import { global } from '@/style/globalTheme.css';
import { BOX_SHADOW, BREAK_POINT, flexCenter, responsive } from '@/style/var';
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
    justifyContent: 'space-between',
    height: '2.5rem',
  },
  responsive({
    md: {
      padding: '1rem',
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
    boxShadow: BOX_SHADOW,
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

export const right = style({});

export const mobileNavButton = style([
  {
    display: 'block',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '2.5rem',
    height: '100%',
    boxShadow: BOX_SHADOW,
  },
  responsive({
    sm: {
      display: 'none',
    },
  }),
]);
