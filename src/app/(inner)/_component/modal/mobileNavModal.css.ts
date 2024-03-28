import { global } from '@/style/globalTheme.css';
import { style } from '@vanilla-extract/css';

export const content = style([
  {
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem 0',
    gap: '1rem',
  },
]);

export const navTabBox = style({
  color: global.color.second.default,
  fontWeight: 500,
});
