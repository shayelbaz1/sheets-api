import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

export const defaultNS = 'translation';

export const resources = {
  en: {
    translation: {
      'home': 'Home',
      'settings': 'Settings',
      'light': 'Light',
      'dark': 'Dark',
      'system': 'System',
      'pie': 'Pie',
      'Pull to refresh': 'Pull to refress',
      'refresh in': 'Refresh in',
      'close': 'Close',
      '1 Day': '1 Day',
      '10 Minutes': '10 Minutes',
      '5 Minutes': '5 Minutes',
      '1 Minute': '1 Minute',
      '10 Seconds': '10 Seconds',
      '5 Seconds': '5 Seconds',
      '1D': '1 Day',
      '10m': '10 Minutes',
      '5m': '5 Minutes',
      '1m': '1 Minute',
      '10s': '10 Seconds',
      '5s': '5 Seconds',
      'en': 'English',
      'he': 'Hebrew',
      'amount': 'Amount',
      'level' : 'Level',
    },
  },
  he: {
    translation: {
      'home': 'בית',
      'settings': 'הגדרות',
      'light': 'בהיר',
      'dark': 'כהה',
      'system': 'מערכת',
      'pie': 'פאי',
      'Pull to refresh': 'משוך לרענון',
      'refresh in': 'רענון בכל',
      'close': 'סגור',
      '1 Day': '24 שעות',
      '10 Minutes': '10 דק',
      '5 Minutes': '4 דק',
      '1 Minute': '1 דק',
      '10 Seconds': '10 שניות',
      '5 Seconds': '5 שניות',
      '1D': '24 שעות',
      '10m': '10 דק',
      '5m': '4 דק',
      '1m': '1 דק',
      '10s': '10 שניות',
      '5s': '5 שניות',
      'en': 'אנגלית',
      'he': 'עברית',
      'amount': 'כמות',
      'level' : 'רמה',

    },
  },
} as const;

i18n.use(initReactI18next).init({
  ns: ['translation'],
  defaultNS,
  resources,
  lng: 'he',
  keySeparator: '.',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  compatibilityJSON: 'v3', // hermes compatible
});

export default i18n;
