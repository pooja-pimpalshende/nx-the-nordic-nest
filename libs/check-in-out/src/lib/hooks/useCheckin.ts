import { updateBooking } from '@/bookings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number;
      breakfast: Partial<{
        hasBreakfast: boolean;
        extraPrice: number;
        totalPrice: number;
      }>;
    }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      navigate({ to: '/bookings' });
    },
    onError: () => toast.error('There was an error while checking in'),
  });

  return { checkin, isCheckingIn };
};
