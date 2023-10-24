import {baseApi} from './api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rootMiddle = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(baseApi.middleware);
