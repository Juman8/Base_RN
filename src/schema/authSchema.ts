import i18next from 'i18next';
import * as yup from 'yup';
export type loginTypeForm = {email: string; password: string};
export const schemaLogin = yup.object().shape({
  password: yup
    .string()
    .required(i18next.t('validate:NotNull'))
    .min(6, i18next.t('validate:min6Character'))
    .max(12, i18next.t('validate:max12Character')),
  email: yup
    .string()
    .required(i18next.t('validate:invalidEmail'))
    .email(i18next.t('validate:invalidEmail')),
});

export type registerTypeForm = {
  fullName: string;
  password: string;
  confirmPassword: string;
  email: string;
};
export const schemaRegister = yup.object().shape({
  fullName: yup
    .string()
    .required(i18next.t('validate:NotNull'))
    .max(20, i18next.t('validate:max20Character')),
  password: yup
    .string()
    .required(i18next.t('validate:NotNull'))
    .min(6, i18next.t('validate:min6Character'))
    .max(12, i18next.t('validate:max12Character')),
  confirmPassword: yup
    .string()
    .required(i18next.t('validate:NotNull'))
    .min(6, i18next.t('validate:min6Character'))
    .oneOf([yup.ref('password'), null], i18next.t('validate:mathPassword'))
    .max(12, i18next.t('validate:max12Character')),
  email: yup
    .string()
    .required(i18next.t('validate:invalidEmail'))
    .email(i18next.t('validate:invalidEmail')),
});
