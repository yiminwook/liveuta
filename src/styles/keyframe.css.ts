import { keyframes } from '@vanilla-extract/css';

export const loading = keyframes({
  '0%': {
    transform: 'rotate(-90deg)',
  },
  '100%': {
    transform: 'rotate(270deg)',
  },
});

export const leftIn = keyframes({
  from: {
    transform: 'translateX(0)',
  },
  to: {
    transform: 'translateX(-100%)',
  },
});

export const openMenu = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(-4px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const openModal = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(64px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const placeholderShimmer = keyframes({
  '0%': {
    backgroundPosition: '-468px 0',
  },
  '100%': {
    backgroundPosition: '468px 0',
  },
});
