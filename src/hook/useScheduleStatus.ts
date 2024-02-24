import { useQueryClient } from '@tanstack/react-query';

const useScheduleStatus = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryState(['schedule'])?.status || 'pending';
};

export default useScheduleStatus;
