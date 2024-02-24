import { BEZIER_CURVE, BOX_SHADOW, flexCenter } from '@/style/var';
import { style, globalStyle } from '@vanilla-extract/css';

export const playerBase = style({
  boxSizing: 'border-box',
  aspectRatio: '16 / 9',
  width: '100%',
  height: 'auto',
  backgroundColor: '#424141cf',
});

export const playerDiv = style({
  position: 'relative',
  boxSizing: 'border-box',
  border: 'none',
  width: '100%',
  selectors: {
    '&.left': {
      left: '-350px',
    },
  },
});

export const playerPlaceholder = style([playerBase, flexCenter]);

export const playerBox = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
});

export const liveChatBox = style({
  boxSizing: 'border-box',
});

export const liveChat = style({
  height: '100%',
  backgroundColor: '#000000',
});

export const popButton = style({
  position: 'absolute',
  boxSizing: 'border-box',
  borderRadius: 5,
  padding: '0.25rem',
  fontSize: '1.25rem',
  backgroundColor: 'orange',
  fontWeight: 500,
  color: '#fff',
  transition: `all 0.3s ${BEZIER_CURVE}`,
  top: 0,
  right: 0,
  ':hover': {
    backgroundColor: '#ffae00d2',
  },
});

export const pipBase = style({
  width: '350px !important',
  zIndex: 50,
  position: 'fixed',
  left: 25,
  bottom: 25,
  transition: `left 0.3s ${BEZIER_CURVE}`,
});

globalStyle(`${pipBase} .reactPlayer`, {
  boxShadow: BOX_SHADOW,
  overflow: 'hidden',
  borderRadius: 5,
});

export const pipButton = style({
  display: 'none',
  position: 'absolute',
  top: 0,
  right: '-2.5rem',
  zIndex: 10,
  padding: 0,
  margin: 0,
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '0 5px 5px 0',
  color: '#ff0000',
  backgroundColor: '#fff',
  transition: `color 0.5s ${BEZIER_CURVE}, background-color 1s ${BEZIER_CURVE}`,
  ':hover': {
    color: '#fff',
    backgroundColor: '#ff0000',
  },
  selectors: {
    '&.hide': {
      ...flexCenter,
    },
  },
});
