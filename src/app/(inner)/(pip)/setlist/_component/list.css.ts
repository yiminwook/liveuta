import { BEZIER_CURVE, BOX_SHADOW, responsive, textLine } from '@/style/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const wrap = style({});

export const pagenationBox = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '0.5rem',
  padding: '1rem 0',
});

export const pagenationButton = style({
  padding: '0.5rem',
  fontWeight: 500,
});

export const table = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  boxShadow: BOX_SHADOW,
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
});

export const row = style([
  {
    boxSizing: 'border-box',
    display: 'flex',
    borderBottom: '1px solid #ddd',
    transition: `background-color 0.2s ${BEZIER_CURVE}`,
    padding: '0 0.5rem',
    selectors: {
      '&.hover': {
        cursor: 'pointer',
      },
      '&.hover:hover': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
      },
    },
  },
]);

export const header = style([
  row,
  {
    borderBottom: '2px solid #ddd',
    height: '3rem',
    alignItems: 'center',
    display: 'none',
    fontWeight: 500,
  },
  responsive({
    md: {
      display: 'flex',
    },
  }),
]);

export const footer = style([{}]);

export const cell = style({
  flex: 1,
  padding: '0.5rem',
  selectors: {},
});

export const headerCell = style([cell, {}]);

export const thumbnailBox = style({
  position: 'relative',
  objectFit: 'cover',
  aspectRatio: '16 / 9',
  width: '100%',
  overflow: 'hidden',
});

globalStyle(`${thumbnailBox} > img`, {
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

globalStyle('.flex2', {
  flex: 2,
});

globalStyle('.flex3', {
  flex: 3,
});

export const mobileRow = style([
  {
    position: 'relative',
    display: 'flex',
    padding: '0.5rem',
    gap: '0.5rem',
    transition: `background-color 0.2s ${BEZIER_CURVE}`,
    selectors: {
      '&:after': {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        borderBottom: '1px solid #ddd',
        content: '',
      },
      '&.hover': {
        cursor: 'pointer',
      },
      '&.hover:hover': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
      },
    },
  },
]);

export const mobileLeft = style([
  {
    flex: 1,
  },
]);

export const mobileRight = style([
  {
    flex: 2,
  },
]);

export const mobileTitle = style([textLine('1.6rem', 2), {}]);
