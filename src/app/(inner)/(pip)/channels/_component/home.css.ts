import { responsive } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const channelSection = style([
  {
    position: 'relative',
    width: 'calc(100% - 1rem)',
    padding: '0.5rem',
    display: 'grid',
    gap: '0.75rem',
  },
  responsive({
    sm: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    md: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    '2xl': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  }),
]);

export const alert = style({
  position: 'absolute',
  top: '1rem',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '1.5rem',
  fontWeight: 600,
});
