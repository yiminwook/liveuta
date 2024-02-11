import {
  assignVars,
  createGlobalTheme,
  createGlobalThemeContract,
  globalStyle,
} from '@vanilla-extract/css';

export const global = createGlobalThemeContract({
  color: {
    lightFont: 'light-font',
    hightlightFont: 'highlight-font',
    linkFont: 'link-font',
    font: 'font',
    main: 'main',
    lightYellow: 'light-yellow',
    bg: 'bg',
    backdrop: 'backdrop',
    secondary: 'secondary',
    salmon: 'sanmon',
    hoverSalmon: 'hover-salmon',
    cardBg: 'card-bg',
    skyblue: 'skyblue',
    lightBlue: 'light-blue',
  },
});

const whiteGlobalTheme = {
  color: {
    lightFont: '#ffffff',
    hightlightFont: '#ee526f',
    linkFont: '#cc718f',
    font: '#080808',
    main: '#ffc1cc',
    lightYellow: '#fcefc7',
    bg: '#d8aab1ec',
    backdrop: '#b9919867',
    secondary: '#fa923f',
    salmon: '#fa8072',
    hoverSalmon: '#e06e61',
    cardBg: '#f4f4f5',
    skyblue: '#00cbfe',
    lightBlue: '#d8f2ff',
  },
};

createGlobalTheme(':root', global, whiteGlobalTheme);

// const darkGlobalTheme = {
//   background: {
//     color: 'rgb(0, 0, 0)',
//   },
//   foreground: {
//     color: 'rgb(255, 255, 255)',
//   },
// };

// globalStyle(':root', {
//   '@media': {
//     '(prefers-color-scheme: dark)': {
//       vars: assignVars(global, darkGlobalTheme),
//     },
//   },
// });
