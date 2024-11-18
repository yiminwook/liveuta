import { global } from '@/styles/globalTheme.css';
import { loading } from '@/styles/keyframe.css';
import { fixedMaxSize, flexCenter, zIndex } from '@/styles/var';
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
  fixedMaxSize,
  {
    fontSize: '2rem',
  },
]);

export const MainLoadingInner = style({
  color: global.color.third.lighter,
  position: 'relative',
  height: 130,
  width: 130,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 9999,
});

export const MainLoadingBar = style({
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'rotatez(-90deg)',
  animation: `${loading} 1.5s infinite`,
});

export const MainLoadingText = style({
  fontSize: '1.25rem',
  textAlign: 'center',
  fontWeight: 500,
});
