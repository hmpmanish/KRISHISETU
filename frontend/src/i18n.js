import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome Back",
      "farmer_dashboard": "Farmer Dashboard",
      "add_batch": "Add Harvest Batch",
      "ai_recommendation": "AI Recommendation"
    }
  },
  hi: {
    translation: {
      "welcome": "वापसी पर स्वागत है",
      "farmer_dashboard": "किसान डैशबोर्ड",
      "add_batch": "फसल बैच जोड़ें",
      "ai_recommendation": "एआई (AI) सुझाव"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
