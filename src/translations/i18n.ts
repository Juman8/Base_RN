import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en, vi} from './locales';

type languageDetectorType = {
  type:
    | 'backend'
    | 'logger'
    | 'languageDetector'
    | 'postProcessor'
    | 'i18nFormat'
    | 'formatter'
    | '3rdParty';
  async: boolean;
  detect: (cb: (value: string) => void) => void;
  init: () => void;
  cacheUserLanguage: () => void;
};

const languageDetector: languageDetectorType = {
  type: 'languageDetector',
  async: true,
  detect: (cb: (value: string) => void) => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};

const initI18n = () => {
  i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      fallbackLng: 'en',
      debug: true,
      resources: {
        en: {translation: en},
        vi: {translation: vi},
      },
    });
};

export {initI18n};
