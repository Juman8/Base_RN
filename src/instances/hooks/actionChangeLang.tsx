import i18next from 'i18next';
import {APP_CONSTANTS} from '@constants';
import {ENUM_LANGUAGE} from '@translations';
import {AsyncStorage} from '@utils';

function AppchangeLanguage() {
  return (lang: ENUM_LANGUAGE) => {
    i18next.changeLanguage(lang);
    AsyncStorage.set(APP_CONSTANTS.APP_KEY_LANGUAGE, lang);
  };
}

export {AppchangeLanguage};
