'use client';
import {
  ActionIcon,
  MantineTransition,
  Menu,
  Modal,
  Pagination,
  Radio,
  SegmentedControl,
  Select,
  Switch,
  createTheme,
} from '@mantine/core';
import variable from '@variable';

const OPEN_MENU_TRANSITION: MantineTransition = {
  out: { opacity: 0, transform: 'translateY(-4px)' },
  in: { opacity: 1, transform: 'translateY(0px)' },
  transitionProperty: 'opacity, transform',
};

export const theme = createTheme({
  /* Put your mantine theme override here */
  fontFamily:
    'Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif',
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
  colors: {},
  components: {
    Radio: Radio.extend({
      defaultProps: {
        color: variable.thirdColorDefault,
      },
    }),
    Switch: Switch.extend({
      defaultProps: {
        color: variable.thirdColorDefault,
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
    Button: {
      defaultProps: {
        color: variable.thirdColorDefault,
      },
    },
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        color: variable.thirdColorDefault,
      },
    }),
    SegmentedControl: SegmentedControl.extend({
      defaultProps: {
        color: variable.thirdColorDefault,
        transitionTimingFunction: 'ease-out',
        transitionDuration: 300,
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
    Pagination: Pagination.extend({
      defaultProps: {
        color: variable.thirdColorDefault,
        siblings: 2,
      },
    }),
    Modal: Modal.extend({}),
  },
});
