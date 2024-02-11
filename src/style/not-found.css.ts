import { BEZIER_CURVE } from '@/style/var.css';
import { globalStyle, style } from '@vanilla-extract/css';
import { global } from './globalTheme.css';

const wrap = style({
  width: '100dvw',
  height: '100dvh',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const inner = style({
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: 14,
});

const innerTop = style({
  display: 'flex',
  flexDirection: 'column',
});

const innerBottom = style({
  textAlign: 'center',
  fontSize: 16,
  padding: 14,
});

globalStyle(`${innerTop} > h1`, {
  fontSize: 38,
  marginBottom: 14,
});

globalStyle(`${innerTop} > h2`, {
  fontSize: 20,
  fontWeight: 400,
});

const link = style({
  margin: '0 auto',
  fontWeight: 500,
  transition: `color 0.3s ${BEZIER_CURVE}`,
  ':hover': {
    color: global.color.bg,
  },
});

const styles = {
  wrap,
  inner,
  innerTop,
  innerBottom,
  link,
};

export default styles;
