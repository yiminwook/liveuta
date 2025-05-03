import { TParsedServerContent } from '@/libraries/mongodb/type';

export type TGetScheduleResponse = {
  message: string;
  data: TParsedServerContent[];
};
