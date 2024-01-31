export const REDUX_ACTION = {};
export const APP_SLICE = {
  ACCOUNT_SLICE: 'ACCOUNT_SLICE',
  BOTTOM_SLICE: 'BOTTOM_SLICE',
};

export const StorageConstant = {
  THEME: 'THEME',
};
export * from './refType';

export interface paramLoginSocial {
  email: string;
  social_id: string;
  full_name?: string;
}
export interface responseLoginSocial {
  success: boolean;
  code: number;
  message: string;
  title: string;
  data: {
    token: string;
    user_info: resposeUserDetail;
  };
}

export interface resposeUserDetail {
  id?: number;
  birthday: string;
  apple_id?: string;
  verify_code?: string;
  email_verified_at?: string;
  customer_id?: string;
  card_id?: string;
  remember_token?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  avatar: string;
  can_go_home: number;
  current_workplace_id: number;
  email: string;
  facebook_id: string;
  full_name: string;
  google_id: string;
  home_mode: string;
  industry_id: string;
  profession_id: string;
  role: number;
  status: number;
  step: number;
  gender: number;
  subscription_id: string;
  is_social_login: number;
  country: {
    id: number;
    name: string;
    code: string;
  };
}
