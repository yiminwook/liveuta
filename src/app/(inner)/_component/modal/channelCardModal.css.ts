import { global } from '@/style/globalTheme.css';
import { BOX_SHADOW, responsive } from '@/style/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const content = style([
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    maxHeight: '90%',
  },
]);

export const profile = style({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
});

export const itemContainer = style({
  borderRadius: 15,
  overflow: 'hidden',
  position: 'relative',
  width: 88,
  height: 88,
  boxShadow: BOX_SHADOW,
});

export const info = style({
  flexShrink: 3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const h2 = style([
  {
    fontSize: '1rem',
    wordBreak: 'keep-all',
  },
  responsive({
    lg: {
      fontSize: '1.25rem',
    },
  }),
]);

export const h3 = style([
  {
    fontWeight: 500,
    fontSize: '0.7rem',
    wordBreak: 'keep-all',
  },
  responsive({
    lg: {
      fontSize: '1.25rem',
    },
  }),
]);

export const h4 = style([
  {
    fontWeight: 400,
    fontSize: '0.8rem',
  },
]);

export const detail = style([
  {
    display: 'flex',
    flexDirection: 'column',
  },
  responsive({
    md: {
      gap: '1rem',
      flexDirection: 'row',
    },
  }),
]);

export const link = style([
  {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
]);

globalStyle(`${link} button`, {
  fontWeight: 500,
  color: global.color.hoverSalmon,
});

globalStyle(`${link} button:first-of-type`, {
  fontWeight: 600,
});

export const hr = style({
  width: '100%',
  borderBottom: `0.5px solid ${global.color.first.default}`,
});

export const desc = style([
  {
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    overflowY: 'auto',
    height: '30rem',
    selectors: {
      '&::-webkit-scrollbar-track': {
        borderRadius: 10,
      },
    },
  },
]);
