import {t} from 'i18next';
import {showMessage} from 'react-native-flash-message';

export const showAlertMessage = (
  message: string,
  type?: 'success' | 'danger' | 'warning' | 'info',
) => {
  showMessage({
    message: t('title.messages'),
    description: message,
    type: type || 'success',
    duration: 1500,
  });
};

export const LogApp = (
  key: any,
  value?: number | string | object,
  ...optionalParams: any[]
) => {
  if (__DEV__) {
    value ? console.log(key, value, ...optionalParams) : console.log(key);
  }
};
