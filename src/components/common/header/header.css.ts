import { global } from '@/styles/globalTheme.css';
import { BEZIER_CURVE, BOX_SHADOW, BREAK_POINT, responsive, textLine, zIndex } from '@/styles/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const blank = style({
  height: 'calc(3.5rem + env(safe-area-inset-top))',
  paddingTop: 'env(safe-area-inset-top)',
});

export const inner = style([
  zIndex.header,
  {
    margin: 0,
    paddingTop: 'env(safe-area-inset-top)',
    top: 0,
    left: 0,
    width: '100%',
    height: 'calc(3.5rem + env(safe-area-inset-top))',
    position: 'fixed',
    backgroundColor: global.color.first[50],
    backdropFilter: 'blur(8px)',
    transition: `background-color 0.5s ${BEZIER_CURVE}`,
    boxShadow: '0px 1px 2px 0 rgba(56, 52, 52, 0.4)',
    willChange: 'background-color',
    selectors: {
      '&:hover': {
        backgroundColor: `${global.color.first[50]} !important`,
      },
    },
  },
]);

export const nav = style([
  {
    margin: 'auto',
    maxWidth: BREAK_POINT['2xl'],
    height: '3.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: global.color.text.active,
    padding: '0 0.5rem',
  },
  responsive({
    md: {
      padding: '0 1.5rem',
    },
  }),
]);

export const title = style([
  textLine('2.2rem', 1),
  {
    fontSize: '2rem',
    color: global.color.title,
    fontWeight: 600,
  },
]);

export const accountButton = style({
  width: 40,
  height: 40,
});

export const right = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

globalStyle(`${right} > ul`, {
  display: 'none',
  alignItems: 'center',
  gap: '1rem',
  ...responsive({
    md: {
      display: 'flex',
    },
  }),
});

export const searchBox = style({
  width: '15rem',
  color: 'black',
  display: 'none',
  ...responsive({
    md: {
      display: 'block',
    },
  }),
});

export const loginButton = style([
  {
    display: 'block',
    borderRadius: 5,
    padding: '0.25rem 0.5rem',
    width: '3.75rem',
    textAlign: 'center',
    backgroundColor: global.color.third.default,
    color: '#fff',
    transition: `background-color 0.8s ${BEZIER_CURVE}`,
    boxShadow: BOX_SHADOW,
    ':hover': {
      backgroundColor: global.color.third.light,
    },
  },
]);
