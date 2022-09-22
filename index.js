/* eslint-disable no-undef */
/**
 * @format
 */

import {
  AppRegistry,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import '@theme';
if (__DEV__) {
  import ('./ReactotronConfig')
}

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
TouchableHighlight.defaultProps = {
  ...(TouchableHighlight.defaultProps || {}),
  activeOpacity: 1,
  delayLongPress: 200,
};
TouchableOpacity.defaultProps = {
  ...(TouchableOpacity.defaultProps || {}),
  activeOpacity: 1,
  delayLongPress: 200,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};

AppRegistry.registerComponent(appName, () => App);
