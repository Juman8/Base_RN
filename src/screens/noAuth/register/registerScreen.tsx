import {
  AppButton,
  AppCheckBox,
  AppInputFormik,
  AppLoginSocial,
  AppText
} from '@components';
import {TYPE_BTN_SOCIAL} from '@constants';
import {yupResolver} from '@hookform/resolvers/yup'; // install @hookform/resolvers (not @hookform/resolvers/yup)
import {navigate, SCREEN_ROUTE} from '@navigation';
import {registerTypeForm, schemaRegister} from '@schema';
import {Box, Spacing} from '@theme';
import {LogApp} from '@utils';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Platform, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './styles';

const defaultValue = {
  fullName: '',
  password: '',
  confirmPassword: '',
  email: '',
};

export const RegisterScreen = () => {
  const {bottom, top} = useSafeAreaInsets();

  const {t} = useTranslation()

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const handleOnSubmit = (values: registerTypeForm) => {
    LogApp({values});
  };

  const [isCheckBox, setCheckBox] = useState(false);

  return (
    <Box flex={1} style={{paddingTop: top}}>
      <KeyboardAwareScrollView
        overScrollMode={'never'}
        showsVerticalScrollIndicator={false}
        style={[styles.container, {paddingBottom: Spacing.height30}]}
      >
        <AppText
          variant={'title3'}
          fontWeight="600"
          marginBottom={'l'}
          textAlign="center"
        >
          REGISTER
        </AppText>
        <AppInputFormik
          placeholder={t('auth:fullName')}
          label={t('auth:fullName')}
          maxLength={255}
          control={control}
          name={'fullName'}
          defaultValue={defaultValue.fullName}
          error={errors.fullName?.message}
        />
        <AppInputFormik
          placeholder={t('auth:email')}
          label={t('auth:email')}
          maxLength={255}
          returnKeyType={'next'}
          keyboardType={'email-address'}
          control={control}
          name={'email'}
          defaultValue={defaultValue.email}
          error={errors.email?.message}
        />
        <AppInputFormik
          placeholder={t('auth:titlePassword')}
          label={t('auth:titlePassword')}
          maxLength={32}
          returnKeyType={'next'}
          secureTextEntry
          textContentType="password"
          control={control}
          name={'password'}
          defaultValue={defaultValue.password}
          error={errors.password?.message}
        />
        <AppInputFormik
          placeholder={t('auth:confirmPassword')}
          label={t('auth:confirmPassword')}
          returnKeyType={'done'}
          maxLength={32}
          secureTextEntry
          textContentType="password"
          control={control}
          name={'confirmPassword'}
          defaultValue={defaultValue.confirmPassword}
          error={errors.confirmPassword?.message}
        />

        {/* Except term and privacy */}

        <Box
          flexDirection={'row'}
          alignItems="center"
          justifyContent={'flex-start'}
          marginBottom="l"
          marginTop={'l'}
        >
          <TouchableOpacity
            style={{
              marginRight: Spacing.width4,
            }}
          >
            <AppCheckBox isChecked={isCheckBox} handleToggle={setCheckBox} />
          </TouchableOpacity>
          <AppText style={styles.txtPolicyNormal}>
            {t('auth:agreeTerms')}
          </AppText>

          <TouchableOpacity>
            <AppText style={styles.txtPolicyTerm}>
              {t('auth:termsOfService')}
            </AppText>
          </TouchableOpacity>
          <AppText style={styles.txtPolicyNormal}> & </AppText>
          <TouchableOpacity>
            <AppText style={styles.txtPolicyTerm}>
              {t('auth:privacyPolicy')}
            </AppText>
          </TouchableOpacity>
        </Box>

        <AppButton
          style={styles.btn}
          label={t('createAccount')}
          onPress={handleSubmit(handleOnSubmit)}
          disabled={!isCheckBox}
        />
        <AppText style={styles.txtOr}>{t('common:or')}</AppText>
        <View style={styles.viewLoginSocial}>
          {Platform.OS === 'ios' && (
            <AppLoginSocial type={TYPE_BTN_SOCIAL.APPLE} onSuccess={() => {}} />
          )}
          <AppLoginSocial
            type={TYPE_BTN_SOCIAL.FACEBOOK}
            onSuccess={() => {}}
          />

          <AppLoginSocial type={TYPE_BTN_SOCIAL.GOOGLE} onSuccess={() => {}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            alignSelf: 'center',
            marginTop: Spacing.height18,
            paddingBottom: bottom + Spacing.height16,
          }}
        >
          <AppText style={{color: '#514F6E'}}>
            {t('auth:alreadyAccount')}
          </AppText>
          <TouchableOpacity
            onPress={() => {
              navigate(SCREEN_ROUTE.LOGIN);
            }}
            style={{marginLeft: 4}}
          >
            <AppText style={styles.txtLogin}>{t('login')}</AppText>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </Box>
  );
};
