import { style } from '@vanilla-extract/css';
import { responsive } from '@/styles/var';
import { global } from '@/styles/globalTheme.css';

export const channelCard = style([
  {
    display: 'flex',
    gap: '0.75rem',
    padding: '0.75rem',
    transitionProperty: 'scale',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-in-out',
    borderBottom: `1px solid #f0f0f0`,
    ':hover': {},
  },
  responsive({}),
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
  fontWeight: 500,
  marginBottom: '0.25rem',
  display: 'flex',
  gap: '0.5rem',
});

export const details = style([
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  responsive({
    sm: {
      flexDirection: 'row',
    },
  }),
]);

export const originalTitle = style({
  fontSize: '1rem',
  fontWeight: 500,
});

export const link = style({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  color: global.color.salmon,
  fontWeight: 600,
});
