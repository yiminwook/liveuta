import { global } from '@/style/globalTheme.css';
import { openMenu } from '@/style/keyframe.css';
import { BOX_SHADOW, responsive } from '@/style/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const root = style([
  {
    display: 'none',
  },
  responsive({
    md: {
      display: 'block',
    },
  }),
]);

export const trigger = style({
  width: '7.5rem',
  border: '1px solid #e5e5e5',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '2.5rem',
  backgroundColor: '#fff',
  borderRadius: 5,
  boxShadow: BOX_SHADOW,
  padding: '0 0.5rem',
});

globalStyle(`${trigger} > *`, {
  display: 'inline-flex',
});

export const positioner = style({});

export const content = style({
  animation: `${openMenu} 0.3s ease-out`,
  width: '7.5rem',
  backgroundColor: '#fff',
  borderRadius: 5,
  boxShadow: BOX_SHADOW,
  overflow: 'hidden',
});

export const group = style({});

export const groupLabel = style({
  padding: '0.5rem',
  color: global.color.second.default,
  fontWeight: 600,
});

export const item = style({
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer',
  padding: '0.5rem',
  transition: 'background-color 0.2s linear, color 0.2s linear',

  selectors: {
    '&:hover': {
      backgroundColor: global.color.second.default,
      color: '#fff',
    },
    '&[data-disabled]': {
      cursor: 'default',
      backgroundColor: global.color.third.default,
      color: '#fff',
    },
  },
});
