export type CommonResponse = Partial<{
  success: boolean;
  code: number;
  locale: string;
  message: string;
  show_alert: boolean;
}>;


export interface SignUpVerifyCodeResponse extends CommonResponse {
  data: {
    message: string;
    email: string;
  };
}

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};