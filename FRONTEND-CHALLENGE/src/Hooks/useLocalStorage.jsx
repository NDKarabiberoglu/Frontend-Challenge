import { useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    // useState ile durum değeri oluşturuyoruz. İlk değeri, localStorage'dan alıyoruz.
    const localVal = JSON.parse(localStorage.getItem(key));
    // Belirtilen key kullanarak localStorage'dan değeri alıyoruz.
    if (localVal === null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      // Eğer localStorage'da bu anahtarla kaydedilmiş bir değer yoksa...
      // Varsayılan değeri localStorage'a ekliyoruz.
      return defaultValue;
    } else {
      return localVal;
    }
  });
  const setLocalStorage = (newValue) => {
    // Yeni değeri localStorage'a kaydetmek durumunu güncellemek için bir işlev
    localStorage.setItem(key, JSON.stringify(newValue));
    // Yeni değeri JSON formatında localStorage'a ekliyoruz.

    setValue(newValue);
  };
  return [value, setLocalStorage];
  // useState ile döndürdüğü gibi, bir değer ve bir işlev döndürüyoruz.
}