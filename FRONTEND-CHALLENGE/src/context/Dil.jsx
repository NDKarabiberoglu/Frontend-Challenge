import { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../Hooks/useLocalStorage';
import axios from 'axios';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const [apiResponse, setApiResponse] = useLocalStorage('whygodwhy', {});
  const [loading, setLoading] = useState(true);

  const updateApiResponse = (data) => {
    setApiResponse(data);
  };

  const fetchData = async () => {
    try {
      const languageFile = await import(`../mocks/${language}.json`);
      const response = await axios.post('https://reqres.in/api/workintech', languageFile);

      console.log('API Response:', response.data);
      updateApiResponse(response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, [language]);

  const switchLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, apiResponse, updateApiResponse }}>
      {children}
    </LanguageContext.Provider>
  );
};