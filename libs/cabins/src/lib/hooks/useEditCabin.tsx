import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../services';
import toast from 'react-hot-toast';
import { Cabin } from '@/shared';

type NewCabinDataType = {
  newCabinData: Cabin;
  id: number | undefined;
};

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: NewCabinDataType) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin edited successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => {
      if (err instanceof Error) toast.error(err.message);
    },
  });
  return { editCabin, isEditing };
}
