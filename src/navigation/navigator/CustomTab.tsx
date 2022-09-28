import React, {memo, useEffect, useRef} from 'react';
import {Animated, InteractionManager, TouchableWithoutFeedback, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {styles} from './styles';
import {DiscoverIcon, MainIcon, MarketIcon, TradeIcon, UserIcon} from '@assets';
import {SCREEN_ROUTE} from '@navigation';
import {Spacing, Text, useTheme} from '@theme';
import {getStatusOfBottomTab} from '@redux';
import {useSelector} from "react-redux";
import reactotron from 'reactotron-react-native';

const SourceImage = (props: {label?: string; isFocused: boolean;}) => {
  const {label, isFocused} = props;
  const {themeColor} = useTheme();

  switch (label) {
    case SCREEN_ROUTE.HOME_PAGE:
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
    case SCREEN_ROUTE.TRADE_PAGE:
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
    case SCREEN_ROUTE.MAIN_PAGE:
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
    case SCREEN_ROUTE.DISCOVER_PAGE:
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
    case SCREEN_ROUTE.ACCOUNT_PAGE:
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
