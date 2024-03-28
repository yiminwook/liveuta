import { global } from '@/style/globalTheme.css';
import { BEZIER_CURVE, responsive, textLine } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style([
  {
    height: '30rem',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
]);

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '0.5rem',
  alignItems: 'center',
});

export const row = style([
  {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '20rem',
    paddingLeft: '0.25rem',
    borderRadius: 5,
    ':hover': {
      backgroundColor: global.color.fourth.light,
    },
  },
  responsive({
    md: {
      width: '20rem',
    },
  }),
]);

export const text = style([textLine(1.6, 1), {}]);

export const button = style({
  boxSizing: 'border-box',
  flex: '0 0 3rem',
  backgroundColor: global.color.second.default,
  color: '#fff',
  padding: '0 0.5rem',
  borderRadius: 5,
  transition: `background-color 0.3s ${BEZIER_CURVE}`,
  ':hover': {
    backgroundColor: global.color.second.darken,
  },
});
