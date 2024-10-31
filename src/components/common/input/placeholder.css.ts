import { placeholderShimmer } from '@/styles/keyframe.css';
import { createThemeContract, style } from '@vanilla-extract/css';

export const placeholderContract = createThemeContract({
  height: null,
});

export const bg = style({
  width: '100%',
  animationDuration: '1.25s',
  animationFillMode: 'forwards',
  animationIterationCount: 'infinite',
  animationName: placeholderShimmer,
  animationTimingFunction: 'linear',
  background: 'linear-gradient(to right, #e8e8e8 10%, #dddddd 18%, #e8e8e8 33%)',
  backgroundSize: '800px 104px',
  height: placeholderContract.height,
  position: 'relative',
  borderRadius: 3,
});
