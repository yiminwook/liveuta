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

globalStyle('a, h1, h2, h3, h4, p', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  color: 'inherit',
  listStyle: 'none',
  textDecoration: 'none',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  border: 'none',
  lineHeight: 1.5,
});

globalStyle('button', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  color: 'inherit',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  display: 'inline-block',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  lineHeight: 1.5,
});

globalStyle('a', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  color: 'inherit',
  background: 'none',
  cursor: 'pointer',
});

globalStyle('label', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  color: 'inherit',
  border: 'none',
  background: 'none',
  display: 'inline-block',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  lineHeight: 1.5,
});

globalStyle(
  'button:focus:not(:focus-visible), a:focus:not(:focus-visible), textarea:focus:not(focus-visible)',
  {
    outline: 'none',
  },
);

globalStyle('button:focus-visible, a:focus-visible', {
  outline: '3px solid var(--liveuta-active-color)',
  borderRadius: 5,
  outlineOffset: 2.5,
  zIndex: 10,
});

globalStyle('button.active, a.active', {
  backgroundColor: 'var(--liveuta-active-color)',
  cursor: 'default',
});

globalStyle('textarea', {
  boxSizing: 'border-box',
  background: 'none',
  border: 'none',
  lineHeight: 1.5,
  fontFamily: 'Pretendard Variable Pretendard -apple-system  sans-serif',
  margin: 0,
  padding: 0,
  resize: 'none',
});
