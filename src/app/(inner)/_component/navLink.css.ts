import { global } from '@/style/globalTheme.css';
import { style } from '@vanilla-extract/css';

export const navLink = style({
  ':hover': {
    color: global.color.second.default,
  },
});
