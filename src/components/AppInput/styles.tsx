import {BORDER_RADIUS_20, Colors, Spacing} from '@theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  inputStyle: {
    height: Spacing.height48,
    minHeight: 48,
    paddingHorizontal: Spacing.width15,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS_20,
    borderColor: `${Colors.blue}40`,
  },
  btnActive: {
    borderColor: `${Colors.blue}`,
  },
  viewWidth: {width: '100%', paddingVertical: 4},
});
