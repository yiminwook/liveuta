import { css } from '@emotion/react';

export const BEZIER_CURVE = 'cubic-bezier(0.23, 1, 0.32, 1)';
export const WIDTH = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  XXL: '1536px',
  FULL: '1900px',
};
export const COLORS = {
  'light-font': '#ffffff',
  'highlight-font': '#ee526f',
  'link-font': '#cc718f',
  font: '#4b5563',
  main: '#ffc1cc',
  'light-yellow': '#fcefc7',
  bg: '#d8aab1ec',
  'back-drop': '#b9919867',
  secondary: '#fa923f',
  salmon: '#fa8072',
  'hover-salmon': '#e06e61',
  'card-bg': '#f4f4f5',
  skyblue: '#00cbfe',
  'light-blue': '#d8f2ff',
};

export const boxShadow = css`
  box-shadow: 0px 1px 2px 0 rgba(56, 52, 52, 0.4);
`;

export const textLine = (lineCount: number, lineHeight: number) => css`
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: ${lineCount};
  -webkit-box-orient: vertical;
  line-height: ${lineHeight}rem;
  height: ${lineCount * lineHeight}rem;
`;

export const displayNone = css`
  display: none;
`;

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;