import { globalStyle, style } from '@vanilla-extract/css';

export const categoryTabs = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '4rem',
  fontSize: '1.25rem',
});

export const categoryTab = style({
  // padding: '0.8rem 0.4rem',
  transition: 'transform 0.15s cubic-bezier(0.87, 0, 0.13, 1)',
  selectors: {
    '&[data-selected="true"]': {
      fontWeight: 700,
      position: 'relative',
      zIndex: 500,
    },
    '&[data-selected="true"]:after': {
      content: '""',
      width: '100%',
      height: '50%',
      display: 'inline-block',
      backgroundColor: '#D9FCDBaa',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: '20%',
      zIndex: -1,
    },
    '&[data-selected="false"]:hover': {
      transform: 'translateY(-0.2rem)',
    },
  },
});
