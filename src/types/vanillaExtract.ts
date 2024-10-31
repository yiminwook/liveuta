import { CSSProperties } from '@vanilla-extract/css';

export type CSSPropertiesWithVars = CSSProperties & {
  vars?: Record<string, string>;
};
