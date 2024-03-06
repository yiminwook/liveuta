import { BEZIER_CURVE } from '@/style/var';
import { style } from '@vanilla-extract/css';
import { global } from '@/style/globalTheme.css';

export const wrap = style([
  {
    boxSizing: 'border-box',
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 30,
    boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset',
    padding: '0.25rem',
  },
]);

export const input = style({
  width: '100%',
  height: '100%',
  background: 'none',
  padding: '0.25rem 1rem',
  color: 'black',
});

export const submitButton = style({
  display: 'flex',
  backgroundColor: 'var(--liveuta-default-color)',
  borderRadius: '100%',
  padding: '0.25rem',
  color: global.color.lightFont,
  transition: `background-color 0.8s ${BEZIER_CURVE}`,
  ':hover': {
    backgroundColor: 'var(--liveuta-hover-color)',
  },
});
