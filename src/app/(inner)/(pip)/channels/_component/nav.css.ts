import { global } from '@/style/globalTheme.css';
import { BEZIER_CURVE, flexCenter } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem',
  gap: '0.5rem',
});

export const form = style({
  display: 'flex',
  backgroundColor: '#fff',
  borderRadius: 5,
  overflow: 'hidden',
  height: '2.5rem',
  width: '12.5rem',
});

export const input = style({
  padding: '0.25rem 1rem',
  width: '100%',
});

export const submitButton = style([
  flexCenter,
  {
    width: '2.5rem',
    height: '2.5rem',
    flex: '0 0 2.5rem',
    backgroundColor: global.color.third.default,
    borderRadius: 5,
    transition: `background-color 0.8s ${BEZIER_CURVE}`,
    letterSpacing: 1,
    ':hover': {
      backgroundColor: global.color.first.darken,
    },
  },
]);

export const button = style({
  height: '2.5rem',
  padding: '0.2rem 0.6rem',
  flexShrink: 0,
  borderRadius: 100,
  fontWeight: 500,
  color: '#fff',
  backgroundColor: global.color.third.default,
  border: `2px solid #fff`,
  transition: `background-color 0.8s ${BEZIER_CURVE}`,
  letterSpacing: 1,
  ':hover': {
    backgroundColor: global.color.first.darken,
  },
});
