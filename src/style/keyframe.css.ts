import { keyframes } from '@vanilla-extract/css';

export const loading = keyframes({
  '0%': {
    transform: 'rotate(-90deg)',
  },
  '100%': {
    transform: 'rotate(270deg)',
  },
});
