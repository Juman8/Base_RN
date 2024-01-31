/* eslint-disable react-native/no-inline-styles */
import {FontSize, Spacing} from '@assets';
import {AppCheckBoxType} from '@interfaces';
import {Box} from '@theme';
import React from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';

import {AppText} from '../AppText';

const AnimatedCheck = Animated.createAnimatedComponent(AppText);

export const AppCheckBox = (props: AppCheckBoxType) => {
  const {isChecked, handleToggle, label} = props;
  // const offset = useRef(new Animated.Value(0));

  // useEffect(() => {
  //   if (isChecked) {
  //     Animated.timing(offset.current, {
  //       duration: 500,
  //       toValue: 1,
  //       easing: Easing.circle,
  //       useNativeDriver: true,
  //     }).start();
  //   } else {
  //     Animated.timing(offset.current, {
  //       duration: 10,
  //       toValue: 0,
  //       easing: Easing.circle,
  //       useNativeDriver: true,
  //     }).start();
  //   }
  // }, [isChecked]);

  // const value = offset.current.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [1, 0],
  // });

  // const opacity = value.interpolate({
  //   inputRange: [0.5, 1],
  //   outputRange: [0, 1],
  // });

  return (
    <TouchableOpacity onPress={() => handleToggle(!isChecked)}>
      <Box style={styles.viewCtn}>
        <Box
          style={[
            styles.btnCheck,
            {
              backgroundColor: isChecked ? '#007BFF' : '#fff',
            },
          ]}
        >
          <AnimatedCheck
            style={[
              styles.styleCheck,
              {
                opacity: isChecked ? 1 : 0,
              },
            ]}
          >
            ✓
          </AnimatedCheck>
        </Box>
        {!!label && <AppText marginLeft={'sm'}>{label}</AppText>}
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewCtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnCheck: {
    width: Spacing.width23,
    height: Spacing.width23,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleCheck: {color: '#fff', fontSize: FontSize.Font16},
});
