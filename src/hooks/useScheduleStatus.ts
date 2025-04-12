import { SCHEDULES_TAG } from '@/constants/revalidateTag';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';

/** query observer가 없을때 undefined 반환 */
const useScheduleStatus = () => {
  'use no memo';
  const queryClient = useQueryClient();
  useIsFetching({ queryKey: [SCHEDULES_TAG] }); //리랜더링용
  return queryClient.getQueryState([SCHEDULES_TAG])?.status;
};

export default useScheduleStatus;
