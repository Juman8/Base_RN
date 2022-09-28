import {Home} from "@screens";

export const SCREEN_ROUTE = {
  AUTH_STACK: 'AUTH_STACK',
  MAIN_ROOT: 'MAIN_ROOT',
  MAIN_STACK: 'MAIN_STACK',
  HOME_PAGE: 'HOME_PAGE',
  TRADE_PAGE: 'TRADE_PAGE',
  MAIN_PAGE: 'MAIN_PAGE',
  DISCOVER_PAGE: 'DISCOVER_PAGE',
  ACCOUNT_PAGE: 'ACCOUNT_PAGE',
  LOGIN: 'LOGIN',
};

export const ROUTER_BOTTOM_TAB = [
  {
    key: SCREEN_ROUTE.HOME_PAGE,
    route: Home,
  },
  {
    key: SCREEN_ROUTE.TRADE_PAGE,
    route: Home,
  }, {
    key: SCREEN_ROUTE.MAIN_PAGE,
    route: Home,
  }, {
    key: SCREEN_ROUTE.DISCOVER_PAGE,
    route: Home,
  }, {
    key: SCREEN_ROUTE.ACCOUNT_PAGE,
    route: Home,
  },
]
