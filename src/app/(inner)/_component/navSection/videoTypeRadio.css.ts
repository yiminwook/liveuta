export const root = style({
  display: 'flex',
  flexDirection: 'column',
});

export const radioLabel = style({
  fontWeight: 500,
});

export const itemBox = style({
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
});

import { global } from '@/style/globalTheme.css';
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
