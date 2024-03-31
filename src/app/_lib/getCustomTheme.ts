import { GlobalTheme } from '@/style/theme';

const getCurrentTheme = () => {
  const themeString = localStorage.getItem('customTheme') || '';
  try {
    return JSON.parse(themeString) as GlobalTheme;
  } catch (e) {
    return undefined;
  }
};

export default getCurrentTheme;
