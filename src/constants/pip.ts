import { z } from 'zod';

export const PIP_LOCAL_STORAGE_KEY = 'pipPosition';
export const DRAGGABLE_BOX_ID = 'draggable-box'; // 드래그 가능한 박스 ID
export type TCorner = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export const DROP_ZONES = [
  { id: 'topLeft', corner: 'topLeft' },
  { id: 'topRight', corner: 'topRight' },
  { id: 'bottomLeft', corner: 'bottomLeft' },
  { id: 'bottomRight', corner: 'bottomRight' },
] as const;

export const DROP_ZONE_RANGE = {
  topLeft: { top: 0, left: 0 },
  topRight: { top: 0, right: 0 },
  bottomLeft: { bottom: 0, left: 0 },
  bottomRight: { bottom: 0, right: 0 },
} as const;

export const DRAGGABLE_ZONE_RANGE = {
  topLeft: { top: 100, left: 20 },
  topRight: { top: 100, right: 20 },
  bottomLeft: { bottom: 20, left: 20 },
  bottomRight: { bottom: 20, right: 20 },
} as const;

export const transfromStringToConer = z
  .string()
  .nullable()
  .transform((value) => {
    if (value === null) return 'bottomLeft';
    if (Object.hasOwn(DRAGGABLE_ZONE_RANGE, value)) return value as TCorner;
    return 'bottomLeft';
  });
