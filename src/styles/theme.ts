'use client';
import {
  ActionIcon,
  ButtonProps,
  Checkbox,
  MantineTheme,
  MantineTransition,
  Menu,
  Modal,
  ModalContent,
  Pagination,
  Radio,
  SegmentedControl,
  Select,
  Switch,
  createTheme,
  defaultVariantColorsResolver,
} from '@mantine/core';
import variable from '@variable';

// https://mantine.dev/styles/variants-sizes

const OPEN_MENU_TRANSITION: MantineTransition = {
  out: { opacity: 0, transform: 'translateY(-4px)' },
  in: { opacity: 1, transform: 'translateY(0px)' },
  transitionProperty: 'opacity, transform',
};

const BLANK_TRANSITION: MantineTransition = {
  out: {},
  in: {},
  transitionProperty: '',
};

export const theme = createTheme({
  /* Put your mantine theme override here */
  fontFamily:
    'Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif',
  breakpoints: {
    xs: '30rem',
    sm: '48rem',
    md: '64rem',
    lg: '74rem',
    xl: '90rem',
  },
  colors: {},
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        color: variable.thirdColorDefault,
      },
    }),
    Button: {
      vars: (theme: MantineTheme, props: ButtonProps) => {
        if (props.variant === 'default') {
          return {
            root: {
              '--button-color': 'var(--mantine-color-text)',
            },
          };
        }
      },
      // styles: (theme: MantineTheme, props: ButtonProps) => {
      //   return {
      //     root: {
      //       color: 'red',
      //     },
      //   };
      // },
      defaultProps: {
        color: variable.thirdColorDefault,
      },
    },
    Checkbox: Checkbox.extend({
      defaultProps: {
        color: variable.thirdColorDefault,
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        transitionProps: {
          transition: OPEN_MENU_TRANSITION,
          timingFunction: 'ease-out',
          duration: 300,
        },
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        transitionProps: {
          transition: BLANK_TRANSITION,
          duration: 0,
          timingFunction: '',
        },
      },
    }),
    ModalContent: ModalContent.extend({
      defaultProps: {
        transitionProps: {
          transition: BLANK_TRANSITION,
          duration: 0,
          timingFunction: '',
        },
      },
    }),
    Pagination: Pagination.extend({
      defaultProps: {
        color: variable.thirdColorDefault,
        siblings: 2,
        withEdges: true, // Show first/last controls
      },
    }),
    Radio: Radio.extend({
      defaultProps: {
        color: variable.thirdColorDefault,
      },
    }),
    SegmentedControl: SegmentedControl.extend({
      styles: {
        root: {
          boxShadow: '0px 0px 0px 1px var(--mantine-color-default-border)',
        },
      },
      defaultProps: {
        color: variable.thirdColorDefault,
        transitionTimingFunction: 'ease-out',
        transitionDuration: 300,
      },
    }),
    Select: Select.extend({
      defaultProps: {
        comboboxProps: {
          transitionProps: {
            transition: OPEN_MENU_TRANSITION,
            timingFunction: 'ease-out',
            duration: 300,
          },
        },
      },
    }),
    Switch: Switch.extend({
      defaultProps: {
        color: variable.thirdColorDefault,
      },
    }),
  },
  variantColorResolver(input) {
    const defaultResolvedColors = defaultVariantColorsResolver(input);

    if (input.variant === 'ghost') {
      return {
        background: 'transparent',
        hover: 'var(--mantine-color-default-hover)',
        color: 'var(--mantine-color-text)',
        border: 'none',
      };
    }

    if (input.color === 'first') {
      return {
        background: 'var(--liveuta-first-default)',
        hover: 'var(--liveuta-first-light)',
        color: 'var(--mantine-color-white)',
        border: 'none',
      };
    } else if (input.color === 'second') {
      return {
        background: 'var(--liveuta-second-default)',
        hover: 'var(--liveuta-second-light)',
        color: 'var(--mantine-color-white)',
        border: 'none',
      };
    } else if (input.color === 'third') {
      return {
        background: 'var(--liveuta-third-default)',
        hover: 'var(--liveuta-third-light)',
        color: 'var(--mantine-color-white)',
        border: 'none',
      };
    }

    return defaultResolvedColors;
  },
});
