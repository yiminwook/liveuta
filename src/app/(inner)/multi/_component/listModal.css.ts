import { global } from '@/style/globalTheme.css';
import { textLine } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style([
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
]);

export const inputBox = style([
  {
    display: 'flex',
    gap: '0.5rem',
  },
]);

export const input = style([
  {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: 5,
    outline: 'none',
  },
]);

export const inputButton = style([
  {
    flex: '0 0 3.5rem',
    backgroundColor: global.color.third.default,
    width: '3.5rem',
    borderRadius: 5,
    fontWeight: 600,
  },
]);

export const list = style([
  {
    minHeight: '10rem',
    gap: '0.5rem',
    padding: '0.5rem',
    marginTop: '1rem',
  },
]);

export const item = style([
  {
    display: 'flex',
    justifyContent: 'space-between',
  },
]);

export const itemText = style([textLine(1.6, 1)]);

export const itemButton = style([
  {
    width: '3.5rem',
    flex: '0 0 3.5rem',
  },
]);
