import { global } from '@/styles/globalTheme.css';
import { BEZIER_CURVE } from '@/styles/var';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  color: global.color.text.default,
});

export const item = style({
  display: 'flex',
  borderRadius: 5,
  padding: '0.25rem',
  lineHeight: 1,
  fontWeight: 600,
  fontSize: '1.15rem',
  textAlign: 'center',
  ':disabled': {
    cursor: 'default',
    color: 'gray',
  },
});

export const active = style({
  color: global.color.third.default,
  cursor: 'default',
});

export const backButton = style({
  margin: '1rem auto',
  borderRadius: 5,
  padding: '0.5rem 1rem',
  backgroundColor: global.color.second.default,
  transition: `background-color 0.3s ${BEZIER_CURVE}`,
  ':hover': {
    backgroundColor: global.color.second.lighter,
  },
});
