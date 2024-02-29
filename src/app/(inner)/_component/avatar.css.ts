import { style } from '@vanilla-extract/css';

export const wrap = style({
  borderRadius: '50%',
  overflow: 'hidden',
});

export const placeholder = style({
  fontWeight: 600,
  textAlign: 'center',
  backgroundColor: '#fff',
  color: 'var(--liveuta-bg-color)',
  fontSize: 14,
});
