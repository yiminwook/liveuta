import { global } from '@/style/globalTheme.css';
import { responsive } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style([
  {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem',
    gap: '0.5rem',
  },
  responsive({
    sm: {
      flexDirection: 'row',
      padding: '1rem',
      gap: '1rem',
    },
  }),
]);

export const sectionTitle = style({
  fontSize: '1.1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  justifyContent: 'center',
});

export const section = style([
  {
    padding: '1rem',
    flex: 1,
    backgroundColor: global.color.fourth[75],
    borderRadius: 5,
  },
  responsive({
    md: {},
  }),
]);
