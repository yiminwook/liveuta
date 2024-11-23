import { z } from 'zod';

export const homeDto = z.object({
  coverImgUrl: z.string().url(),
});
