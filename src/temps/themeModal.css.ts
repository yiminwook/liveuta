import { BOX_SHADOW, flexCenter } from '@/styles/var';
import { style } from '@vanilla-extract/css';

export const content = style([
  flexCenter,
  {
    gap: '1rem',
    height: '100%',
    flexWrap: 'wrap',
    padding: '2rem',
    marginBottom: '1rem',
  },
]);

export const themeModalButton = style({
  width: '3.5rem',
  height: '3.5rem',
  padding: '0.5rem',
  borderRadius: 3,
  boxShadow: BOX_SHADOW,
  backgroundColor: '#fff',
});

export const primary = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  borderRadius: 3,
});

export const secondary = style({
  position: 'absolute',
  bottom: '-0.25em',
  right: '-0.25em',
  width: '1em',
  height: '1em',
  borderRadius: 3,
});
