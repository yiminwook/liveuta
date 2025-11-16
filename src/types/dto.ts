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

export type TUpdateMetadataDto = z.infer<typeof updateMetadataDto>;
export const updateMetadataDto = z.object({
  key: z.string(),
  value: z.string(),
});

export const signInDto = z.object({
  email: z.email({ error: '이메일 형식이 올바르지 않습니다.' }),
  verificationCode: z.string(),
});

export type TSignInDto = z.infer<typeof signInDto>;
