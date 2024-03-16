import { createGlobalThemeContract } from '@vanilla-extract/css';
import { BACKGROUND_PATTERN } from './var';

export type BrandColor = 'first' | 'second' | 'third' | 'fourth';
export type BrandColorKey =
  | 'default'
  | 'light'
  | 'lighter'
  | 'dark'
  | 'darken'
  | '25'
  | '50'
  | '75'
  | '95';

export type GlobalTheme = typeof globalVars;

const PREFIX = 'liveuta';
const createVar = (...v: string[]) => [PREFIX, ...v].join('-');
const brandColorVar = (color: BrandColor) => {
  const createBrandVar = (v: BrandColorKey) => createVar([color, v].join('-'));
  return {
    /** 기본값 */
    default: createBrandVar('default'),
    /** +5% 밝게 */
    light: createBrandVar('light'),
    /** +10% 밝게 */
    lighter: createBrandVar('lighter'),
    /** -5% 어둡게 */
    dark: createBrandVar('dark'),
    /** -10% 어둡게 */
    darken: createBrandVar('darken'),
    /** 25% 투명도 */
    '25': createBrandVar('25'),
    /** 50% 투명도 */
    '50': createBrandVar('50'),
    /** 75% 투명도 */
    '75': createBrandVar('75'),
    /** 95% 투명도 */
    '95': createBrandVar('95'),
  };
};

const brandColor = (
  colors: [string, string, string, string, string, string, string, string, string],
) => ({
  default: colors[0],
  light: colors[1],
  lighter: colors[2],
  dark: colors[3],
  darken: colors[4],
  '25': colors[5],
  '50': colors[6],
  '75': colors[7],
  '95': colors[8],
});

const globalVars = {
  color: {
    // 고정색상
    lightYellow: createVar('light-yellow'),
    salmon: createVar('salmon'),
    hoverSalmon: createVar('hover-salmon'),
    cardBg: createVar('card-bg'),
    skyblue: createVar('skyblue'),
    lightBlue: createVar('light-blue'),

    // 가변색상
    first: brandColorVar('first'),
    second: brandColorVar('second'),
    third: brandColorVar('third'),
    fourth: brandColorVar('fourth'),
    backdrop: createVar('backdrop'),
    title: createVar('title'),
    text: {
      default: createVar('txt', 'default'),
      light: createVar('txt', 'light'),
      dark: createVar('txt', 'dark'),
      active: createVar('txt', 'active'),
    },
  },
  background: {
    patten: createVar('bg', 'patten'),
    left: {
      url: createVar('bg', 'left', 'url'),
      position: createVar('bg', 'left', 'position'),
    },
    right: {
      url: createVar('bg', 'right', 'url'),
      position: createVar('bg', 'right', 'position'),
    },
  },
};

export const global = createGlobalThemeContract(globalVars);

/** 화이트모드시 브랜드 공통 컬러 */
const whiteBrandColor = brandColor([
  '#F5F5F5', // 4%
  '#FAFAFA', // 2%
  '#FFFFFF', // 0%
  '#EBEBEB', // -2%
  '#E6E6E6', // -4%
  'rgba(255, 255, 255, 0.25)',
  'rgba(255, 255, 255, 0.5)',
  'rgba(255, 255, 255, 0.75)',
  'rgba(255, 255, 255, 0.95)',
]);

/** 다크모드시 브랜드 공통 컬러 */
const darkBrandColor = brandColor([
  '#262626',
  '#333333',
  '#404040',
  '#191919',
  '#0D0D0D',
  'rgba(38, 38, 38, 0.25)',
  'rgba(38, 38, 38, 0.5)',
  'rgba(38, 38, 38, 0.75)',
  'rgba(38, 38, 38, 0.95)',
]);

