import {SCREEN_ROUTE} from './route';

export interface RootStackParamList {
  [key: string]: any;
  [SCREEN_ROUTE.AUTH_STACK]: undefined;
  [SCREEN_ROUTE.MAIN_STACK]: undefined;
  [SCREEN_ROUTE.HOME_PAGE]: undefined;
  [SCREEN_ROUTE.MAIN_PAGE]: undefined;
  [SCREEN_ROUTE.ACCOUNT_PAGE]: undefined;
  [SCREEN_ROUTE.LOGIN]: undefined;
}
