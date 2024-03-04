import { global } from '@/style/globalTheme.css';
import { loading } from '@/style/keyframe.css';
import { flexCenter, zIndex } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const loadingWrap = style([
  flexCenter,
  {
    padding: '1rem',
  },
]);

export const MainLoadingWrap = style([
  flexCenter,
  zIndex.float,
  {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: '2rem',
  },
]);

export const MainLoadingInner = style({
  color: 'var(--liveuta-loading-color)',
  position: 'relative',
  textAlign: 'center',
});

export const MainLoadingBar = style({
  position: 'absolute',
  top: -15,
  left: 0,
  transform: 'rotatez(-90deg)',
  animation: `${loading} 1.5s infinite`,
});

export const MainLoadingText = style({
  marginTop: '0.5rem',
  fontSize: '1.25rem',
  textAlign: 'center',
  fontWeight: 500,
  color: global.color.lightFont,
});
