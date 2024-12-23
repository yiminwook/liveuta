import { ColorPickerValueChangeDetails } from '@ark-ui/react';

const validateColorRange = (color: number) => {
  if (color < 0) return 0;
  if (color > 255) return 255;
  return color;
};

const validateAlphaRange = (alpha: number) => {
  if (alpha < 0) return 0;
  if (alpha > 1) return 1;
  return alpha;
};

const calcurateDarkenColor = (color: number, percent: number) => {
  return validateColorRange(Math.floor(color - (color * percent) / 100));
};

const calcurateLightenColor = (color: number, percent: number) => {
  return validateColorRange(Math.floor(color + (color * percent) / 100));
};

const getRgb = (details: ColorPickerValueChangeDetails) => {
  const red = details.value.getChannelValue('red');
  const green = details.value.getChannelValue('green');
  const blue = details.value.getChannelValue('blue');

  const controllAlpha = (alpha: number) => {
    const alphaValue = validateAlphaRange(alpha);
    return `rgba(${red}, ${green}, ${blue}, ${alphaValue})`;
  };

  const darken = (percent: number) => {
    const darkenRed = calcurateDarkenColor(red, percent);
    const darkenGreen = calcurateDarkenColor(green, percent);
    const darkenBlue = calcurateDarkenColor(blue, percent);
    return `rgba(${darkenRed}, ${darkenGreen}, ${darkenBlue})`;
  };

  const lighten = (percent: number) => {
    const lightenRed = calcurateLightenColor(red, percent);
    const lightenGreen = calcurateLightenColor(green, percent);
    const lightenBlue = calcurateLightenColor(blue, percent);
    return `rgba(${lightenRed}, ${lightenGreen}, ${lightenBlue})`;
  };

  return {
    default: details.valueAsString,
    light: lighten(5),
    lighter: lighten(10),
    dark: darken(5),
    darken: darken(10),
    '25': controllAlpha(0.25),
    '50': controllAlpha(0.5),
    '75': controllAlpha(0.75),
    '95': controllAlpha(0.95),
  };
};

export default getRgb;
