import { useQueryClient } from '@tanstack/react-query';

/** query observer가 없을때 undefined 반환 */
const useScheduleStatus = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryState(['schedule'])?.status;
};

export default useScheduleStatus;
