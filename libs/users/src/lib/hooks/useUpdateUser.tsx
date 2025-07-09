import { updateCurrentUser } from '@/login';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const querClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      toast.success('User account successfully edited');
      querClient.setQueryData(['user'], user?.user);
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isUpdating };
}
