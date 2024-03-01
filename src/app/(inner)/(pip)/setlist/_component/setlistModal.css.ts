import { textOneLine } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const inner = style([
  {
    marginTop: '2.25rem',
    paddingBottom: '1rem',
  },
]);

export const title = style([textOneLine, { fontSize: '1.15rem' }]);

export const descBox = style({
  padding: '0 0.5rem',
  overflowY: 'scroll',
  height: '22.5rem',
  lineHeight: 1.5,
});
