/* eslint-disable @typescript-eslint/no-explicit-any */
import {ResponsiveValue, SpacingProps, TypographyProps} from '@shopify/restyle';
import {ENUM_COLORS, FontWithBold_Barlow, Text, Theme, useTheme} from '@theme';
import React from 'react';
import {StyleProp, StyleSheet, TextProps, TextStyle} from 'react-native';
import TextTicker from 'react-native-text-ticker';
interface AppTextProps {
  width?: number | string;
  height?: number | string;
  color?: ENUM_COLORS;
  style?: StyleProp<TextStyle>;
  children: any;
  variant?:
    | ResponsiveValue<
        'body' | 'button' | 'header' | 'text' | 'title1' | 'title2' | 'title3',
        {
          phone: number;
          tablet: number;
        }
      >
    | undefined;
  spacing?: {
    sm: number;
    s: number;
    xs: number;
    m: number;
    l: number;
    xl: number;
  };
  borderRadii?: {
    s: number;
    m: number;
    l: number;
    xl: number;
  };
  breakpoints?: {
    phone: number;
    tablet: number;
  };
  textVariants?: {
    title1: string;
    title2: string;
    title3: string;
    body: string;
    button: string;
    header: string;
    text: string;
  };
}

export const AppText = React.forwardRef(
  (
    props: AppTextProps &
      SpacingProps<Theme> &
      TextProps &
      TypographyProps<Theme>,
    ref,
  ) => {
    const {style, children, variant = 'text', numberOfLines, color} = props;
    const {themeColor} = useTheme();

    if (numberOfLines === 1) {
      return (
        <TextTicker
          style={[
            styles.label,
            !!color && {color: themeColor.textColor},
            style,
          ]}
          duration={3000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={1000}
        >
          {children}
        </TextTicker>
      );
    }
    return (
      <Text
        {...props}
        style={[styles.label, !color && {color: themeColor.textColor}, style]}
        numberOfLines={numberOfLines}
        variant={variant}
        color={color}
      >
        {children}
      </Text>
    );
  },
);

const styles = StyleSheet.create({
  label: {
    ...FontWithBold_Barlow.Bold_Barlow_500,
  },
});
