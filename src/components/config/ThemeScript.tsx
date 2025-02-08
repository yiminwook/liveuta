// https://github.com/pacocoursey/next-themes/tree/main/next-themes/src

export const THEME_STORAGE_KEY = 'theme';
export const THEME_CUSTOM_EVENT_NAME = 'theme-change';

export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `\
        const THEME_LIST = ["theme1", "theme2", "theme3", "theme4", "theme5"];

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
          if (THEME_LIST.includes(theme)) {
            const mantineTheme = isDarkModeEnabled(theme) ? "dark" : "light";
            document.documentElement.setAttribute("color", theme);
            document.documentElement.setAttribute("data-mantine-color-scheme", mantineTheme);

            if (typeof localStorage !== "undefined") {
              localStorage.setItem("${THEME_STORAGE_KEY}", theme);
            }
          } else {
            // 유효하지 않는 테마의 경우 theme1로 초기화
            document.documentElement.setAttribute("color", "theme1");
            document.documentElement.setAttribute("data-mantine-color-scheme", "light");
          
            if (typeof localStorage !== "undefined") {
              localStorage.setItem("${THEME_STORAGE_KEY}", "theme1");
            }
          }
        }

        const initialTheme = getThemePreference();
        setTheme(initialTheme);

        document.documentElement.addEventListener("${THEME_CUSTOM_EVENT_NAME}", (e) => {
          setTheme(e.detail.theme)
        })
      `,
      }}
    />
  );
}
