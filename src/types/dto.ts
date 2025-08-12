import { z } from 'zod';
import { StreamFilter } from './index';

export const homeDto = z.object({
  coverImgUrl: z.url(),
});

export type TScheduleDto = z.infer<typeof scheduleDto>;
export const scheduleDto = z.object({
  query: z
    .string()
    .nullish()
    .transform((v) => v || ''),
  filter: z
    .enum(StreamFilter)
    .nullish()
    .transform((v) => v || StreamFilter.scheduled),
  select: z
    .enum(['all', 'video', 'stream'])
    .nullish()
    .transform((v) => v || 'all'),
  isFavorite: z
    .string()
    .nullish()
    .transform((v) => v === 'true'),
});

export type TUpdateMetadataDto = z.infer<typeof UpdateMetadataDto>;
export const UpdateMetadataDto = z.object({
  key: z.string(),
  value: z.string(),
});
