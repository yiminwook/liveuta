import {
  assignVars,
  createGlobalTheme,
  createGlobalThemeContract,
  globalStyle,
} from '@vanilla-extract/css';
import { theme1, theme2, theme3, theme4, theme5 } from './theme';

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

export const globalVars = {
  color: {
    main: createVar('main'),
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

createGlobalTheme(':root', global, theme1);

globalStyle(":root[color='theme2']", {
  vars: assignVars(global, theme2),
});

globalStyle(":root[color='theme3']", {
  vars: assignVars(global, theme3),
});

globalStyle(":root[color='theme4']", {
  vars: assignVars(global, theme4),
});

globalStyle(":root[color='theme5']", {
  vars: assignVars(global, theme5),
});
