import { global } from '@/styles/globalTheme.css';
import { BEZIER_CURVE, flexCenter, responsive } from '@/styles/var';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  display: 'flex',
  flexDirection: 'column',
});

export const inner = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
});

export const colorPickerBox = style([
  {
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
  },
  responsive({
    sm: {
      flexDirection: 'row',
    },
  }),
]);

export const colorPickerColumn = style([
  {
    width: '100%',
  },
  responsive({
    sm: {
      width: 300,
    },
  }),
]);

export const darkModeBox = style([
  {
    display: 'flex',
    padding: '1rem',
    width: '100%',
    maxWidth: 560,
  },
]);

export const bottom = style([
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
  },
]);

export const buttonBox = style([
  flexCenter,
  {
    gap: '1rem',
    flexDirection: 'column',
  },
  responsive({
    sm: {
      flexDirection: 'row',
    },
  }),
]);

export const button = style({
  borderRadius: 3,
  backgroundColor: global.color.second.default,
  padding: '0.5rem 1rem',
  width: '6rem',
  color: '#fff',
  transition: `background-color 0.3s ${BEZIER_CURVE}`,
  selectors: {
    '&:hover': {
      backgroundColor: global.color.second.lighter,
    },
  },
});

export const resetButton = style({
  backgroundColor: '#D0312D',
  selectors: {
    '&:hover': {
      backgroundColor: '#E3242B',
    },
  },
});

export const alert = style({
  color: '#D0312D',
});
