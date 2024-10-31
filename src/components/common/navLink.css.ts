import { global } from '@/styles/globalTheme.css';
import { style } from '@vanilla-extract/css';

export const navLink = style({
  ':hover': {
    color: global.color.second.default,
  },
});
