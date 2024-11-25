import { global } from '@/styles/globalTheme.css';
import { openMenu } from '@/styles/keyframe.css';
import { textLine } from '@/styles/var';
import { globalStyle, style } from '@vanilla-extract/css';

export const root = style([]);

export const trigger = style([
  {
    height: '2.5rem',
    padding: '0 0.5rem',
    backgroundColor: '#fff',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    ':hover': {
      color: '#fff',
      backgroundColor: global.color.second.dark,
    },
  },
]);

export const text = style([textLine('1.6rem', 1), {}]);

export const positioner = style([
  {
    display: 'none',
  },
]);

export const content = style({
  position: 'relative',
  animation: `${openMenu} 0.3s ease-out`,
  backgroundColor: global.color.first.lighter,
  width: '100%',
  padding: '0.5rem',
  marginTop: '0.25rem',
  borderRadius: 5,
  color: global.color.text.active,
  '::before': {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    content: '',
    backgroundColor: 'inherit',
    width: '1rem',
    height: '1rem',
  },
});

globalStyle(`${root}:hover ${positioner}`, {
  display: 'block',
});

export const description = style([textLine('1.6rem', 1), {}]);
