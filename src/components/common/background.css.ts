import { style } from '@vanilla-extract/css';
import { BEZIER_CURVE, BREAK_POINT, responsive } from '@/styles/var';
import { global } from '@/styles/globalTheme.css';

export const main = style([
  {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: BREAK_POINT['2xl'],
    padding: '0 env(safe-area-inset-right) 0 env(safe-area-inset-left)',
    minHeight: 'calc(100dvh - 7.5rem - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
    color: global.color.text.default,
    margin: '0 auto',
  },
  responsive({
    xl: {
      width: '80%',
    },
  }),
]);

export const background = style({
  backgroundColor: global.color.main,
  backgroundImage: global.background.patten,
  transition: `background-color 0.2s ${BEZIER_CURVE}, background-image 0.2s ${BEZIER_CURVE}`,
});

export const sideBackgroundBase = style({
  width: '10%',
  backgroundSize: 'cover',
  position: 'fixed',
  top: 0,
  height: '100lvh',
  margin: 0,
  opacity: 0,
  zIndex: -1,
  transition: 'opacity 0.3s linear',
  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      /* 그라데이션 높이 조정 */
      height: '30%',
      background: `linear-gradient(to bottom, transparent, ${global.color.main})`,
    },
  },
  ...responsive({
    xl: {
      opacity: 1,
    },
  }),
});

export const backgroundRight = style([
  sideBackgroundBase,
  {
    right: 0,
    backgroundImage: global.background.right.url,
    backgroundPosition: global.background.right.position,
  },
]);

export const backgroundLeft = style([
  sideBackgroundBase,
  {
    left: 0,
    backgroundImage: global.background.left.url,
    backgroundPosition: global.background.left.position,
  },
]);
