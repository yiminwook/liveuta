import { global } from '@/styles/globalTheme.css';
import { style } from '@vanilla-extract/css';

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

export const item = style({
  display: 'flex',
  gap: '0.5rem',
  padding: '0.25rem',
  selectors: {
    '&[data-disabled=true]': {
      color: '#ddd',
    },
  },
});

export const itemControl = style({
  width: '1.5rem',
  height: '1.5rem',
  border: `1px solid #cccccc`,
  borderRadius: '50%',
  ':disabled': {
    pointerEvents: 'none',
  },
  selectors: {
    '&[data-state=checked]': {
      borderColor: global.color.third.default,
      outlineOffset: -5,
      outlineWidth: 4,
      backgroundColor: global.color.third.default,
      outlineColor: '#fff',
      outlineStyle: 'solid',
    },
    '&[data-state=checked][data-disabled=true]': {
      borderColor: '#ddd',
      backgroundColor: '#ddd',
    },
  },
});
