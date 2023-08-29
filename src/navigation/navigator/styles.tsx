import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containerAbsolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    // paddingBottom: 20,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomBarIcon: {
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
