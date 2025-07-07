import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutApi } from '../services';
import { useNavigate } from '@tanstack/react-router';
import { replace } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();
  const querClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      querClient.removeQueries();
      navigate({ to: '/login', replace: true });
    },
  });
  return { logout, isPending };
}
