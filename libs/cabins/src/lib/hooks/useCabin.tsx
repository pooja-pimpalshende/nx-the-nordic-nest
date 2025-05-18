import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../services';

export function useCabin() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return { cabins, error, isPending };
}
