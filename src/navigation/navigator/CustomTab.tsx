import {DiscoverIcon, MainIcon, MarketIcon, TradeIcon, UserIcon} from '@assets';
import {ROUTER_BOTTOM_TAB} from '@navigation';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {getStatusOfBottomTab} from '@redux';
import {Spacing, Text, useTheme} from '@theme';
import React, {memo, useEffect, useRef} from 'react';
import {Animated, InteractionManager, TouchableWithoutFeedback, View} from 'react-native';
import {useSelector} from "react-redux";
import {styles} from './styles';

const SourceImage = (props: {label?: string; isFocused: boolean;}) => {
  const {label, isFocused} = props;
  const {themeColor} = useTheme();

  switch (label) {
    case ROUTER_BOTTOM_TAB[0].key:
      return (
        <MarketIcon
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
      return (
        <TradeIcon
          fill={
            isFocused
              ? themeColor.color_Icon_Selected
              : themeColor.color_Tab_Unselected
          }
          width={Spacing.width25}
          height={Spacing.width25}
        />
      );
    case ROUTER_BOTTOM_TAB[2].key:
      return (
        <MainIcon
          fill={
            isFocused
              ? themeColor.color_Icon_Selected
              : themeColor.color_Tab_Unselected
          }
          width={Spacing.width50}
          height={Spacing.width50}
        />
      );
    case ROUTER_BOTTOM_TAB[3].key:
      return (
        <DiscoverIcon
          fill={
            isFocused
              ? themeColor.color_Icon_Selected
              : themeColor.color_Tab_Unselected
          }
          width={Spacing.width23}
          height={Spacing.width23}
        />
      );
    case ROUTER_BOTTOM_TAB[4].key:
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
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const arrayLable = ['Market', 'Trade', '', 'Discover', 'Me'];
  const {themeColor} = useTheme();
  const statusOfBottomTab = useSelector(getStatusOfBottomTab)
  const refHeight = useRef(50);
  const refAnimated = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(refAnimated.current, {
      toValue: statusOfBottomTab ? 0 : refHeight.current,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [statusOfBottomTab])

  const translateY = refAnimated.current.interpolate({
    inputRange: [0, refHeight.current],
    outputRange: [0, refHeight.current],
    extrapolate: 'clamp',
  })

  const opacity = translateY.interpolate({
    inputRange: [0, refHeight.current/2 ,refHeight.current],
    outputRange: [1, 0.8, 0.5],
    extrapolate: 'clamp',
  })

  return (
    <Animated.View
      style={[
        styles.containerAbsolute,
        {backgroundColor: themeColor.backgroundColorTab},
        {
          transform: [{
            translateY,
          }],
          opacity
        }
      ]}
      onLayout={(e) => {
        refHeight.current = e.nativeEvent.layout.height;
      }}
    >
      <View style={styles.contentContainer} pointerEvents="box-none">
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label: any =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

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

          return (
            <TouchableWithoutFeedback
              key={'tab-' + index.toString()}
              accessibilityRole="button"
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
            >
              <View style={styles.bottomBarIcon}>
                {options &&
                  options.tabBarIcon &&
                  options.tabBarIcon({
                    focused: isFocused,
                    color: '',
                    size: 0,
                  })}
                <SourceImage label={label} isFocused={isFocused} />
                {index !== 2 && (
                  <Text
                    variant={'text'}
                    numberOfLines={1}
                    style={styles.txtTabName}
                  >
                    {arrayLable[index]}
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </Animated.View>
  );
});
