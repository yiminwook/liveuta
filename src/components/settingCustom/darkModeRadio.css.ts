export const root = style([
  {
    display: 'flex',
    gap: '1rem',
    width: '100%',
    flexDirection: 'column',
  },
  responsive({
    sm: {
      flexDirection: 'row',
    },
  }),
]);

export const radioLabel = style({
  fontWeight: 500,
  flex: 1,
});

export const itemBox = style({
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  flex: 1,
});

import { global } from '@/styles/globalTheme.css';
import { responsive } from '@/styles/var';
import { style } from '@vanilla-extract/css';

export const item = style({
  display: 'flex',
  gap: '0.5rem',
  padding: '0.25rem',
});

export const itemControl = style({
  width: '1.5rem',
  height: '1.5rem',
  border: `1px solid #cccccc`,
  borderRadius: '50%',
  selectors: {
    '&[data-state=checked]': {
      borderColor: global.color.third.default,
      outlineOffset: -5,
      outlineWidth: 4,
      backgroundColor: global.color.third.default,
      outlineColor: '#fff',
      outlineStyle: 'solid',
    },
  },
});
