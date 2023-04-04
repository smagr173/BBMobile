import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

// Define the supported languages
i18n.translations = {
  en: () => require('../config/locales/en.yml'),
};

// Set the default language to English
i18n.defaultLocale = 'en';

// Determine the device language
const { languageTag } = RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || {};

// Set the language to the device language, fallback to English
i18n.locale = languageTag || i18n.defaultLocale;

export default i18n;