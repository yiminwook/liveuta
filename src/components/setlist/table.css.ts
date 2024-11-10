import { global } from '@/styles/globalTheme.css';
import { BEZIER_CURVE, BOX_SHADOW, responsive, textLine } from '@/styles/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const wrap = style({});

export const pagenationBox = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '0.5rem',
  padding: '1rem 0',
  overflowX: 'auto',
  '::-webkit-scrollbar': {
    height: 5,
  },
});

export const pagenationButton = style({
  padding: '0.5rem',
  fontWeight: 500,
});

export const table = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: global.color.main,
  boxShadow: BOX_SHADOW,
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
});

export const row = style([
  {
    display: 'flex',
    borderBottom: '1px solid #fff',
    transition: `background-color 0.2s ${BEZIER_CURVE}`,
    padding: '0 0.5rem',
    selectors: {
      '&.hover': {
        cursor: 'pointer',
      },
      '&.hover:hover': {
        backgroundColor: global.color.first.lighter,
      },
    },
  },
]);

export const header = style([
  row,
  {
    borderBottom: '2px solid #fff',
    height: '3rem',
    alignItems: 'center',
    display: 'none',
    fontWeight: 600,
    color: global.color.third.dark,
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
  height: '100%',
  overflow: 'hidden',
});

globalStyle(`${thumbnailBox} > img`, {
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

export const imageButton = style({
  height: '100%',
  width: '100%',
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
        width: '95%',
        borderBottom: '1px solid #fff',
        content: '',
      },
      '&.hover': {
        cursor: 'pointer',
      },
      '&.hover:hover': {
        backgroundColor: global.color.first.lighter,
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
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
]);

export const mobileChannelName = style([
  textLine('1.6rem', 1),
  {
    fontWeight: 500,
    fontSize: '1.2rem',
  },
]);

export const mobileTitle = style([textLine('1.25rem', 2), {}]);

export const mobileTime = style([
  {
    fontSize: '0.85rem',
    color: '#666',
    textAlign: 'right',
  },
]);

globalStyle('.flex2', {
  flex: 2,
});

globalStyle('.flex3', {
  flex: 3,
});