export const theme1: GlobalTheme = {
  color: {
    lightYellow: '#fcefc7',
    salmon: '#fa8072',
    hoverSalmon: '#e06e61',
    cardBg: '#f4f4f5',
    skyblue: '#00cbfe',
    lightBlue: '#d8f2ff',

    /** 핑크 */
    first: brandColor([
      '#FFC1CC',
      '#FFCED9',
      '#FFDBE6',
      '#F2B4BF',
      '#E6A8B3',
      'rgba(255, 193, 204, 0.25)',
      'rgba(255, 193, 204, 0.5)',
      'rgba(255, 193, 204, 0.75)',
      'rgba(255, 193, 204, 0.95)',
    ]),
    /** 오렌지 */
    second: brandColor([
      '#FA8072',
      '#FA8672',
      '#fa8672',
      '#e48378',
      '#e48378',
      '#e48378',
      '#e48378',
      '#e48378',
      '#e48378',
    ]),
    /** 레드 */
    third: brandColor([
      '#e45c75',
      '#e45c75',
      '#e45c75',
      '#e45c75',
      '#e45c75',
      '#e45c75',
      '#e45c75',
      '#e45c75',
      '#e45c75',
    ]),
    /** 화이트 */
    fourth: whiteBrandColor,
    backdrop: '#ffffff34',
    title: '#fff',
    text: {
      default: '#000',
      light: '#fff',
      dark: '#f4f4f5',
      active: '#e06e61',
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

export const theme2: GlobalTheme = {
  color: {
    lightYellow: '#fcefc7',
    salmon: '#fa8072',
    hoverSalmon: '#e06e61',
    cardBg: '#f4f4f5',
    skyblue: '#00cbfe',
    lightBlue: '#d8f2ff',

    first: brandColor([
      '#c8e9ca',
      '#f0f8f1',
      '#f0f8f1',
      '#c9f5d9',
      '#c9f5d9',
      'rgba(200, 233, 202, 0.25)',
      'rgba(200, 233, 202, 0.5)',
      'rgba(200, 233, 202, 0.75)',
      'rgba(200, 233, 202, 0.95)',
    ]),
    second: brandColor([
      '#fa8072',
      '#FFB3A5',
      '#FFE6D8',
      '#e48378',
      '#e48378',
      'rgba(200, 233, 202, 0.25)',
      'rgba(200, 233, 202, 0.5)',
      'rgba(200, 233, 202, 0.75)',
      'rgba(200, 233, 202, 0.95)',
    ]),
    /** 레드 */
    third: brandColor([
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
    ]),
    /** 화이트 */
    fourth: whiteBrandColor,
    backdrop: '#ffffff34',
    title: '#279e27',
    text: {
      default: '#000',
      light: '#fff',
      dark: '#f4f4f5',
      active: '#e06e61',
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

export const theme3: GlobalTheme = {
  color: {
    lightYellow: '#fcefc7',
    salmon: '#fa8072',
    hoverSalmon: '#e06e61',
    cardBg: '#f4f4f5',
    skyblue: '#00cbfe',
    lightBlue: '#d8f2ff',

    first: brandColor([
      '#ace7ff',
      '#f0f8f1',
      '#f0f8f1',
      '#b7e2f3',
      '#b7e2f3',
      'rgba(172, 231, 255, 0.25)',
      'rgba(172, 231, 255, 0.5)',
      'rgba(172, 231, 255, 0.75)',
      'rgba(172, 231, 255, 0.95)',
    ]),
    second: brandColor([
      '#fa8072',
      '#fa8672',
      '#fa8672',
      '#e48378',
      '#e48378',
      '#fa8072',
      '#fa8072',
      '#fa8072',
      '#fa8072',
    ]),
    third: brandColor([
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
    ]),
    fourth: whiteBrandColor,
    backdrop: '#ffffff34',
    title: '#ff6e2b',
    text: {
      default: '#000',
      light: '#fff',
      dark: '#f4f4f5',
      active: '#e06e61',
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

export const theme4: GlobalTheme = {
  color: {
    lightYellow: '#fcefc7',
    salmon: '#fa8072',
    hoverSalmon: '#e06e61',
    cardBg: '#f4f4f5',
    skyblue: '#00cbfe',
    lightBlue: '#d8f2ff',

    first: brandColor([
      '#0d1524',
      '#f0f8f1',
      '#f0f8f1',
      '#152238',
      '#152238',
      'rgba(13, 21, 36, 0.25)',
      'rgba(13, 21, 36, 0.5)',
      'rgba(13, 21, 36, 0.75)',
      'rgba(13, 21, 36, 0.95)',
    ]),
    second: brandColor([
      '#fa8072',
      '#fa8072',
      '#fa8072',
      '#e48378',
      '#e48378',
      '#fa8072',
      '#fa8072',
      '#fa8072',
      '#fa8072',
    ]),
    /** 레드 */
    third: brandColor([
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
    ]),
    fourth: darkBrandColor,
    backdrop: '#ffffff34',
    title: '#ffd700',
    text: {
      default: '#000',
      light: '#fff',
      dark: '#f4f4f5',
      active: '#e06e61',
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

export const theme5: GlobalTheme = {
  color: {
    lightYellow: '#fcefc7',
    salmon: '#fa8072',
    hoverSalmon: '#e06e61',
    cardBg: '#f4f4f5',
    skyblue: '#00cbfe',
    lightBlue: '#d8f2ff',

    first: brandColor([
      '#c8e9ca',
      '#f0f8f1',
      '#f0f8f1',
      '#010b13',
      '#010b13',
      '#91b9aa67',
      '#aad8caaf',
      '#aad8caaf',
      '#aad8caaf',
    ]),
    second: brandColor([
      '#fa8072',
      '#fa8072',
      '#fa8072',
      '#e48378',
      '#e48378',
      '#fa8072',
      '#fa8072',
      '#fa8072',
      '#fa8072',
    ]),
    third: brandColor([
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
      '#64aa2b',
    ]),
    fourth: darkBrandColor,
    backdrop: '#ffffff34',
    title: '#ff0000',
    text: {
      default: '#000',
      light: '#fff',
      dark: '#f4f4f5',
      active: '#e06e61',
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
