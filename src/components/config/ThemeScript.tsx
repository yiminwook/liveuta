// https://github.com/pacocoursey/next-themes/tree/main/next-themes/src

import { TTheme } from '@/types';
import { isDarkModeEnabled } from '@/utils/helper';
import {
  MantineColorScheme,
  MantineColorSchemeManager,
  MantineContext,
  noop,
  useMantineStyleNonce,
} from '@mantine/core';
import { useColorScheme, useIsomorphicEffect } from '@mantine/hooks';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

// export default function ThemeScript() {
//   return (
//     <script
//       data-mantine-script="true"
//       dangerouslySetInnerHTML={{
//         __html: `\
//         try {
//           var _colorScheme = window.localStorage.getItem("mantine-color-scheme-value");
//           var colorScheme = _colorScheme === "light" || _colorScheme === "dark" || _colorScheme === "auto" ? _colorScheme : "light";
//           var computedColorScheme = colorScheme !== "auto" ? colorScheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
//           document.documentElement.setAttribute("data-mantine-color-scheme", computedColorScheme);
//         } catch (e) {}
//       `,
//       }}
//     />
//   );
// }

// export default function ThemeScript() {
//   return (
//     <script
//       dangerouslySetInnerHTML={{
//         __html: `\
//         const THEME_LIST = ["theme1", "theme2", "theme3", "theme4", "theme5"];

//         function isDarkModeEnabled (theme) {
//           const themeIndex = Number(theme.replace('theme', '')) || 1;
//           return themeIndex > 3;
//         };

//         function getThemePreference() {
//           if (typeof localStorage !== "undefined" && localStorage.getItem("${THEME_STORAGE_KEY}")) {
//             return localStorage.getItem("${THEME_STORAGE_KEY}") || "theme1";
//           }
//           return "theme1";
//         }

//         function setTheme(theme) {
//           if (THEME_LIST.includes(theme)) {
//             const mantineTheme = isDarkModeEnabled(theme) ? "dark" : "light";
//             document.documentElement.setAttribute("color", theme);
//             document.documentElement.setAttribute("data-mantine-color-scheme", mantineTheme);

//             if (typeof localStorage !== "undefined") {
//               localStorage.setItem("${THEME_STORAGE_KEY}", theme);
//             }
//           } else {
//             // 유효하지 않는 테마의 경우 theme1로 초기화
//             document.documentElement.setAttribute("color", "theme1");
//             document.documentElement.setAttribute("data-mantine-color-scheme", "light");

//             if (typeof localStorage !== "undefined") {
//               localStorage.setItem("${THEME_STORAGE_KEY}", "theme1");
//             }
//           }
//         }

//         const initialTheme = getThemePreference();
//         setTheme(initialTheme);

//         document.documentElement.addEventListener("${THEME_CUSTOM_EVENT_NAME}", (e) => {
//           setTheme(e.detail.theme)
//         })
//       `,
//       }}
//     />
//   );
// }
