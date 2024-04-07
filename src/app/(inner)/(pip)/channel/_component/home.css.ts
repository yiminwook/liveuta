import { global } from '@/style/globalTheme.css';
import { flexCenter, responsive } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const inner = style({
  padding: '0.5rem',
  backgroundColor: global.color.first.light,
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
