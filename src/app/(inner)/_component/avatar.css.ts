import { global } from '@/style/globalTheme.css';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  borderRadius: '50%',
  overflow: 'hidden',
});

export const placeholder = style({
  fontWeight: 600,
  textAlign: 'center',
  backgroundColor: '#fff',
  color: global.color.text.light,
  fontSize: 14,
});
