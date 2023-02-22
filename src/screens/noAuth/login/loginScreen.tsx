import {AppButton, AppInput, AppText} from '@components';
import {reset, SCREEN_ROUTE} from '@navigation';
import {setAccountToken} from '@redux';
import {Box} from '@theme';
import {LogApp, showAlertMessage} from '@utils';
import {useFormik} from 'formik';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const handleOnSubmit = (values: {
    email: string;
    password: string;
  }) => {
    if (values.email !== "Mint" && values.password !== "Mint") {
      showAlertMessage("Lỗi đăng nhập", "warning");
    } else {
      dispatch(setAccountToken("MINT"));
    }
  };

  const {values, errors, touched, setFieldValue, handleSubmit} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleOnSubmit,
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
          placeholder="User name"
          label='User name'
          keyboardType="email-address"
          error={errors.email}
          touched={touched.email}
        />
        <AppInput
          value={values.password}
          onChangeText={(value) => setFieldValue('password', value)}
          placeholder="PASSWORD"
          label='PASSWORD'
          marginTop={"xs"}
          secureTextEntry
          error={errors.password}
          touched={touched.password}
        />
        <AppButton
          label='Login'
          onPress={handleSubmit}
          style={{marginTop: 50}}
        />
      </Box>
    </KeyboardAwareScrollView>
  );
};
