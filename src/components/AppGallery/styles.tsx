import {Spacing} from '@theme';
import {DEVICE} from '@utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  blurImage: {
    width: DEVICE.width - Spacing.width30,
    aspectRatio: 1,
    borderRadius: Spacing.height14,
  },
  scroll: {
    flexGrow: 1,
    width: DEVICE.width - Spacing.width30,
  },
  button: {
    width: DEVICE.width - Spacing.width30,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexImageContainer: {
    position: 'absolute',
    top: Spacing.width10,
    right: Spacing.width10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: Spacing.width15,
    paddingVertical: 4,
    borderRadius: 20,
  },
  viewIconLike: {
    width: Spacing.width50,
    aspectRatio: 1,
    position: 'absolute',
  },
});
