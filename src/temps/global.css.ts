import { globalStyle } from '@vanilla-extract/css';
import { global } from '@/styles/globalTheme.css';

globalStyle('h1, h2, h3, h4, p', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  color: 'inherit',
  listStyle: 'none',
  textDecoration: 'none',
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
  margin: 0,
  padding: 0,
  border: 'none',
});

globalStyle('input:focus', {
  outline: 'none',
});

globalStyle('input::placeholder', {
  fontFamily: 'inherit',
});

//자동입력 스타일 제거, 흰그림자로 스타일을 가린다.
globalStyle(
  'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active',
  {
    WebkitTextFillColor: 'black',
    WebkitBoxShadow: '0 0 0 1000px #fff inset',
    boxShadow: '0 0 0 1000px #fff inset',
  },
);

globalStyle(
  'button:focus:not(:focus-visible), a:focus:not(:focus-visible), textarea:focus:not(focus-visible), input:focus:not(focus-visible)',
  {
    outline: 'none',
  },
);

globalStyle('button:focus-visible, a:focus-visible', {
  outline: `3px solid ${global.color.text.active}`,
  borderRadius: 5,
  outlineOffset: 2.5,
  zIndex: 10,
});

globalStyle('button.active', {
  backgroundColor: global.color.text.active,
  cursor: 'default',
});

globalStyle('a.active', {
  color: global.color.text.active,
  cursor: 'default',
});

globalStyle('textarea', {
  background: 'none',
  border: 'none',
  lineHeight: 1.6,
  margin: 0,
  padding: 0,
  resize: 'none',
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 'inherit',
});

globalStyle('.blind', {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
});

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('.caution', {
  color: 'red',
  fontSize: 14,
});
