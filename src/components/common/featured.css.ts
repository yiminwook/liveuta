import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { global } from '@/styles/globalTheme.css';
// import { BEZIER_CURVE, BOX_SHADOW, flexCenter } from '@/style/var';
import { responsive } from '@/styles/var';

export const featuredContainer = style([
  { overflow: 'hidden' },
  responsive({
    xl: {},
  }),
]);

export const featured = style([
  {
    minHeight: '100svh',
    display: 'grid',
    gridTemplateColumns: '100% 100%',
    transition: 'transform 0.15s cubic-bezier(0.87, 0, 0.13, 1)',
    selectors: {
      '&[data-show="categories"]': {},
      '&[data-show="vtubers"]': {
        transform: 'translateX(calc(-100%))',
      },
    },
  },
  responsive({
    xl: {},
  }),
]);

export const tabs = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '4rem',
  padding: '0.5rem 0',
  fontSize: '1.25rem',
});

export const tab = style({
  // padding: '0.8rem 0.4rem',
  transition: 'transform 0.15s cubic-bezier(0.87, 0, 0.13, 1)',
  selectors: {
    '&[data-selected="true"]': {
      fontWeight: 700,
      position: 'relative',
      zIndex: 1,
    },
    '&[data-selected="true"]:after': {
      content: '""',
      width: '110%',
      height: '50%',
      display: 'inline-block',
      backgroundColor: global.color.second.default,
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: '15%',
      zIndex: -1,
    },
    '&[data-selected="false"]': {
      // color: global.color.text.active,
    },
    '&[data-selected="false"]:hover': {
      transform: 'translateY(-0.2rem)',
    },
  },
});

// export const button = style([
//   {
//     display: 'none',
//     visibility: 'hidden',
//   },
//   responsive({
//     xl: {
//       display: 'flex',
//       visibility: 'visible',
//       justifyContent: 'center',
//       alignItems: 'center',
//       transition: 'background-color 0.1s cubic-bezier(0.87, 0, 0.13, 1)',
//       ':hover': {
//         backgroundColor: global.color.third[75],
//       },
//       selectors: {},
//     },
//   }),
// ]);

// globalStyle(
//   `${button} svg`,
//   responsive({
//     xl: {
//       width: '2rem',
//       height: '2rem',
//       transition: 'transform 0.15s cubic-bezier(0.87, 0, 0.13, 1)',
//     },
//   }),
// );

// globalStyle(
//   `${button}[data-show="vtubers"] svg`,
//   responsive({
//     xl: {
//       transform: 'rotate(180deg)',
//       transition: 'transform 0.15s cubic-bezier(0.87, 0, 0.13, 1)',
//     },
//   }),
// );

// const bounceNegativeX = keyframes({
//   '0%': {
//     transform: 'translateX(0)',
//     animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
//   },
//   '50%': {
//     transform: 'translateX(-25%)',
//     animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
//   },
//   '100%': {
//     transform: 'translateX(0)',
//     animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
//   },
// });

// const bouncePositiveX = keyframes({
//   '0%': {
//     transform: 'translateX(0) rotate(180deg)',
//     animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
//   },
//   '50%': {
//     transform: 'translateX(25%) rotate(180deg)',
//     animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
//   },
//   '100%': {
//     transform: 'translateX(0) rotate(180deg)',
//     animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
//   },
// });

// globalStyle(
//   `${button}[data-show="categories"]:hover > svg`,
//   responsive({
//     xl: {
//       // transform: 'translateX(-0.5rem)',
//       animation: `${bounceNegativeX} 1s infinite`,
//     },
//   }),
// );

// globalStyle(
//   `${button}[data-show="vtubers"]:hover > svg`,
//   responsive({
//     xl: {
//       animation: `${bouncePositiveX} 1s infinite`,
//     },
//   }),
// );
