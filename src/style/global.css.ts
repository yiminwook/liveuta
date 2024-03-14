import { globalStyle, style } from '@vanilla-extract/css';
import { global } from './globalTheme.css';
import { BEZIER_CURVE } from './var';

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

globalStyle('h1, h2, h3, h4, p', {
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
  lineHeight: 1.6,
});

globalStyle('button', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  color: 'inherit',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  display: 'block',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  lineHeight: 1.6,
});

globalStyle('a', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  color: 'inherit',
  background: 'none',
  cursor: 'pointer',
  lineHeight: 1.6,
  listStyle: 'none',
  textDecoration: 'none',
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
  lineHeight: 1.6,
});

globalStyle('input', {
  display: 'block',
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
});

globalStyle(
  'button:focus:not(:focus-visible), a:focus:not(:focus-visible), textarea:focus:not(focus-visible), input:focus:not(focus-visible)',
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

globalStyle('button.active', {
  backgroundColor: 'var(--liveuta-active-color)',
  cursor: 'default',
});

globalStyle('a.active', {
  color: 'var(--liveuta-active-color)',
  cursor: 'default',
});

globalStyle('textarea', {
  boxSizing: 'border-box',
  background: 'none',
  border: 'none',
  lineHeight: 1.6,
  fontFamily: 'Pretendard Variable Pretendard -apple-system  sans-serif',
  margin: 0,
  padding: 0,
  resize: 'none',
});

globalStyle('.blind', {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
});

export const background = style({
  overflow: 'hidden',
  backgroundColor: global.color.first.dark,
  backgroundImage: global.background.patten,
  transition: `background-color 0.2s ${BEZIER_CURVE}, background-image 0.2s ${BEZIER_CURVE}`,
});
