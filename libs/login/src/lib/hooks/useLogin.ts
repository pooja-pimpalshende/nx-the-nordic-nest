import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginApi } from '../services/apiAuth';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      console.log('user', user);
      queryClient.setQueryData(['user'], user.user);
      navigate({ to: '/dashboard' });
    },
    onError: (err) => {
      console.log('Error', err);
      toast.error('Provided email or password are incorrect');
    },
  });
  return { login, isPending };
}
