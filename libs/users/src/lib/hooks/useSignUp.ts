import { signUpApi } from '@/login';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useSignUp() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success('Account is created successfully! Please verify email.');
    },
  });
  return { signUp, isPending };
}
