/* eslint-disable @typescript-eslint/no-explicit-any */
import {t} from 'i18next';
import {showMessage} from 'react-native-flash-message';
import {MMKV} from 'react-native-mmkv';
import Reactotron from 'reactotron-react-native';

export const AsyncStorage = new MMKV();

export const showAlertMessage = (
  message: string,
  type?: 'success' | 'danger' | 'warning' | 'info',
) => {
  showMessage({
    message: t('common.messagesNotify'),
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
    if (Reactotron.log) {
      value
        ? Reactotron.log(key, value, ...optionalParams)
        : Reactotron.log(key);
    }
  }
};

export type DecimalFormat = '1k' | '1.2k' | '1.23k' | '1.234k' | '1,234';

export const getDecimalsByFormat = (
  value: DecimalFormat,
  isCurrency?: boolean,
): number => {
  let decimals = 0;
  switch (value) {
    default:
    case '1k':
      decimals = 0;
      break;
    case '1.2k':
      decimals = 1;
      break;
    case '1.23k':
      decimals = 2;
      break;
    case '1.234k':
      decimals = 3;
      break;
    case '1,234':
      decimals = isCurrency ? 2 : 0;
      break;
  }
  return decimals;
};
export const getPrettyNumberString = (
  rawNumber: number,
  numberFormat: DecimalFormat,
  decimals = 0,
): string => {
  rawNumber = rawNumber ? rawNumber : 0;
  let numberString = '';
  let scale = '';
  if (numberFormat === '1,234') {
    return `${parseFloat(rawNumber.toFixed(decimals))}`.replace(
      /(\d)(?=(\d{3})+(?!\d))/g,
      '$1,',
    );
  }

  if (isNaN(rawNumber) || !isFinite(rawNumber)) {
    numberString = 'N/A';
  } else {
    let absVal = Math.abs(rawNumber);
    if (absVal < 1000) {
      scale = '';
    } else if (absVal < 1000000) {
      scale = 'k';
      absVal /= 1000;
    } else if (absVal < 1000000000) {
      scale = 'm';
      absVal /= 1000000;
    } else if (absVal < 1000000000000) {
      scale = 'b';
      absVal /= 1000000000;
    } else if (absVal < Math.pow(10, 15)) {
      scale = 't';
      absVal /= Math.pow(10, 12);
    } else if (absVal < Math.pow(10, 18)) {
      scale = 'q';
      absVal /= Math.pow(10, 15);
    } else if (absVal < Math.pow(10, 21)) {
      scale = 'Q';
      absVal /= Math.pow(10, 18);
    }

    const newDecimals = getDecimalsByFormat(numberFormat);
    const dropTrailingZero: number = parseFloat(absVal.toFixed(newDecimals));
    numberString = dropTrailingZero + scale;
  }

  // preserve negative number
  return rawNumber < 0 ? `-${numberString}` : numberString;
};
