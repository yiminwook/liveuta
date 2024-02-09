import { CSSPropertiesWithVars } from '@/type/vanillaExtract';
import { style, createVar, styleVariants, CSSProperties } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

// 재사용 할 수 있는 스타일들을 정의

export const BEZIER_CURVE = 'cubic-bezier(0.23, 1, 0.32, 1)';
export const boxShadow = '0px 1px 2px 0 rgba(56, 52, 52, 0.4)';

export const flexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const zIndex = {
  header: {
    zIndex: 1000,
  },
  modal: {
    zIndex: 9000,
  },
  toast: {
    zIndex: 10000,
  },
};

export const responsive = (styles: {
  mobile?: CSSPropertiesWithVars;
  tablet?: CSSPropertiesWithVars;
  desktop?: CSSPropertiesWithVars;
}) => {
  const mediaStyle: Record<string, CSSPropertiesWithVars> = {};

  if (styles.mobile) {
    mediaStyle['screen and (min-width: 365px)'] = styles.mobile;
  }

  if (styles.tablet) {
    mediaStyle['screen and (min-width: 768px)'] = styles.tablet;
  }

  if (styles.desktop) {
    mediaStyle['screen and (min-width: 1024px)'] = styles.desktop;
  }

  return {
    '@media': {
      ...mediaStyle,
    },
  };
};

const textLineBase: CSSPropertiesWithVars = {
  wordBreak: 'break-all',
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
};

export const textOneLine: CSSPropertiesWithVars = {
  ...textLineBase,
  WebkitLineClamp: 1,
  lineHeight: 1.25,
  height: calc.multiply(1 * 1.25),
};

export const textTwoLine: CSSPropertiesWithVars = {
  ...textLineBase,
  WebkitLineClamp: 2,
  lineHeight: 1.25,
  height: calc.multiply(2 * 1.25),
};
