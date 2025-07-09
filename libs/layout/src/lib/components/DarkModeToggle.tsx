import { ButtonIcon, useDarkMode } from '@/shared';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

export function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={() => toggleDarkMode(isDarkMode)}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}
