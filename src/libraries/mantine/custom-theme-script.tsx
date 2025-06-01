// https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/core/src/core/MantineProvider/ColorSchemeScript/ColorSchemeScript.tsx
export function CustomThemeScript({ localStorageKey = 'mantine-color-scheme' }) {
  return (
    <script
      data-mantine-script
      dangerouslySetInnerHTML={{
        __html: `\
        try {
          const THEME_LIST = ["theme1", "theme2", "theme3", "theme4", "theme5"];

          function isDarkModeEnabled (theme) {
            const themeIndex = Number(theme.replace('theme', '')) || 1;
            return themeIndex > 3;
          };

          function getThemePreference() {
            if (typeof localStorage !== "undefined" && localStorage.getItem("${localStorageKey}")) {
              return localStorage.getItem("${localStorageKey}") || "theme1";
            }
            return "theme1";
          }

          const colorScheme = getThemePreference();
          const mantineTheme = isDarkModeEnabled(colorScheme) ? "dark" : "light";

          document.documentElement.setAttribute("color", colorScheme);
          document.documentElement.setAttribute("data-mantine-color-scheme", mantineTheme);
        } catch (e) {
          console.warn('ThemeScript error');
        }
      `,
      }}
    />
  );
}
