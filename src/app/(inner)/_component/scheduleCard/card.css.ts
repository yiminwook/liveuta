import { global } from '@/style/globalTheme.css';
import { responsive, BOX_SHADOW, BEZIER_CURVE, textLine, flexCenter } from '@/style/var';
import { globalStyle, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const cardBase = style([
  {
    boxSizing: 'border-box',
    margin: 0,
    flex: '1 0 auto',
    width: '17rem',
    minWidth: '100%',
    maxWidth: '100%',
  },
  responsive({
    sm: {
      minWidth: '17rem',
      maxWidth: '50%',
    },
  }),
]);

export const card = style([
  cardBase,
  {
    position: 'relative',
    boxShadow: BOX_SHADOW,
    display: 'flex',
    padding: '0.25rem',
    gap: '0.25rem',
    backgroundColor: '#fff',
    borderRadius: 5,
    transformStyle: 'preserve-3d',
    transformOrigin: 'center',
    transition: `all 1s ${BEZIER_CURVE}`,
    selectors: {
      '&:hover': {
        transform: 'scale(1.02)',
      },
      '&.closed': {
        backgroundColor: global.color.lightBlue,
      },
      '&.stream': {
        backgroundColor: global.color.lightYellow,
      },
      '&.block': {
        ...responsive({
          md: {
            transform: 'rotateY(-180deg)',
          },
        }),
      },
      '&.block::after': {
        ...flexCenter,
        content: 'Blocked',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        fontWeight: 600,
        backgroundColor: global.color.backdrop,
        ...responsive({
          md: {
            transform: 'rotateY(180deg)',
          },
        }),
      },
    },
  },
  responsive({
    sm: {
      flexDirection: 'column',
    },
  }),
]);

globalStyle(`${card}.block > *`, {
  visibility: 'hidden',
});

export const imageLink = style([
  {
    display: 'inline-block',
    width: '50%',
  },
  responsive({
    sm: {
      width: '100%',
      height: '120%',
    },
  }),
]);

globalStyle(`${imageLink} > div`, {
  boxShadow: BOX_SHADOW,
  position: 'relative',
  boxSizing: 'border-box',
  margin: 'auto',
  width: '100%',
  aspectRatio: '16 / 9',
  borderRadius: 5,
  height: '100%',
  overflow: 'hidden',
  backgroundColor: '#fff',
});

globalStyle(`${imageLink} > div > img`, {
  objectFit: 'cover',
});

export const descBox = style([
  {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    gap: '0.1rem',
  },
  responsive({
    sm: {
      gap: '0.25rem',
    },
  }),
]);

export const channelName = style([
  {
    fontWeight: 600,
    fontSize: '1rem',
    selectors: {
      '&.stream': {
        color: global.color.hightlightFont,
      },
    },
  },
  responsive({
    sm: {
      fontSize: '1.2rem',
    },
  }),
]);

export const title = style([
  textLine('1.2rem', 2),
  {
    color: global.color.font,
    fontSize: '0.75rem',
    selectors: {
      '&.stream': {
        fontWeight: 500,
        color: global.color.secondary,
      },
    },
  },
  responsive({
    sm: {
      lineHeight: '1.6rem',
      height: calc.multiply(2, '1.6rem'),
      fontSize: '1rem',
    },
  }),
]);

export const time = style([
  {
    display: 'flex',
    fontSize: '0.75rem',
    alignItems: 'center',
    gap: '0.5rem',
  },
  responsive({
    sm: { fontSize: '1rem' },
  }),
]);

export const nav = style([
  {
    boxSizing: 'border-box',
    display: 'flex',
    gap: '0.25rem',
    fontSize: '0.75rem',
    justifyContent: 'flex-end',
    // padding: '0.25rem',
  },
  responsive({
    sm: {
      fontSize: '1rem',
    },
  }),
]);

export const navButton = style([
  flexCenter,
  {
    color: global.color.salmon,
    width: '1.75rem',
    height: '1.75rem',
    borderRadius: 5,
    transition: `background-color 0.5s ${BEZIER_CURVE}`,
    selectors: {
      '&:hover': {
        backgroundColor: 'rgba(100, 100, 100, 0.15)',
      },
    },
  },
]);

export const statusBox = style([
  {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    gap: '0.125rem',
    color: global.color.hightlightFont,
    verticalAlign: 'middle',
  },
]);

export const statusSvg = style([
  {},
  responsive({
    sm: {
      width: '1rem',
      height: '1rem',
    },
  }),
]);

export const cardList = style([
  {
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0.5rem',
    gap: '0.5rem',
  },
  responsive({
    sm: {
      padding: '1rem',
      gap: '1rem',
    },
  }),
]);
