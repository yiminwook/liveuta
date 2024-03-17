import { global } from '@/style/globalTheme.css';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  color: global.color.text.default,
});

export const item = style({
  display: 'flex',
  borderRadius: 5,
  padding: '0.25rem',
  lineHeight: 1,
  fontWeight: 600,
  fontSize: '1.15rem',
  textAlign: 'center',
  ':disabled': {
    cursor: 'default',
    color: 'gray',
  },
});

export const active = style({
  color: global.color.third.default,
  cursor: 'default',
});
