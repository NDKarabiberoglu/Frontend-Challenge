import { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../Hooks/useLocalStorage';
import axios from 'axios';

const LanguageContext = createContext();

export const useLanguage = () => {
// useLanguage özel tanımı
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useLocalStorage('language', 'en');
  // "useLocalStorage" ile dil bilgisini ve dil değiştirme işlevini alıyoruz. Varsayılan dil "en" (İngilizce) olarak ayarlanmıştır.
  const [apiResponse, setApiResponse] = useLocalStorage('nope', {});
  // "useLocalStorage" ile API yanıtını alıyoruz.
  const [loading, setLoading] = useState(true);

  const updateApiResponse = (data) => {
    setApiResponse(data);
  };

  const fetchData = async () => {
    // Verileri getirmek için bir asenkron işlem
    try {
      const languageFile = await import(`../Language/${language}.json`);
      // Seçilen dile göre dil dosyasını alıyor
      const response = await axios.post('https://reqres.in/api/workintech', languageFile);
      // Dil dosyasını bir POST isteğiyle birlikte bir API'ye gönderiyoruz 
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
  // Eğer mevcut dil "en" ise "tr", değilse "en" yap.
  };

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, apiResponse, updateApiResponse }}>
      {children}
    </LanguageContext.Provider>
  // Dil ve ilgili işlevleri {children} içeriği ile alıyoruz
  );
};