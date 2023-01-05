import {AppButton, AppInput, AppText} from '@components';
import {Box} from '@theme';
import {LogApp} from '@utils';
import {useFormik} from 'formik';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const LoginScreen = () => {

  const handleonSubmit = (values: {
    email: string;
    password: string;
  } ) => {
    LogApp({values})
  }

  const {values, errors, touched, setFieldValue} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleonSubmit,
  });
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flex: 1}}
    >
      <Box alignItems={"center"} justifyContent="center" flex={1} paddingHorizontal={"l"}>
        <AppText variant={"title3"} fontWeight="600" marginBottom={"l"}>LOGIN</AppText>
        <AppInput
          value={values.email}
          onChangeText={(value) => setFieldValue('email', value)}
          placeholder="EMAIL"
          label='EMAIL'
          keyboardType="email-address"
          error={errors.email}
          touched={touched.email}
        />
        <AppInput
          value={values.password}
          onChangeText={(value) => setFieldValue('password', value)}
          placeholder="EMAIL"
          label='PASSWORD'
          marginTop={"xs"}
          secureTextEntry
          error={errors.password}
          touched={touched.password}
        />
        <AppButton
          label='Login'
          onPress={() => {alert(1);}}
          style={{marginTop: 50}}
        />
      </Box>
    </KeyboardAwareScrollView>
  );
};
