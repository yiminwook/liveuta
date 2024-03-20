import { global } from '@/style/globalTheme.css';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '0.5rem',
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const button = style({
  backgroundColor: global.color.second.default,
  color: '#fff',
  padding: '0 0.5rem',
  borderRadius: 5,
  ':hover': {
    backgroundColor: global.color.second.lighter,
  },
});
