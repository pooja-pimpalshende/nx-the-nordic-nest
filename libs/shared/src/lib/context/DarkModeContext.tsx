import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from 'react';
import { useLocalStorage } from '../hooks';
import { ReactNode } from '@tanstack/react-router';

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: Dispatch<SetStateAction<boolean>>;
};

type DarkModeProviderType = {
  children: ReactNode;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

function DarkModeProvider({ children }: DarkModeProviderType) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage(false, 'isDarkMode');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error('DarkModeContext was used outside DarkModeProvider');
  return context;
}

export { DarkModeProvider, useDarkMode };
