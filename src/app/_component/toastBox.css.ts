import { globalStyle, style } from '@vanilla-extract/css';

export const toast = style({
  top: 'calc(2.5rem + env(safe-area-inset-top)) !important',
});

globalStyle(`${toast} > button[aria-label="Close toast"]`, {
  left: 'unset',
  right: 0,
  transform: 'translate(50%, -50%)',
});
