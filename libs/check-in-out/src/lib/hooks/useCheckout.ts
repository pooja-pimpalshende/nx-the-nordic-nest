import { updateBooking } from '@/bookings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';

export const useCheckout = (redirectTo: string = '/') => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['today-activity'] });
      queryClient.invalidateQueries({ queryKey: ['stays'] });
      navigate({ to: redirectTo });
    },
    onError: () => toast.error('There was an error while checking out'),
  });

  return { checkout, isCheckingOut };
};
