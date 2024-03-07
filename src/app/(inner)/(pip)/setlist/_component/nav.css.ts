import { global } from '@/style/globalTheme.css';
import { BOX_SHADOW } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '0.5rem',
  height: '100%',
});

export const navButton = style({
  boxShadow: BOX_SHADOW,
  boxSizing: 'border-box',
  color: '#fff',
  backgroundColor: global.color.hoverSalmon,
  width: '4rem',
  height: '2rem',
});
