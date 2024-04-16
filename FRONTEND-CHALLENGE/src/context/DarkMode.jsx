import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../Hooks/useLocalStorage';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

    useEffect(() => {
        const body = document.body;
        if (darkMode) {
          body.classList.add('dark');
        } else {
          body.classList.remove('dark');
        }
      }, [darkMode]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};