import { is } from 'effect/ParseResult';
import { z } from 'zod';

export const homeDto = z.object({
  coverImgUrl: z.string().url(),
});

export type TScheduleDto = z.infer<typeof scheduleDto>;
export const scheduleDto = z.object({
  query: z
    .string()
    .nullish()
    .transform((v) => v || ''),
  filter: z
    .enum(['scheduled', 'live', 'daily', 'all'])
    .nullish()
    .transform((v) => v || 'scheduled'),
  select: z
    .enum(['all', 'video', 'stream'])
    .nullish()
    .transform((v) => v || 'all'),
  isFavorite: z
    .string()
    .nullish()
    .transform((v) => v === 'true'),
});
