import {FontWithBold} from '@assets';
import {Colors, FontSize} from '@theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  viewText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtLabel: {...FontWithBold.Bold_600, fontSize: FontSize.Font24},
  viewMore: {
    color: Colors.green,
    textDecorationLine: 'underline',
    ...FontWithBold.Bold_500,
  },
});
