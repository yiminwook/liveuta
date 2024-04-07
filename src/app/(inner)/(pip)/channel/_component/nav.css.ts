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
  alignItems: 'center',
  borderRadius: 5,
  height: '2.5rem',
  width: '12.5rem',
  padding: '0.25rem',
});

export const input = style({
  width: '100%',
  background: 'none',
  paddingLeft: '0.25rem',
  color: '#000',
});

export const submitButton = style([
  flexCenter,
  {
    width: '2rem',
    height: '2rem',
    flex: '0 0 2rem',
    borderRadius: 5,
    backgroundColor: global.color.second.default,
    transition: `background-color 0.8s ${BEZIER_CURVE}`,
    letterSpacing: 1,
    ':hover': {
      backgroundColor: global.color.second.lighter,
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
  backgroundColor: global.color.second.default,
  border: `2px solid #fff`,
  transition: `background-color 0.8s ${BEZIER_CURVE}`,
  letterSpacing: 1,
  ':hover': {
    backgroundColor: global.color.second.lighter,
  },
});
