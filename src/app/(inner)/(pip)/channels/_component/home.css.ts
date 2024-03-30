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
  position: 'absolute',
  top: '1rem',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '1.5rem',
  fontWeight: 600,
});

export const paginationBox = style([
  flexCenter,
  {
    width: '100%',
    overflowX: 'auto',
    padding: '0.5rem',

    '::-webkit-scrollbar': {
      height: 5,
    },
  },
]);
