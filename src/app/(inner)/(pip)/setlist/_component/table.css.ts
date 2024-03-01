import { global } from '@/style/globalTheme.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const wrap = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '0.5rem',
  boxSizing: 'border-box',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
});

export const row = style({
  display: 'flex',
  borderBottom: '1px solid #ddd',
});

export const cell = style({
  flex: 1,
  padding: '0.5rem',
});

export const header = style([
  row,
  {
    borderBottom: '2px solid #ddd',
  },
]);

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
