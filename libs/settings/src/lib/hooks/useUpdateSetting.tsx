import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../services';

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting edited successfully');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (err) => {
      if (err instanceof Error) toast.error(err.message);
    },
  });
  return { updateSetting, isUpdating };
}
