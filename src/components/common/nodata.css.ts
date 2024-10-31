import { style } from '@vanilla-extract/css';

export const nodataBox = style([
  {
    padding: '1rem 0.5rem',
  },
]);

export const nodataImageBox = style([
  {
    position: 'relative',
    width: '100%',
    maxWidth: 300,
    aspectRatio: '1 / 1',
    margin: '0 auto',
  },
]);

export const nodataImage = style({
  objectFit: 'contain',
});

export const nodataText = style({
  textAlign: 'center',
  fontSize: '1.5rem',
});
