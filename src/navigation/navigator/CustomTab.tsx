import React, {memo} from 'react';
import {InteractionManager, TouchableWithoutFeedback, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {styles} from './styles';
import {DiscoverIcon, MainIcon, MarketIcon, TradeIcon, UserIcon} from '@assets';
import {SCREEN_ROUTE} from '@navigation';
import {Spacing, Text, useTheme} from '@theme';

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
  return (
    <View
      style={[
        styles.containerAbsolute,
        {backgroundColor: themeColor.backgroundColorTab},
      ]}
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
    </View>
  );
});
