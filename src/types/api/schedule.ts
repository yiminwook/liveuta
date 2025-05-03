import { TParsedServerContent } from '@/types/api/mongoDB';

export type TGetScheduleResponse = {
  message: string;
  data: TParsedServerContent[];
};
