import { globalStyle, style } from '@vanilla-extract/css';
import { BOX_SHADOW, BREAK_POINT, flexCenter, responsive } from '@/style/var';
import { global } from '@/style/globalTheme.css';

export const wrap = style([
  {
    boxSizing: 'border-box',
    maxWidth: BREAK_POINT.sm,
    margin: '0 auto',
    marginTop: '3.5rem',
    width: '100%',
    padding: '1rem',
  },
]);

export const inner = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '2rem',
  borderTop: '1px solid #e5e5e5',
  flexDirection: 'column',
  height: '40rem',
  backgroundColor: 'rgba(255, 255, 255, 0.45)',
  borderRadius: 10,
  boxShadow: BOX_SHADOW,
});

export const top = style({
  flex: 1,
  textAlign: 'center',
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 500,
  // color: global.color.lightFont,
  marginBottom: '1rem',
});

export const buttonBox = style({
  flex: 1,
});

export const googleLoginButton = style([
  flexCenter,
  {
    boxShadow: BOX_SHADOW,
    columnGap: '0.5rem',
    fontSize: '1.25rem',
    borderRadius: 32,
    backgroundColor: '#fff',
    padding: '0.5rem 1rem',
    fontWeight: 600,
    margin: '0 auto',
  },
]);
