import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";

const resources = {
  en: {
    translation: en
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // Our default language
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
