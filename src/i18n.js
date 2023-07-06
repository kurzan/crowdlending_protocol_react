import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      Welcome: "Welcome to React and react-i18next"
    }
  },
  ru: {
    translation: {
      Welcome: "Bienvenue à React et react-i18next"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    debug: true,
    resources,
    fallbackLng: 'ru',

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;