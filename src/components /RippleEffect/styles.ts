import {colorLight} from '@/theme/configs';
import {StyleSheet} from 'react-native';

const radius = 10;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colorLight.transparent,
    overflow: 'hidden',
  },

  ripple: {
    borderRadius: radius,
    height: radius * 2,
    overflow: 'hidden',
    position: 'absolute',
    width: radius * 2,
  },
});

export {styles, radius};
