import { global } from '@/style/globalTheme.css';
import { responsive } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '0.5rem',
  alignItems: 'center',
  minHeight: '9rem',
});

export const row = style([
  {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '20rem',
  },
  responsive({
    md: {
      width: '20rem',
    },
  }),
]);

export const button = style({
  backgroundColor: global.color.second.default,
  color: '#fff',
  padding: '0 0.5rem',
  borderRadius: 5,
  ':hover': {
    backgroundColor: global.color.second.lighter,
  },
});
