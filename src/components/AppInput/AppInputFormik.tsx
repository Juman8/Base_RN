/* eslint-disable @typescript-eslint/no-explicit-any */
import {Eye, EyeActive} from '@assets';
import {SpacingProps, TypographyProps} from '@shopify/restyle';
import {Box, Colors, Spacing, Theme, useTheme} from '@theme';
import React, {useState} from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewProps,
} from 'react-native';
import MaskInput, {MaskInputProps} from 'react-native-mask-input';
import {AppText} from '../AppText';
import {styles} from './styles';

export interface appInputPropsForm extends TextInputProps, MaskInputProps {
  label?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  error?: string | undefined;
  labelStyle?: StyleProp<TextStyle>;
  isMasked?: boolean;
  control?: any;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, 'email'>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
  name: string;
  defaultValue: string;
}

export function AppInputFormik(
  props: appInputPropsForm &
    SpacingProps<Theme> &
    TypographyProps<Theme> &
    ViewProps,
) {
  const {
    label,
    placeholder,
    secureTextEntry,
    maxLength,
    keyboardType,
    error,
    labelStyle,
    isMasked,
    control,
    rules,
    name,
    defaultValue,
  } = props;
  const [isFocus, setFocus] = useState(false);
  const [isPrivateText, setSecureTextEntry] = useState(secureTextEntry);
  const {themeColor} = useTheme();

  const renderInput = (
    field: ControllerRenderProps<FieldValues, typeof name>,
  ) => {
    if (isMasked) {
      return (
        <Box style={styles.viewWidth} {...props}>
          <MaskInput
            {...props}
            value={field.value}
            onChangeText={text => field.onChange(text)}
            style={[
              styles.inputStyle,
              {color: themeColor.textColor},
              isFocus && styles.btnActive,
              secureTextEntry && {paddingRight: Spacing.width50},
            ]}
            placeholderTextColor={themeColor.primary}
            textContentType="newPassword"
            onBlur={() => {
              field.onBlur();
              setFocus(false);
            }}
            onFocus={() => {
              setFocus(true);
            }}
          />
        </Box>
      );
    }
    return (
      <Box justifyContent={'center'}>
        <TextInput
          value={field.value}
          onChangeText={text => field.onChange(text)}
          secureTextEntry={isPrivateText}
          placeholder={placeholder}
          style={[
            styles.inputStyle,
            {color: themeColor.textColor},
            isFocus && styles.btnActive,
            secureTextEntry && {paddingRight: Spacing.width50},
          ]}
          maxLength={maxLength}
          keyboardType={keyboardType}
          autoCapitalize="none"
          placeholderTextColor={themeColor.placeHolderColor}
          clearButtonMode="while-editing"
          textContentType="newPassword"
          onBlur={() => {
            field.onBlur();
            setFocus(false);
          }}
          onFocus={() => {
            setFocus(true);
          }}
        />

        {!!secureTextEntry && (
          <Box position={'absolute'} right={10}>
            <Pressable
              onPress={() => {
                setSecureTextEntry(prv => !prv);
              }}
            >
              {isPrivateText ? <Eye /> : <EyeActive />}
            </Pressable>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box style={styles.viewWidth} {...props}>
      {!!label && (
        <AppText marginBottom={'m'} style={labelStyle}>
          {label}
        </AppText>
      )}
      <Controller
        control={control}
        render={({field}) => renderInput(field)}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      {!!error && (
        <AppText
          variant={'title3'}
          fontSize={11}
          style={{color: Colors.lightRed}}
          marginTop="s"
        >
          {error}
        </AppText>
      )}
    </Box>
  );
}
