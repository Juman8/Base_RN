import React from 'react';
import {BackIcon} from '@assets';
import {AppText} from '@components';
import {goBack} from '@navigation';
import {FontSize, Spacing, useTheme} from '@theme';
import {Keyboard, StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';

export interface IAppHeader {
  title?: string;
  styleContainer?: StyleProp<ViewStyle>
  styleTitle?: StyleProp<TextStyle>;
  goBack?: boolean;
  backIconColor?: string;
  IconLeft?: any;
  IconRight?: any;
  styleIconLeft?: StyleProp<ViewStyle>
  iconLeftFillColor?: string;
  onPressBtnLeft?: () => void;
  onPressRight?: () => void;
  styleTextRight?: StyleProp<TextStyle>;
  styleBtnRight?: StyleProp<ViewStyle>
  colorBackIcon?: string;
  titleRight?: string;
}

export const AppHeader = (props: IAppHeader) => {
  const {
    title,
    styleContainer,
    styleTitle,
    goBack: isBack,
    styleIconLeft,
    IconLeft,
    iconLeftFillColor,
    onPressBtnLeft,
    onPressRight,
    IconRight,
    styleTextRight,
    styleBtnRight,
    colorBackIcon,
    titleRight,
  } = props;

  const {themeColor} = useTheme();

  const onGoBack = () => {
    goBack();
  };

  const renderLeft = () => {
    const onPressLeft = onPressBtnLeft || onGoBack;
    return (
      <View style={styles.left}>
        <TouchableOpacity
          onPress={(isBack || IconLeft) && onPressLeft}
          hitSlop={styles.hitbtn}
          style={styles.btnLeft}
        >
          {isBack && <BackIcon stroke={colorBackIcon || themeColor.textColor} />}
          {IconLeft && (
            <IconLeft style={styleIconLeft} iconFillColor={iconLeftFillColor} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderRight = () => {
    return (
      <View style={styles.right}>
        {IconRight && (
          <>
            <TouchableOpacity
              style={[styles.btnRight, styleBtnRight]}
              onPress={onPressRight}
              hitSlop={styles.hitbtn}
            >
              <AppText style={styleTextRight}>{titleRight}</AppText>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: themeColor.background}, styleContainer]}
      onPressIn={() => Keyboard.dismiss()}
      activeOpacity={1}
    >
      {renderLeft()}
      {title && <AppText style={[styles.title, {color: themeColor.textColor} , styleTitle]}>{title}</AppText>}
      {renderRight()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    minHeight: Spacing.width35,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.width16,
    paddingVertical: Spacing.height20,
  },
  title: {
    fontSize: FontSize.Font18,
    alignItems: 'center',
    fontWeight: '500',
  },
  left: {
    width: Spacing.width20,
  },
  right: {
    width: Spacing.width20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'relative',
  },
  btnRight: {
    paddingLeft: Spacing.height10,
  },

  btnLeft: {
    paddingRight: Spacing.height10,
  },
  hitbtn: {top: 25, bottom: 25, left: 25, right: 25}
});
