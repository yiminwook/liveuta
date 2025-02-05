// export const THEME_STORAGE_KEY = 'theme';
// export const THEME_CUSTOM_EVENT_NAME = 'theme-change';
// export const THEME_DARK_CLASS_NAME = 'dark';
// export const THEME_LIGHT_CLASS_NAME = 'light';

// https://github.com/pacocoursey/next-themes/tree/main/next-themes/src

function script() {
  function isDarkModeEnabled(theme: string) {
    const themeIndex = Number(theme.replace('theme', '')) || 1;
    return themeIndex > 3;
  }

  function getThemePreference() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') || 'theme1';
    }
    return 'theme1';
  }

  function setTheme(theme: string) {
    const isDarkMode = isDarkModeEnabled(theme);
    document.documentElement.setAttribute('color', theme);
    document.documentElement.setAttribute(
      'data-mantine-color-scheme',
      isDarkMode ? 'dark' : 'light',
    );
  }

  const initialTheme = getThemePreference();
  console.log('initialTheme', initialTheme);
  setTheme(initialTheme);
}

export default function ThemeScript() {
  return (
    <script
      // suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: `(${script.toString()})()` }}
    />
  );
}
