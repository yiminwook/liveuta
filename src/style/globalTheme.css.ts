import { createGlobalThemeContract } from '@vanilla-extract/css';
import { BACKGROUND_PATTERN } from './var';

export const global = createGlobalThemeContract({
  color: {
    lightFont: 'light-font',
    hightlightFont: 'highlight-font',
    linkFont: 'link-font',
    main: 'main',
    lightYellow: 'light-yellow',
    bg: 'bg',
    backdrop: 'backdrop',
    salmon: 'sanmon',
    hoverSalmon: 'hover-salmon',
    cardBg: 'card-bg',
    skyblue: 'skyblue',
    lightBlue: 'light-blue',

    first: {
      default: 'liveuta-color-first-default',
      light: 'liveuta-color-first-light',
      dark: 'liveuta-color-first-dark',
      '10': 'liveuta-color-first-10',
      '50': 'liveuta-color-first-50',
    },
    second: {
      default: 'liveuta-color-second-default',
      light: 'liveuta-color-second-light',
      dark: 'liveuta-color-second-dark',
    },
    third: {
      default: 'liveuta-color-third-default',
    },
    fourth: {
      default: 'liveuta-color-fourth-default',
      light: 'liveuta-color-fourth-light',
      dark: 'liveuta-color-fourth-dark',
    },
    text: {
      default: 'liveuta-color-text-default',
      light: 'liveuta-color-text-light',
      dark: 'liveuta-color-text-dark',
    },
  },
  background: {
    patten: 'liveuta-bg-patten',
    left: {
      url: 'liveuta-bg-left-url',
      position: 'liveuta-bg-left-position',
    },
    right: {
      url: 'liveuta-bg-right-url',
      position: 'liveuta-bg-right-position',
    },
  },
});

export const theme1 = {
  color: {
    lightFont: '#ffffff',
    hightlightFont: '#ee526f',
    linkFont: '#cc718f',
    main: '#ffc1cc',
    lightYellow: '#fcefc7',
    bg: '#d8aab1ec',
    backdrop: '#b9919867',
    salmon: '#fa8072',
    hoverSalmon: '#e06e61',
    cardBg: '#f4f4f5',
    skyblue: '#00cbfe',
    lightBlue: '#d8f2ff',

    /** 핑크 */
    first: {
      //핑크
      default: '#ffc1cc', //header
      light: '#fff4f6',
      dark: '#d8aab1ec', //bg-color
      '10': '#b9919867',
      '50': '#fc9dabaf',
    },
    /** 오렌지 */
    second: {
      default: '#fa8072',
      light: '#fa8672',
      dark: '#e48378',
    },
    /** 레드 */
    third: {
      default: '#e45c75', //active
    },
    /** 화이트 */
    fourth: {
      default: '#fff',
      light: '#fff4f6',
      dark: '#f4f4f5bf',
    },
    text: {
      default: '#000',
      light: '#fff',
      dark: '#f4f4f5',
    },
  },
  background: {
    patten: BACKGROUND_PATTERN('%23ffffff'),
    left: {
      url: "url('/background/left.jpg')",
      position: '54%',
    },
    right: {
      url: "url('/background/right.jpg')",
      position: '40%',
    },
  },
};

export const theme2 = {
  color: {
    lightFont: '#ffffff',
    hightlightFont: '#ee526f',
    linkFont: '#cc718f',
    main: '#ffc1cc',
    lightYellow: '#fcefc7',
    bg: '#d8aab1ec',
    backdrop: '#b9919867',
    salmon: '#fa8072',
    hoverSalmon: '#e06e61',
    cardBg: '#f4f4f5',
    skyblue: '#00cbfe',
    lightBlue: '#d8f2ff',

    /** 핑크 */
    first: {
      //핑크
      default: '#c8e9ca', //header
      light: '#f0f8f1',
      dark: '#c9f5d9', //bg-color
      '10': '#91b9aa67',
      '50': '#aad8caaf',
    },
    /** 오렌지 */
    second: {
      default: '#fa8072',
      light: '#fa8672',
      dark: '#e48378',
    },
    /** 레드 */
    third: {
      default: '#64aa2b', //active
    },
    /** 화이트 */
    fourth: {
      default: '#fff',
      light: '#fff4f6',
      dark: '#f4f4f5bf',
    },
    text: {
      default: '#000',
      light: '#fff',
      dark: '#f4f4f5',
    },
  },
  background: {
    patten: BACKGROUND_PATTERN('%23389738'),
    left: {
      url: "url('/background/left2.jpg')",
      position: '60%',
    },
    right: {
      url: "url('/background/right2.jpg')",
      position: '50%',
    },
  },
};

