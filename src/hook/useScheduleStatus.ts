import { useIsFetching, useQueryClient } from '@tanstack/react-query';

/** query observer가 없을때 undefined 반환 */
const useScheduleStatus = () => {
  const queryClient = useQueryClient();
  useIsFetching(); //리랜더링용
  return queryClient.getQueryState(['schedule'])?.status;
};

export default useScheduleStatus;
