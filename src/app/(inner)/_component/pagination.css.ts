import { global } from '@/style/globalTheme.css';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const item = style({
  display: 'flex',
  borderRadius: 5,
  padding: '0.25rem',
  lineHeight: 1,
  fontWeight: 600,
  color: 'black',
  fontSize: '1.15rem',
  textAlign: 'center',
  ':disabled': {
    cursor: 'default',
    color: 'gray',
  },
});

export const active = style({
  color: 'var(--liveuta-active-color)',
  cursor: 'default',
});
