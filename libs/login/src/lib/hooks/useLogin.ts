import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginApi } from '../services/apiAuth';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';

export function useLogin() {
  // const querClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      LoginApi({ email, password }),
    onSuccess: (user) => {
      // querClient.setQueriesData(['user'], user);
      navigate({ to: '/dashboard' });
    },
    onError: (err) => {
      console.log('Error', err);
      toast.error('Provided email or password are incorrect');
    },
  });
  return { login, isPending };
}
