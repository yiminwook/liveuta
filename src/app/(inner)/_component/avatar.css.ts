import { global } from '@/style/globalTheme.css';
import { BOX_SHADOW } from '@/style/var';
import { createThemeContract, style } from '@vanilla-extract/css';

export const avatarContract = createThemeContract({
  size: null,
});

export const wrap = style({
  borderRadius: '50%',
  height: avatarContract.size,
  width: avatarContract.size,
  boxShadow: BOX_SHADOW,
});

export const fallback = style({
  fontWeight: 600,
  backgroundColor: '#fff',
  color: global.color.first.default,
  lineHeight: avatarContract.size,
});

export const image = style({
  height: avatarContract.size,
  width: avatarContract.size,
  objectFit: 'cover',
});
