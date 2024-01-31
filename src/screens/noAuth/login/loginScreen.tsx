import {AppButton, AppInputFormik, AppText} from '@components';
import {yupResolver} from '@hookform/resolvers/yup'; // install @hookform/resolvers (not @hookform/resolvers/yup)
import {navigate, SCREEN_ROUTE} from '@navigation';
import {setAccountToken} from '@redux';
import {loginTypeForm, schemaLogin} from '@schema';
import {Box, ENUM_COLORS, MARGIN_TOP, rootStyle} from '@theme';
import React from 'react';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';

const defaultValues = {
  email: '',
  password: '',
};

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const handleOnSubmit = (values: loginTypeForm) => {
    dispatch(setAccountToken(values.toString()));
  };

  const onRegister = () => {
    navigate(SCREEN_ROUTE.REGISTER_PAGE);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={rootStyle.container}>
      <Box
        alignItems={'center'}
        justifyContent="center"
        flex={1}
        paddingHorizontal={'l'}
      >
        <AppText variant={'title3'} fontWeight="600" marginBottom={'l'}>
          LOGIN
        </AppText>
        <AppInputFormik
          control={control}
          placeholder="User name"
          label="User name"
          keyboardType="email-address"
          error={errors.email?.message}
          rules={{required: true}}
          name="email"
          defaultValue={defaultValues.email}
        />
        <AppInputFormik
          control={control}
          placeholder="PASSWORD"
          label="PASSWORD"
          marginTop={'xs'}
          secureTextEntry
          error={errors.password?.message}
          rules={{required: true}}
          name="password"
          defaultValue={defaultValues.password}
        />

        <AppText width={'100%'} marginTop="l" fontSize={11} textAlign="right">
          Don't have an account? Please{' '}
          <AppText
            fontSize={12}
            color={ENUM_COLORS.color_Icon_Selected}
            textDecorationLine="underline"
            onPress={onRegister}
          >
            register now!
          </AppText>
        </AppText>
        <AppButton
          label="Login"
          onPress={handleSubmit(handleOnSubmit)}
          style={{marginTop: MARGIN_TOP}}
        />
      </Box>
    </KeyboardAwareScrollView>
  );
};
