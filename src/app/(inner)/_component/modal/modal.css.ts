import { global } from '@/style/globalTheme.css';
import { openModal } from '@/style/keyframe.css';
import {
  BEZIER_CURVE,
  BOX_SHADOW,
  BREAK_POINT,
  fixedMaxSize,
  responsive,
  textLine,
  zIndex,
} from '@/style/var';
import { style } from '@vanilla-extract/css';

export const position = style([
  fixedMaxSize,
  zIndex.modal,
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  responsive({
    md: {
      alignItems: 'center',
    },
  }),
]);

export const content = style([
  {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: global.color.fourth.lighter,
    color: global.color.text.default,
    padding: '1rem',
    boxShadow: BOX_SHADOW,

    '@media': {
      'screen and (min-width: 250px)': {
        height: 'auto',
        borderRadius: '15px 15px 0 0',
        selectors: {
          '&[data-state=open]': {
            animation: `${openModal} 0.2s ${BEZIER_CURVE}`,
          },
        },
      },
    },
  },
  responsive({
    md: {
      minWidth: BREAK_POINT.sm,
      maxWidth: '75%',
      width: 'auto',
      borderRadius: 5,
    },
  }),
]);

export const title = style([
  textLine('1.6rem', 1),
  {
    fontSize: '1.2rem',
  },
]);

export const desc = style([{}]);

export const closeTrigger = style([
  {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    color: global.color.third.default,
    cursor: 'pointer',
    display: 'flex',
  },
]);
