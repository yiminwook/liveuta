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
  color: '#fff',
  backgroundColor: global.color.second.default,
  width: '4.5rem',
  height: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.25rem',
});

export const mobileWrap = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  alignItems: 'flex-end',
});

export const mobileNavBox = style({
  display: 'flex',
  gap: '0.5rem',
});
