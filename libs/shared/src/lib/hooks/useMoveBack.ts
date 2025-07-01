import { useNavigate } from '@tanstack/react-router';

export const useMoveBack = () => {
  const navigate = useNavigate();
  return () => navigate({ to: '/bookings' });
};
