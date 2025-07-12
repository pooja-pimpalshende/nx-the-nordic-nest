import { getStaysTodaysActivity } from '@/bookings';
import { useQuery } from '@tanstack/react-query';

export const useTodayActivity = () => {
  const { isPending, data: activities } = useQuery({
    queryKey: ['today-activity'],
    queryFn: getStaysTodaysActivity,
  });
  return { isPending, activities };
};
