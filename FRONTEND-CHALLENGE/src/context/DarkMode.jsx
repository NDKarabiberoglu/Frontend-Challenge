import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../Hooks/useLocalStorage';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

    useEffect(() => {
        const body = document.body;
        // Sayfanın body elementini alıyor
        if (darkMode) {
          body.classList.add('dark');
        // body elementine "dark" adında bir CSS sınıfı ekliyor
        } else {
          body.classList.remove('dark');
        // body elementinden "dark" adında bir CSS sınıfını kaldırıyor
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
// Karanlık mod durumu ve karanlık modu değiştirme işlevine erişim sağlanır
  return useContext(DarkModeContext);
};