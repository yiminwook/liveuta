import { globalStyle } from '@vanilla-extract/css';

globalStyle('::-webkit-scrollbar', {
  width: 7.5,
});

globalStyle('::-webkit-scrollbar-track', {
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
});

globalStyle('::-webkit-scrollbar-thumb', {
  backgroundColor: 'var(--liveuta-active-color)',
  borderRadius: 10,
});

globalStyle('::-webkit-scrollbar-thumb:hover', {
  backgroundColor: 'var(--liveuta-hover-color)',
});

globalStyle('::-webkit-scrollbar-button', {
  display: 'none',
  visibility: 'hidden',
});
