import { global } from '@/style/globalTheme.css';
import { BOX_SHADOW } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  boxShadow: BOX_SHADOW,
  display: 'inline-block',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '30rem',
});

export const inputBox = style({
  display: 'flex',
  backgroundColor: '#fff',
  width: '100%',
});

export const input = style({
  backgroundColor: 'transparent',
  height: '2rem',
  padding: '0.5rem',
  width: '100%',
});

export const button = style({
  backgroundColor: global.color.hightlightFont,
  color: '#fff',
  width: '4rem',
});
