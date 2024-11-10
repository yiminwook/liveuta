import { global } from '@/styles/globalTheme.css';
import { flexCenter, responsive } from '@/styles/var';
import { style } from '@vanilla-extract/css';

export const inner = style({
  padding: '0.5rem',
  backgroundColor: global.color.main,
});

export const channelSection = style([
  {
    position: 'relative',
  },
  responsive({}),
]);

export const alert = style({
  fontSize: '1.1rem',
  fontWeight: 600,
});

export const paginationBox = style([
  flexCenter,
  {
    width: '100%',
    overflowX: 'auto',
    padding: '1rem 0',
    '::-webkit-scrollbar': {
      height: 5,
    },
  },
]);
