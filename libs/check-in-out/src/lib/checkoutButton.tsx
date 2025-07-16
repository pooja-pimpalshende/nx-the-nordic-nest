import { Button } from '@/shared';
import { useCheckout } from './hooks';

export function CheckoutButton({ bookingId }: { bookingId: number }) {
  const { checkout, isCheckingOut } = useCheckout('/dashboard');

  return (
    <Button
      sizes="small"
      variations="primary"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}