export const theme3 = {
  color: {
    lightFont: '#ffffff',
    hightlightFont: '#ee526f',
    linkFont: '#cc718f',
    main: '#ffc1cc',
    lightYellow: '#fcefc7',
    bg: '#d8aab1ec',
    backdrop: '#b9919867',
    salmon: '#fa8072',
    hoverSalmon: '#e06e61',
    cardBg: '#f4f4f5',
    skyblue: '#00cbfe',
    lightBlue: '#d8f2ff',

    first: {
      default: '#c8e9ca', //header
      light: '#f0f8f1',
      dark: '#b7e2f3', //bg-color
      '10': '#91b9aa67',
      '50': '#aad8caaf',
    },
    second: {
      default: '#fa8072',
      light: '#fa8672',
      dark: '#e48378',
    },
    third: {
      default: '#64aa2b', //active
    },
    fourth: {
      default: '#fff',
      light: '#fff4f6',
      dark: '#f4f4f5bf',
    },
    text: {
      default: '#000',
      light: '#fff',
      dark: '#f4f4f5',
    },
  },
  background: {
    patten: BACKGROUND_PATTERN('%23f4feff'),
    left: {
      url: "url('/background/left3.png')",
      position: '47%',
    },
    right: {
      url: "url('/background/right3.png')",
      position: '46%',
    },
  },
};

export const theme4 = {
  color: {
    lightFont: '#ffffff',
    hightlightFont: '#ee526f',
    linkFont: '#cc718f',
    main: '#ffc1cc',
    lightYellow: '#fcefc7',
    bg: '#d8aab1ec',
    backdrop: '#b9919867',
    salmon: '#fa8072',
    hoverSalmon: '#e06e61',
    cardBg: '#f4f4f5',
    skyblue: '#00cbfe',
    lightBlue: '#d8f2ff',

    /** 핑크 */
    first: {
      //핑크
      default: '#c8e9ca', //header
      light: '#f0f8f1',
      dark: '#152238', //bg-color
      '10': '#91b9aa67',
      '50': '#aad8caaf',
    },
    /** 오렌지 */
    second: {
      default: '#fa8072',
      light: '#fa8672',
      dark: '#e48378',
    },
    /** 레드 */
    third: {
      default: '#64aa2b', //active
    },
    /** 화이트 */
    fourth: {
      default: '#fff',
      light: '#fff4f6',
      dark: '#f4f4f5bf',
    },
    text: {
      default: '#000',
      light: '#fff',
      dark: '#f4f4f5',
    },
  },
  background: {
    patten: BACKGROUND_PATTERN('%23f7eda4'),
    left: {
      url: "url('/background/left4.jpg')",
      position: '40%',
    },
    right: {
      url: "url('/background/right4.jpg')",
      position: '28%',
    },
  },
};

export const theme5 = {
  color: {
    lightFont: '#ffffff',
    hightlightFont: '#ee526f',
    linkFont: '#cc718f',
    main: '#ffc1cc',
    lightYellow: '#fcefc7',
    bg: '#d8aab1ec',
    backdrop: '#b9919867',
    salmon: '#fa8072',
    hoverSalmon: '#e06e61',
    cardBg: '#f4f4f5',
    skyblue: '#00cbfe',
    lightBlue: '#d8f2ff',

    /** 핑크 */
    first: {
      //핑크
      default: '#c8e9ca', //header
      light: '#f0f8f1',
      dark: '#010b13', //bg-color
      '10': '#91b9aa67',
      '50': '#aad8caaf',
    },
    /** 오렌지 */
    second: {
      default: '#fa8072',
      light: '#fa8672',
      dark: '#e48378',
    },
    /** 레드 */
    third: {
      default: '#64aa2b', //active
    },
    /** 화이트 */
    fourth: {
      default: '#fff',
      light: '#fff4f6',
      dark: '#f4f4f5bf',
    },
    text: {
      default: '#000',
      light: '#fff',
      dark: '#f4f4f5',
    },
  },
  background: {
    patten: BACKGROUND_PATTERN('%23e60000'),
    left: {
      url: "url('/background/left5.jpg')",
      position: '30%',
    },
    right: {
      url: "url('/background/right5.jpg')",
      position: '47%',
    },
  },
};

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
