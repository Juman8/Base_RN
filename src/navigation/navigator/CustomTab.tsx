import {MainIcon, MainIconActive, UserIcon, UserIconActive} from '@assets';
import {ROUTER_BOTTOM_TAB} from '@navigation';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {getStatusOfBottomTab} from '@redux';
import {Box, Spacing, useTheme} from '@theme';
import React, {memo, useEffect, useRef} from 'react';
import {
  Animated,
  InteractionManager,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';

const SourceImage = (props: {label?: string; isFocused: boolean}) => {
  const {label, isFocused} = props;
  const {themeColor} = useTheme();

  switch (label) {
    case ROUTER_BOTTOM_TAB[0].key:
      if (isFocused) {
        return (
          <MainIconActive width={Spacing.width25} height={Spacing.width25} />
        );
      }
      return (
        <MainIcon
          fill={
            isFocused
              ? themeColor.color_Icon_Selected
              : themeColor.color_Tab_Unselected
          }
          width={Spacing.width25}
          height={Spacing.width25}
        />
      );
    case ROUTER_BOTTOM_TAB[1].key:
      if (isFocused) {
        return (
          <UserIconActive width={Spacing.width25} height={Spacing.width25} />
        );
      }
      return (
        <UserIcon
          fill={
            isFocused
              ? themeColor.color_Icon_Selected
              : themeColor.color_Tab_Unselected
          }
          width={Spacing.width25}
          height={Spacing.width25}
        />
      );
    default:
      return null;
  }
};

export const CustomTabBar = memo(function CustomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const {themeColor} = useTheme();
  const statusOfBottomTab = useSelector(getStatusOfBottomTab);
  const refHeight = useRef(50);
  const refAnimated = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(refAnimated.current, {
      toValue: statusOfBottomTab ? 0 : refHeight.current + 5,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [statusOfBottomTab]);

  const translateY = refAnimated.current.interpolate({
    inputRange: [0, refHeight.current],
    outputRange: [0, refHeight.current],
    extrapolate: 'clamp',
  });

  const opacity = translateY.interpolate({
    inputRange: [0, refHeight.current / 2, refHeight.current],
    outputRange: [1, 0.8, 0.5],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.containerAbsolute,
        {backgroundColor: themeColor.backgroundColorTab},
        {
          transform: [
            {
              translateY,
            },
          ],
          opacity,
        },
      ]}
      onLayout={e => {
        refHeight.current = e.nativeEvent.layout.height;
      }}
    >
      <View style={styles.contentContainer} pointerEvents="box-none">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            InteractionManager.runAfterInteractions(() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            });
          };

          const onLongPress = () => {
            if (isFocused) {
              InteractionManager.runAfterInteractions(() => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              });
            }
          };

          return (
            <Box flex={1} alignItems="center" key={'tab-' + index.toString()}>
              <TouchableWithoutFeedback
                accessibilityRole="button"
                accessibilityLabel={route.key}
                testID={route.key}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <View style={styles.bottomBarIcon}>
                  <SourceImage label={route.name} isFocused={isFocused} />
                </View>
              </TouchableWithoutFeedback>
            </Box>
          );
        })}
      </View>
    </Animated.View>
  );
});
