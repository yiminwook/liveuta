import { BEZIER_CURVE, flexCenter, responsive } from '@/style/var';
import { globalStyle, style } from '@vanilla-extract/css';
import { global } from '../style/globalTheme.css';

export const wrap = style({
  width: '100dvw',
  height: '100dvh',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: global.color.text.default,
});

export const inner = style([
  {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    padding: '1rem',
  },
  responsive({
    md: {
      flexDirection: 'row',
    },
  }),
]);

export const imgBox = style({});

globalStyle(`${imgBox} > img`, {
  width: '100%',
  objectFit: 'contain',
});

export const desc = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '18rem',
  minWidth: '18rem',
});

export const descTop = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

globalStyle(`${descTop} > h1`, {
  fontSize: 38,
  marginBottom: 14,
});

globalStyle(`${descTop} > h2`, {
  fontSize: 20,
  fontWeight: 400,
});

export const descBottom = style([
  flexCenter,
  {
    margin: '2rem 0',
  },
]);

export const button = style({
  fontWeight: 500,
  backgroundColor: global.color.salmon,
  padding: '0.5rem 1rem',
  color: '#fff',
  borderRadius: 5,
  transition: `background-color 0.3s ${BEZIER_CURVE}`,
  ':hover': {
    backgroundColor: global.color.hoverSalmon,
  },
});
