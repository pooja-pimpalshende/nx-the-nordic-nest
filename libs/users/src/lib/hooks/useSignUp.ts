import { signUpApi } from '@/login';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useSignUp() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      toast.success(
        'Account is created! Please verify the new account from users email address '
      );
    },
  });
  return { signUp, isPending };
}
