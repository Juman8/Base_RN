import {TYPE_BTN_SOCIAL} from '@constants';
import {StyleProp, ViewStyle} from 'react-native';

export type TYPE_OF_PROFILE = {
  name: string;
  email: string;
  full_name: string;
};
export type APP_SOCIAL_TYPES = {
  type: TYPE_BTN_SOCIAL;
  onSuccess: (value: any) => void;
  style?: StyleProp<ViewStyle>;
};
