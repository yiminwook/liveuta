import { global } from '@/style/globalTheme.css';
import { BEZIER_CURVE, BOX_SHADOW } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const form = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  padding: 0,
  margin: 0,
  borderRadius: 30,
});

export const inner = style({
  display: 'flex',
  width: 'calc(100% - 3rem)',
  height: 'calc(100% - 0.5rem)',
  borderRadius: 30,
  backgroundColor: '#fff',
  padding: '0.25rem 1.5rem',
  alignItems: 'center',
  gap: '0.5rem',
  boxShadow: BOX_SHADOW,
});

export const input = style({
  width: '100%',
  height: '100%',
  padding: 0,
  border: 'none',
  background: 'none',
});

export const resetButton = style({
  display: 'flex',
  borderRadius: '100%',
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export const submitButton = style({
  display: 'flex',
  padding: '0.5rem',
  borderRadius: '100%',
  backgroundColor: global.color.first.default,
  color: global.color.text.light,
  transition: `background-color 0.8s ${BEZIER_CURVE}`,
  boxShadow: BOX_SHADOW,
  ':hover': {
    backgroundColor: global.color.first.light,
  },
});
