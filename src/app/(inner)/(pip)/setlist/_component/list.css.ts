import { BEZIER_CURVE, flexCenter } from '@/style/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const wrap = style({});

export const title = style({
  fontSize: '1.25rem',
  marginBottom: '0.5rem',
});

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
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
});

export const row = style({
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
});

export const header = style([
  row,
  {
    borderBottom: '2px solid #ddd',
  },
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
  width: 120,
  height: 90,
});

// export const button = style({
//   backgroundColor: global.color.linkFont,
//   padding: '0.25rem 0.5rem',
//   borderRadius: 5,
//   color: '#fff',
// });

globalStyle('.flex2', {
  flex: 2,
});

globalStyle('.flex3', {
  flex: 3,
});
