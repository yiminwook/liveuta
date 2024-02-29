import { global } from '@/style/globalTheme.css';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  display: 'inline-block',
});

export const inputBox = style({
  display: 'flex',
  backgroundColor: '#fff',
  boxSizing: 'border-box',
});

export const input = style({
  backgroundColor: 'transparent',
  padding: '0.5rem',
});

export const button = style({
  backgroundColor: global.color.hightlightFont,
  color: '#fff',
  width: '2.5rem',
  height: '2rem',
});
