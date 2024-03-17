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
      '#FF8D7F',
      '#FF9A8C',
      '#ED7365',
      '#E16759',
      'rgba(250, 128, 114, 0.25)',
      'rgba(250, 128, 114, 0.5)',
      'rgba(250, 128, 114, 0.75)',
      'rgba(250, 128, 114, 0.95)',
    ]),
    /** 레드 */
    third: brandColor([
      '#E45C75',
      '#F16982',
      '#FE768F',
      '#D74F68',
      '#CB435C',
      'rgba(228, 92, 117, 0.25)',
      'rgba(228, 92, 117, 0.50)',
      'rgba(228, 92, 117, 0.75)',
      'rgba(228, 92, 117, 0.95)',
    ]),
    /** 화이트 */
    fourth: whiteBrandColor,
    backdrop: '#ffffff34',
    title: '#fff',
    text: {
      default: '#000',
      light: '#fff',
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
    lightBlue: '#d8f2ff',

    /** 연녹색 */
    first: brandColor([
      '#C8E9CA',
      '#D5F6D7',
      '#E2FFE4',
      '#BBDCBD',
      '#AFD0B1',
      'rgba(200, 233, 202, 0.25)',
      'rgba(200, 233, 202, 0.5)',
      'rgba(200, 233, 202, 0.75)',
      'rgba(200, 233, 202, 0.95)',
    ]),
    /** 노랑 */
    second: brandColor([
      '#FFD700',
      '#FFE40D',
      '#FFF11A',
      '#F2CA00',
      '#E6BE00',
      'rgba(255, 215, 0, 0.25)',
      'rgba(255, 215, 0, 0.5)',
      'rgba(255, 215, 0, 0.75)',
      'rgba(255, 215, 0, 0.95)',
    ]),
    /** 녹색 */
    third: brandColor([
      '#64AA2B',
      '#71B738',
      '#7EC445',
      '#579D1E',
      '#4B9112',
      'rgba(100, 170, 43, 0.25)',
      'rgba(100, 170, 43, 0.5)',
      'rgba(100, 170, 43, 0.75)',
      'rgba(100, 170, 43, 0.95)',
    ]),
    /** 화이트 */
    fourth: whiteBrandColor,
    backdrop: '#ffffff34',
    title: '#279E27',
    text: {
      default: '#000',
      light: '#fff',
      active: '#279e27',
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
    lightBlue: '#d8f2ff',

    /** 하늘색 */
    first: brandColor([
      '#ACE7FF',
      '#B9F4FF',
      '#C6FFFF',
      '#9FDAF2',
      '#93CEE6',
      'rgba(172, 231, 255, 0.25)',
      'rgba(172, 231, 255, 0.5)',
      'rgba(172, 231, 255, 0.75)',
      'rgba(172, 231, 255, 0.95)',
    ]),
    /** 오렌지 */
    second: brandColor([
      '#FF6E2B',
      '#FF7B38',
      '#FF8845',
      '#F2611E',
      '#E65512',
      'rgba(255, 110, 43, 0.25)',
      'rgba(255, 110, 43, 0.5)',
      'rgba(255, 110, 43, 0.75)',
      'rgba(255, 110, 43, 0.95)',
    ]),
    /** 진한 오렌지 */
    third: brandColor([
      '#FF3E29',
      '#FF4B36',
      '#FF5843',
      '#F2311C',
      '#E62510',
      'rgba(255, 62, 41, 0.25)',
      'rgba(255, 62, 41, 0.5)',
      'rgba(255, 62, 41, 0.75)',
      'rgba(255, 62, 41, 0.95)',
    ]),
    fourth: whiteBrandColor,
    backdrop: '#ffffff34',
    title: '#ff6e2b',
    text: {
      default: '#000',
      light: '#fff',
      active: '#ff6e2b',
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
    lightBlue: '#d8f2ff',

    /** 진한 남색 */
    first: brandColor([
      '#0D1524',
      '#1A2231',
      '#272F3E',
      '#000817',
      '#00000B',
      'rgba(13, 21, 36, 0.25)',
      'rgba(13, 21, 36, 0.5)',
      'rgba(13, 21, 36, 0.75)',
      'rgba(13, 21, 36, 0.95)',
    ]),
    /** 파란색 */
    second: brandColor([
      '#466DB6',
      '#537AC3',
      '#6087D0',
      '#3960A9',
      '#2D549D',
      'rgba(70, 109, 182, 0.25)',
      'rgba(70, 109, 182, 0.5)',
      'rgba(70, 109, 182, 0.75)',
      'rgba(70, 109, 182, 0.95)',
    ]),
    /** 노랑 */
    third: brandColor([
      '#FFD700',
      '#FFE40D',
      '#FFF11A',
      '#F2CA00',
      '#E6BE00',
      'rgba(255, 215, 0, 0.25)',
      'rgba(255, 215, 0, 0.5)',
      'rgba(255, 215, 0, 0.75)',
      'rgba(255, 215, 0, 0.95)',
    ]),
    fourth: darkBrandColor,
    backdrop: '#ffffff34',
    title: '#FFD700',
    text: {
      default: '#fff',
      light: '#cccccc',
      active: '#FFD700',
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
    lightBlue: '#d8f2ff',

    /** 검정 */
    first: brandColor([
      '#251C1C',
      '#322929',
      '#3F3636',
      '#180F0F',
      '#0C0303',
      'rgba(37, 28, 28, 0.25)',
      'rgba(37, 28, 28, 0.5)',
      'rgba(37, 28, 28, 0.75)',
      'rgba(37, 28, 28, 0.95)',
    ]),
    /** 진한 갈색 */
    second: brandColor([
      '#341809',
      '#412516',
      '#4E3223',
      '#270B00',
      '#1B0000',
      'rgba(52, 24, 9, 0.25)',
      'rgba(52, 24, 9, 0.5)',
      'rgba(52, 24, 9, 0.75)',
      'rgba(52, 24, 9, 0.95)',
    ]),
    /** 레드 */
    third: brandColor([
      '#FF0000',
      '#FF0D0D',
      '#FF1A1A',
      '#F20000',
      '#E60000',
      'rgba(255, 0, 0, 0.25)',
      'rgba(255, 0, 0, 0.5)',
      'rgba(255, 0, 0, 0.75)',
      'rgba(255, 0, 0, 0.95)',
    ]),
    fourth: darkBrandColor,
    backdrop: '#ffffff34',
    title: '#FF0000',
    text: {
      default: '#fff',
      light: '#cccccc',
      active: '#FF0000',
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
