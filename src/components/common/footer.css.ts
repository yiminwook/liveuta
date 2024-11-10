import { global } from '@/styles/globalTheme.css';
import { flexCenter } from '@/styles/var';
import { style } from '@vanilla-extract/css';

export const footer = style([
  flexCenter,
  {
    height: 'calc(4rem + env(safe-area-inset-bottom))',
    color: global.color.text.default,
  },
]);
