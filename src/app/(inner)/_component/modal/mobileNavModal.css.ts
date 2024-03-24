import { global } from '@/style/globalTheme.css';
import { style } from '@vanilla-extract/css';

export const content = style([
  {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '30rem',
    paddingTop: '1.5rem',
    gap: '1rem',
  },
]);

export const navTabBox = style({
  color: global.color.second.default,
  fontWeight: 500,
});
