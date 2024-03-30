import { global } from '@/style/globalTheme.css';
import { flexCenter, textLine } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const box = style({
  backgroundColor: global.color.first.light,
  borderRadius: 5,
  padding: '0.5rem',
});

export const permissionBox = style({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const button = style({
  padding: '0.5rem',
  borderRadius: 5,
  backgroundColor: global.color.second.darken,
  color: '#fff',
});

export const tokenLabel = style({
  display: 'inline-block',
  marginBottom: '0.5rem',
  fontWeight: 600,
});

export const tokenBox = style({
  display: 'flex',
  justifyContent: 'space-between',
  minHeight: '2.25rem',
  gap: '0.25rem',
});

export const token = style([textLine('1.6rem', 1)]);

export const postLabel = style({
  display: 'inline-block',
  marginBottom: '0.5rem',
  fontWeight: 600,
});

export const postForm = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const postInputBox = style({
  display: 'flex',
  flexDirection: 'column',
  color: '#000',
});

export const postInputLabel = style({
  display: 'inline-block',
  marginBottom: '0.25rem',
});

export const postInput = style({
  borderRadius: 5,
  padding: '0.5rem',
});

export const postButtonBox = style([
  flexCenter,
  {
    padding: '0.5rem',
  },
]);

export const postButton = style({
  padding: '0.5rem 1rem',
  borderRadius: 5,
  backgroundColor: global.color.third.darken,
  color: '#fff',
  ':disabled': {
    backgroundColor: 'lightgray',
  },
});
