import {
  assignVars,
  createGlobalTheme,
  createGlobalThemeContract,
  globalStyle,
} from '@vanilla-extract/css';

export const global = createGlobalThemeContract({
  theme: {
    logoColor: 'logo-color',
    textColor: 'text-color',
    textColor1: 'text-color1',
    textColor2: 'text-color2',
    textColor3: 'text-color3',
    textColor4: 'text-color4',
    textColor5: 'text-color5',
    bgColor: 'bg-color',
    bgColor1: 'bg-color1',
    bgColor2: 'bg-color2',
    bgColor3: 'bg-color3',
    bgColor4: 'bg-color4',
    bgColor5: 'bg-color5',
    bgColor6: 'bg-color6',
    bgColor7: 'bg-color7',
    ButtonColor: 'button-color',
    hoverColor: 'hover-color',
    lineColor: 'line-color',
    lineColor2: 'line-color2',
    lineColor3: 'line-color3',
    fontTitle: 'font-title',
    fontTitle1: 'font-title1',
    fontTitle2: 'font-title2',
    fontTitle3: 'font-title3',
    fontTitle4: 'font-title4',
    fontSubTitle1: 'font-sub-title1',
    fontSubTitle2: 'font-sub-title2',
    fontDetail1: 'font-detail1',
    fontDetail2: 'font-detail2',
    mobileMin: 'mobile-min',
    mobileMax: 'mobile-max',
    hoverColor1: 'hover-color1',
    hoverColor2: 'hover-color2',
    hoverColor3: 'hover-color3',
    hoverColor4: 'hover-color4',
  },
});

const whiteGlobalTheme = {
  theme: {
    logoColor: '#282C94',
    textColor: '#1e2329',
    textColor1: '#00000080',
    textColor2: '#707a8a',
    textColor3: '#fff',
    textColor4: '#BFC2C6',
    textColor5: '#383D42',
    bgColor: '#fff',
    bgColor1: '#cecece',
    bgColor2: '#f0f0f0',
    bgColor3: '#0000001A',
    bgColor4: '#fafafa',
    bgColor5: '#F7F7F8',
    bgColor6: '#fff',
    bgColor7: '#F8F8F9',
    ButtonColor: '#2B2FA1',
    hoverColor: '#363BC9',
    lineColor: '#d5d5d5',
    lineColor2: '#B7BCC2',
    lineColor3: '#EEF0F2',
    fontTitle: '48px',
    fontTitle1: '40px',
    fontTitle2: '32px',
    fontTitle3: '28px',
    fontTitle4: '24px',
    fontSubTitle1: '20px',
    fontSubTitle2: '16px',
    fontDetail1: '14px',
    fontDetail2: '12px',
    mobileMin: '1024px',
    mobileMax: '360px',
    hoverColor1: '#e7eaee',
    hoverColor2: '#d3d3d384',
    hoverColor3: '#cecece',
    hoverColor4: '#383D42',
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
