import { global } from '@/style/globalTheme.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const inner = style({
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const top = style({});

globalStyle(`${top} p`, {
  fontSize: '1.25rem',
  lineHeight: 1.5,
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 500,
});

export const bottom = style({});

export const inputArea = style({
  display: 'flex',
  padding: '0.5rem',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '0.5rem',
});

export const postLinkBox = style({
  fontSize: '1.1rem',
  color: '#fff',
  backgroundColor: global.color.hoverSalmon,
  padding: '0.5rem',
});
