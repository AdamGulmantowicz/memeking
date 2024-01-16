import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../config/i18n/messages/en';
import pl from '../../config/i18n/messages/pl';
import de from '../../config/i18n/messages/de';
import fr from '../../config/i18n/messages/fr';
import it from '../../config/i18n/messages/it';

i18n.use(initReactI18next).init({
  resources: { en, pl, de, fr, it },
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export default i18n;
