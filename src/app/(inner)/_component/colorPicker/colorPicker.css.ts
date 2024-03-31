import { BOX_SHADOW, BREAK_POINT, flexCenter, responsive, zIndex } from '@/style/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const root = style({});

export const labelBox = style([
  {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.25rem',
    marginBottom: '0.25rem',
  },
  responsive({
    sm: {
      gap: '0.25rem',
      flexDirection: 'row',
      alignItems: 'center',
    },
  }),
]);

export const control = style({
  display: 'flex',
  gap: '0.5rem',
  height: '2.5rem',
});

export const input = style({
  color: '#000',
  MozAppearance: 'textfield',
  width: '100%',
  height: '100%',
  padding: '0.25rem 0.5rem',
  borderRadius: 3,
  border: '1px solid #cccccc',
});

globalStyle(`${input}::-webkit-inner-spin-button, ${input}::-webkit-outer-spin-button`, {
  WebkitAppearance: 'none',
  margin: 0,
});

export const areaBg = style({
  width: '100%',
  height: 200,
  borderRadius: 5,
});

export const trigger = style([
  flexCenter,
  {
    border: '1px solid #cccccc',
    width: '2.5rem',
    height: '2.5rem',
    padding: '0.25rem',
    flex: '0 0 2.5rem',
    boxShadow: BOX_SHADOW,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
]);

export const swatch = style([
  {
    width: '100%',
    height: '100%',
    border: '1px solid #cccccc',
  },
]);

export const thumb = style([
  {
    borderRadius: '100%',
    width: 10,
    height: 10,
    boxShadow: '#fff 0 0 0 2px,#000 0 0 2px 1px',
    outline: 'none',
    transform: 'translate(-50%, -50%)',
  },
]);

export const slider = style([
  {
    width: '100%',
    height: 15,
    borderRadius: 3,
    border: '1px solid #e0e0e0',
  },
]);

export const positioner = style([
  {
    color: '#000',
    width: 350,
    zIndex: `${zIndex.modal.zIndex} !important`,
    '@media': {
      [`(max-width: ${BREAK_POINT.sm}px)`]: {
        vars: {
          '--x': '0 !important',
        },
        width: '100% !important',
        minWidth: '0px !important',
      },
    },
  },
]);

export const content = style([
  {
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    padding: '30px 15px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    borderRadius: 15,
  },
]);

export const closeButton = style([
  {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
  },
]);

export const rgbaBox = style([
  {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
]);

globalStyle(`${rgbaBox} > div`, {
  width: '3.5rem',
});

globalStyle(`${rgbaBox} label`, {
  padding: '0 0.5rem',
});

globalStyle(`${rgbaBox} ${input}`, {
  width: '100%',
  border: '1px solid #e0e0e0',
  paddingLeft: '0.5rem',
  height: '2rem',
});

export const shortCutBox = style([
  {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
]);

export const shortCutTigger = style([
  flexCenter,
  {
    width: 20,
    height: 20,
    borderRadius: 5,
    border: '1px solid #e0e0e0',
    overflow: 'hidden',
  },
]);
