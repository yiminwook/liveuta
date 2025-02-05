/* eslint-disable @next/next/no-before-interactive-script-outside-document */
export const THEME_STORAGE_KEY = 'theme';
export const THEME_CUSTOM_EVENT_NAME = 'theme-change';
export const THEME_DARK_CLASS_NAME = 'dark';
export const THEME_LIGHT_CLASS_NAME = 'light';

export default function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `\
      function isDarkModeEnabled (theme) {
        const themeIndex = Number(theme.replace('theme', '')) || 1;
        return themeIndex > 3;
      };

      function getThemePreference() {
        if (typeof localStorage !== "undefined" && localStorage.getItem("${THEME_STORAGE_KEY}")) {
          return localStorage.getItem("${THEME_STORAGE_KEY}") || "theme1";
        }
        return "theme1";
      }

      function setTheme(theme) {
        const isDarkMode = isDarkModeEnabled(theme);
        document.documentElement.setAttribute("color", theme);
        document.documentElement.setAttribute("data-mantine-color-scheme", isDarkMode ? "dark" : "light");
      }

      const initialTheme = getThemePreference();
      setTheme(initialTheme);`,
      }}
    ></script>
  );
}
