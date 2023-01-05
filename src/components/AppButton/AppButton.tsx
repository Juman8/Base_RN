import React from 'react';
import {Colors, Box} from '@theme';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  TextStyle,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {debounce} from 'lodash';
import {useTheme} from '@theme';
import {AppText} from '../AppText';
import {styles} from './styles';

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
  Icon?: any;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: TextStyle | TextStyle[];
  numberOfLines?: number;
  isWrap?: boolean;
  hideDelay?: boolean;
  backgroundColor?: string;
  marginTop?: number,

}

interface WrapContentProps {
  isWrap?: boolean;
  children: JSX.Element[] | JSX.Element;
}

const WrapContent = ({isWrap, children}: WrapContentProps) => {
  if (isWrap) {
    return (
      <Box flexWrap="wrap" flexDirection="row">
        {children}
      </Box>
    );
  }
  return <>{children}</>;
};

export function AppButton(props: ButtonProps) {
  const {
    label,
    onPress = () => {},
    style,
    Icon,
    labelStyle,
    disabled,
    numberOfLines,
    isWrap,
    hideDelay = false,
    backgroundColor,
  } = props;

  const {themeColor} = useTheme();

  const handler = debounce(onPress, 300, {
    leading: true,
    trailing: false,
  });

  return (
    <WrapContent isWrap={isWrap}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={1}
        style={[
          styles.button,
          {
            backgroundColor:
              backgroundColor || disabled
                ? themeColor.colorDisable
                : Colors.blue,
          },
          style,
        ]}
        onPress={() => {
          if (hideDelay) {
            onPress?.();
          } else {
            handler();
          }
        }}
      >
        {!!Icon && <Icon style={styles.icon} />}
        <AppText
          style={[
            styles.label,
            {
              color: disabled ? themeColor.whiteColor : themeColor.whiteColor,
            },
            isWrap && styles.txtWrap,
            labelStyle,
          ]}
          numberOfLines={numberOfLines}
          variant="button"
        >
          {label}
        </AppText>
      </TouchableOpacity>
    </WrapContent>
  );
}
