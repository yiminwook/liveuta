import { BEZIER_CURVE } from '@/style/var';
import { style } from '@vanilla-extract/css';
import { global } from '@/style/globalTheme.css';

export const wrap = style({
  boxSizing: 'border-box',
  display: 'flex',
  backgroundColor: '#fff',
  alignItems: 'center',
  borderRadius: 30,
});

export const input = style({
  width: '100%',
  height: '100%',
  background: 'none',
  padding: '0.5rem 1rem',
  color: 'black',
});

export const submitButton = style({
  display: 'flex',
  backgroundColor: 'var(--liveuta-default-color)',
  borderRadius: '100%',
  padding: '0.25rem',
  marginRight: '0.25rem',
  color: global.color.lightFont,
  transition: `background-color 0.8s ${BEZIER_CURVE}`,
  ':hover': {
    backgroundColor: 'var(--liveuta-hover-color)',
  },
});
