import { globalStyle, style } from '@vanilla-extract/css';
import { responsive } from '../../../../style/var';

export const channelCard = style([
  {
    display: 'flex',
    gap: '0.75rem',
    padding: '0.75rem',
    borderRadius: '15px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transitionProperty: 'scale',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-in-out',

    ':hover': {
      scale: 1.02,
    },
  },
  responsive({
    md: {
      width: '17rem',
      margin: '0 auto',
    },
    full: {
      width: '20rem',
    },
  }),
]);

export const linkToChannel = style({});

export const imageContainer = style({
  position: 'relative',
  width: '5.5rem',
  height: '5.5rem',
  borderRadius: '12px',
  overflow: 'hidden',
});

export const desc = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

export const descContent = style({});

export const descContentLabel = style({
  color: '#888',
});

export const title = style({
  fontSize: '1.25rem',
});

export const details = style({
  display: 'flex',
  flexDirection: 'column',
});

export const originalTitle = style({
  fontSize: '1rem',
  fontWeight: 500,
});

export const link = style({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
});

globalStyle(link, {
  color: 'var(--liveuta-active-color)',
  fontWeight: 600,
});
