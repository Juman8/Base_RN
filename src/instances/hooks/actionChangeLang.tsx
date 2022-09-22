import i18next from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_CONSTANTS} from '@constants';
import {ENUM_LANGUAGE} from '@translations';

function AppchangeLanguage() {
  return (lang: ENUM_LANGUAGE) => {
    i18next.changeLanguage(lang);
    AsyncStorage.setItem(APP_CONSTANTS.APP_KEY_LANGUAGE, lang);
  };
}

export {AppchangeLanguage};
