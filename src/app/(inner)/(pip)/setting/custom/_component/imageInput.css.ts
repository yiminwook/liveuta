import { global } from '@/style/globalTheme.css';
import { BOX_SHADOW, flexCenter, responsive } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style([
  {
    width: '100%',
  },
  responsive({
    sm: {
      width: 300,
    },
  }),
]);

export const label = style({
  fontSize: '1.1rem',
});

export const inner = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '2.5rem',
  gap: '0.5rem',
});

export const input = style({
  color: '#000',
  height: '100%',
  width: '100%',
  padding: '0.5rem',
  borderRadius: 3,
  border: '1px solid #cccccc',
});

export const button = style([
  flexCenter,
  {
    width: '2.5rem',
    height: '2.5rem',
    flex: '0 0 2.5rem',
    letterSpacing: 1,
    backgroundColor: global.color.second.default,
    borderRadius: 3,
    boxShadow: BOX_SHADOW,
    border: '1px solid #cccccc',
  },
]);
