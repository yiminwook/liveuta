import { keyframes, style } from '@vanilla-extract/css';

import { responsive } from '@/styles/var';
import { global } from '@/styles/globalTheme.css';

export const section = style([
  responsive({
    '2xl': {
      selectors: {
        '[data-show="false"] &': {
          display: 'none',
          visibility: 'hidden',
        },
      },
    },
  }),
]);

export const contents = style([]);

// const expand = keyframes({
//   '0%': {
//     width: '0%',
//     display: 'hidden',
//     opacity: 0,
//   },
//   '100%': {
//     width: '100%',
//     display: 'block',
//     opacity: 1,
//   },
// });

// const collapse = keyframes({
//   '0%': {
//     width: '100%',
//     display: 'block',
//     opacity: 1,
//   },
//   '100%': {
//     width: '0%',
//     display: 'hidden',
//     opacity: 0,
//   },
// });

// export const section = style([{}]);

// export const expandButton = style([
//   {},
//   responsive({
//     '2xl': {
//       width: '100%',
//       maxWidth: '120px',
//       height: '100%',
//       selectors: {
//         '*[data-show="false"] &': {
//           display: 'block',
//         },
//         '*[data-show="false"] &:hover': {
//           backgroundColor: global.color.third[75],
//         },
//         '*[data-show="true"] &': {
//           display: 'none',
//           visibility: 'hidden',
//         },
//       },
//     },
//   }),
// ]);

// export const contents = style([
//   {},
//   responsive({
//     '2xl': {
//       selectors: {
//         '*[data-show="false"] &': {
//           width: '0%',
//           display: 'hidden',
//           visibility: 'hidden',
//           opacity: 0,
//           maxHeight: '100svh',
//           height: '0',
//           animation: `${collapse} 0.2s cubic-bezier(0.87, 0, 0.13, 1)`,
//         },
//         '*[data-show="true"] &': {
//           width: '100%',
//           display: 'block',
//           visibility: 'visible',
//           opacity: 1,
//           animation: `${expand} 0.2s cubic-bezier(0.87, 0, 0.13, 1)`,
//         },
//       },
//     },
//   }),
// ]);

// export const expandButton = style([
//   {},
//   responsive({
//     '2xl': {
//       selectors: {
//         '*[data-show="false"] &': {
//           width: '100%',
//           maxWidth: '120px',
//           transitionDuration: '0.2s',
//           transitionProperty: 'transform width max-width background-color',
//           transitionTimingFunction: 'cubic-bezier(0.87, 0, 0.13, 1)',
//         },
//         '*[data-show="false"] &:hover': {
//           backgroundColor: global.color.third[75],
//           width: '120%',
//           maxWidth: '160px',
//         },
//         // '*[data-show="true"] &': {
//         //   display: 'none',
//         //   visibility: 'hidden',
//         // },
//       },
//     },
//   }),
// ]);

// export const contents = style([
//   responsive({
//     '2xl': {
//       selectors: {
//         '*[data-show="false"] &': {
//           animation: `${collapse} 0.2s cubic-bezier(0.87, 0, 0.13, 1)`,
//         },
//         '*[data-show="true"] &': {
//           animation: `${expand} 0.2s cubic-bezier(0.87, 0, 0.13, 1)`,
//         },
//       },
//     },
//   }),
// ]);
