import { global } from '@/styles/globalTheme.css';
import { responsive } from '@/styles/var';
import { globalStyle, keyframes, style } from '@vanilla-extract/css';

const slideDown = keyframes({
  '0%': {
    height: '0',
  },
  '100%': {
    height: 'var(--height)',
  },
});

const slideUp = keyframes({
  '0%': {
    height: 'var(--height)',
  },
  '100%': {
    height: '0',
  },
});

export const category = style({
  // display: 'flex',
});

export const collapsible = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1rem',
});

export const trigger = style({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  marginLeft: '1rem',
  marginRight: '1rem',
  borderRadius: '0.5rem',
  padding: '0.5rem 1rem',
  transition: 'backgroundColor 0.1s cubic-bezier(0.87, 0, 0.13, 1)',
  ':hover': {
    backgroundColor: global.color.third[25],
  },
});

globalStyle(`${trigger} > svg`, {
  transition: 'transform 0.15s cubic-bezier(0.87, 0, 0.13, 1)',
});

globalStyle(`${trigger}[data-state="closed"] > svg`, {
  transform: 'rotate(180deg)',
});

globalStyle(`${trigger} > h3`, {
  fontSize: '1.5rem',
  fontWeight: 700,
});

globalStyle(`${trigger} > svg`, {
  width: '1.5rem',
  height: '1.5rem',
});

export const content = style([
  {
    overflow: 'hidden',
    selectors: {
      '&[data-state="open"]': {
        animation: `${slideDown} 0.25s cubic-bezier(0.87, 0, 0.13, 1)`,
      },
      '&[data-state="closed"]': {
        animation: `${slideUp} 0.2s cubic-bezier(0.87, 0, 0.13, 1)`,
      },
    },
  },
]);

export const cardList = style([
  {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 0.5rem',
    gap: '0.5rem',
  },
  responsive({
    sm: {
      padding: '0 1rem',
      gap: '1rem',
    },
  }),
]);
