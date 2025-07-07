import { ButtonIcon, SpinnerMini } from '@/shared';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './hooks';

export function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <ButtonIcon disabled={isPending} onClick={() => logout()}>
      {!isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
