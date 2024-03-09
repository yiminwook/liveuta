import { global } from '@/style/globalTheme.css';
import { responsive, BOX_SHADOW, BEZIER_CURVE, textLine } from '@/style/var';
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
    boxShadow: BOX_SHADOW,
    display: 'flex',
    padding: '0.25rem',
    gap: '0.25rem',
    backgroundColor: '#fff',
    borderRadius: 5,
    transition: `all 0.2s ${BEZIER_CURVE}`,
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
    },
  },
  responsive({
    sm: {
      flexDirection: 'column',
    },
  }),
]);

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
      gap: '0.5rem',
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

export const link = style([
  {
    boxSizing: 'border-box',
    display: 'flex',
    gap: '0.5rem',
    fontSize: '0.75rem',
    justifyContent: 'flex-end',
    padding: '0.25rem',
  },
  responsive({
    sm: {
      fontSize: '1rem',
    },
  }),
]);

globalStyle(`${link} > button`, {
  fontSize: 'inherit',
  fontWeight: 600,
  color: global.color.salmon,
});

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
